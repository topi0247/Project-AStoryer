"use client";

import { IndexIllustData, Tab } from "@/types";
import * as Users from ".";
import { Illust } from "@/components/features/illusts";
import { GetFromAPI, useRouter } from "@/lib";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { Skeleton } from "@mantine/core";
import { RouterPath } from "@/settings";

const fetcher = (url: string) => GetFromAPI(url).then((res) => res.data);

export default function IllustIndex({ uuid }: { uuid: string }) {
  const [tabType, setTabType] = useState<Tab>(Tab.post);
  const [url, setUrl] = useState<string>(`/users/${uuid}/postsIllust`);
  const [illusts, setIllusts] = useState<IndexIllustData[]>([]);
  const { data, error } = useSWR(url, fetcher);
  const router = useRouter();

  useEffect(() => {
    let newUrl = "";
    switch (window.location.search) {
      case "?tab=bookmark":
        setTabType(Tab.bookmark);
        newUrl = `/users/${uuid}/bookmarks`;
        break;
      case "?tab=following":
        setTabType(Tab.following);
        newUrl = `/users/${uuid}/following`;
        break;
      case "?tab=follower":
        setTabType(Tab.follower);
        newUrl = `/users/${uuid}/follower`;
        break;
      default:
        setTabType(Tab.post);
        newUrl = `/users/${uuid}/postsIllust`;
        break;
    }
  }, []);

  useEffect(() => {
    let newUrl = "";
    switch (tabType) {
      case Tab.bookmark:
        setTabType(Tab.bookmark);
        newUrl = `/users/${uuid}/bookmarks`;
        break;
      case Tab.following:
        setTabType(Tab.following);
        newUrl = `/users/${uuid}/following`;
        break;
      case Tab.follower:
        setTabType(Tab.follower);
        newUrl = `/users/${uuid}/follower`;
        break;
      default:
        setTabType(Tab.post);
        newUrl = `/users/${uuid}/postsIllust`;
        break;
    }

    setUrl(newUrl);
  }, [uuid, tabType]);

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

  const handleTabChange = (tab: Tab) => {
    switch (tab) {
      case Tab.bookmark:
        setTabType(Tab.bookmark);
        setUrl(`/users/${uuid}/bookmarks`);
        router.push(RouterPath.bookmark(uuid));
        break;
      case Tab.following:
        setTabType(Tab.following);
        setUrl(`/users/${uuid}/following`);
        router.push(RouterPath.following(uuid));
        break;
      case Tab.follower:
        setTabType(Tab.follower);
        setUrl(`/users/${uuid}/follower`);
        router.push(RouterPath.follower(uuid));
        break;
      default:
        setTabType(Tab.post);
        setUrl(`/users/${uuid}/postsIllust`);
        router.push(RouterPath.users(uuid));
        break;
    }
  };

  return (
    <>
      <section id="tabs" className="mx-2 md:container md:m-auto md:mb-8">
        <Users.UserTabs
          userUuid={uuid}
          tabType={tabType}
          handleTabChange={handleTabChange}
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
