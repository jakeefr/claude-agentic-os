import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agentic OS",
  description: "Your personal AI operating system dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full bg-[#0a0a0a] text-white">{children}</body>
    </html>
  );
}
