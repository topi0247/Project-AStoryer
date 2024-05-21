"use client";
import React from "react";
import { HomeParallax } from "@/components/features/home";
import { GetFromAPI } from "@/lib";
import useSWR from "swr";
import { H2, LoginLink } from "@/components/ui";

const fetcher = (url: string) => GetFromAPI(url).then((res) => res.data);

export default function Home() {
  const { data, error } = useSWR("/posts", fetcher);
  if (error) return;
  if (!data) return;

  const illusts = data.map(
    (illust: {
      id: number;
      title: string;
      data: string[];
      user: {
        id: number;
        name: string;
        avatar: string;
      };
    }) => ({
      id: illust.id,
      title: illust.title,
      image: illust.data[0],
      user: {
        id: illust.user.id,
        name: illust.user.name,
        avatar: illust.user.avatar,
      },
    })
  );

  return (
    <>
      <HomeParallax illusts={illusts} />
      <article className="flex justify-center items-center gap-8 flex-col mb-20 px-8 w-full max-w-[600px] m-auto">
        <H2>AStoryer - あすとりや - とは</H2>
        <section className="text-sm md:text-base bg-white p-4 rounded w-full">
          <p>TRPGの創作物を投稿できるサービスです</p>
          <p>例えば…</p>
          <ul className="list-disc pl-6">
            <li>ディスプレイ立ち絵</li>
            <li>自PCの立ち絵</li>
            <li>自PCや自陣のイラスト</li>
          </ul>
          <p>などなど…</p>
        </section>
        <section className="w-full">
          <h3 className="font-semibold mb-2 md:text-xl">できること</h3>
          <ul className="bg-white p-2 rounded text-sm md:text-base">
            <li>イラストの閲覧</li>
            <li>ユーザーページ閲覧</li>
            <li>検索と検索結果の閲覧</li>
            <li>
              イラストの投稿や編
              <span className="text-xs ml-2">※登録ユーザーのみ</span>
            </li>
          </ul>
        </section>
        <section className="w-full">
          <h3 className="font-semibold mb-2 md:text-xl">試験提供中</h3>
          <p className="text-sm">現在β版につき、機能変更・追加があります。</p>
          <div className="bg-white text-sm md:text-base rounded p-2">
            <p>
              追加予定機能 <br />
              （変わる可能性があります）
            </p>
            <ul className="list-disc pl-6">
              <li>フォロー・フォロワー機能</li>
              <li>ブックマーク機能</li>
              <li>投稿へのコメント機能</li>
            </ul>
          </div>
        </section>
        <section className="w-full flex flex-col justify-center items-center gap-8">
          <h3 className="text-xl font-semibold">さっそく使ってみる！</h3>
          <LoginLink />
        </section>
      </article>
    </>
  );
}
