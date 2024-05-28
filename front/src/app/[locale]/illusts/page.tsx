"use client";
import { GetFromAPI, Link } from "@/lib";
import { IndexIllustData } from "@/types";
import { useTranslations } from "next-intl";
import { Pagination, SearchModal, ToggleSort } from "@/components/ui";
import { Illust } from "@/components/features/illusts";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RouterPath } from "@/settings";

export default function IllustsPage() {
  const [searchWords, setSearchWords] = useState<string[]>([]);
  const [illusts, setIllusts] = useState<IndexIllustData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  // const sortBy = searchParams.sortBy as string | undefined;
  const t_Search = useTranslations("Search");
  const params = useSearchParams();

  const fetchData = async (params: URLSearchParams) => {
    const words = params.get("search")?.split(",") ?? [];
    const postTitle = params.get("postTitle")?.split(",") ?? [];
    const gameSystem = params.get("gameSystem")?.split(",") ?? [];
    const synalioName = params.get("synalioName")?.split(",") ?? [];
    const tags = params.get("tags")?.split(",") ?? [];
    const userName = params.get("userName")?.split(",") ?? [];
    // TODO : OR検索がうまくできないのでAND検索のみ
    const search_type = "AND"; //params.get("searchType") ?? "";
    const newSearchWords = [
      ...words,
      ...postTitle,
      ...gameSystem,
      ...synalioName,
      ...tags,
      ...userName,
    ];

    setSearchWords(newSearchWords);

    const query = new URLSearchParams();
    if (words.length > 0) query.append("search_word", words.join(","));
    if (postTitle.length > 0) query.append("post_title", postTitle.join(","));
    if (gameSystem.length > 0)
      query.append("game_system", gameSystem.join(","));
    if (synalioName.length > 0)
      query.append("synalio_name", synalioName.join(","));
    if (tags.length > 0) query.append("tags", tags.join(","));
    if (userName.length > 0) query.append("user_name", userName.join(","));
    if (search_type) query.append("search_type", search_type);

    const result = await GetFromAPI(`/illusts?${query.toString()}`);
    if (result.status != 200) return;
    setIllusts(
      result.data.illusts.map(
        (illust: {
          uuid: string;
          title: string;
          data: string[];
          user: {
            uuid: string;
            name: string;
            avatar: string;
          };
        }) => ({
          uuid: illust.uuid,
          title: illust.title,
          image: illust.data[0],
          user: {
            uuid: illust.user.uuid,
            name: illust.user.name,
            avatar: illust.user.avatar,
          },
        })
      ) as IndexIllustData[]
    );
    setTotalCount(result.data.count);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    fetchData(params);
  }, [params]);

  return (
    <>
      <article className="bg-green-100 shadow-md py-8">
        <section className="flex flex-col gap-4 container m-auto px-4 md:px-auto">
          <h2 className="text-3xl font-semibold">{t_Search("searchResult")}</h2>
          <div>
            <ul className="flex justify-start items-center flex-wrap gap-2 flex-row">
              {searchWords.map((word, index) => (
                <li key={index}>
                  {/* <Link
                    href={RouterPath.illustSearch(`search=${word}`)}
                    className="py-1 px-2 rounded transition-all shadow-md bg-orange-200 hover:bg-orange-400 text-black"
                  >
                    {word}
                  </Link> */}
                  <p className="py-1 px-2 rounded shadow-md bg-orange-200 text-black">
                    {word}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between">
            <h4 className="text-lg">
              {t_Search("total")}
              <span className="text-2xl font-semibold"> {totalCount} </span>
              {t_Search("posts")}
            </h4>
            {/* TODO : OR検索ができないので後で実装 */}
            {/* <div>
              <SearchModal />
            </div> */}
          </div>
        </section>
      </article>

      <article className="container my-8 m-auto">
        {/* TODO : 初期段階では投稿数が少ないのでソートは無し */}
        {/* <div className="w-full mb-8 text-end">
          <ToggleSort searchWords={searchWords} />
        </div> */}
        {totalCount === 0 ? (
          <p>お探しの条件では投稿されていないようです。</p>
        ) : (
          <div className="grid grid-cols-2 mx-4 md:mx-auto md:grid-cols-4 gap-2">
            <>
              {illusts.map((illust: IndexIllustData) => (
                <div key={illust.uuid} className="mb-8">
                  <Illust illust={illust} isUserPage={false} />
                </div>
              ))}
            </>
          </div>
        )}
      </article>

      {/* TODO : 初期時点ではページネーションするほど投稿がないので一旦非表示 */}
      {/* <article className="w-full mb-8">
        <Pagination adjust={0} />
      </article> */}
    </>
  );
}
