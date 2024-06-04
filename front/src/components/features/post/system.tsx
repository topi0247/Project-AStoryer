import { GetFromAPI } from "@/lib";
import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";
import useSWR from "swr";

const fetcher = (url: string) => GetFromAPI(url).then((res) => res.data);

export default function System({ formProps }: { formProps: any }) {
  const { data, error } = useSWR("/game_systems", fetcher);
  const t_PostGeneral = useTranslations("PostGeneral");

  if (error) return;

  return (
    <Mantine.Autocomplete
      name="gameSystem"
      label={t_PostGeneral("gameSystem")}
      data={data}
      {...formProps}
    />
  );
}
