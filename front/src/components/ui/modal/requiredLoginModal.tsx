import { useTranslations } from "next-intl";
import * as RecoilState from "@/recoilState";
import { useRouter } from "@/lib";
import { useSetRecoilState } from "recoil";
import { TransitionsModal } from ".";
import { RouterPath } from "@/settings";

export default function RequiredLoginModal() {
  const t_Auth = useTranslations("Auth");
  const router = useRouter();
  const setModalOpen = useSetRecoilState(RecoilState.modalOpenState);

  const handleRequired = (path: string) => {
    setModalOpen(false);
    router.push(path);
  };

  return (
    <TransitionsModal>
      <div className="text-center">{t_Auth("requiredAuth")}</div>
      <div className="flex gap-4 justify-center items-center mt-4 w-68 m-auto">
        <button
          onClick={() => handleRequired(RouterPath.signUp)}
          className="text-blue-300 underline hover:opacity-80 transition-all"
        >
          {t_Auth("toSignUp")}
        </button>
        <button
          onClick={() => handleRequired(RouterPath.login)}
          className="text-blue-300 underline hover:opacity-80 transition-all"
        >
          {t_Auth("toLogin")}
        </button>
      </div>
    </TransitionsModal>
  );
}
