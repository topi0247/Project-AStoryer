"use client";
import { useRouter } from "@/lib";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
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

  const handleSort = (
    event: React.MouseEvent<HTMLElement>,
    newSortBy: SortBy
  ) => {
    setSortBy(newSortBy);
    const query =
      (searchWords.length > 0 && `search=${searchWords.join(",")}`) +
      (newSortBy === SortBy.New ? "" : "&sortBy=old");
    router.push(`/illusts?${query}`);
  };

  return (
    <div>
      <StyledToggleButtonGroup
        value={sortBy}
        exclusive
        onChange={handleSort}
        aria-label="表示順"
      >
        <ToggleButton value={SortBy.New} aria-label="新着順">
          新着順
        </ToggleButton>
        <ToggleButton value={SortBy.Old} aria-label="投稿順">
          投稿順
        </ToggleButton>
      </StyledToggleButtonGroup>
    </div>
  );
}
