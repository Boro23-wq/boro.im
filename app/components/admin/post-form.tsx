"use client";

import "@uiw/react-md-editor/markdown-editor.css";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Trash2Icon, ImagePlusIcon, XIcon } from "lucide-react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type PostType = "blog" | "project";

export type PostFormInitial = {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  tags?: string;
  image?: string;
  content: string;
};

type PostFormProps = {
  type: PostType;
  mode: "new" | "edit";
  initial?: PostFormInitial;
  fromDraft?: boolean;
};

const BLOB_URL_RE = /https:\/\/[^\s"')>]+\.public\.blob\.vercel-storage\.com\/[^\s"')>]+/g;
const MAX_IMAGE_WIDTH = 1600;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseTags(raw?: string): string {
  if (!raw) return "";
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.join(", ");
  } catch {
    // not JSON, fall through
  }
  return raw;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

type ProcessedImage = { file: File; width: number; height: number };

async function readDimensions(file: File): Promise<{ width: number; height: number }> {
  try {
    const bitmap = await createImageBitmap(file);
    const dims = { width: bitmap.width, height: bitmap.height };
    bitmap.close();
    return dims;
  } catch {
    return { width: 800, height: 450 };
  }
}

// Resize large images client-side so multi-MB phone photos never hit storage.
async function processImage(file: File): Promise<ProcessedImage> {
  if (file.type === "image/gif" || file.type === "image/svg+xml") {
    const dims = await readDimensions(file);
    return { file, ...dims };
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_WIDTH / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    const dims = { width: bitmap.width, height: bitmap.height };
    return { file, ...dims };
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", 0.85),
  );
  if (!blob || blob.type !== "image/webp") {
    return { file, width, height };
  }
  return {
    file: new File([blob], "image.webp", { type: "image/webp" }),
    width,
    height,
  };
}

export function PostForm({ type, mode, initial, fromDraft }: PostFormProps) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit" || Boolean(initial?.slug));
  const [publishedAt, setPublishedAt] = useState(initial?.publishedAt ?? todayISO());
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [tags, setTags] = useState(parseTags(initial?.tags));
  const [content, setContent] = useState(initial?.content ?? "");
  const [image, setImage] = useState<string | undefined>(initial?.image);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [savedAt, setSavedAt] = useState<Date | undefined>(undefined);

  const editorWrapRef = useRef<HTMLDivElement>(null);
  const skipAutosaveRef = useRef(true);
  const suppressAutosaveRef = useRef(false);
  const lastSavedSlugRef = useRef<string | undefined>(fromDraft ? initial?.slug : undefined);

  const blobImages = useMemo(() => {
    const urls = content.match(BLOB_URL_RE) ?? [];
    return Array.from(new Set(urls));
  }, [content]);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  async function uploadFile(file: File, kind: "img" | "cover") {
    const processed = await processImage(file);
    const form = new FormData();
    form.append("file", processed.file, processed.file.name || file.name);
    form.append("type", type);
    form.append("slug", slug);
    form.append("kind", kind);

    const res = await fetch("/api/admin/upload-image", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error ?? "Failed to upload image.");
    }
    return { url: data.url as string, width: processed.width, height: processed.height };
  }

  function insertSnippet(snippet: string, cursorOffsetInSnippet?: number) {
    const textarea = editorWrapRef.current?.querySelector("textarea");
    setContent((prev) => {
      const start = textarea?.selectionStart ?? prev.length;
      const end = textarea?.selectionEnd ?? start;
      const before = prev.slice(0, start);
      const after = prev.slice(end);
      const leadPad = before.length === 0 || before.endsWith("\n\n") ? "" : before.endsWith("\n") ? "\n" : "\n\n";
      const tailPad = after.startsWith("\n") || after.length === 0 ? "\n" : "\n\n";
      const insert = `${leadPad}${snippet}${tailPad}`;
      const cursor =
        before.length +
        leadPad.length +
        (cursorOffsetInSnippet ?? snippet.length + tailPad.length);
      requestAnimationFrame(() => {
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(cursor, cursor);
        }
      });
      return before + insert + after;
    });
  }

  async function handleInlineImageUpload(files: FileList | File[] | undefined | null) {
    const list = Array.from(files ?? []).filter((f) => f.type.startsWith("image/"));
    if (list.length === 0) return;
    if (!slug.trim()) {
      setError("Enter a title/slug before uploading images.");
      return;
    }

    setError(undefined);
    setUploadingImage(true);
    try {
      for (const file of list) {
        const { url, width, height } = await uploadFile(file, "img");
        const snippet = `<Image\n  width="${width}"\n  height="${height}"\n  src="${url}"\n  alt=""\n/>`;
        // Land the cursor inside alt="" so a caption can be typed right away.
        insertSnippet(snippet, snippet.indexOf('alt=""') + 5);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleDeleteImage(url: string) {
    if (!confirm("Delete this image? It will be removed from storage and from the post.")) return;
    setError(undefined);
    try {
      const res = await fetch("/api/admin/delete-image", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Failed to delete image.");
        return;
      }
      const escaped = escapeRegExp(url);
      setContent((prev) =>
        prev
          .replace(new RegExp(`<Image[^>]*src="${escaped}"[^>]*/>\\n?`, "g"), "")
          .replace(new RegExp(`!\\[[^\\]]*\\]\\(${escaped}\\)\\n?`, "g"), "")
          .replace(new RegExp(`${escaped}\\n?`, "g"), ""),
      );
    } catch {
      setError("Failed to delete image.");
    }
  }

  async function handleCoverSelect(file: File | undefined) {
    if (!file) return;
    if (!slug.trim()) {
      setError("Enter a title/slug before uploading a cover image.");
      return;
    }
    setError(undefined);
    setUploadingCover(true);
    try {
      const { url } = await uploadFile(file, "cover");
      setImage(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to upload cover image.");
    } finally {
      setUploadingCover(false);
    }
  }

  async function handleRemoveCover() {
    if (!image) return;
    if (image.includes(".public.blob.vercel-storage.com/")) {
      await fetch("/api/admin/delete-image", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: image }),
      }).catch(() => {});
    }
    setImage(undefined);
  }

  useEffect(() => {
    if (skipAutosaveRef.current) {
      skipAutosaveRef.current = false;
      return;
    }
    if (!slug.trim() || !/^[a-z0-9-]+$/.test(slug)) return;
    if (!title.trim() && !summary.trim() && !content.trim()) return;

    const timeout = setTimeout(async () => {
      if (suppressAutosaveRef.current) return;
      setSaveState("saving");
      try {
        const res = await fetch("/api/admin/draft", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            previousSlug: lastSavedSlugRef.current,
            draft: {
              type,
              slug,
              isNew: mode === "new",
              title,
              publishedAt,
              summary,
              tags,
              image,
              content,
              savedAt: new Date().toISOString(),
            },
          }),
        });
        if (res.ok) {
          lastSavedSlugRef.current = slug;
          setSaveState("saved");
          setSavedAt(new Date());
        } else {
          setSaveState("idle");
        }
      } catch {
        setSaveState("idle");
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [type, mode, title, slug, publishedAt, summary, tags, content, image]);

  async function deleteDraftRemote(draftSlug: string) {
    await fetch("/api/admin/draft", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, slug: draftSlug }),
    }).catch(() => {});
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);

    if (!title.trim() || !slug.trim() || !summary.trim()) {
      setError("Title, slug, and summary are required.");
      return;
    }

    suppressAutosaveRef.current = true;
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          slug,
          isNew: mode === "new",
          title,
          publishedAt,
          summary,
          tags:
            type === "project"
              ? tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
              : undefined,
          content,
          image,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setSubmitting(false);
        suppressAutosaveRef.current = false;
        return;
      }

      if (lastSavedSlugRef.current && lastSavedSlugRef.current !== slug) {
        await deleteDraftRemote(lastSavedSlugRef.current);
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong.");
      setSubmitting(false);
      suppressAutosaveRef.current = false;
    }
  }

  async function handleDiscardDraft() {
    if (!confirm("Discard this draft? Uploaded images stay until the post is published or deleted."))
      return;
    suppressAutosaveRef.current = true;
    await deleteDraftRemote(lastSavedSlugRef.current ?? slug);
    router.push("/admin");
    router.refresh();
  }

  async function handleDelete() {
    if (!initial) return;
    if (!confirm(`Delete "${initial.title}"? This can't be undone.`)) return;

    suppressAutosaveRef.current = true;
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, slug: initial.slug }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Failed to delete.");
        setDeleting(false);
        suppressAutosaveRef.current = false;
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Failed to delete.");
      setDeleting(false);
      suppressAutosaveRef.current = false;
    }
  }

  const inputClass =
    "w-full px-3 py-2 rounded-sm border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-500";
  const labelClass = "block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="leading-7 dark:text-[#d4d4d4]">
      <div className="flex items-center justify-between mb-8">
        <p className="newsreader-400-tall font-medium text-xl tracking-tight">
          {fromDraft ? `/ draft ${type}` : mode === "new" ? `/ new ${type}` : `/ edit ${type}`}
        </p>
        <div className="flex items-center gap-4">
          {fromDraft && (
            <button
              type="button"
              onClick={handleDiscardDraft}
              className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
            >
              <XIcon className="w-3.5 h-3.5" />
              Discard draft
            </button>
          )}
          {mode === "edit" && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors disabled:opacity-50"
            >
              <Trash2Icon className="w-3.5 h-3.5" />
              {deleting ? "Deleting…" : "Delete"}
            </button>
          )}
        </div>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 rounded-sm px-3 py-2">
          {error}
        </p>
      )}

      <div className="space-y-5">
        <div>
          <label className={labelClass}>Title</label>
          <input
            className={inputClass}
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title"
            required
          />
        </div>

        <div>
          <label className={labelClass}>Slug</label>
          <input
            className={inputClass}
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
            placeholder="post-title"
            disabled={mode === "edit"}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Published</label>
            <input
              type="date"
              className={inputClass}
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              required
            />
          </div>
          {type === "project" && (
            <div>
              <label className={labelClass}>Tags (comma separated)</label>
              <input
                className={inputClass}
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="React, Tailwind"
              />
            </div>
          )}
        </div>

        <div>
          <label className={labelClass}>Summary</label>
          <textarea
            className={`${inputClass} min-h-[80px] resize-y`}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="One or two sentences describing the post"
            required
          />
        </div>

        <div>
          <label className={labelClass}>Cover image</label>
          <div className="flex items-center gap-4">
            {image && (
              <div className="relative w-24 h-16 rounded-sm overflow-hidden border border-neutral-200 dark:border-neutral-700 flex-shrink-0 group">
                <Image src={image} alt="Cover preview" fill className="object-cover" />
                <button
                  type="button"
                  onClick={handleRemoveCover}
                  title="Remove cover image"
                  className="absolute top-0.5 right-0.5 p-0.5 rounded-sm bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XIcon className="w-3 h-3" />
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              disabled={uploadingCover}
              onChange={(e) => {
                handleCoverSelect(e.target.files?.[0]);
                e.target.value = "";
              }}
              className="text-sm text-neutral-500 dark:text-neutral-400 file:mr-3 file:px-3 file:py-1.5 file:rounded-sm file:border-0 file:bg-neutral-100 file:dark:bg-neutral-800 file:text-neutral-700 file:dark:text-neutral-300 file:text-sm hover:file:bg-neutral-200 dark:hover:file:bg-neutral-700 file:transition-colors"
            />
            {uploadingCover && (
              <span className="text-xs text-neutral-400 dark:text-neutral-500">Uploading…</span>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={labelClass}>Content</label>
            <label className="inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer transition-colors">
              <ImagePlusIcon className="w-3.5 h-3.5" />
              {uploadingImage ? "Uploading…" : "Insert image at cursor"}
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                disabled={uploadingImage}
                onChange={(e) => {
                  handleInlineImageUpload(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
          </div>

          {blobImages.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {blobImages.map((url) => (
                <span
                  key={url}
                  className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" className="w-5 h-5 rounded-[1px] object-cover" />
                  {decodeURIComponent(url.split("/").pop() ?? "")}
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(url)}
                    title="Delete image from storage and post"
                    className="text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <XIcon className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div
            ref={editorWrapRef}
            data-color-mode={resolvedTheme === "dark" ? "dark" : "light"}
            onPaste={(e) => {
              if (e.clipboardData.files.length > 0) {
                e.preventDefault();
                handleInlineImageUpload(e.clipboardData.files);
              }
            }}
            onDragOver={(e) => {
              if (e.dataTransfer.types.includes("Files")) e.preventDefault();
            }}
            onDrop={(e) => {
              if (e.dataTransfer.files.length > 0) {
                e.preventDefault();
                handleInlineImageUpload(e.dataTransfer.files);
              }
            }}
          >
            <MDEditor
              value={content}
              onChange={(value) => setContent(value ?? "")}
              height={480}
              preview="live"
            />
          </div>
          <p className="mt-1.5 text-xs text-neutral-400 dark:text-neutral-500">
            Paste or drag images anywhere in the editor — they upload and land at your cursor.
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-4">
        <span className="text-xs text-neutral-400 dark:text-neutral-500">
          {saveState === "saving" && "Saving draft…"}
          {saveState === "saved" &&
            savedAt &&
            `Draft saved ${savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
        </span>
        <button
          type="submit"
          disabled={submitting || uploadingImage || uploadingCover}
          className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 text-neutral-200 dark:bg-neutral-200 dark:text-neutral-800 hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors rounded-sm text-sm font-medium disabled:opacity-50"
        >
          {submitting ? "Publishing…" : mode === "new" ? "Publish" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
