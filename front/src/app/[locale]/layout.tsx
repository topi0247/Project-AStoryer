import "@/styles/globals.css";
import AppProviders from "@/providers";
import { MainLayout } from "@/components/layouts";
import { ColorSchemeScript } from "@mantine/core";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Settings } from "@/settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | AStoryer - あすとりや -",
    default: "AStoryer - あすとりや -",
  },
  description: "TRPGの創作物を投稿できるサービス",
  alternates: {
    canonical: Settings.APP_URL,
  },
  openGraph: {
    title: "AStoryer - あすとりや -",
    description: "TRPGの創作物を投稿できるサービス",
    url: Settings.APP_URL,
    siteName: "AStoryer - あすとりや -",
    images: `${Settings.APP_URL}/assets/OGP.webp`,
    type: "website",
  },
  icons: {
    icon: `${Settings.APP_URL}/assets/favicon.ico`,
  },
  twitter: {
    card: "summary_large_image",
    title: "AStoryer - あすとりや -",
    description: "TRPGの創作物を投稿できるサービス",
    images: `${Settings.APP_URL}/assets/OGP.webp`,
  },
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <AppProviders params={{ locale }}>
          <MainLayout>{children}</MainLayout>
        </AppProviders>
        <Analytics />
        <GoogleAnalytics gaId={Settings.GA4_ID || ""} />
      </body>
    </html>
  );
}
