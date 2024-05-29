import { Settings } from "@/settings";
import { Button } from "@mantine/core";
import { useLocale } from "next-intl";
import { MdShare } from "rocketicons/md";

export default function ShareButton({
  postUuid,
  title,
}: {
  postUuid: string;
  title: string;
}) {
  const locale = useLocale();
  const handleShare = () => {
    navigator.share({
      title: `${title} | AStoryer - あすとりや -`,
      url: `${Settings.APP_URL}/${locale}/illusts/${postUuid}`,
    });
  };

  return (
    <Button onClick={handleShare} variant="transparent" className="p-0">
      <MdShare className="icon-blue-xl" />
    </Button>
  );
}
