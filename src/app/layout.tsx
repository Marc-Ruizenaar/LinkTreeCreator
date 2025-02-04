import type { Metadata } from "next";
import "@/styles/globals.css";
import { Raleway } from 'next/font/google'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Friendly - Your creator Store",
  description:
    "We work 1-on-1 with the Top Creators to monetize their business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={raleway.className}>{children}</body>
    </html>
  );
}
