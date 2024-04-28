"use client";

import { Button } from "@mui/material";
import { InputText } from "@/components/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/lib";
import * as UI from "@/components/ui";
import { RouterPath } from "@/settings";
import { useAuth } from "@/api/auth";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoilState";
import { useState } from "react";

interface IFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login } = useAuth();
  const setUser = useSetRecoilState(userState);
  const router = useRouter();
  const t_Auth = useTranslations("Auth");
  const [error, setError] = useState<string>("");

  const { handleSubmit, control } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const result = await login(data.email, data.password);

    if (result.success && result.user) {
      setUser(result.user);
      router.push(RouterPath.illustIndex);
      return;
    }

    setError(result.message || t_Auth("loginFailed"));
  };

  return (
    <article className="w-full flex flex-col justify-center items-center mb-8">
      <section className="flex flex-col justify-center items-center max-w-[448px] w-full px-8">
        <UI.H2>{t_Auth("login")}</UI.H2>
        <div className="flex flex-col gap-2 justify-center items-center w-full bg-white p-4 px-6 rounded">
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            {error && (
              <div className="bg-red-600 bg-opacity-30 border border-red-600 p-2 rounded text-slate-600">
                <p>{error}</p>
              </div>
            )}
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
            <Button type="submit" variant="outlined">
              {t_Auth("login")}
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
              href="/forgot-password"
              className="underline hover:opacity-50 transition-all"
            >
              {t_Auth("toPasswordReset")}
            </Link>
          </div>
          <div className="w-full relative h-10">
            <div className="border-t border-green-400 w-full text-center overflow-visible absolute top-1/2 left-0" />
            <p className="w-full text-center absolute top-[6px] left-0">
              <span className="bg-white px-6">{t_Auth("or")}</span>
            </p>
          </div>
          <UI.LoginWith state="login" />
        </div>
      </section>
    </article>
  );
}
