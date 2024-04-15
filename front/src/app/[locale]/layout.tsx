import type { Metadata } from "next";
import "@/app/globals.css";
import * as Layout from "@/components/layouts";
import { NextIntlClientProvider, useMessages } from "next-intl";

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
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className="w-screen min-h-screen flex flex-col bg-slate-200">
          <div className="w-full bg-white shadow-sm">
            <Layout.Headers />
          </div>
          {children}
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
