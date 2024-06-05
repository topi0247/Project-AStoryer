"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as RecoilState from "@/recoilState";
import * as Lib from "@/lib";
import * as Mantine from "@mantine/core";
import { IconButtonList } from "@/components/ui";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@mantine/hooks";
import useSWR from "swr";
import { RouterPath } from "@/settings";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";

const fetcherIllust = (url: string) =>
  Lib.GetFromAPI(url).then((res) => res.data);

export default function IllustPage({
  params: { uuid },
}: {
  params: { uuid: string };
}) {
  const { data: illustData, error: illustError } = useSWR(
    `/posts/${uuid}`,
    fetcherIllust
  );
  const user = useRecoilValue(RecoilState.userState);
  const [expansionMode, setExpansionMode] = useState(false);
  const [openCaption, setOpenCaption] = useState(false);
  const [follow, setFollow] = useState(false);
  const [clickImage, setClickImage] = useState(0);
  const setModalOpen = useSetRecoilState(RecoilState.modalOpenState);
  const t_ShowPost = useTranslations("ShowPost");
  const theme = Mantine.useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const CAPTION_OPEN_LENGTH = 280;
  const router = Lib.useRouter();

  useEffect(() => {
    if (illustError) {
      if (illustError.response.status === 404) {
        router.push("/not-found");
      } else {
        router.push("/error");
      }
      return undefined;
    }
  }, [illustError]);

  const handleOpenUser = () => {
    // TODO : 投稿者の情報モーダルの表示
  };

  const handleFollow = () => {
    // TODO : 未ログインならログイン誘導モーダルを表示
    setModalOpen(true);
    return;

    // TODO : フォロー・フォロー解除の処理
    setFollow(!follow);
  };

  const handleSendComment = (e: FormEvent) => {
    e.preventDefault();
    // TODO : 未ログインならログイン誘導モーダルを表示
    setModalOpen(true);
    return;

    // TODO : コメントの送信処理
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
              {illustData ? (
                <>
                  {illustData.data.length === 1 ? (
                    <Mantine.Button
                      variant={mobile ? "transparent" : "filled"}
                      color={mobile ? "transparent" : "gray"}
                      type="button"
                      className="block h-full cursor-zoom-in transition-all relative"
                      onClick={() => handleZoomImage(0)}
                      style={{ width: "100%", padding: 0 }}
                    >
                      <Mantine.Image
                        src={illustData.data[0]}
                        alt={illustData.title}
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
                      {illustData.data.map((img: string, i: number) => (
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
                              alt={illustData.title}
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
                      src={illustData.data[clickImage]}
                      alt={illustData.title}
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
                  {illustData ? (
                    <>
                      <IconButtonList
                        postUuid={uuid}
                        publicState={illustData?.publish_state}
                        title={illustData?.title}
                        postUserUuid={illustData?.user?.uuid}
                      />

                      <h3 className="text-2xl font-semibold">
                        {illustData?.title}
                      </h3>
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
                          src={illustData.user.avatar}
                        />
                        <span className="ml-2 text-black">
                          {illustData.user.name}
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
                    {illustData ? (
                      <>
                        {illustData.game_systems && (
                          <Lib.Link
                            href={RouterPath.illustSearch(
                              `gameSystem=${illustData.game_systems}`
                            )}
                            className="bg-blue-200 rounded-lg px-2 py-1 hover:opacity-60 transition-all"
                          >
                            {illustData.game_systems}
                          </Lib.Link>
                        )}
                        {illustData.synalio && (
                          <Lib.Link
                            href={RouterPath.illustSearch(
                              `synalioName=${illustData.synalio}`
                            )}
                            className="bg-green-200 rounded-lg px-2 py-1 hover:opacity-60 transition-all"
                          >
                            {illustData.synalio}
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
                    {illustData ? (
                      illustData.tags.map((tag: string, i: number) => (
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
                  {illustData ? (
                    <p className="flex justify-end items-center text-xs text-gray-500 md:gap-4">
                      {illustData.published_at}
                    </p>
                  ) : (
                    <div className="flex justify-end items-center">
                      <Mantine.Skeleton height={16} width={100} />
                    </div>
                  )}
                </div>
              </div>
              <div className="relative w-full">
                {illustData ? (
                  <>
                    <p
                      className={`overflow-y-hidden
                ${
                  openCaption ||
                  illustData.caption.length <= CAPTION_OPEN_LENGTH
                    ? "max-h-auto"
                    : `gradientText max-h-32`
                }`}
                    >
                      {illustData.caption}
                    </p>
                    {illustData.caption.length > CAPTION_OPEN_LENGTH && (
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
            <section className="bg-slate-100 rounded p-3 flex flex-col gap-2 relative">
              <h3 className="text-xl font-semibold">
                {t_ShowPost("postComment")}
              </h3>
              <form onSubmit={handleSendComment}>
                <div className="flex items-start gap-4">
                  <Mantine.Avatar
                    variant="default"
                    radius="xl"
                    size="md"
                    alt="icon"
                    src={user?.avatar}
                  />
                  <div className="flex flex-col gap-2 w-full">
                    <span className="p-0 m-0 font-semibold"></span>
                    <Mantine.Textarea
                      minRows={3}
                      className="w-full bg-gray-200 rounded p-2 focus:outline-none resize-none"
                      autosize
                    />
                    <div className="w-full text-center">
                      <Mantine.Button
                        type="submit"
                        variant="contained"
                        className="bg-orange-100 text-black hover:bg-orange-400"
                      >
                        {t_ShowPost("send")}
                      </Mantine.Button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="w-full h-full absolute top-0 left-0 bg-gray-500 bg-opacity-80 text-white font-semibold md:text-3xl flex justify-center items-center rounded">
                <p>{t_ShowPost("requiredComment")}</p>
              </div>
            </section>

            {/* <section>
              <ul className="bg-slate-100 rounded p-3 flex flex-col">
                {Array.from({ length: 10 }).map((_, i) => (
                  <li
                    key={i}
                    className="flex gap-4 items-start py-4 border-b border-slate-200 last-of-type:border-none"
                  >
                    <Lib.Link href="/users/1">
                      <Mantine.Avatar alt="icon" src={illustData.user.avatar} />
                    </Lib.Link>
                    <div className="flex flex-col gap-1">
                      <Lib.Link href="/users/1" className="font-semibold">
                        ユーザー名
                      </Lib.Link>
                      <p>
                        コメント コメント コメント コメント コメント
                        コメントコメント コメント コメント コメント コメント
                        コメント コメント コメントコメント コメント コメント
                        コメント コメント コメント コメント コメントコメント
                        コメント コメント コメント コメント コメント コメント
                        コメントコメント コメント
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section> */}
          </article>
        </div>

        <article className="hidden md:w-1/3 md:block md:sticky md:top-4">
          <section className="bg-white p-4 rounded flex flex-col gap-4">
            <h3 className="text-xl">{t_ShowPost("postUser")}</h3>
            <div className="flex gap-4 justify-start items-center">
              {illustData ? (
                <>
                  <Lib.Link href={RouterPath.users(illustData.user.uuid)}>
                    <Mantine.Avatar
                      variant="default"
                      radius="xl"
                      size="lg"
                      alt="icon"
                      src={illustData.user.avatar}
                    />
                  </Lib.Link>
                  <div className="w-full flex flex-col gap-2">
                    <Lib.Link
                      href={RouterPath.users(illustData.user.uuid)}
                      className="text-xl"
                    >
                      {illustData.user.name}
                    </Lib.Link>
                    {/* {follow ? (
                  <Mantine.Button
                    variant="outlined"
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
                )} */}
                  </div>
                </>
              ) : (
                <Mantine.Skeleton height={70} />
              )}
            </div>
            {/* <div className="flex flex-wrap gap-3">
              <Lib.Link href="" className="bg-slate-300 rounded px-2">
                X
              </Lib.Link>
              <Lib.Link href="" className="bg-slate-300 rounded px-2">
                pixiv
              </Lib.Link>
              <Lib.Link href="" className="bg-slate-300 rounded px-2">
                privatter
              </Lib.Link>
              <Lib.Link href="" className="bg-slate-300 rounded px-2">
                {t_ShowPost("fusetter")}
              </Lib.Link>
              <Lib.Link href="" className="bg-slate-300 rounded px-2">
                {t_ShowPost("other")}
              </Lib.Link>
            </div> */}
            <div>
              {illustData ? (
                <p>{illustData.user.profile}</p>
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
