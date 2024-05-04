"use client";
import { Link } from "@/lib";
import { IndexIllustData } from "@/types";
import { useTranslations } from "next-intl";
import { Pagination, SearchModal, ToggleSort } from "@/components/ui";
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

export default function IllustsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchWords = (searchParams.search as string)?.split(",") ?? [];
  const sortBy = searchParams.sortBy as string | undefined;
  const t_Search = useTranslations("Search");

  return (
    <>
      <article className="bg-green-100 shadow-md py-8">
        <section className="flex flex-col gap-4 container m-auto px-4 md:px-auto">
          <h2 className="text-3xl font-semibold">{t_Search("searchResult")}</h2>
          <div>
            <ul className="flex justify-start items-center flex-wrap gap-2 flex-row">
              {searchWords.map((word, index) => (
                <li key={index}>
                  <Link
                    href={
                      `/illusts?search=${word}` +
                      (sortBy ? `&sortBy=${sortBy}` : "")
                    }
                    className="py-1 px-2 rounded transition-all shadow-md bg-orange-200 hover:bg-orange-400 text-black"
                  >
                    {word}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between">
            <h4 className="text-lg">
              {t_Search("total")}
              <span className="text-2xl font-semibold">100</span>
              {t_Search("posts")}
            </h4>
            <div>
              <SearchModal />
            </div>
          </div>
        </section>
      </article>

      <article className="container my-8 m-auto">
        <div className="w-full mb-8 text-end">
          <ToggleSort searchWords={searchWords} />
        </div>
        <div className="grid grid-cols-2 mx-4 md:mx-auto md:grid-cols-4 gap-4">
          {illusts.map((illust: IndexIllustData) => (
            <div key={illust.id} className="mb-8">
              <Illust illust={illust} />
            </div>
          ))}
        </div>
      </article>

      <article className="w-full m-auto text-center mb-8">
        <Pagination adjust={0} />
      </article>
    </>
  );
}
