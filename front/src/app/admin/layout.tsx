import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "管理者用 | AStoryer - あすとりや -",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
