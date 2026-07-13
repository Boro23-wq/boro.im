"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import {
  Home,
  PenLine,
  FolderGit2,
  Briefcase,
  Sun,
  Moon,
  SunMoon,
  Link2,
  ArrowUpRight,
  Check,
  SearchIcon,
} from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "@icons-pack/react-simple-icons";
import { playThemeSound } from "@/lib/theme-sound";
import { social } from "@/lib/social";

type SlimEntry = {
  slug: string;
  title: string;
  publishedAt: string;
};

type CommandMenuProps = {
  posts: SlimEntry[];
  projects: SlimEntry[];
};

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  github: SiGithub,
  linkedin: SiLinkedin,
  x: SiX,
};

const groupClass =
  "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.12em] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-neutral-400 dark:[&_[cmdk-group-heading]]:text-neutral-500";

const itemClass =
  "group flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer transition-colors duration-75 data-[selected=true]:bg-neutral-950/[0.05] dark:data-[selected=true]:bg-white/[0.07] data-[selected=true]:text-neutral-900 dark:data-[selected=true]:text-neutral-100";

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-[5px] border border-neutral-200 bg-white px-1 font-mono text-[10px] text-neutral-500 shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
      {children}
    </kbd>
  );
}

function IconTile({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-neutral-200/80 bg-white text-neutral-400 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors duration-75 group-data-[selected=true]:border-neutral-300 group-data-[selected=true]:text-neutral-700 dark:border-neutral-700/70 dark:bg-neutral-800/90 dark:text-neutral-500 dark:group-data-[selected=true]:border-neutral-600 dark:group-data-[selected=true]:text-neutral-200">
      <Icon className="h-3.5 w-3.5" />
    </span>
  );
}

function EnterHint() {
  return (
    <span className="ml-auto hidden shrink-0 items-center group-data-[selected=true]:flex">
      <Kbd>↵</Kbd>
    </span>
  );
}

