import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppFab } from "@/components/ui/whatsapp-fab";

export const metadata: Metadata = {
  title: "Waffle Whizz | Where Every Bite is a Waffle Wonder...",
  description:
    "Premium waffle and brownie ordering experience for Waffle Whizz. Order direct from lokeshwaffle.in.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://lokeshwaffle.in"),
  openGraph: {
    title: "Waffle Whizz",
    description: "Where Every Bite is a Waffle Wonder...",
    url: "https://lokeshwaffle.in",
    siteName: "Waffle Whizz",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="min-h-[70vh]">{children}</main>
        <SiteFooter />
        <WhatsAppFab />
      </body>
    </html>
  );
}
