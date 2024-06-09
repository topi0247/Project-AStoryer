"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/lib";
import * as MantineForm from "@mantine/form";
import * as Mantine from "@mantine/core";
import * as UI from "@/components/ui";
import { useAuth } from "@/hook";
import { RouterPath } from "@/settings";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoilState";
import { useState } from "react";
import { LoginWith } from "@/components/features/auth";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const t_Auth = useTranslations("Auth");
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const [error, setError] = useState<string>("");

  const form = MantineForm.useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validate: {
      name: MantineForm.isNotEmpty("名前を入力してください"),
      email: MantineForm.isEmail("有効なメールアドレスを入力してください"),
      password: MantineForm.hasLength(
        { min: 6 },
        "パスワードは6文字以上で入力してください"
      ),
      password_confirmation: MantineForm.matchesField(
        "password",
        "パスワードが一致しません"
      ),
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, password_confirmation } = form.getValues();
    const result = await signUp(name, email, password, password_confirmation);

    if (result.success && result.user) {
      setUser(result.user);
      router.push(RouterPath.illustIndex);
      return;
    }

    setError(result.message || t_Auth("signupFailed"));
  };

  return (
    <article className="w-full flex flex-col justify-center items-center mb-8">
      <section className="flex flex-col justify-center items-center max-w-[448px] w-full px-8">
        <UI.H2>{t_Auth("signup")}</UI.H2>
        <div className="flex flex-col gap-2 justify-center items-center w-full bg-white p-4 px-6 rounded">
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-600 bg-opacity-30 border border-red-600 p-2 rounded text-slate-600">
                <p>{error}</p>
              </div>
            )}
            <Mantine.TextInput
              withAsterisk
              label={t_Auth("name")}
              autoComplete="name"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            <Mantine.TextInput
              withAsterisk
              label={t_Auth("email")}
              autoComplete="email"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <Mantine.TextInput
              withAsterisk
              label={t_Auth("password")}
              type="password"
              autoComplete="new-password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            <Mantine.TextInput
              withAsterisk
              type="password"
              label={t_Auth("password_confirmation")}
              autoComplete="new-password"
              key={form.key("password_confirmation")}
              {...form.getInputProps("password_confirmation")}
            />
            <Mantine.Button variant="outlined" type="submit">
              {t_Auth("signup")}
            </Mantine.Button>
          </form>
          <div className="text-center">
            <Link
              href={RouterPath.login}
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
          <LoginWith state="signup" />
        </div>
      </section>
    </article>
  );
}
