import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

export default function LoginWith() {
  const t_Auth = useTranslations("Auth");

  const loginWithGoogle = () => {
    // TODO : Google新規登録処理を書く
  };

  const loginWithDiscord = () => {
    // TODO : Discord新規登録処理を書く
  };
  return (
    <div className="flex gap-4">
      <Button
        variant="outlined"
        onClick={loginWithGoogle}
        sx={{ textTransform: "none" }}
      >
        {t_Auth("login_with_google")}
      </Button>
      <Button
        variant="outlined"
        onClick={loginWithDiscord}
        sx={{ textTransform: "none" }}
      >
        {t_Auth("login_with_discord")}
      </Button>
    </div>
  );
}
