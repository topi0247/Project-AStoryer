import ClientProvider from "./clientProvider";
import ServerProvider from "./serverProvider";

export default function AppProviders({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <>
      <ClientProvider>
        <ServerProvider params={params}>{children}</ServerProvider>
      </ClientProvider>
    </>
  );
}
