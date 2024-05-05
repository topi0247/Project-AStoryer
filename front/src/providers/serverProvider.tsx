import { MantineProvider } from "@mantine/core";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function ServerProvider({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MantineProvider>{children}</MantineProvider>
    </NextIntlClientProvider>
  );
}
