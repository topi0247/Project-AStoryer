"use client";

import { useEffect, useState } from "react";
import * as Mantine from "@mantine/core";

export default function Pagination({
  elementName,
  adjust = 0,
}: {
  elementName?: string;
  adjust: number;
}) {
  const [total, setTotal] = useState<number>(20);
  const [page, setPage] = useState(1);
  const [topPosY, setTopPosY] = useState<number>(0);

  useEffect(() => {
    if (elementName === undefined) return;
    const element = document.querySelector(elementName);
    if (element === null) return;
    setTopPosY(element.getBoundingClientRect().top);
  }, [elementName]);

  const handleChange = (value: number) => {
    setPage(value);
    // TODO : プロフィール文章を表示しているとずれる
    window.scrollTo({
      top: topPosY + adjust,
      behavior: "smooth",
    });
  };

  return (
    <article className="w-full flex justify-center items-center">
      <Mantine.Pagination
        total={total}
        siblings={1}
        defaultValue={10}
        value={page}
        onChange={handleChange}
        boundaries={1}
        color="green"
      />
    </article>
  );
}
