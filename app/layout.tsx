
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import InitialLoader from "@/components/loading/InitialLoader";
import BackToTop from "@/components/navigation/BackToTop";
import ScrollProgress from "@/components/navigation/ScrollProgress";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fathan Al Ashraf | Personal Portfolio",
  description:
    "Portofolio personal Fathan Al Ashraf — Web Developer yang tertarik pada pengembangan website dan teknologi digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <InitialLoader />
          <ScrollProgress />
          {children}
          <BackToTop />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
