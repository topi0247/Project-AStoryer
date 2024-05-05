import { IllustCarousel } from "@/components/features/illusts";
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
    <div className="w-full flex flex-col gap-16 my-8">
      <article>
        <h2 className="text-xl text-start my-4 ml-8">
          {t_General("followedNewPosts")}
        </h2>
        <section>
          <IllustCarousel illustsData={illusts} />
        </section>
      </article>
      <article>
        <h2 className="text-xl text-start mb-4 ml-8">
          {t_General("newPosts")}
        </h2>
        <div>
          <IllustCarousel illustsData={illusts} />
        </div>
      </article>
    </div>
  );
}
