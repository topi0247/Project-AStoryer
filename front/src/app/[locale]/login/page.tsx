"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/lib";
import * as MantineForm from "@mantine/form";
import * as Mantine from "@mantine/core";
import * as UI from "@/components/ui";
import { RouterPath } from "@/settings";
import { useAuth } from "@/api/auth";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoilState";
import { useState } from "react";
import { LoginWith } from "@/components/features/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const setUser = useSetRecoilState(userState);
  const router = useRouter();
  const t_Auth = useTranslations("Auth");
  const [error, setError] = useState<string>("");

  const form = MantineForm.useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: MantineForm.isEmail("有効なメールアドレスを入力してください"),
      password: MantineForm.isNotEmpty("パスワードを入力してください"),
    },
  });

  const handleSubmit = async () => {
    const { email, password } = form.getValues();
    const result = await login(email, password);

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
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-600 bg-opacity-30 border border-red-600 p-2 rounded text-slate-600">
                <p>{error}</p>
              </div>
            )}
            <Mantine.TextInput
              withAsterisk
              type="email"
              label={t_Auth("email")}
              autoComplete="email"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <Mantine.TextInput
              label={t_Auth("password")}
              type="password"
              autoComplete="current-password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            <Mantine.Button variant="outlined" type="submit">
              {t_Auth("login")}
            </Mantine.Button>
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
          <LoginWith />
        </div>
      </section>
    </article>
  );
}
