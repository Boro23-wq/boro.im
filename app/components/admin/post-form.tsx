"use client";

import "@uiw/react-md-editor/markdown-editor.css";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Trash2Icon, ImagePlusIcon } from "lucide-react";

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
};

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

export function PostForm({ type, mode, initial }: PostFormProps) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [publishedAt, setPublishedAt] = useState(initial?.publishedAt ?? todayISO());
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [tags, setTags] = useState(parseTags(initial?.tags));
  const [content, setContent] = useState(initial?.content ?? "");
  const [imagePreview, setImagePreview] = useState<string | undefined>(initial?.image);
  const [newImageDataUrl, setNewImageDataUrl] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<{ path: string; snippet: string }[]>([]);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  function handleImageSelect(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setNewImageDataUrl(dataUrl);
      setImagePreview(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  async function handleInlineImageUpload(file: File | undefined) {
    if (!file) return;
    if (!slug.trim()) {
      setError("Enter a title/slug before uploading images.");
      return;
    }

    setError(undefined);
    setUploadingImage(true);
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });

      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, slug, dataUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to upload image.");
        return;
      }

      setContent((prev) => `${prev.trim()}\n\n${data.snippet}\n`);
      setUploadedImages((prev) => [...prev, { path: data.publicPath, snippet: data.snippet }]);
    } catch {
      setError("Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  }

  function copySnippet(snippet: string) {
    navigator.clipboard.writeText(snippet).catch(() => {});
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);

    if (!title.trim() || !slug.trim() || !summary.trim()) {
      setError("Title, slug, and summary are required.");
      return;
    }

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
          coverImage: newImageDataUrl ? { dataUrl: newImageDataUrl } : null,
          existingImagePath: !newImageDataUrl ? initial?.image : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setSubmitting(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong.");
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!initial) return;
    if (!confirm(`Delete "${initial.title}"? This can't be undone.`)) return;

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
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Failed to delete.");
      setDeleting(false);
    }
  }

  const inputClass =
    "w-full px-3 py-2 rounded-sm border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-500";
  const labelClass = "block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="leading-7 dark:text-[#d4d4d4]">
      <div className="flex items-center justify-between mb-8">
        <p className="newsreader-400-tall font-medium text-xl tracking-tight">
          {mode === "new" ? `/ new ${type}` : `/ edit ${type}`}
        </p>
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
            {imagePreview && (
              <div className="relative w-24 h-16 rounded-sm overflow-hidden border border-neutral-200 dark:border-neutral-700 flex-shrink-0">
                <Image src={imagePreview} alt="Cover preview" fill className="object-cover" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageSelect(e.target.files?.[0])}
              className="text-sm text-neutral-500 dark:text-neutral-400 file:mr-3 file:px-3 file:py-1.5 file:rounded-sm file:border-0 file:bg-neutral-100 file:dark:bg-neutral-800 file:text-neutral-700 file:dark:text-neutral-300 file:text-sm hover:file:bg-neutral-200 dark:hover:file:bg-neutral-700 file:transition-colors"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={labelClass}>Content</label>
            <label className="inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer transition-colors">
              <ImagePlusIcon className="w-3.5 h-3.5" />
              {uploadingImage ? "Uploading…" : "Insert image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploadingImage}
                onChange={(e) => {
                  handleInlineImageUpload(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
            </label>
          </div>

          {uploadedImages.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {uploadedImages.map((img) => (
                <button
                  key={img.path}
                  type="button"
                  onClick={() => copySnippet(img.snippet)}
                  title="Copy snippet to clipboard"
                  className="text-xs px-2 py-1 rounded-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  {img.path.split("/").pop()}
                </button>
              ))}
            </div>
          )}

          <div data-color-mode={resolvedTheme === "dark" ? "dark" : "light"}>
            <MDEditor
              value={content}
              onChange={(value) => setContent(value ?? "")}
              height={480}
              preview="live"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 text-neutral-200 dark:bg-neutral-200 dark:text-neutral-800 hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors rounded-sm text-sm font-medium disabled:opacity-50"
        >
          {submitting ? "Publishing…" : mode === "new" ? "Publish" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
