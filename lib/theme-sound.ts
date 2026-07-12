export function playThemeSound(theme: string, resolvedTheme?: string) {
  let isDark: boolean;

  if (theme === "dark") {
    isDark = true;
  } else if (theme === "light") {
    isDark = false;
  } else if (resolvedTheme) {
    isDark = resolvedTheme === "dark";
  } else if (typeof window !== "undefined") {
    isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  } else {
    return;
  }

  const audio = new Audio(isDark ? "/audio/light-switch-off.mp3" : "/audio/light-switch-on.mp3");
  audio.play().catch(() => {});
}
