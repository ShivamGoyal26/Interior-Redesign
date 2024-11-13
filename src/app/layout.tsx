import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Provider from "@/provider";

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
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className}`}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
