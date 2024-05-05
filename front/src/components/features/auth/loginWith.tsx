"use client";

import { DiscordIcon, GoogleIcon } from "@/components/ui/iconsButton";
import { useTranslations } from "next-intl";

export default function LoginWith({ state }: { state: string }) {
  const t_Auth = useTranslations("Auth");

  const loginWithGoogle = () => {
    // TODO : Google新規登録処理を書く
  };

  const loginWithDiscord = () => {
    // TODO : Discord新規登録処理を書く
  };

  return (
    <div className="w-full grid grid-cols-1 gap-2 justify-start items-center md:grid-cols-2">
      <GoogleIcon
        onClick={loginWithGoogle}
        message={t_Auth(`${state}WithGoogle`)}
      />
      <DiscordIcon
        onClick={loginWithDiscord}
        message={t_Auth(`${state}WithDiscord`)}
      />
    </div>
  );
}
