"use client";

import * as MantineForm from "@mantine/form";
import * as Mantine from "@mantine/core";
import * as UI from "@/components/ui";
import { Link, Post2API, useRouter } from "@/lib";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { RouterPath } from "@/settings";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoilState";

export default function ForgotPasswordPage() {
  const t_Auth = useTranslations("Auth");
  const t_General = useTranslations("General");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();
  const user = useRecoilValue(userState);

  const form = MantineForm.useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
    validate: {
      email: MantineForm.isEmail("有効なメールアドレスを入力してください"),
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email } = form.getValues();
    try {
      const res = await Post2API("/auth/password", { email });
      if (res.data.success) {
        setModalMessage(t_Auth("sendMail"));
      }
      setModalMessage(res.data.message);
    } catch {
      setModalMessage(t_Auth("sendMailFailed"));
    } finally {
      setModalOpen(true);
    }
  };

  const handleBackHome = () => {
    setModalOpen(false);
    router.push(RouterPath.home);
  };

  return (
    <>
      <article className="w-full flex flex-col justify-center items-center mb-8">
        <section className="flex flex-col justify-center items-center max-w-[448px] w-full px-8">
          <UI.H2>{t_Auth("forgotPassword")}</UI.H2>
          <div className="flex flex-col gap-2 justify-center items-center w-full bg-white p-4 px-6 rounded">
            <p>{t_Auth("forgotPasswordDescription")}</p>
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit}
            >
              <Mantine.TextInput
                withAsterisk
                type="email"
                label={t_Auth("email")}
                autoComplete="email"
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
              <Mantine.Button variant="outlined" type="submit">
                {t_General("send")}
              </Mantine.Button>
            </form>
            {!user.uuid && (
              <div className="text-center text-sm text-blue-500 flex gap-2 flex-col md:flex-row">
                <Link
                  href={RouterPath.signUp}
                  className="underline hover:opacity-50 transition-all"
                >
                  {t_Auth("toSignUp")}
                </Link>
                <Link
                  href={RouterPath.login}
                  className="underline hover:opacity-50 transition-all"
                >
                  {t_Auth("toLogin")}
                </Link>
              </div>
            )}
          </div>
        </section>
      </article>
      <Mantine.Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col gap-4 justify-center items-center mt-4 w-68 m-auto">
          {modalMessage}
          <Mantine.Button variant="outlined" onClick={handleBackHome}>
            {t_General("backHome")}
          </Mantine.Button>
        </div>
      </Mantine.Modal>
    </>
  );
}
