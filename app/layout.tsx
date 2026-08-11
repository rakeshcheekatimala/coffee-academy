import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Navigation } from "@/components/shared/Navigation";
import { SiteFooter } from "@/components/shared/SiteFooter";

export const metadata: Metadata = {
  title: "Coffee Academy — Brew with intent",
  description: "A precise, practical education in coffee origin, roasting, extraction, and taste.",
};

const themeScript = `
  (function () {
    try {
      var saved = localStorage.getItem('coffee-academy-theme');
      var dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', dark);
    } catch (_) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </head>
      <body>
        <Navigation />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
