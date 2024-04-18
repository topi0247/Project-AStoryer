import * as UI from "@/components/ui";
import { useTranslations } from "next-intl";

// 仮データをハードコーディング
const illusts = Array.from({ length: 10 }).map((_, i) => ({
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

export default function Home() {
  const t_General = useTranslations("General");
  return (
    <div className="w-full flex flex-col gap-16">
      <article>
        <h2 className="text-2xl text-start mb-4 ml-8 font-semibold">
          {t_General("followedNewPosts")}
        </h2>
        <section>
          <UI.IllustCarousel illustsData={illusts} />
        </section>
      </article>
      <article>
        <h2 className="text-2xl text-start mb-4 ml-8 font-semibold">
          {t_General("newPosts")}
        </h2>
        <section>
          <UI.IllustCarousel illustsData={illusts} />
        </section>
      </article>
    </div>
  );
}
