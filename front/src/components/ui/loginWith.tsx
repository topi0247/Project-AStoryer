import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";
import { DiscordIcon, GoogleIcon } from "./iconsButton";

export default function LoginWith({ state }: { state: string }) {
  const t_Auth = useTranslations("Auth");

  const loginWithGoogle = () => {
    // TODO : Google新規登録処理を書く
  };

  const loginWithDiscord = () => {
    // TODO : Discord新規登録処理を書く
  };

  return (
    // TODO : 上手く表示されないので確認する
    <div className="w-full flex flex-col justify-center items-center md:flex-row gap-4">
      <Button variant="outline" className="gsi-material-button">
        <div className="gsi-material-button-content-wrapper">
          <div className="gsi-material-button-icon">
            <GoogleIcon />
            <span>{t_Auth(`${state}WithGoogle`)}</span>
          </div>
        </div>
      </Button>
      <Button
        variant="outlined"
        onClick={loginWithDiscord}
        color="rgba(120, 120, 120, 1)"
      >
        <DiscordIcon />
        {t_Auth(`${state}WithDiscord`)}
      </Button>
    </div>
  );
}
