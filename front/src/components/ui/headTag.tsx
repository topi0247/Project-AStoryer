export default function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center font-semibold text-2xl my-8">
      <span className="pb-2 border-b-2 border-green-400 px-4">{children}</span>
    </h2>
  );
}
