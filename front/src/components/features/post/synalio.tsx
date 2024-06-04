import { GetFromAPI } from "@/lib";
import useSWR from "swr";
import { useTranslations } from "next-intl";
import * as Mantine from "@mantine/core";

const fetcher = (url: string) => GetFromAPI(url).then((res) => res.data);

export default function Synalio({ formProps }: { formProps: any }) {
  const { data, error } = useSWR("/synalios", fetcher);
  const t_PostGeneral = useTranslations("PostGeneral");
  if (error) return;

  return (
    <Mantine.Autocomplete
      name="synalioTitle"
      label={t_PostGeneral("synalioTitle")}
      data={data}
      {...formProps}
    />
  );
}
