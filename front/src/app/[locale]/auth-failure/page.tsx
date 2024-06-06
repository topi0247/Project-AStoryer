import { Link } from "@/lib";
import { RouterPath } from "@/settings";
import { useTranslations } from "next-intl";

export default function AuthFailurePage() {
  const t_Auth = useTranslations("Auth");
  return (
    <article className="w-full flex flex-col justify-center items-center mb-8">
      <section className="my-8 flex flex-col justify-center items-center max-w-[448px] w-full px-8 bg-white rounded text-center min-h-32 gap-8">
        <p>{t_Auth("authFailed")}</p>
        <div className="flex flex-col gap-2 md:flex-row">
          <Link
            href={RouterPath.login}
            className="text-blue-400 underline hover:text-blue-200 transition-all"
          >
            {t_Auth("toSignUp")}
          </Link>
          <Link
            href={RouterPath.login}
            className="text-blue-400 underline hover:text-blue-200 transition-all"
          >
            {t_Auth("toLogin")}
          </Link>
        </div>
      </section>
    </article>
  );
}
