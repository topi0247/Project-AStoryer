import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";

export default function Caption({
  formProps,
  CAPTION_MAX_LENGTH,
}: {
  formProps: any;
  CAPTION_MAX_LENGTH: number;
}) {
  const t_PostGeneral = useTranslations("PostGeneral");
  return (
    <Mantine.Textarea
      name="caption"
      label={t_PostGeneral("caption")}
      size="sm"
      radius="xs"
      rows={5}
      maxLength={CAPTION_MAX_LENGTH}
      {...formProps}
    />
  );
}
