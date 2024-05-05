"use client";
import { useRouter } from "@/lib";
import { Button, ButtonGroup } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useState } from "react";

enum SortBy {
  New = 0,
  Old = 1,
}

export default function ToggleSort({ searchWords }: { searchWords: string[] }) {
  const [sortBy, setSortBy] = useState(SortBy.New);
  const router = useRouter();
  const t_General = useTranslations("General");

  const handleSort = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
    const query =
      ((searchWords?.length ?? 0) > 0 && `search=${searchWords.join(",")}`) +
      (newSortBy === SortBy.New ? "" : "&sortBy=old");
    router.push(`/illusts?${query}`);
  };

  return (
    <div>
      <ButtonGroup>
        <Button
          className={`text-black font-normal transition-all hover:bg-green-300 hover:text-black ${
            sortBy === SortBy.New ? "bg-green-300" : "bg-slate-300"
          }`}
          onClick={() => handleSort(SortBy.New)}
        >
          {t_General("newPosts")}
        </Button>

        <Button
          className={`text-black font-normal transition-all hover:bg-green-300 hover:text-black ${
            sortBy === SortBy.Old ? "bg-green-300" : "bg-slate-300"
          }`}
          onClick={() => handleSort(SortBy.Old)}
        >
          {t_General("oldPosts")}
        </Button>
      </ButtonGroup>
    </div>
  );
}
