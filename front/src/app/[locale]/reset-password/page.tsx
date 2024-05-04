"use client";

import { InputText } from "@/components/form";
import * as UI from "@/components/ui";
import { useRouter } from "@/lib";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import * as RecoilState from "@/recoilState";

interface IFormInputs {
  password: string;
  passwordConfirmation: string;
}

export default function ResetPasswordPage() {
  const t_Auth = useTranslations("Auth");
  const t_General = useTranslations("General");
  const setModalOpen = useSetRecoilState(RecoilState.modalOpenState);
  const setModalTitle = useSetRecoilState(RecoilState.modalTitleState);
  const router = useRouter();

  const { handleSubmit, control, getValues } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
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
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                name="username"
                style={{ display: "none" }}
                autoComplete="username"
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
              <Button type="submit" variant="outlined">
                {t_Auth("resetting")}
              </Button>
            </form>
          </div>
        </section>
      </article>
      <UI.TransitionsModal>
        <div className="flex gap-4 justify-center items-center h-20 mt-4 w-68 m-auto">
          <Button type="submit" variant="outlined" onClick={handleBackHome}>
            {t_General("backHome")}
          </Button>
        </div>
      </UI.TransitionsModal>
    </>
  );
}
