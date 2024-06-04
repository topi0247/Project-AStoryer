import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";

export default function PostTitle({
  formProps,
  TITLE_MAX_LENGTH,
}: {
  formProps: any;
  TITLE_MAX_LENGTH: number;
}) {
  const t_PostGeneral = useTranslations("PostGeneral");
  return (
    <Mantine.TextInput
      withAsterisk
      maxLength={TITLE_MAX_LENGTH}
      label={t_PostGeneral("title")}
      name="title"
      {...formProps}
    />
  );
}
