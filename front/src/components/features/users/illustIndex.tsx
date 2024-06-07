"use client";

import { IndexIllustData, Tab } from "@/types";
import { Illust } from "@/components/features/illusts";
import { GetFromAPI } from "@/lib";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { Skeleton } from "@mantine/core";

const fetcher = (url: string) => GetFromAPI(url).then((res) => res.data);

export default function IllustIndex({
  uuid,
  url,
}: {
  uuid: string;
  url: string;
}) {
  const [illusts, setIllusts] = useState<IndexIllustData[]>([]);
  const { data, error } = useSWR(url, fetcher);

  useEffect(() => {
    if (!data) return;
    setIllusts(
      data.map(
        (illust: {
          uuid: string;
          title: string;
          data: string;
          publish_state?: string;
        }) => {
          return {
            uuid: illust.uuid,
            title: illust.title,
            image: illust.data,
            publishRange: illust.publish_state ?? null,
          };
        }
      )
    );
  }, [data]);

  return (
    <>
      <section className="container my-2 m-auto">
        <div className="grid grid-cols-2 md:mx-auto md:grid-cols-4 mx-2 gap-1">
          {data
            ? illusts.map((illust: IndexIllustData) => (
                <div key={illust.uuid}>
                  <Illust illust={illust} />
                </div>
              ))
            : Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} height={300} width={300} />
              ))}
        </div>
      </section>
      {/* TODO : スタート時は投稿数が少ないことからページネーションは後で実装 */}
      {/* <section className="mt-4">
          <UI.Pagination elementName="#tabs" adjust={-20} />
        </section> */}
    </>
  );
}
