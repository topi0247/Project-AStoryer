import { Link } from "@/lib";
import { RouterPath } from "@/settings";
import { useTranslations } from "next-intl";
import * as Mantine from "@mantine/core";

export default function Footers() {
  const t_Footer = useTranslations("Footer");
  return (
    <footer className="p-4 flex flex-col md:flex-row text-white justify-between w-full md:py-8">
      <div className="flex flex-col gap-3">
        <h3 className="md:text-center md:m-auto">
          <Link
            href={RouterPath.home}
            className="flex flex-col justify-center items-center w-32 h-auto object-contain"
          >
            <Mantine.Image src="/assets/AppLogo.png" />
          </Link>
        </h3>
      </div>
      <section className="text-sm md:text-normal md:mr-8 md:flex md:flex-col md:gap-3">
        <nav className="my-4">
          <ul className="flex flex-col gap-1 md:gap-3 md:flex-row">
            <li>
              <Link
                href={RouterPath.termsOfService}
                className="hover:opacity-80 transition-all "
              >
                {t_Footer("termsOfService")}
              </Link>
            </li>
            <li>
              <Link
                href={RouterPath.privacyPolicy}
                className="hover:opacity-80 transition-all"
              >
                {t_Footer("privacyPolicy")}
              </Link>
            </li>
            {/* <li>
              <Link href="/contact" className="hover:opacity-80 transition-all">
                {t_Footer("contact")}
              </Link>
            </li> */}
          </ul>
        </nav>
        <p className="">©2024 AStoryer -あすとりや-</p>
      </section>
    </footer>
  );
}
