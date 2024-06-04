import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";
import { XShare } from ".";

export default function PostModal({
  onClick,
  postUuid,
  title,
}: {
  onClick: () => void;
  postUuid: string;
  title: string;
}) {
  const t_PostGeneral = useTranslations("PostGeneral");
  return (
    <>
      <h3 className="text-xl text-center my-4">{t_PostGeneral("posted")}</h3>
      <Mantine.Group justify="center" gap={8}>
        <>
          <Mantine.Button className="bg-green-300 text-black" onClick={onClick}>
            {t_PostGeneral("showPost")}
          </Mantine.Button>
          <XShare postUuid={postUuid} title={title} />
        </>
      </Mantine.Group>
    </>
  );
}
