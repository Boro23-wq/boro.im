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
      className="fixed inset-0 z-[60] bg-white/40 dark:bg-black/40 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
      onClick={close}
    >
      <div
        className="w-full max-w-lg motion-safe:animate-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <Command
          label="Command menu"
          className="backdrop-blur-3xl backdrop-saturate-200 bg-white/70 dark:bg-neutral-900/70 border border-white/20 dark:border-white/10 rounded-sm shadow-2xl overflow-hidden"
          loop
        >
          <Command.Input
            autoFocus
            placeholder="Jump to a post, project, or action..."
            className="w-full px-4 py-3 bg-transparent border-0 border-b border-neutral-200/60 dark:border-neutral-700/60 text-sm focus:outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
          />
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-neutral-500">
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Navigation"
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-neutral-500 dark:[&_[cmdk-group-heading]]:text-neutral-400"
            >
              <Command.Item
                onSelect={() => runNavigate("/")}
                className="flex items-center gap-2 px-2 py-2 rounded-sm text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800/60"
              >
                <Home className="w-4 h-4 text-neutral-400" />
                Home
              </Command.Item>
              <Command.Item
                onSelect={() => runNavigate("/blog")}
                className="flex items-center gap-2 px-2 py-2 rounded-sm text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800/60"
              >
                <PenLine className="w-4 h-4 text-neutral-400" />
                Blog
              </Command.Item>
              <Command.Item
                onSelect={() => runNavigate("/project")}
                className="flex items-center gap-2 px-2 py-2 rounded-sm text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800/60"
              >
                <FolderGit2 className="w-4 h-4 text-neutral-400" />
                Projects
              </Command.Item>
              <Command.Item
                onSelect={() => runNavigate("/work")}
                className="flex items-center gap-2 px-2 py-2 rounded-sm text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800/60"
              >
                <Briefcase className="w-4 h-4 text-neutral-400" />
                Work
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading="Blog posts"
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-neutral-500 dark:[&_[cmdk-group-heading]]:text-neutral-400"
            >
              {posts.map((post) => (
                <Command.Item
                  key={post.slug}
                  value={post.title}
                  keywords={[post.slug]}
                  onSelect={() => runNavigate(`/blog/${post.slug}`)}
                  className="flex items-center justify-between gap-2 px-2 py-2 rounded-sm text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800/60"
                >
                  <span className="flex items-center gap-2 truncate">
                    <PenLine className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span className="truncate">{post.title}</span>
                  </span>
                  <span className="text-xs font-mono text-neutral-400 shrink-0">
                    {new Date(post.publishedAt).getFullYear()}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading="Projects"
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-neutral-500 dark:[&_[cmdk-group-heading]]:text-neutral-400"
            >
              {projects.map((project) => (
                <Command.Item
                  key={project.slug}
                  value={project.title}
                  keywords={[project.slug]}
                  onSelect={() => runNavigate(`/project/${project.slug}`)}
                  className="flex items-center justify-between gap-2 px-2 py-2 rounded-sm text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800/60"
                >
                  <span className="flex items-center gap-2 truncate">
                    <FolderGit2 className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span className="truncate">{project.title}</span>
                  </span>
                  <span className="text-xs font-mono text-neutral-400 shrink-0">
                    {new Date(project.publishedAt).getFullYear()}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading="Theme"
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-neutral-500 dark:[&_[cmdk-group-heading]]:text-neutral-400"
            >
              <Command.Item
                onSelect={() => runTheme("light")}
                className="flex items-center justify-between gap-2 px-2 py-2 rounded-sm text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800/60"
              >
                <span className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-neutral-400" />
                  Light
                </span>
                {theme === "light" && <Check className="w-3.5 h-3.5 text-neutral-400" />}
              </Command.Item>
              <Command.Item
                onSelect={() => runTheme("dark")}
                className="flex items-center justify-between gap-2 px-2 py-2 rounded-sm text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800/60"
              >
                <span className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-neutral-400" />
                  Dark
                </span>
                {theme === "dark" && <Check className="w-3.5 h-3.5 text-neutral-400" />}
              </Command.Item>
              <Command.Item
                onSelect={() => runTheme("system")}
                className="flex items-center justify-between gap-2 px-2 py-2 rounded-sm text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800/60"
              >
                <span className="flex items-center gap-2">
                  <SunMoon className="w-4 h-4 text-neutral-400" />
                  System
                </span>
                {theme === "system" && <Check className="w-3.5 h-3.5 text-neutral-400" />}
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading="Actions"
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-neutral-500 dark:[&_[cmdk-group-heading]]:text-neutral-400"
            >
              <Command.Item
                onSelect={runCopyUrl}
                className="flex items-center gap-2 px-2 py-2 rounded-sm text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800/60"
              >
                <Link2 className="w-4 h-4 text-neutral-400" />
                {copied ? "Copied!" : "Copy current URL"}
              </Command.Item>
              {social.map((s) => {
                const Icon = socialIcons[s.name] ?? ArrowUpRight;
                return (
                  <Command.Item
                    key={s.name}
                    onSelect={() => runOpenExternal(s.url)}
                    className="flex items-center gap-2 px-2 py-2 rounded-sm text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800/60 capitalize"
                  >
                    <Icon className="w-4 h-4 text-neutral-400" />
                    Open {s.name}
                  </Command.Item>
                );
              })}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
