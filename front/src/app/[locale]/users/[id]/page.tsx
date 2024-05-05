import * as Mantine from "@mantine/core";
import * as UI from "@/components/ui";
import { IndexIllustData } from "@/types";
import { Illust } from "@/components/illusts";
import { useTranslations } from "next-intl";
import { UserEdit, UserTabs } from "@/components/users";

// 仮データをハードコーディング
const illusts = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  image: "/assets/900x1600.png",
  title: `イラスト${i}`,
  user: {
    id: i,
    name: `ユーザー${i}`,
    avatar: "/assets/900x1600.png",
  },
  count: Math.floor(Math.random() * 2) + 1,
}));

export default function UserPage() {
  const imgUrl = ""; // TODO : ユーザーヘッダーのURLを取得
  const t_General = useTranslations("General");
  const t_UserPage = useTranslations("UserPage");

  return (
    <>
      <article className="w-full relative mb-8">
        <section className="w-full h-full relative z-0">
          {/* ヘッダー画像 */}
          <div className="absolute top-0 left-0 w-full h-[180px] md:h-[300px] -z-10">
            {imgUrl.length === 0 ? (
              <div className="w-full h-full bg-slate-400"></div>
            ) : (
              <Mantine.Image
                src={imgUrl}
                alt={t_UserPage("headerImage")}
                className="object-cover h-full w-full"
              />
            )}
          </div>

          {/* ユーザー情報 */}
          <div className="w-full pt-[140px] md:pt-[240px] px-4 m-auto md:container">
            <div className="flex flex-col justify-center items-center w-full">
              <div className="w-full relative flex md:gap-3 md:mb-8">
                <Mantine.Avatar
                  size={150}
                  alt={t_UserPage("avatar")}
                  src="https://placehold.jp/300x300.png" // TODO : ユーザーアイコンのURLを取得
                />

                <div className="w-full flex flex-col justify-start items-end md:items-start md:justify-start md:relative">
                  <button className="bg-gray-500 text-white text-sm rounded px-2 py-1 md:absolute md:bottom-0 md:right-0">
                    {t_General("edit")}
                  </button>
                  <div className="hidden md:block md:h-1/3">
                    <h2 className="text-3xl">
                      <span className="pb-2 border-b-2 border-green-300 px-1 pr-3">
                        ユーザー名
                      </span>
                    </h2>
                  </div>
                  <ul className="flex justify-start items-center mt-auto ml-2 flex-wrap gap-2 md:h-2/3">
                    <li>
                      <a
                        href="#"
                        className="text-white bg-black px-2 py-1 rounded text-sm"
                        target="_blank"
                      >
                        X
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-white bg-sky-400 px-2 py-1 rounded text-sm"
                        target="_blank"
                      >
                        pixiv
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-white bg-amber-700 bg-opacity-80 px-2 py-1 rounded text-sm"
                        target="_blank"
                      >
                        {t_UserPage("fusetter")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-white bg-sky-700 px-2 py-1 rounded text-sm"
                        target="_blank"
                      >
                        privatter
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-white bg-slate-500 px-2 py-1 rounded text-sm"
                        target="_blank"
                      >
                        {t_UserPage("other")}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* SP */}
              <h3 className="text-xl font-semibold my-4 md:hidden">
                ユーザー名
              </h3>

              <Mantine.Box className="bg-white p-5 rounded w-full">
                {/* TODO : 文章量が長かった場合に切り出してわける */}
                <Mantine.Text className="text-lg">
                  プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィー...
                </Mantine.Text>
                <UI.Collapse>
                  ル文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィープロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィープロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文
                </UI.Collapse>
              </Mantine.Box>
            </div>
          </div>
        </section>
      </article>

      {/* イラスト一覧 */}
      <article>
        <section id="tabs" className="mx-2 md:container md:m-auto md:mb-8">
          <UserTabs />
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
        <section className="mt-4 mb-16">
          <UI.Pagination elementName="#tabs" adjust={-20} />
        </section>
      </article>

      {/* 編集ドロワー */}
      <UserEdit />
    </>
  );
}
