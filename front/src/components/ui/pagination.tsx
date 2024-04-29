"use client";

import * as MUI from "@mui/material";
import { useEffect, useState } from "react";

export default function Pagination({
  elementName,
  adjust = 0,
}: {
  elementName?: string;
  adjust: number;
}) {
  const [page, setPage] = useState(1);
  const [topPosY, setTopPosY] = useState<number>(0);

  useEffect(() => {
    if (elementName === undefined) return;
    const element = document.querySelector(elementName);
    if (element === null) return;
    setTopPosY(element.getBoundingClientRect().top);
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({
      top: topPosY + adjust,
      behavior: "smooth",
    });
  };

  return (
    <article className="w-full m-auto text-center">
      <div className="md:hidden">
        <MUI.Pagination
          count={11}
          defaultPage={1}
          size="medium"
          className="inline-block"
          onChange={handleChange}
          page={page}
        />
      </div>
      <div className="hidden md:block">
        <MUI.Pagination
          count={11}
          defaultPage={1}
          size="large"
          className="inline-block"
          onChange={handleChange}
          page={page}
        />
      </div>
    </article>
  );
}
