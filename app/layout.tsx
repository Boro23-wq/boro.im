import "./global.css";
import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/system";
import { Newsreader } from "next/font/google";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";

const newsreader = Newsreader({
  style: ["italic"],
  weight: ["400", "600", "800"],
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Sintu Boro",
    template: "%s",
  },
  description: "Software designer, developer, and blogger.",
  icons: {
    apple: [
      {
        rel: "apple-touch-icon",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
        url: "/apple-touch-icon-light.png?v=2",
        fetchPriority: "high",
      },
      {
        rel: "icon",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
        url: "/apple-touch-icon-dark.png?v=2",
        fetchPriority: "high",
      },
    ],
    icon: [
      {
        rel: "icon",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
        url: "/icon-light.png?v=2",
        fetchPriority: "high",
      },
      {
        rel: "icon",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
        url: "/icon-dark.png?v=2",
        fetchPriority: "high",
      },
    ],
  },
  openGraph: {
    title: "Sintu Boro",
    description: "Software designer, developer, and blogger.",
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
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cx(GeistSans.className, newsreader.variable)}
    >
      <NextUIProvider>
        <body className="antialiased">
          <ThemeProvider
            attribute="class"
            enableColorScheme={false}
            enableSystem={true}
          >
            <div className="main-container">
              <div
                className="main-blur relative h-[100px]"
                aria-hidden="true"
              ></div>
              <main className="main py-16 sm:py-28">
                <div className="main-grid">
                  {children}
                  <Analytics />
                  <SpeedInsights />
                </div>
              </main>
            </div>
            <Footer />
          </ThemeProvider>
        </body>
      </NextUIProvider>
    </html>
  );
}
