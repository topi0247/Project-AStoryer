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
  const { data: Tags, error: errorTags } = useSWR("/tags", fetcher);
  const t_PostGeneral = useTranslations("PostGeneral");

  if (errorTags) return;

  return (
    <Mantine.TagsInput
      name="tags"
      label={t_PostGeneral("tag")}
      splitChars={[" ", "|"]}
      data={Tags}
      onChange={onChange}
      value={value}
    />
  );
}
