"use client";

import { DiscordIcon, GoogleIcon } from "@/components/ui/iconsButton";
import { useAuth } from "@/hook";
import { useTranslations } from "next-intl";

export default function LoginWith({ state }: { state: string }) {
  const t_Auth = useTranslations("Auth");
  const { loginWithGoogle, loginWithDiscord } = useAuth();

  return (
    <div className="w-full grid grid-cols-1 gap-2 justify-start items-center md:grid-cols-2">
      <GoogleIcon
        onClick={() => loginWithGoogle()}
        message={t_Auth(`${state}WithGoogle`)}
      />
      <DiscordIcon
        onClick={() => loginWithDiscord()}
        message={t_Auth(`${state}WithDiscord`)}
      />
    </div>
  );
}
