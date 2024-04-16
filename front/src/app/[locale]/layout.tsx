import type { Metadata } from "next";
import "@/app/globals.css";
import { NextIntlClientProvider, useMessages } from "next-intl";
import AppProvider from "@/providers/index";
import { MainLayout } from "@/components/layouts";

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
  const messages = useMessages();
  return (
    <html lang="ja">
      <AppProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <body className="w-screen min-h-screen flex flex-col bg-slate-200 relative">
            <MainLayout>{children}</MainLayout>
          </body>
        </NextIntlClientProvider>
      </AppProvider>
    </html>
  );
}
