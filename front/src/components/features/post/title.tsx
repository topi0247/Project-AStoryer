import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";

export default function PostTitle({
  formProps,
  TITLE_MAX_LENGTH,
  loading = false,
}: {
  formProps: any;
  TITLE_MAX_LENGTH: number;
  loading: boolean;
}) {
  const t_PostGeneral = useTranslations("PostGeneral");
  return (
    <>
      <Mantine.InputLabel>{t_PostGeneral("title")}</Mantine.InputLabel>
      {loading ? (
        <Mantine.Skeleton height={35} />
      ) : (
        <Mantine.TextInput
          withAsterisk
          maxLength={TITLE_MAX_LENGTH}
          name="title"
          {...formProps}
        />
      )}
    </>
  );
}
