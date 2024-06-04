import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";

export default function DraftModal({ onClick }: { onClick: () => void }) {
  const t_PostGeneral = useTranslations("PostGeneral");
  return (
    <>
      <h3 className="text-xl text-center my-4">
        {t_PostGeneral("draftSaved")}
      </h3>
      <Mantine.Group justify="center" gap={8}>
        <>
          <Mantine.Button className="bg-green-300 text-black" onClick={onClick}>
            {t_PostGeneral("close")}
          </Mantine.Button>
        </>
      </Mantine.Group>
    </>
  );
}
