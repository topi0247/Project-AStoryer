import { IPublicState } from "@/types";
import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";

export default function PublishState({
  formProps,
  loading = false,
}: {
  formProps: any;
  loading?: boolean;
}) {
  const t_PostGeneral = useTranslations("PostGeneral");
  return (
    <>
      <Mantine.InputLabel>{t_PostGeneral("publishRange")}</Mantine.InputLabel>
      {loading ? (
        <Mantine.Skeleton height={35} />
      ) : (
        <>
          <Mantine.Radio.Group name="publishRange" withAsterisk {...formProps}>
            <Mantine.Group>
              <Mantine.Radio
                label={t_PostGeneral("allPublish")}
                value={IPublicState.All}
                style={{ cursor: "pointer" }}
              />
              <Mantine.Radio
                label={t_PostGeneral("urlPublish")}
                value={IPublicState.URL}
                style={{ cursor: "pointer" }}
              />
              {/* <Mantine.Radio
          label={t_PostGeneral("followerPublish")}
                      value={IPublicState.Follower}
                      style={{ cursor: "pointer" }}
                    /> */}
              <Mantine.Radio
                label={t_PostGeneral("private")}
                value={IPublicState.Private}
                style={{ cursor: "pointer" }}
              />
            </Mantine.Group>
          </Mantine.Radio.Group>
        </>
      )}
      <p className="text-sm my-4">{t_PostGeneral("publishAttention")}</p>
    </>
  );
}
