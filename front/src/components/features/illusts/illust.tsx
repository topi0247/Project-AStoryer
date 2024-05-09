import { Link } from "@/lib";
import { RouterPath } from "@/settings";
import { IndexIllustData } from "@/types";
import { Image } from "@mantine/core";
import dynamic from "next/dynamic";

// aタグの中にsvgを入れるとHydrationエラーになるので動的読み込みを行う
// SSRはしない
const MdCollections = dynamic(
  () => import("rocketicons/md").then((mod) => mod.MdCollections),
  { ssr: false }
);

export default function Illust({
  illust,
  isUserPage = true,
}: {
  illust: IndexIllustData;
  isUserPage?: boolean;
}) {
  return (
    <section>
      <Link href={RouterPath.illust(illust.id)} className="relative z-0">
        <Image
          src={illust.image}
          loading="lazy"
          alt="タイトル" // TODO : 画像タイトル
          className="aspect-square object-cover z-10"
        />
        {illust.count > 1 && (
          <MdCollections className="absolute bottom-2 right-2 text-white" />
        )}
      </Link>
      {!isUserPage && (
        <div className="mt-2 flex ml-4 justify-start items-center gap-3">
          <Link href={`/users/${illust.user.id}`}>
            <Image
              src={illust.user.avatar}
              alt={illust.user.name}
              className="rounded-full aspect-square object-cover w-9"
            />
          </Link>
          <h4>
            <Link href={`/illusts/${illust.id}`}>{illust.title}</Link>
          </h4>
        </div>
      )}
    </section>
  );
}
