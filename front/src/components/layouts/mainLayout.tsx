import Footers from "./footers";
import Headers from "./headers";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-200">
      <div className="w-full bg-white shadow-sm">
        <Headers />
      </div>

      <main className="w-full flex-1 my-8">{children}</main>

      <div className="w-full bg-slate-500">
        <Footers />
      </div>
    </div>
  );
}
