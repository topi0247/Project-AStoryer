"use client";

import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import * as RecoilState from "@/recoilState";
import * as Lib from "@/lib";
import * as Mantine from "@mantine/core";
import { IconButtonList } from "@/components/ui";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@mantine/hooks";
import useSWR, { mutate } from "swr";
import { RouterPath } from "@/settings";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Comments } from "@/components/features/illusts";

const fetcherIllust = (url: string) =>
  Lib.GetFromAPI(url).then((res) => res.data);

const fecherFollow = (url: string) =>
  Lib.GetFromAPI(url).then((res) => res.data);

export default function IllustPage({
  params: { uuid },
}: {
  params: { uuid: string };
}) {
  const [user, setUser] = useRecoilState(RecoilState.userState);
  const { data, error } = useSWR(`/posts/${uuid}`, fetcherIllust);
  const { data: followData, error: followError } = useSWR(
    data?.user?.uuid ? `users/${data.user.uuid}/relationship` : "",
    fecherFollow
  );
  const [expansionMode, setExpansionMode] = useState(false);
  const [openCaption, setOpenCaption] = useState(false);
  const [follow, setFollow] = useState(false);
  const [clickImage, setClickImage] = useState(0);
  const t_ShowPost = useTranslations("ShowPost");
  const theme = Mantine.useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const CAPTION_OPEN_LENGTH = 280;
  const router = Lib.useRouter();

  useEffect(() => {
    if (error) {
      if (error.response.status === 404) {
        router.push(RouterPath.notFound);
      } else {
        router.push(RouterPath.error);
      }
      return;
    }
  }, [error]);

  useEffect(() => {
    if (!followData) return;
    setFollow(followData.isFollowing);
  }, [followData]);

  const handleOpenUser = () => {
    // TODO : 投稿者の情報モーダルの表示
  };

  const handleFollow = async () => {
    try {
      if (follow) {
        const res = await Lib.Delete2API(
          `users/${data.user.uuid}/relationship`
        );
        if (res.status === 204) {
          setFollow(false);
          setUser((prevUser) => ({
            ...prevUser,
            following_count: prevUser.following_count - 1,
          }));
        }
      } else {
        const res = await Lib.Post2API(`users/${data.user.uuid}/relationship`, {
          user_uuid: data.user.uuid,
        });
        if (res.status === 201) {
          setFollow(true);
          setUser((prevUser) => ({
            ...prevUser,
            following_count: prevUser.following_count + 1,
          }));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      mutate(`users/${data.user.uuid}/relationship`);
    }
  };

  const handleZoomImage = (i: number) => {
    setClickImage(i);
    setExpansionMode(true);
  };

  return (
    <article className="max-w-[1200px] w-11/12 m-auto">
      <div className="flex flex-col md:flex-row justify-start items-start md:gap-6 container my-8 px-4 m-auto">
        <div className="flex flex-col gap-8 md:w-full">
          <div>
            <section className="bg-gray-400 max-h-[90vh] w-full flex justify-center items-center mb-4 overflow-hidden">
              {data ? (
                <>
                  {data.data.length === 1 ? (
                    <Mantine.Button
                      variant={mobile ? "transparent" : "filled"}
                      color={mobile ? "transparent" : "gray"}
                      type="button"
                      className="block h-full cursor-zoom-in transition-all relative"
                      onClick={() => handleZoomImage(0)}
                      style={{ width: "100%", padding: 0 }}
                    >
                      <Mantine.Image
                        src={data.data[0]}
                        alt={data.title}
                        fit="contain"
                        style={{
                          width: "100%",
                          maxHeight: "90vh",
                          height: "auto",
                        }}
                      />
                    </Mantine.Button>
                  ) : (
                    <Carousel
                      slideSize="100%"
                      slideGap="sm"
                      controlsOffset="xs"
                      controlSize={21}
                      dragFree
                      withIndicators
                    >
                      {data.data.map((img: string, i: number) => (
                        <Carousel.Slide key={i}>
                          <Mantine.Button
                            variant={mobile ? "transparent" : "filled"}
                            color={mobile ? "transparent" : "gray"}
                            type="button"
                            className="block h-full transition-all relative"
                            onClick={() => handleZoomImage(i)}
                            style={{ width: "100%", padding: 0 }}
                          >
                            <Mantine.Image
                              src={img}
                              alt={data.title}
                              fit="contain"
                              style={{
                                width: "100%",
                                maxHeight: "90vh",
                                height: "auto",
                              }}
                            />
                          </Mantine.Button>
                        </Carousel.Slide>
                      ))}
                    </Carousel>
                  )}
                  <Mantine.Modal
                    opened={expansionMode}
                    onClose={() => setExpansionMode(false)}
                    size="100%"
                    padding="sm"
                  >
                    <Mantine.Image
                      src={data.data[clickImage]}
                      alt={data.title}
                      fit="contain"
                      style={{
                        maxHeight: "80vh",
                        height: "auto",
                      }}
                    />
                  </Mantine.Modal>
                </>
              ) : (
                <Mantine.Skeleton height={500} radius={0} />
              )}
            </section>
            <section className="bg-white p-4 rounded flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  {data ? (
                    <>
                      <IconButtonList
                        postUuid={uuid}
                        publicState={data?.publish_state}
                        title={data?.title}
                        postUserUuid={data?.user?.uuid}
                      />

                      <h3 className="text-2xl font-semibold">{data?.title}</h3>
                      <Mantine.Button
                        variant="transparent"
                        onClick={handleOpenUser}
                        className="flex justify-center items-center h-12 md:hidden"
                      >
                        <Mantine.Avatar
                          variant="default"
                          radius="xl"
                          size="md"
                          alt="icon"
                          src={data.user.avatar}
                        />
                        <span className="ml-2 text-black">
                          {data.user.name}
                        </span>
                      </Mantine.Button>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-end items-center">
                        <Mantine.Skeleton height={35} circle />
                      </div>
                      <Mantine.Skeleton height={35} />
                      <div className="md:hidden">
                        <Mantine.Skeleton height={35} circle />
                      </div>
                    </>
                  )}
                  <div className="text-sm flex justify-center items-center md:justify-start gap-2">
                    {data ? (
                      <>
                        {data.game_systems && (
                          <Lib.Link
                            href={RouterPath.illustSearch(
                              `gameSystem=${data.game_systems}`
                            )}
                            className="bg-blue-200 rounded-lg px-2 py-1 hover:opacity-60 transition-all"
                          >
                            {data.game_systems}
                          </Lib.Link>
                        )}
                        {data.synalio && (
                          <Lib.Link
                            href={RouterPath.illustSearch(
                              `synalioName=${data.synalio}`
                            )}
                            className="bg-green-200 rounded-lg px-2 py-1 hover:opacity-60 transition-all"
                          >
                            {data.synalio}
                          </Lib.Link>
                        )}
                      </>
                    ) : (
                      <>
                        <Mantine.Skeleton height={20} width={85} />
                        <Mantine.Skeleton height={20} width={85} />
                        <Mantine.Skeleton height={20} width={85} />
                      </>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {data ? (
                      data.tags.map((tag: string, i: number) => (
                        <Lib.Link
                          key={i}
                          href={RouterPath.illustSearch(`tags=${tag}`)}
                          className="text-blue-600 hover:underline hover:opacity-60 transition-all"
                        >
                          #{tag}
                        </Lib.Link>
                      ))
                    ) : (
                      <>
                        <Mantine.Skeleton height={20} width={85} />
                        <Mantine.Skeleton height={20} width={85} />
                        <Mantine.Skeleton height={20} width={85} />
                      </>
                    )}
                  </div>
                  {data ? (
                    <p className="flex justify-end items-center text-xs text-gray-500 md:gap-4">
                      {data.published_at}
                    </p>
                  ) : (
                    <div className="flex justify-end items-center">
                      <Mantine.Skeleton height={16} width={100} />
                    </div>
                  )}
                </div>
              </div>
              <div className="relative w-full">
                {data ? (
                  <>
                    <p
                      className={`overflow-y-hidden
                ${
                  openCaption || data.caption.length <= CAPTION_OPEN_LENGTH
                    ? "max-h-auto"
                    : `gradientText max-h-32`
                }`}
                    >
                      {data.caption}
                    </p>
                    {data.caption.length > CAPTION_OPEN_LENGTH && (
                      <button
                        type="button"
                        className={`w-full bg-blue-300 border border-blue-600 border-opacity-50 bg-opacity-50 hover:bg-opacity-25 hover:border-opacity-25 flex justify-center items-center rounded py-1 transition-all
                ${openCaption ? "mt-3" : "absolute bottom-0 left-0"} `}
                        onClick={() => setOpenCaption(!openCaption)}
                      >
                        <span
                          className={`${
                            openCaption ? "rotate-180" : ""
                          } transition-all`}
                        >
                          ▼
                        </span>
                      </button>
                    )}
                  </>
                ) : (
                  <Mantine.Skeleton height={128} />
                )}
              </div>
            </section>
          </div>
          <article className="flex flex-col gap-4">
            <Comments uuid={uuid} />
          </article>
        </div>

        <article className="hidden md:w-1/3 md:block md:sticky md:top-4">
          <section className="bg-white p-4 rounded flex flex-col gap-4">
            <h3 className="text-xl">{t_ShowPost("postUser")}</h3>
            <div className="flex flex-col w-full gap-2 justify-center items-center">
              {data ? (
                <>
                  <Lib.Link
                    href={RouterPath.users(data.user.uuid)}
                    className="flex gap-2 items-center rounded transition-all w-full p-2 hover:bg-slate-300"
                  >
                    <Mantine.Avatar
                      variant="default"
                      radius="xl"
                      size="lg"
                      alt="icon"
                      src={data.user.avatar}
                    />
                    <span className="text-xl">{data.user.name}</span>
                  </Lib.Link>
                  {user.uuid !== "" && user.uuid !== data.user.uuid && (
                    <div className="w-full flex flex-col gap-2 justify-center items-center">
                      {follow ? (
                        <Mantine.Button
                          variant="outline"
                          size="small"
                          onClick={handleFollow}
                          className="w-32"
                        >
                          {t_ShowPost("unFollow")}
                        </Mantine.Button>
                      ) : (
                        <Mantine.Button
                          variant="contained"
                          size="small"
                          onClick={handleFollow}
                          className="w-32"
                        >
                          {t_ShowPost("follow")}
                        </Mantine.Button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <Mantine.Skeleton height={70} />
              )}
            </div>
            {data?.user?.links && (
              <div className="flex flex-wrap gap-3">
                {data.user.links.twitter && (
                  <a
                    href={`https://x.com/${data.user.links.twitter}`}
                    className="bg-slate-300 rounded px-2 hover:bg-slate-500 hover:text-white transition-all"
                  >
                    X
                  </a>
                )}
                {data.user.links.twitter && (
                  <a
                    href={`https://www.pixiv.net/users/${data.user.links.twitter}`}
                    className="bg-slate-300 rounded px-2 hover:bg-slate-500 hover:text-white transition-all"
                  >
                    pixiv
                  </a>
                )}
                {data.user.links.twitter && (
                  <a
                    href={`https://fusetter.com/u/${data.user.links.twitter}`}
                    className="bg-slate-300 rounded px-2 hover:bg-slate-500 hover:text-white transition-all"
                  >
                    {t_ShowPost("fusetter")}
                  </a>
                )}
                {data.user.links.twitter && (
                  <a
                    href={`https://privatter.net/u/${data.user.links.twitter}`}
                    className="bg-slate-300 rounded px-2 hover:bg-slate-500 hover:text-white transition-all"
                  >
                    privatter
                  </a>
                )}
                {data.user.links.other && (
                  <a
                    href={data.user.links.other}
                    className="bg-slate-300 rounded px-2 hover:bg-slate-500 hover:text-white transition-all"
                  >
                    {t_ShowPost("other")}
                  </a>
                )}
              </div>
            )}
            <div>
              {data ? (
                <p>{data.user.profile}</p>
              ) : (
                <Mantine.Skeleton height={35} />
              )}
            </div>
          </section>
        </article>
      </div>
    </article>
  );
}
