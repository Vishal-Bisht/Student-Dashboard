import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edgelearn — Student Dashboard",
  description: "Next-gen learning dashboard built with Next.js, Supabase, and Framer Motion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-body bg-bg-base min-h-screen">{children}</body>
    </html>
  );
}
