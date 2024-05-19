import { Link } from "@/lib";
import { useTranslations } from "next-intl";

export default function Footers() {
  const t_Footer = useTranslations("Footer");
  return (
    <footer className="p-4 flex text-white justify-between md:items-center w-full md:py-8">
      <div className="flex flex-col gap-3 md:block md:gap-0 text-2xl md:ml-8">
        <h3 className="md:text-center md:m-auto">
          <Link href="/" className="flex flex-col">
            AStoryer <span className="text-sm">- あすとりや -</span>
          </Link>
        </h3>
        <p className="md:hidden text-sm">©2024 AStoryer -あすとりや-</p>
      </div>
      <section className="text-sm md:text-normal md:mr-8 md:flex md:flex-col md:gap-3">
        {/* <nav>
          <ul className="flex flex-col gap-1 md:gap-3 md:flex-row">
            <li>
              <Link href="/about" className="hover:opacity-80 transition-all">
                {t_Footer("about")}
              </Link>
            </li>
            <li>
              <Link
                href="/terms-of-service"
                className="hover:opacity-80 transition-all"
              >
                {t_Footer("termsOfService")}
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="hover:opacity-80 transition-all"
              >
                {t_Footer("privacyPolicy")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:opacity-80 transition-all">
                {t_Footer("contact")}
              </Link>
            </li>
          </ul>
        </nav> */}
        <p className="hidden md:block">©2024 AStoryer -あすとりや-</p>
      </section>
    </footer>
  );
}
