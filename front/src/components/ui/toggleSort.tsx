"use client";
import { useRouter } from "@/lib";
import { useTranslations } from "next-intl";
import { useState } from "react";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: "0px 2px",
    border: 0,
    borderRadius: theme.shape.borderRadius,
    letterSpacing: "2px",
    textAlign: "center",
  },
}));

enum SortBy {
  New = 0,
  Old = 1,
}

export default function ToggleSort({ searchWords }: { searchWords: string[] }) {
  const [sortBy, setSortBy] = useState(SortBy.New);
  const router = useRouter();
  const t_General = useTranslations("General");

  const handleSort = (
    event: React.MouseEvent<HTMLElement>,
    newSortBy: SortBy
  ) => {
    setSortBy(newSortBy);
    const query =
      ((searchWords?.length ?? 0) > 0 && `search=${searchWords.join(",")}`) +
      (newSortBy === SortBy.New ? "" : "&sortBy=old");
    router.push(`/illusts?${query}`);
  };

  return (
    <div>
      <StyledToggleButtonGroup
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
      </StyledToggleButtonGroup>
    </div>
  );
}
