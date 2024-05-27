"use client";

import * as Mantine from "@mantine/core";
import { IndexIllustData } from "@/types";
import { Illust } from "@/components/features/illusts";
import { useTranslations } from "next-intl";
import * as Users from "@/components/features/users";
import { GetFromAPI } from "@/lib";
import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoilState";

const fetcher = (url: string) => GetFromAPI(url).then((res) => res.data);

export default function UserPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const t_UserPage = useTranslations("UserPage");
  const { data, error } = useSWR(`/users/${id}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const userProfile = {
    id: data.id,
    name: data.name,
    headerImage: data.header_image,
    avatar: data.avatar,
    link: {
      twitter: "",
      pixiv: "",
      fusetter: "",
      privatter: "",
      other: "",
    },
    profile: data.profile,
  };

  const illusts = data.posts.map(
    (illust: {
      id: string;
      title: string;
      data: string;
      publish_state?: string;
    }) => {
      return {
        id: illust.id,
        title: illust.title,
        image: illust.data,
        publishRange: illust.publish_state ?? null,
      };
    }
  );

  return (
    <>
      <article className="w-full relative mb-8">
        <section className="w-full h-full relative z-0">
          {/* ヘッダー画像 */}
          <div className="absolute top-0 left-0 w-full h-[180px] md:h-[300px] -z-10">
            {userProfile.headerImage ? (
              <Mantine.Image
                src={userProfile.headerImage}
                alt={t_UserPage("headerImage")}
                className="object-cover h-full w-full"
              />
            ) : (
              <div className="w-full h-full bg-slate-400"></div>
            )}
          </div>

          {/* ユーザー情報 */}
          <div className="w-full pt-[140px] md:pt-[240px] px-4 m-auto md:container">
            <div className="flex flex-col justify-center items-center w-full">
              <div className="w-full relative flex md:gap-3 md:mb-8">
                <Mantine.Avatar
                  variant="default"
                  size={150}
                  alt={t_UserPage("avatar")}
                  src={userProfile.avatar}
                />

                <div className="w-full flex flex-col justify-start items-end md:items-start md:justify-start md:relative">
                  {/* ユーザー編集 */}
                  {/* {userProfile.id === user.id && (
                    <Users.UserEdit userProfile={userProfile} />
                  )} */}
                  <div className="hidden md:block md:h-1/3">
                    <h2 className="text-3xl">
                      <span className="pb-2 border-b-2 border-green-300 px-1 pr-3">
                        {userProfile.name}
                      </span>
                    </h2>
                  </div>
                  {userProfile.link && (
                    <ul className="flex justify-start items-center mt-auto ml-2 flex-wrap gap-2 md:h-2/3">
                      {userProfile.link.twitter && (
                        <li>
                          <a
                            href="#"
                            className="text-white bg-black hover:bg-gray-600 transition-all px-2 py-1 rounded text-sm"
                            target="_blank"
                          >
                            X
                          </a>
                        </li>
                      )}
                      {userProfile.link.pixiv && (
                        <li>
                          <a
                            href="#"
                            className="text-white bg-sky-400 transition-all hover:bg-sky-700 px-2 py-1 rounded text-sm"
                            target="_blank"
                          >
                            pixiv
                          </a>
                        </li>
                      )}
                      {userProfile.link.fusetter && (
                        <li>
                          <a
                            href="#"
                            className="text-white bg-orange-500 bg-opacity-80 hover:bg-orange-800 transition-all px-2 py-1 rounded text-sm"
                            target="_blank"
                          >
                            {t_UserPage("fusetter")}
                          </a>
                        </li>
                      )}
                      {userProfile.link.privatter && (
                        <li>
                          <a
                            href="#"
                            className="text-white bg-sky-500 transition-all hover:bg-sky-700 px-2 py-1 rounded text-sm"
                            target="_blank"
                          >
                            privatter
                          </a>
                        </li>
                      )}
                      {userProfile.link.other && (
                        <li>
                          <a
                            href="#"
                            className="text-white bg-indigo-400 transition-all hover:bg-indigo-700 px-2 py-1 rounded text-sm"
                            target="_blank"
                          >
                            {t_UserPage("other")}
                          </a>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>

              {/* SP */}
              <h3 className="text-xl font-semibold my-4 md:hidden">
                {userProfile.name}
              </h3>

              {/* profile */}
              <Users.Profile profileText={userProfile.profile} />
            </div>
          </div>
        </section>
      </article>

      {/* イラスト一覧 */}
      <article className="mb-16">
        <section id="tabs" className="mx-2 md:container md:m-auto md:mb-8">
          <Users.UserTabs />
        </section>
        <section className="container my-2 m-auto">
          <div className="grid grid-cols-2 md:mx-auto md:grid-cols-4 mx-2 gap-1">
            {illusts.map((illust: IndexIllustData) => (
              <div key={illust.id}>
                <Illust illust={illust} />
              </div>
            ))}
          </div>
        </section>
        {/* TODO : スタート時は投稿数が少ないことからページネーションは後で実装 */}
        {/* <section className="mt-4">
          <UI.Pagination elementName="#tabs" adjust={-20} />
        </section> */}
      </article>
    </>
  );
}
