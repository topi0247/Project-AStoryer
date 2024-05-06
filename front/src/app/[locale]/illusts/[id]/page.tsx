"use client";

import { FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import * as RecoilState from "@/recoilState";
import Style from "@/styles/index.module.css";
import { Link } from "@/lib";
import * as Mantine from "@mantine/core";
import { FixedIconButtonList, IconButtonList } from "@/components/ui";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@mantine/hooks";
import { MdCollections } from "rocketicons/md";

export default function IllustPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const [expansionMode, setExpansionMode] = useState(false);
  const [openCaption, setOpenCaption] = useState(false);
  const [follow, setFollow] = useState(false);
  const setModalOpen = useSetRecoilState(RecoilState.modalOpenState);
  const t_ShowPost = useTranslations("ShowPost");
  const theme = Mantine.useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

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

  return (
    <article className="max-w-[1200px] w-11/12 m-auto">
      <div className="flex flex-col md:flex-row justify-start items-start md:gap-6 container my-8 px-4 m-auto">
        <div className="flex flex-col gap-8 md:w-full">
          <div>
            <section className="bg-gray-400 max-h-[90vh] w-full flex justify-center items-center mb-4 overflow-hidden">
              <Mantine.Button
                variant={mobile ? "transparent" : "filled"}
                color={mobile ? "transparent" : "gray"}
                type="button"
                className="block h-full cursor-pointer transition-all hover:opacity-75 relative"
                onClick={() => setExpansionMode(true)}
                style={{ width: "100%", height: "auto", padding: 0 }}
              >
                <Mantine.Image
                  src="/assets/900x1600.png"
                  alt="タイトル"
                  fit="contain"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "90vh",
                    height: "auto",
                  }}
                />
                <MdCollections className="absolute top-2 right-2 text-white" />
              </Mantine.Button>
              <Mantine.Modal
                opened={expansionMode}
                onClose={() => setExpansionMode(false)}
                size="100%"
                padding="sm"
              >
                <Mantine.Image
                  src="/assets/900x1600.png"
                  alt="拡大表示"
                  fit="contain"
                  style={{
                    maxHeight: "80vh",
                    height: "auto",
                  }}
                />
              </Mantine.Modal>
            </section>
            <section className="bg-white p-4 rounded flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <IconButtonList
                    postId={id}
                    buttonState={{ favorite: false, bookmark: false }} // TODO : いいね・ブックマークの状態
                    publicState={2} // TODO : 投稿の公開範囲
                  />
                  <h3 className="text-2xl font-semibold">
                    タイトルタイトルタイトルタイトルタイトルタイトルタイトル
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
                      src="/assets/900x1600.png"
                    />
                    <span className="ml-2 text-black">ユーザー名</span>
                  </Mantine.Button>
                  <div className="text-sm flex justify-center items-center gap-2">
                    <Link
                      href="/illusts/gameSystem=1"
                      className="bg-blue-200 rounded-lg px-2 py-1 hover:opacity-60 transition-all"
                    >
                      システム名
                    </Link>
                    <Link
                      href="/illusts/synalio=シナリオ名"
                      className="bg-green-200 rounded-lg px-2 py-1 hover:opacity-60 transition-all"
                    >
                      シナリオ名
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Link
                        key={i}
                        href={`/illusts/tag=タグ${i + 1}`}
                        className="text-blue-600 hover:underline hover:opacity-60 transition-all"
                      >
                        #タグ{i + 1}
                      </Link>
                    ))}
                  </div>
                  <p className="flex justify-end items-center text-xs text-gray-500 md:gap-4">
                    2024/04/20 14:47:50
                  </p>
                </div>
              </div>
              <div className="relative w-full">
                <p
                  className={`overflow-y-hidden
                ${openCaption ? "max-h-auto" : `gradientText max-h-32`}`}
                >
                  キャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプションキャプション
                </p>
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
                    alt="icon"
                    src="https://placehold.jp/300x300.png"
                  />
                  <div className="flex flex-col gap-2 w-full">
                    <span className="p-0 m-0 font-semibold">ユーザー名</span>
                    <Mantine.Textarea
                      aria-label="コメント"
                      minRows={3}
                      placeholder="コメント"
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
                <p>コメント機能はログインで使えます</p>
              </div>
            </section>

            <section>
              <ul className="bg-slate-100 rounded p-3 flex flex-col">
                {Array.from({ length: 10 }).map((_, i) => (
                  <li
                    key={i}
                    className="flex gap-4 items-start py-4 border-b border-slate-200 last-of-type:border-none"
                  >
                    <Link href="/users/1">
                      <Mantine.Avatar
                        alt="icon"
                        src="https://placehold.jp/300x300.png"
                      />
                    </Link>
                    <div className="flex flex-col gap-1">
                      <Link href="/users/1" className="font-semibold">
                        ユーザー名
                      </Link>
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
            </section>
          </article>
        </div>

        <article className="hidden md:w-1/3 md:block md:sticky md:top-4">
          <section className="bg-white p-4 rounded flex flex-col gap-4">
            <h3 className="text-xl">投稿者</h3>
            <div className="flex gap-4 justify-start items-center">
              <Link href="/users/1">
                <Mantine.Avatar
                  alt="icon"
                  src="https://placehold.jp/300x300.png"
                />
              </Link>
              <div className="w-full flex flex-col gap-2">
                <Link href="/users/1" className="text-xl">
                  ユーザー名
                </Link>
                {follow ? (
                  <Mantine.Button
                    variant="outlined"
                    size="small"
                    onClick={handleFollow}
                    className="w-32"
                  >
                    フォロー解除
                  </Mantine.Button>
                ) : (
                  <Mantine.Button
                    variant="contained"
                    size="small"
                    onClick={handleFollow}
                    className="w-32"
                  >
                    フォロー
                  </Mantine.Button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="" className="bg-slate-300 rounded px-2">
                X
              </Link>
              <Link href="" className="bg-slate-300 rounded px-2">
                pixiv
              </Link>
              <Link href="" className="bg-slate-300 rounded px-2">
                privatter
              </Link>
              <Link href="" className="bg-slate-300 rounded px-2">
                ふせったー
              </Link>
              <Link href="" className="bg-slate-300 rounded px-2">
                HP
              </Link>
            </div>
            <div>
              <p>
                自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文
              </p>
            </div>
          </section>
        </article>
      </div>

      <FixedIconButtonList
        postId={id}
        buttonState={{ favorite: false, bookmark: false }} // TODO : いいね・ブックマークの状態
        publicState={2} // TODO : 投稿の公開範囲
      />
    </article>
  );
}
