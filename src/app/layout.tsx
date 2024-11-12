import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Room Redesigner",
  description:
    "Transform your living spaces with AI-powered interior design suggestions and visualizations",
  keywords: [
    "AI interior design",
    "room redesign",
    "virtual interior designer",
    "home decoration",
    "AI visualization",
  ],
  authors: [{ name: "Shivam Goyal" }],
  openGraph: {
    title: "AI Room Redesigner",
    description: "Transform your living spaces with AI-powered interior design",
    type: "website",
    siteName: "AI Room Redesigner",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className}`}>{children}</body>
    </html>
  );
}
