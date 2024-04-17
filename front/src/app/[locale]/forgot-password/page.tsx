"use client";

import { InputText } from "@/components/form";
import * as UI from "@/components/ui";
import { Link } from "@/lib";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInputs {
  email: string;
}

export default function ForgotPasswordPage() {
  const t_Auth = useTranslations("Auth");
  const t_General = useTranslations("General");

  const { handleSubmit, control } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    // TODO : パスワード再設定の申請用処理
  };

  return (
    <article className="w-full flex flex-col justify-center items-center mb-8">
      <section className="flex flex-col justify-center items-center max-w-[448px] w-full px-8">
        <UI.H2>{t_Auth("forgotPassword")}</UI.H2>
        <div className="flex flex-col gap-2 justify-center items-center w-full bg-white p-4 px-6 rounded">
          <p>{t_Auth("forgotPasswordDescription")}</p>
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputText
              control={control}
              name="email"
              label={t_Auth("email")}
              rules={{
                required: { value: true, message: t_Auth("required") },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: t_Auth("invalidEmail"),
                },
              }}
              autoComplete="email"
            />
            <Button type="submit" variant="outlined">
              {t_General("send")}
            </Button>
          </form>
          <div className="text-center text-sm text-blue-500 flex gap-2 flex-col md:flex-row">
            <Link
              href="/signup"
              className="underline hover:opacity-50 transition-all"
            >
              {t_Auth("toSignUp")}
            </Link>
            <Link
              href="/login"
              className="underline hover:opacity-50 transition-all"
            >
              {t_Auth("toLogin")}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
