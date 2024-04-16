import { Link } from "@/lib";

export default function Footers() {
  return (
    <footer className="flex text-white justify-between items-center w-full py-8">
      <div className="ml-8 text-2xl">
        <h3 className="text-center m-auto">
          <Link href="/" className="flex flex-col">
            AStoryer <span>- あすとりや -</span>
          </Link>
        </h3>
      </div>
      <section className="mr-8 flex flex-col gap-3">
        <nav>
          <ul className="flex gap-3">
            <li>
              <Link href="/terms-of-service">利用規約</Link>
            </li>
            <li>
              <Link href="/privacy-policy">プライバシーポリシー</Link>
            </li>
            <li>
              <Link href="/contact">お問い合わせ</Link>
            </li>
          </ul>
        </nav>
        <p>©2024 AStoryer -あすとりや-</p>
      </section>
    </footer>
  );
}
