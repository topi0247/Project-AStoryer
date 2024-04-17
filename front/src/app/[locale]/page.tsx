import * as UI from "@/components/ui";

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
}));

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-16">
      <article>
        <h2 className="text-2xl text-start mb-4 ml-8 font-semibold">
          フォロー新着順
        </h2>
        <section>
          <UI.IllustCarousel illustsData={illusts} />
        </section>
      </article>
      <article>
        <h2 className="text-2xl text-start mb-4 ml-8 font-semibold">新着順</h2>
        <section>
          <UI.IllustCarousel illustsData={illusts} />
        </section>
      </article>
    </div>
  );
}
