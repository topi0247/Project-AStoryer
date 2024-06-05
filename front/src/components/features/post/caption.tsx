import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";

export default function Caption({
  formProps,
  CAPTION_MAX_LENGTH,
  loading = false,
}: {
  formProps: any;
  CAPTION_MAX_LENGTH: number;
  loading?: boolean;
}) {
  const t_PostGeneral = useTranslations("PostGeneral");
  return (
    <>
      <Mantine.InputLabel>{t_PostGeneral("caption")}</Mantine.InputLabel>
      {loading ? (
        <Mantine.Skeleton height={108} />
      ) : (
        <Mantine.Textarea
          name="caption"
          size="sm"
          radius="xs"
          rows={5}
          maxLength={CAPTION_MAX_LENGTH}
          {...formProps}
        />
      )}
    </>
  );
}
