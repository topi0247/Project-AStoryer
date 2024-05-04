"use client";

import * as MantineForm from "@mantine/form";
import * as Mantine from "@mantine/core";
import * as UI from "@/components/ui";
import { Link, useRouter } from "@/lib";
import { useTranslations } from "next-intl";
import { useSetRecoilState } from "recoil";
import * as RecoilState from "@/recoilState";

interface IFormInputs {
  email: string;
}

export default function ForgotPasswordPage() {
  const t_Auth = useTranslations("Auth");
  const t_General = useTranslations("General");
  const setModalOpen = useSetRecoilState(RecoilState.modalOpenState);
  const setModalTitle = useSetRecoilState(RecoilState.modalTitleState);
  const router = useRouter();

  const form = MantineForm.useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
    validate: {
      email: MantineForm.isEmail("有効なメールアドレスを入力してください"),
    },
  });

  const handleSubmit = async () => {
    const { email } = form.getValues();
    // TODO : パスワード再設定の申請用処理
    setModalOpen(true);
    setModalTitle(t_Auth("sendMail"));
  };

  const handleBackHome = () => {
    setModalOpen(false);
    router.push("/");
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
      <UI.TransitionsModal>
        <div className="text-center">{t_Auth("sensMailDescription")}</div>
        <div className="flex gap-4 justify-center items-center mt-4 w-68 m-auto">
          <Mantine.Button
            type="submit"
            variant="outlined"
            onClick={handleBackHome}
          >
            {t_General("backHome")}
          </Mantine.Button>
        </div>
      </UI.TransitionsModal>
    </>
  );
}
