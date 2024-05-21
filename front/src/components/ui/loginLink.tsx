import { Link } from "@/lib";
import { RouterPath } from "@/settings";
import { useTranslations } from "next-intl";

export default function LoginLink() {
  const t_Header = useTranslations("Header");
  return (
    <Link
      href={RouterPath.login}
      className="text-sm md:text-normal p-2 px-3 rounded bg-orange-200 hover:bg-orange-400 text-black  transition-all hover:text-white"
    >
      {t_Header("signUpOrLogin")}
    </Link>
  );
}
