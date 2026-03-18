import type { Metadata } from "next";
import { Space_Grotesk, Poppins, Rajdhani } from "next/font/google";
import "./globals.css";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading"
});

const bodyFont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body"
});

const nameFont = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-name"
});

export const metadata: Metadata = {
  title: "Adryan – Clean Tech / Industrial Portfolio",
  description:
    "Single-page portfolio for clean-tech & industrial projects. Focused, minimal, and performance-oriented."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} ${nameFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

