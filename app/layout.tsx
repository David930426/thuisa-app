import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Plus Jakarta Sans was commissioned for the city of Jakarta — a small nod to
// where our members come from, and a strong display face for headings.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.fullName}`,
    template: `%s — ${site.name}`,
  },
  description:
    "THUISA is the Indonesian Student Association at Tunghai University in Taichung, Taiwan. Events, resources, and a community for Indonesian students.",
  keywords: [
    "THUISA",
    "Tunghai University",
    "Indonesian students",
    "Taiwan",
    "Taichung",
    "PPI Taiwan",
    "Indonesian Student Association",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: `${site.name} — ${site.fullName}`,
    description:
      "A home away from home for Indonesian students at Tunghai University.",
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Toaster richColors position="top-center" />
        <Menu />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
