import Illust from "@/components/illusts/illust";
import { Link } from "@/lib";
import { IndexIllustData } from "@/types";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

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
}));

export default function IllustsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchWords = (searchParams.search as string)?.split(",") ?? [];
  const t_Search = useTranslations("Search");

  return (
    <>
      <article className="bg-green-100 shadow-md py-8">
        <section className="flex md:flex-col md:gap-4 container m-auto">
          <h2 className="text-3xl font-semibold">{t_Search("searchResult")}</h2>
          <div>
            <ul className="flex justify-start items-center flex-wrap gap-2 md:flex-row">
              {searchWords.map((word, index) => (
                <li key={index}>
                  <Link
                    href={`/illusts?search=${word}`}
                    className="py-1 px-2 rounded transition-all shadow-md bg-orange-200 hover:bg-orange-400 text-black"
                  >
                    {word}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:flex md:justify-between">
            <h4 className="text-lg">
              {t_Search("total")}
              <span className="text-2xl font-semibold">100</span>
              {t_Search("posts")}
            </h4>
            <div>
              <Button
                variant="contained"
                className="bg-orange-200 hover:bg-orange-400 text-black"
              >
                {t_Search("detailsSearch")}
              </Button>
            </div>
          </div>
        </section>
      </article>

      <article className="container my-8 m-auto">
        <div className="grid grid-cols-4 gap-4">
          {illusts.map((illust: IndexIllustData) => (
            <div key={illust.id} className="mb-8">
              <Illust illust={illust} />
            </div>
          ))}
        </div>
      </article>
    </>
  );
}
