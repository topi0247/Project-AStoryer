import Image from "next/image";
import * as MUI from "@mui/material";
import * as UI from "@/components/ui";
import { IndexIllustData } from "@/types";
import { Illust } from "@/components/illusts";

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
  const imgUrl = "https://placehold.jp/1600x900.png";

  return (
    <>
      <article className="w-full relative mb-8">
        <div className="w-full h-full relative z-0">
          <div className="absolute top-0 left-0 w-full h-[200px] md:h-[300px] -z-10">
            {imgUrl.length === 0 ? (
              <div className="w-full h-full bg-slate-400"></div>
            ) : (
              <Image
                src={imgUrl}
                width={1600}
                height={900}
                alt="ヘッダー"
                className="object-cover h-1/2 md:h-full w-full"
              />
            )}
          </div>
          <div className="w-full pt-[140px] md:pt-[240px] px-4 m-auto md:container">
            <div className="flex flex-col justify-center items-center w-full">
              <div className="w-full relative flex md:gap-3 md:mb-8">
                <MUI.Avatar
                  alt="icon"
                  src="https://placehold.jp/300x300.png"
                  sx={{ width: 150, height: 150 }}
                  className="shadow-md"
                />
                <button className="absolute top-6 right-0  bg-gray-500 text-white text-sm rounded px-2 py-1 md:hidden">
                  編集
                </button>
                <ul className="absolute right-0 bottom-5 flex flex-wrap gap-2 w-1/2 md:hidden">
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
                      ふせったー
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
                      その他
                    </a>
                  </li>
                </ul>
                <div className="hidden md:block grid grid-col-2 gap-4 h-[150px] flex-1 relative">
                  <h3 className="text-3xl font-semibold flex justify-start items-end h-1/3">
                    ユーザー名
                  </h3>
                  <ul className="flex flex-wrap gap-2 mt-4 h-1/3">
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
                        ふせったー
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
                        その他
                      </a>
                    </li>
                  </ul>
                  <button className="absolute bottom-0 left-0 bg-gray-500 text-white text-sm rounded px-2 py-1">
                    編集
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-semibold my-4 md:hidden">
                ユーザー名
              </h3>
              <div className="bg-white p-5 rounded">
                <UI.Collapse>
                  プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィープロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィープロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文プロフィール文
                </UI.Collapse>
              </div>
            </div>
          </div>
        </div>
      </article>
      <article>
        <section id="tabs" className="mx-2 md:container md:m-auto md:mb-8">
          <UI.Tabs />
        </section>
        <section className="container my-2 m-auto">
          <div className="grid grid-cols-2 md:mx-auto md:grid-cols-4 mx-2 gap-1">
            {illusts.map((illust: IndexIllustData) => (
              <div key={illust.id}>
                <Illust illust={illust} isUserPage={false} />
              </div>
            ))}
          </div>
        </section>
        <section className="mt-4 mb-16">
          <UI.Pagination elementName="#tabs" adjust={-10} />
        </section>
      </article>
    </>
  );
}
