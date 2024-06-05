"use client";

import { IndexIllustData } from "@/types";
import * as Users from ".";
import { Illust } from "@/components/features/illusts";
import { GetFromAPI } from "@/lib";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { Skeleton } from "@mantine/core";

const fetcher = (url: string) => GetFromAPI(url).then((res) => res.data);

export default function IllustIndex({ uuid }: { uuid: string }) {
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(`/users/${uuid}/postsIllust`);
  const [illusts, setIllusts] = useState<IndexIllustData[]>([]);
  const [search, setSearch] = useState<string>("");
  const { data, error } = useSWR(url, fetcher);

  useEffect(() => {
    setSearch(window.location.search);
  }, []);

  useEffect(() => {
    if (
      (isBookmark && search === "?tab=bookmark") ||
      (!isBookmark && search === "")
    )
      return;
    setIsBookmark(search === "?tab=bookmark");
    setUrl(
      search === "?tab=bookmark"
        ? `/users/${uuid}/bookmarks`
        : `/users/${uuid}/postsIllust`
    );
  }, [uuid, search]);

  useEffect(() => {
    setUrl(
      isBookmark ? `/users/${uuid}/bookmarks` : `/users/${uuid}/postsIllust`
    );
  }, [isBookmark, uuid]);

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

  if (error) return <div>failed to load</div>;

  return (
    <>
      <section id="tabs" className="mx-2 md:container md:m-auto md:mb-8">
        <Users.UserTabs
          userUuid={uuid}
          isBookmark={isBookmark}
          setIsBookmark={setIsBookmark}
        />
      </section>
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
