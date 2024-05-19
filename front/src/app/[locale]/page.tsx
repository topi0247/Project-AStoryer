"use client";
import React from "react";
import { HomeParallax } from "@/components/features/home";
import { GetFromAPI } from "@/lib";
import useSWR from "swr";

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
    </>
  );
}
