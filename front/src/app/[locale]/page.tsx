"use client";
import React, { useEffect } from "react";
import { GetFromAPI, Link } from "@/lib";
import useSWR from "swr";
import { Image } from "@mantine/core";
import { IHomeIllustData } from "@/types";
import { RouterPath } from "@/settings";

const fetcher = (url: string) => GetFromAPI(url).then((res) => res.data);

export default function Home() {
  const { data } = useSWR("/posts", fetcher);
  const [illusts, setIllusts] = React.useState<IHomeIllustData[]>([]);

  useEffect(() => {
    if (data) {
      const illustData = data.map(
        (illust: { uuid: string; title: string; data: string[] }) => ({
          uuid: illust.uuid,
          title: illust.title,
          image: illust.data[0],
        })
      );
      setIllusts(illustData);
    }
  }, [data]);

  return (
    <div className="relative">
      {illusts && (
        <article className="opacity-20 grid grid-cols-3 justify-center items-center h-[80vh] w-full overflow-hidden">
          {illusts.map((illust: IHomeIllustData, index: number) => (
            <section key={index} className="w-full h-full aspect-square">
              <Image
                src={illust.image}
                alt={illust.title}
                className="object-cover w-full h-full object-top"
              />
            </section>
          ))}
        </article>
      )}
      <article className="w-full py-36 flex justify-center items-center m-auto absolute top-0 left-0">
        <section className="w-4/5 bg-white p-8 bg-opacity-70 shadow-md">
          <Image
            src="/assets/AppLogo.png"
            alt="siteLogo"
            className="object-cover w-full h-full"
          />
          <p className="text-center py-4">
            TRPG向け
            <br />
            「うちの子」創作投稿サイト
          </p>
          <div className="flex gap-2 justify-center items-center">
            <Link
              href={RouterPath.signUp}
              className="text-center underline text-sky-500"
            >
              新規登録
            </Link>
            <Link
              href={RouterPath.login}
              className="text-center underline text-sky-500"
            >
              ログイン
            </Link>
          </div>
        </section>
      </article>
      <article className="m-8">
        <section className="bg-white p-4">
          <h2 className="text-xl font-bold relative inline-block z-10">
            「うちのこ」「自陣」を紹介しよう
            <div className="h-4/5 aspect-square inline-block absolute top-0 left-0 -z-10 opacity-30">
              <Image
                src="/assets/logo.png"
                alt="logo"
                className="object-cover"
              />
            </div>
          </h2>
          <p>
            AStoryer - あすとりや -
            はTRPGで生まれたキャラクターたちの創作を投稿できるサービスです。
            <br />
            あなたの「うちのこ」や「自陣」を投稿したり、「よそのこ」や「他陣」を見ることができます。
            <br />
            システムやシナリオ名で検索することで、特定の創作の投稿を見ることもできます。
          </p>
        </section>
      </article>
      <article className="m-8">
        <section className="bg-white p-4">
          <h2 className="text-xl font-bold relative inline-block z-10">
            できること
            <div className="h-4/5 aspect-square inline-block absolute top-0 left-0 -z-10 opacity-30">
              <Image
                src="/assets/logo.png"
                alt="logo"
                className="object-cover"
              />
            </div>
          </h2>
          <ul className="my-4">
            <li>・イラスト検索</li>
            <li>・イラスト閲覧</li>
            <li>★イラスト投稿</li>
            <li>★いいね</li>
            <li>★ブックマーク</li>
            <li>★コメント</li>
            <li>★フォロー</li>
          </ul>
          <p className="my-2 text-sm">★はログインすると使えます</p>
        </section>
      </article>
      <article className="m-8">
        <section className="bg-white p-4">
          <h2 className="text-xl font-bold relative inline-block z-10">
            新着順
            <div className="h-4/5 aspect-square inline-block absolute top-0 left-0 -z-10 opacity-30">
              <Image
                src="/assets/logo.png"
                alt="logo"
                className="object-cover"
              />
            </div>
          </h2>
          <div className="grid grid-cols-1 gap-1 my-4">
            {illusts &&
              illusts.map((illust: IHomeIllustData, index: number) => (
                <div key={index} className="w-full h-full aspect-square">
                  <Image
                    src={illust.image}
                    alt={illust.title}
                    className="object-cover w-full h-full object-top"
                  />
                </div>
              ))}
          </div>
          <h3 className="text-xl font-bold text-center">
            使ってみたい？
            <br />
            さっそく登録しよう！
          </h3>
          <div className="flex gap-2 justify-center items-center py-4">
            <Link
              href={RouterPath.signUp}
              className="text-center underline text-sky-500"
            >
              新規登録
            </Link>
            <Link
              href={RouterPath.login}
              className="text-center underline text-sky-500"
            >
              ログイン
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
