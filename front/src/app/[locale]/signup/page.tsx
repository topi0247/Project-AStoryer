"use client";

import { Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Link } from "@/lib";
import { InputText } from "@/components/form";
import * as UI from "@/components/ui";

interface IFormInputs {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignUpPage() {
  const t_Auth = useTranslations("Auth");

  const { handleSubmit, control, getValues } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    // TODO : 新規登録処理を書く
  };

  return (
    <article className="w-full flex flex-col justify-center items-center mb-8">
      <section className="flex flex-col justify-center items-center max-w-[448px] w-full px-8">
        <UI.H2>{t_Auth("signup")}</UI.H2>
        <div className="flex flex-col gap-2 justify-center items-center w-full bg-white p-4 px-6 rounded">
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputText
              control={control}
              name="name"
              label={t_Auth("name")}
              rules={{
                required: { value: true, message: t_Auth("required") },
              }}
              autoComplete="name"
            />
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
            <InputText
              control={control}
              name="password"
              label={t_Auth("password")}
              type="password"
              rules={{
                required: { value: true, message: t_Auth("required") },
                minLength: {
                  value: 6,
                  message: t_Auth("invalidPassword"),
                },
              }}
              autoComplete="new-password"
            />
            <InputText
              control={control}
              name="passwordConfirmation"
              label={t_Auth("password_confirmation")}
              type="password"
              rules={{
                required: { value: true, message: t_Auth("required") },
                validate: (value: string) =>
                  value === getValues("password") ||
                  t_Auth("invalidPasswordConfirmation"),
                minLength: {
                  value: 6,
                  message: t_Auth("invalidPassword"),
                },
              }}
              autoComplete="new-password"
            />
            <Button variant="outlined" type="submit">
              {t_Auth("signup")}
            </Button>
          </form>
          <div className="text-center">
            <Link
              href="/login"
              className="text-center text-sm text-blue-500 underline hover:opacity-50 transition-all"
            >
              {t_Auth("toLogin")}
            </Link>
          </div>
          <div className="w-full relative h-10">
            <div className="border-t border-green-400 w-full text-center overflow-visible absolute top-1/2 left-0" />
            <p className="w-full text-center absolute top-[6px] left-0">
              <span className="bg-white px-6">{t_Auth("or")}</span>
            </p>
          </div>
          <UI.LoginWith state="signup" />
        </div>
      </section>
    </article>
  );
}
