"use client";
import { Settings } from "@/settings";
import { Button } from "@mantine/core";
import { useLocale, useTranslations } from "next-intl";

export default function XShare({
  postUuid,
  title,
}: {
  postUuid: string;
  title: string;
}) {
  const t_PostGeneral = useTranslations("PostGeneral");
  const locale = useLocale();

  const share_url = `${Settings.APP_URL}/${locale}/${postUuid}`;

  const handleXShare = () => {
    const left = (window.screen.width - 500) / 2;
    const top = (window.screen.height - 500) / 2;
    let params = `status=no,location=no,
width=700,height=500,left=${left},top=${top}`;
    window.open(
      `https://twitter.com/intent/tweet?url=${share_url}&text=「${title}」を投稿しました&hashtags=AStoryer`,
      "AStoryer - あすとりや - XShare Window",
      params
    );
  };

  return (
    <Button
      onClick={handleXShare}
      className="bg-black text-white transition-all hover:bg-gray-500"
    >
      {t_PostGeneral("XShare")}
    </Button>
  );
}
