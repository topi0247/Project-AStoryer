"use client";

import * as MantineForm from "@mantine/form";
import * as Mantine from "@mantine/core";
import * as UI from "@/components/ui";
import { Put2API, useRouter } from "@/lib";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useAuth } from "@/hook";
import { RouterPath } from "@/settings";

export default function ResetPasswordPage() {
  const { setAccessTokens } = useAuth();
  const t_Auth = useTranslations("Auth");
  const t_General = useTranslations("General");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("reset_password") !== "true") {
        router.push(RouterPath.home);
        return;
      }

      const accessToken = params.get("token");
      const uid = params.get("uid");
      const client = params.get("client");
      const expiry = params.get("expiry");
      const isToken = accessToken && uid && client && expiry;
      if (isToken) {
        setAccessTokens(accessToken, client, uid, expiry);
      }
    };
    fetchData();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, password_confirmation } = form.getValues();

    try {
      const res = await Put2API("/auth/password", {
        password,
        password_confirmation,
      });
      if (res.status !== 200) throw new Error();
      if (res.data.success) {
        const accessToken = res.headers["access-token"];
        const client = res.headers.client;
        const uid = res.headers.uid;
        const expiry = res.headers.expiry;
        if (accessToken && client && uid && expiry) {
          setAccessTokens(accessToken, client, uid, expiry);
        }
      }
      setModalMessage(res.data.message);
    } catch {
      setModalMessage(t_Auth("resetPasswordFailed"));
      return;
    } finally {
      setModalOpen(true);
    }
  };

  const handleLogin = () => {
    setModalOpen(false);
    router.push(RouterPath.login);
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
      <Mantine.Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col gap-4 justify-center items-center mt-4 w-68 m-auto">
          {modalMessage}
          <Mantine.Button variant="outlined" onClick={handleLogin}>
            {t_General("backHome")}
          </Mantine.Button>
        </div>
      </Mantine.Modal>
    </>
  );
}
