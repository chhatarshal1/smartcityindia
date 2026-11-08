import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nearby — Your city, unfiltered.",
  description: "Connect with your neighbourhood. Share local stories, photos, video and audio around Chandigarh.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
