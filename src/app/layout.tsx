import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ 
  weight: ['300', '400', '500'],
  subsets: ["latin"],
  variable: '--roboto-font',
});

export const metadata: Metadata = {
  title: "Vi Nguyen's Portfolio &ndash; coming soon",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
