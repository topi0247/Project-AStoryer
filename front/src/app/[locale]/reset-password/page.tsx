"use client";

import * as MantineForm from "@mantine/form";
import * as Mantine from "@mantine/core";
import * as UI from "@/components/ui";
import { useRouter } from "@/lib";
import { useTranslations } from "next-intl";
import { useSetRecoilState } from "recoil";
import * as RecoilState from "@/recoilState";

export default function ResetPasswordPage() {
  const t_Auth = useTranslations("Auth");
  const t_General = useTranslations("General");
  const setModalOpen = useSetRecoilState(RecoilState.modalOpenState);
  const setModalTitle = useSetRecoilState(RecoilState.modalTitleState);
  const router = useRouter();

  const form = MantineForm.useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validate: {
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

  const handleSubmit = async () => {
    const { password, password_confirmation } = form.getValues();
    // TODO : パスワード再設定処理
    setModalOpen(true);
    setModalTitle(t_Auth("resetPasswordSuccess"));
  };

  const handleBackHome = () => {
    setModalOpen(false);
    router.push("/");
  };

  return (
    <>
      <article className="w-full flex flex-col justify-center items-center mb-8">
        <section className="flex flex-col justify-center items-center max-w-[448px] w-full px-8">
          <UI.H2>{t_Auth("resetPassword")}</UI.H2>
          <div className="flex flex-col gap-2 justify-center items-center w-full bg-white p-4 px-6 rounded">
            <p>{t_Auth("resetPasswordDescription")}</p>
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit}
            >
              <Mantine.TextInput
                label={t_Auth("password")}
                type="password"
                autoComplete="new-password"
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
              <Mantine.TextInput
                type="password"
                label={t_Auth("password_confirmation")}
                autoComplete="new-password"
                key={form.key("password_confirmation")}
                {...form.getInputProps("password_confirmation")}
              />
              <Mantine.Button variant="outlined" type="submit">
                {t_Auth("resetting")}
              </Mantine.Button>
            </form>
          </div>
        </section>
      </article>
      <UI.TransitionsModal>
        <div className="flex gap-4 justify-center items-center h-20 mt-4 w-68 m-auto">
          <Mantine.Button variant="outlined" onClick={handleBackHome}>
            {t_General("backHome")}
          </Mantine.Button>
        </div>
      </UI.TransitionsModal>
    </>
  );
}
