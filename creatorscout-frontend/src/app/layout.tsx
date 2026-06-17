import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import { FilterProvider } from "@/hooks/useFilters";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CreatorScout — Discover & Partner with Top Creators",
  description:
    "CreatorScout's creator discovery platform. Search, filter, and connect with the best YouTube and Instagram creators for your brand campaigns.",
  keywords:
    "creator discovery, influencer marketing, YouTube creators, Instagram influencers, brand campaigns",
  openGraph: {
    title: "CreatorScout — Discover & Partner with Top Creators",
    description: "CreatorScout's creator discovery platform for brands.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <QueryProvider>
            <FilterProvider>{children}</FilterProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
