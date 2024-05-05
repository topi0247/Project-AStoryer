import type { Metadata } from "next";
import "@/styles/globals.css";
import AppProviders from "@/providers";
import { MainLayout } from "@/components/layouts";
import { ColorSchemeScript } from "@mantine/core";

export const metadata: Metadata = {
  title: "AStoryer - あすとりや -",
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
      </body>
    </html>
  );
}
