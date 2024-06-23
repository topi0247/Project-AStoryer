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
  const [illustAll, setIllustAll] = React.useState<IHomeIllustData[]>([]);
  const [illustData1, setIllustData1] = React.useState<IHomeIllustData[]>([]);
  const [illustData2, setIllustData2] = React.useState<IHomeIllustData[]>([]);
  const [illustData3, setIllustData3] = React.useState<IHomeIllustData[]>([]);

  useEffect(() => {
    if (data) {
      const illustData = data.map(
        (illust: { uuid: string; title: string; data: string[] }) => ({
          uuid: illust.uuid,
          title: illust.title,
          image: illust.data[0],
        })
      );
      const maxCount = illustData.length;
      const sliceCount = maxCount / 3;
      setIllustData1(illustData.slice(0, sliceCount));
      setIllustData2(illustData.slice(sliceCount, sliceCount * 2));
      setIllustData3(illustData.slice(sliceCount * 2));
      setIllustAll(illustData);
    }
  }, [data]);

  return (
    <div className="relative overflow-hidden">
      <article className="opacity-20 h-[80vh] w-[200vw] m-auto">
        {illustData1 && (
          <div className="flex h-1/3">
            {illustData1.map((illust: IHomeIllustData, index: number) => (
              <section
                key={index}
                className="h-full aspect-square infinite-scroll-left"
              >
                <Image
                  src={illust.image}
                  alt={illust.title}
                  className="object-cover w-full h-full object-top"
                />
              </section>
            ))}
          </div>
        )}
        {illustData2 && (
          <div className="flex h-1/3">
            {illustData2.map((illust: IHomeIllustData, index: number) => (
              <section
                key={index}
                className="h-full  aspect-square infinite-scroll-right"
              >
                <Image
                  src={illust.image}
                  alt={illust.title}
                  className="object-cover w-full h-full object-top"
                />
              </section>
            ))}
          </div>
        )}
        {illustData3 && (
          <div className="flex h-1/3">
            {illustData3.map((illust: IHomeIllustData, index: number) => (
              <section
                key={index}
                className="h-full  aspect-square infinite-scroll-left"
              >
                <Image
                  src={illust.image}
                  alt={illust.title}
                  className="object-cover w-full h-full object-top"
                />
              </section>
            ))}
          </div>
        )}
      </article>
      <article className="w-full py-36 flex justify-center items-center m-auto absolute top-0 left-0">
        <section className="w-4/5 md:w-96 bg-white p-8 bg-opacity-70 shadow-md">
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
      <div className="md:flex md:gap-4 mx-8">
        <article className="my-8 md:w-1/2">
          <section className="bg-white p-4 rounded">
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
            <p className="p-4">
              AStoryer - あすとりや -
              はTRPGで生まれたキャラクターたちの創作を投稿できるサービスです。
              <br />
              これまでSNSに投稿していた「うちのこ」や「自陣」を、このサービスでまとめて管理もできちゃいます。
              <br />
              あなたの「うちのこ」や「自陣」を投稿したり、「よそのこ」や「他陣」を見ることができます。
              <br />
              システムやシナリオ名で検索することで、特定の創作の投稿を見ることもできます。
            </p>
          </section>
        </article>
        <article className="my-8 md:w-1/2">
          <section className="bg-white p-4 rounded">
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
              <li>イラスト検索</li>
              <li>イラスト閲覧</li>
            </ul>
            <div>
              <h3 className="h-3 relative z-10">
                <span className="bg-green-400 ml-3 py-2 px-3 font-semibold text-white rounded">
                  ログインするとできること
                </span>
              </h3>
              <ul className="bg-green-200 pt-7 px-4 pb-1 bg-opacity-45 border border-green-400 relative rounded">
                <li>イラスト投稿</li>
                <li>いいね</li>
                <li>ブックマーク</li>
                <li>コメント</li>
                <li>フォロー</li>
              </ul>
            </div>
          </section>
        </article>
      </div>
      <article className="m-8">
        <section className="bg-white p-4 rounded">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-1 my-4">
            {illustAll &&
              illustAll.map((illust: IHomeIllustData, index: number) => (
                <div key={index} className="w-full h-full aspect-square">
                  <Image
                    src={illust.image}
                    alt={illust.title}
                    className="object-cover w-full h-full object-top"
                  />
                </div>
              ))}
          </div>

          <div className="my-12">
            <h3 className="text-xl font-bold text-center">
              使ってみたい？
              <br className="md:hidden" />
              登録しよう！
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
          </div>
        </section>
      </article>
    </div>
  );
}
