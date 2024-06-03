import { Link } from "@/lib";
import { userState } from "@/recoilState";
import { RouterPath } from "@/settings";
import { IPublicState, IndexIllustData } from "@/types";
import { Avatar, Image } from "@mantine/core";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";

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
  const t_General = useTranslations("General");
  const user = useRecoilValue(userState);

  const getPublishRange = () => {
    switch (illust.publishRange) {
      case IPublicState.All:
        return "全体公開";
      case IPublicState.Draft:
        return "非公開";
      case IPublicState.URL:
        return "URLを知っている人";
      case IPublicState.Private:
        return "非公開";
      case IPublicState.Follower:
        return "フォロワー";
    }
  };

  return (
    <section className="relative overflow-hidden">
      <Link
        href={RouterPath.illust(illust.uuid)}
        className="relative z-0 hover:opacity-70 transition-all"
      >
        <Image
          src={illust.image}
          loading="lazy"
          alt={illust.title}
          className="aspect-square object-cover z-10 bg-white object-top"
        />
        {illust.count && illust.count > 1 && (
          <MdCollections className="absolute top-2 right-2 text-white" />
        )}
      </Link>
      {isUserPage ? (
        <>
          {illust.publishRange && (
            <>
              <div className="absolute bottom-0 right-0 text-sm text-end">
                <Link
                  href={RouterPath.illustEdit(illust.uuid)}
                  className="px-2 py-1 bg-slate-600 text-white rounded-l"
                >
                  {t_General("edit")}
                </Link>
              </div>
              <div className="absolute top-0 right-0 text-sm text-end">
                <p className="px-2 py-1 bg-sky-300 bg-opacity-50 text-white rounded-l">
                  {getPublishRange()}
                </p>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="mt-2 flex ml-4 justify-start items-center gap-3">
          <Link href={`/users/${illust.user?.uuid}`}>
            <Avatar
              variant="default"
              className="cursor-pointer"
              radius="xl"
              size="md"
              src={illust.user?.avatar}
              alt={illust.user?.name}
            />
          </Link>
          <h4>
            <Link href={RouterPath.illust(illust.uuid)}>{illust.title}</Link>
          </h4>
        </div>
      )}
    </section>
  );
}
