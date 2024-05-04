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
          color={sortBy === SortBy.New ? "bg-green-100" : "bg-slate-300"}
          onClick={() => handleSort(SortBy.New)}
        >
          {t_General("newPosts")}
        </Button>

        <Button
          color={sortBy === SortBy.Old ? "bg-green-100" : "bg-slate-300"}
          onClick={() => handleSort(SortBy.Old)}
        >
          {t_General("newPosts")}
        </Button>
      </ButtonGroup>
      {/* <StyledToggleButtonGroup
        value={sortBy}
        exclusive
        onChange={handleSort}
        aria-label={t_General("sortBy")}
      >
        <ToggleButton value={SortBy.New} aria-label={t_General("newPosts")}>
          {t_General("newPosts")}
        </ToggleButton>
        <ToggleButton value={SortBy.Old} aria-label={t_General("oldPosts")}>
          {t_General("oldPosts")}
        </ToggleButton>
      </StyledToggleButtonGroup> */}
    </div>
  );
}