export function CommandMenu({ posts, projects }: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { theme, resolvedTheme, setTheme } = useTheme();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    function onOpenRequest() {
      setOpen(true);
    }

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-menu", onOpenRequest);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-menu", onOpenRequest);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  const runNavigate = (path: string) => {
    router.push(path);
    close();
  };

  const runTheme = (newTheme: string) => {
    setTheme(newTheme);
    playThemeSound(newTheme, resolvedTheme);
    close();
  };

  const runCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => close(), 600);
  };

  const runOpenExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    close();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-white/40 dark:bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
      onClick={close}
    >
      <div
        className="w-full max-w-lg motion-safe:animate-palette-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-xl p-px bg-gradient-to-b from-neutral-300/90 via-neutral-200/60 to-neutral-300/30 shadow-[0_16px_70px_rgba(0,0,0,0.2)] dark:from-white/20 dark:via-white/[0.08] dark:to-white/[0.04] dark:shadow-[0_16px_70px_rgba(0,0,0,0.55)]">
          <Command
            label="Command menu"
            className="rounded-[11px] backdrop-blur-2xl backdrop-saturate-200 bg-white/85 dark:bg-neutral-900/85 overflow-hidden"
            loop
          >
            <div className="flex items-center gap-3 px-4 border-b border-neutral-200/60 dark:border-white/[0.06]">
              <SearchIcon className="h-4 w-4 shrink-0 text-neutral-400 dark:text-neutral-500" />
              <Command.Input
                autoFocus
                placeholder="Jump to a post, project, or action..."
                className="w-full py-3.5 bg-transparent border-0 text-sm focus:outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
              />
              <Kbd>esc</Kbd>
            </div>

            <Command.List className="max-h-[min(24rem,60vh)] overflow-y-auto px-2 pb-2 [&_[cmdk-list-sizer]]:space-y-0.5">
              <Command.Empty className="py-10 text-center">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">No results found.</p>
                <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-600">
                  Try a post title, project, or “theme”.
                </p>
              </Command.Empty>

              <Command.Group heading="Navigation" className={groupClass}>
                {(
                  [
                    { label: "Home", path: "/", icon: Home },
                    { label: "Blog", path: "/blog", icon: PenLine },
                    { label: "Projects", path: "/project", icon: FolderGit2 },
                    { label: "Work", path: "/work", icon: Briefcase },
                  ] as const
                ).map((nav) => (
                  <Command.Item
                    key={nav.path}
                    onSelect={() => runNavigate(nav.path)}
                    className={itemClass}
                  >
                    <IconTile icon={nav.icon} />
                    {nav.label}
                    <EnterHint />
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Blog posts" className={groupClass}>
                {posts.map((post) => (
                  <Command.Item
                    key={post.slug}
                    value={post.title}
                    keywords={[post.slug]}
                    onSelect={() => runNavigate(`/blog/${post.slug}`)}
                    className={itemClass}
                  >
                    <IconTile icon={PenLine} />
                    <span className="truncate">{post.title}</span>
                    <span className="ml-auto shrink-0 font-mono text-[11px] text-neutral-400 dark:text-neutral-600 group-data-[selected=true]:hidden">
                      {new Date(post.publishedAt).getFullYear()}
                    </span>
                    <EnterHint />
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Projects" className={groupClass}>
                {projects.map((project) => (
                  <Command.Item
                    key={project.slug}
                    value={project.title}
                    keywords={[project.slug]}
                    onSelect={() => runNavigate(`/project/${project.slug}`)}
                    className={itemClass}
                  >
                    <IconTile icon={FolderGit2} />
                    <span className="truncate">{project.title}</span>
                    <span className="ml-auto shrink-0 font-mono text-[11px] text-neutral-400 dark:text-neutral-600 group-data-[selected=true]:hidden">
                      {new Date(project.publishedAt).getFullYear()}
                    </span>
                    <EnterHint />
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Theme" className={groupClass}>
                {(
                  [
                    { label: "Light", value: "light", icon: Sun },
                    { label: "Dark", value: "dark", icon: Moon },
                    { label: "System", value: "system", icon: SunMoon },
                  ] as const
                ).map((t) => (
                  <Command.Item
                    key={t.value}
                    value={`${t.label} theme`}
                    onSelect={() => runTheme(t.value)}
                    className={itemClass}
                  >
                    <IconTile icon={t.icon} />
                    {t.label}
                    {theme === t.value && (
                      <Check className="ml-1 h-3.5 w-3.5 text-neutral-400 group-data-[selected=true]:text-neutral-600 dark:group-data-[selected=true]:text-neutral-300" />
                    )}
                    <EnterHint />
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Actions" className={groupClass}>
                <Command.Item onSelect={runCopyUrl} className={itemClass}>
                  <IconTile icon={copied ? Check : Link2} />
                  {copied ? "Copied!" : "Copy current URL"}
                  <EnterHint />
                </Command.Item>
                {social.map((s) => {
                  const Icon = socialIcons[s.name] ?? ArrowUpRight;
                  return (
                    <Command.Item
                      key={s.name}
                      onSelect={() => runOpenExternal(s.url)}
                      className={`${itemClass} capitalize`}
                    >
                      <IconTile icon={Icon} />
                      Open {s.name}
                      <ArrowUpRight className="h-3 w-3 text-neutral-300 dark:text-neutral-600 group-data-[selected=true]:text-neutral-500 dark:group-data-[selected=true]:text-neutral-400" />
                      <EnterHint />
                    </Command.Item>
                  );
                })}
              </Command.Group>
            </Command.List>

            <div className="flex items-center justify-end border-t border-neutral-200/60 dark:border-white/[0.06] bg-neutral-50/60 dark:bg-white/[0.02] px-3.5 py-2">
              <div className="flex items-center gap-3 text-[11px] text-neutral-400 dark:text-neutral-500">
                <span className="flex items-center gap-1">
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <Kbd>↵</Kbd>
                  open
                </span>
              </div>
            </div>
          </Command>
        </div>
      </div>
    </div>
  );
}
