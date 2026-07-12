// app/layout.tsx
import "./global.css";
import { ThemeProvider } from "next-themes";
import { Newsreader, Geist } from "next/font/google";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { CommandMenu } from "./components/command-menu";
import { getBlogPosts } from "./blog/utils";
import { getProjects } from "./project/utils";
import { baseUrl } from "./sitemap";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: true,
});

const newsreader = Newsreader({
  style: ["italic"],
  weight: ["400", "600", "800"],
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Sintu Boro — Software Developer building web experiences",
    template: "%s",
  },
  description:
    "Sintu Boro is a software developer building fast, accessible web applications and writes about the process along the way.",
  openGraph: {
    title: "Sintu Boro — Software Developer building web experiences",
    description:
      "Sintu Boro is a software developer building fast, accessible web applications and writes about the process along the way.",
    url: baseUrl,
    siteName: "Sintu Boro",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    apple: [
      {
        rel: "apple-touch-icon",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
        url: "/apple-touch-icon-light.png?v=4",
        fetchPriority: "high",
      },
      {
        rel: "icon",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
        url: "/apple-touch-icon-dark.png?v=4",
        fetchPriority: "high",
      },
    ],
    icon: [
      {
        rel: "icon",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
        url: "/icon-light.png?v=5",
        fetchPriority: "high",
      },
      {
        rel: "icon",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
        url: "/icon-dark.png?v=5",
        fetchPriority: "high",
      },
    ],
  },
};

const cx = (...classes: Array<string | undefined | false>) => classes.filter(Boolean).join(" ");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const posts = getBlogPosts()
    .map((post) => ({
      slug: post.slug,
      title: post.metadata.title,
      publishedAt: post.metadata.publishedAt,
    }))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const projects = getProjects()
    .map((project) => ({
      slug: project.slug,
      title: project.metadata.title,
      publishedAt: project.metadata.publishedAt,
    }))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <html suppressHydrationWarning lang="en" className={cx(geist.variable, newsreader.variable)}>
      <body className="antialiased">
        <ThemeProvider attribute="class" enableColorScheme={false} enableSystem>
          <div className="main-container">
            <div className="main-blur relative h-[100px]" aria-hidden="true" />
            <main className="main py-16 sm:py-28">
              <div className="main-grid">
                {children}
                <Analytics />
                <SpeedInsights />
              </div>
            </main>
          </div>
          <Footer />
          <CommandMenu posts={posts} projects={projects} />
        </ThemeProvider>
      </body>
    </html>
  );
}
