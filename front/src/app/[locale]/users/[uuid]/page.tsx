"use client";

import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";
import * as Users from "@/components/features/users";
import { GetFromAPI, useRouter } from "@/lib";
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import { RouterPath } from "@/settings";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoilState";
import { Tab } from "@/types";
import { useSearchParams } from "next/navigation";

const fetcher = (url: string) => GetFromAPI(url).then((res) => res.data);

interface UserProfile {
  uuid: string;
  name: string;
  headerImage: string;
  avatar: string;
  links: {
    twitter: string;
    pixiv: string;
    fusetter: string;
    privatter: string;
    other: string;
  };
  profile: string;
}

export default function UserPage({ params }: { params: { uuid: string } }) {
  const { uuid } = params;
  const t_UserPage = useTranslations("UserPage");
  const { data, error } = useSWR(`/users/${uuid}`, fetcher);
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const user = useRecoilValue(userState);
  const tabType = useRef<Tab>(Tab.post);
  const url = useRef<string>(`/users/${uuid}/postsIllust`);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (error) {
      if (error.response.status === 404) {
        router.push(RouterPath.notFound);
      } else {
        router.push(RouterPath.error);
      }
      return;
    }
  }, [error]);

  useEffect(() => {
    if (!data) return;
    setUserProfile({
      uuid: data.uuid,
      name: data.name,
      headerImage: data.header_image,
      avatar: data.avatar,
      links: data.links,
      profile: data.profile,
    });
  }, [data]);

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
    setUrl(newUrl);
  }, []);

  useEffect(() => {
    if (!searchParams.get("tab")) {
      setTabType(Tab.post);
      setUrl(`/users/${uuid}/postsIllust`);
      return;
    }
    switch (searchParams.get("tab")) {
      case "bookmark":
        setTabType(Tab.bookmark);
        setUrl(`/users/${uuid}/bookmarks`);
        break;
      case "following":
        setTabType(Tab.following);
        setUrl(`/users/${uuid}/following`);
        break;
      case "follower":
        setTabType(Tab.follower);
        setUrl(`/users/${uuid}/follower`);
        break;
      default:
        setTabType(Tab.post);
        setUrl(`/users/${uuid}/postsIllust`);
        break;
    }
  }, [searchParams]);

  const setTabType = (tab: Tab) => {
    tabType.current = tab;
  };

  const setUrl = (newUrl: string) => {
    url.current = newUrl;
  };

  const handleTabChange = (tab: Tab) => {
    switch (tab) {
      case Tab.post:
        setTabType(Tab.post);
        setUrl(`/users/${uuid}/postsIllust`);
        router.push(RouterPath.users(uuid), { scroll: false });
        break;
      case Tab.bookmark:
        setTabType(Tab.bookmark);
        setUrl(`/users/${uuid}/bookmarks`);
        router.push(RouterPath.bookmark(uuid), { scroll: false });
        break;
      case Tab.following:
        setTabType(Tab.following);
        setUrl(`/users/${uuid}/following`);
        router.push(RouterPath.following(uuid), { scroll: false });
        break;
      case Tab.follower:
        setTabType(Tab.follower);
        setUrl(`/users/${uuid}/follower`);
        router.push(RouterPath.follower(uuid), { scroll: false });
        break;
      default:
        setTabType(Tab.post);
        setUrl(`/users/${uuid}/postsIllust`);
        router.push(RouterPath.users(uuid), { scroll: false });
        break;
    }
  };

  return (
    <>
      <article className="w-full relative mb-8">
        <section className="w-full h-full relative z-0">
          {/* ヘッダー画像 */}
          <div className="absolute top-0 left-0 w-full h-[180px] md:h-[300px] -z-10">
            {userProfile ? (
              userProfile.headerImage ? (
                <Mantine.Image
                  src={userProfile.headerImage}
                  alt={t_UserPage("headerImage")}
                  className="object-cover h-full w-full"
                />
              ) : (
                <div className="w-full h-full bg-slate-400"></div>
              )
            ) : (
              <Mantine.Skeleton height={300} className="w-full h-full" />
            )}
          </div>

          {/* ユーザー情報 */}
          <div className="w-full pt-[140px] md:pt-[240px] px-4 m-auto md:container">
            <div className="flex flex-col justify-center items-center w-full">
              <div className="w-full relative flex md:gap-3 md:mb-8">
                {userProfile ? (
                  <Mantine.Avatar
                    variant="default"
                    size={150}
                    alt={t_UserPage("avatar")}
                    src={userProfile.avatar}
                  />
                ) : (
                  <Mantine.Skeleton width={150} height={130} radius="100%" />
                )}
                <div className="w-full flex flex-col justify-start items-end md:items-start md:justify-start md:relative">
                  {/* ユーザー編集 */}
                  {userProfile?.uuid === user.uuid && (
                    <Users.UserEdit userProfile={userProfile} />
                  )}
                  <div className="hidden md:block md:h-1/3">
                    {userProfile ? (
                      <h2 className="text-3xl">
                        <span className="pb-2 border-b-2 border-green-300 px-1 pr-3">
                          {userProfile.name}
                        </span>
                      </h2>
                    ) : (
                      <Mantine.Skeleton width={200} height={35} />
                    )}
                  </div>
                  {userProfile ? (
                    <>
                      {userProfile.links && (
                        <ul className="flex justify-start items-center mt-auto ml-2 flex-wrap gap-2 md:h-2/3">
                          {userProfile.links.twitter && (
                            <li>
                              <a
                                href={`https://x.com/${userProfile.links.twitter}`}
                                className="text-white bg-black hover:bg-gray-600 transition-all px-2 py-1 rounded text-sm"
                                target="_blank"
                              >
                                X
                              </a>
                            </li>
                          )}
                          {userProfile.links.pixiv && (
                            <li>
                              <a
                                href={`https://www.pixiv.net/users/${userProfile.links.pixiv}`}
                                className="text-white bg-sky-400 transition-all hover:bg-sky-700 px-2 py-1 rounded text-sm"
                                target="_blank"
                              >
                                pixiv
                              </a>
                            </li>
                          )}
                          {userProfile.links.fusetter && (
                            <li>
                              <a
                                href={`https://fusetter.com/u/${userProfile.links.fusetter}`}
                                className="text-white bg-orange-500 bg-opacity-80 hover:bg-orange-800 transition-all px-2 py-1 rounded text-sm"
                                target="_blank"
                              >
                                {t_UserPage("fusetter")}
                              </a>
                            </li>
                          )}
                          {userProfile.links.privatter && (
                            <li>
                              <a
                                href={`https://privatter.net/u/${userProfile.links.privatter}`}
                                className="text-white bg-sky-500 transition-all hover:bg-sky-700 px-2 py-1 rounded text-sm"
                                target="_blank"
                              >
                                privatter
                              </a>
                            </li>
                          )}
                          {userProfile.links.other && (
                            <li>
                              <a
                                href={userProfile.links.other}
                                className="text-white bg-indigo-400 transition-all hover:bg-indigo-700 px-2 py-1 rounded text-sm"
                                target="_blank"
                              >
                                {t_UserPage("other")}
                              </a>
                            </li>
                          )}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Mantine.Skeleton height={35} />
                  )}
                </div>
              </div>

              {/* SP */}
              {userProfile ? (
                <h3 className="text-xl font-semibold my-4 md:hidden">
                  {userProfile.name}
                </h3>
              ) : (
                <Mantine.Skeleton height={25} />
              )}

              {/* profile */}
              {userProfile ? (
                <Users.Profile profileText={userProfile.profile} />
              ) : (
                <Mantine.Skeleton height={100} />
              )}
            </div>
          </div>
        </section>
      </article>

      {/* タブ */}
      <article className="mx-2 md:container md:m-auto md:mb-8">
        <Users.UserTabs
          userUuid={uuid}
          tabType={tabType.current}
          handleTabChange={handleTabChange}
        />
      </article>

      {/* イラスト一覧 */}
      {(tabType.current === Tab.post || tabType.current === Tab.bookmark) && (
        <article className="mb-16">
          <Users.IllustIndex url={url.current} />
        </article>
      )}
      {/* フォロー・フォロワー一覧 */}
      {(tabType.current === Tab.following ||
        tabType.current === Tab.follower) && (
        <article className="mb-16">
          <Users.FollowIndex url={url.current} userUuid={uuid} />
        </article>
      )}
    </>
  );
}
