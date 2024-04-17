import { Button } from "@mui/material";
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
    <div className="flex flex-col md:flex-row gap-4">
      <Button
        variant="outlined"
        onClick={loginWithGoogle}
        sx={{ textTransform: "none" }}
      >
        {t_Auth(`${state}_with_google`)}
      </Button>
      <Button
        variant="outlined"
        onClick={loginWithDiscord}
        sx={{ textTransform: "none" }}
      >
        {t_Auth(`${state}_with_discord`)}
      </Button>
    </div>
  );
}
