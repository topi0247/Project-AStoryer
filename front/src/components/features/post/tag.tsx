"use client";

import { Dispatch, SetStateAction } from "react";
import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";
import { GetFromAPI } from "@/lib";
import useSWR from "swr";

const fetcher = (url: string) => GetFromAPI(url).then((res) => res.data);

export default function Tag({
  onChange,
  value,
}: {
  onChange: Dispatch<SetStateAction<string[]>>;
  value: string[];
}) {
  const { data, error } = useSWR("/tags", fetcher);
  const t_PostGeneral = useTranslations("PostGeneral");

  if (error) return;

  return (
    <>
      <Mantine.InputLabel>{t_PostGeneral("tag")}</Mantine.InputLabel>
      {data === undefined ? (
        <Mantine.Skeleton height={35} />
      ) : (
        <Mantine.TagsInput
          name="tags"
          splitChars={[" ", "|"]}
          data={data}
          onChange={onChange}
          value={value}
        />
      )}
    </>
  );
}
