import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "MyContinental Food Store | African & Caribbean Groceries UK",
    template: "%s | MyContinental Food Store",
  },
  description: "Shop 2,700+ authentic African & Caribbean groceries online. Same-day dispatch in Hillingdon & Uxbridge. Brands you know — Iwisa, Grace, Betapac, Ola-Ola and more.",
  keywords: ["African groceries UK", "Caribbean food store", "Hillingdon grocery", "Uxbridge African shop", "pounded yam", "jollof rice ingredients", "African food online"],
  openGraph: {
    title: "MyContinental Food Store | African & Caribbean Groceries UK",
    description: "Shop 2,700+ authentic African & Caribbean groceries online. Same-day dispatch in Hillingdon & Uxbridge.",
    type: "website",
    url: "https://www.mycontinentalfoodstore.co.uk",
    siteName: "MyContinental Food Store",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyContinental Food Store",
    description: "2,700+ authentic African & Caribbean groceries. Same-day dispatch in Hillingdon.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.mycontinentalfoodstore.co.uk" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-text-primary bg-background">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
