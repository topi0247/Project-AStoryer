"use client";
import * as MUI_LAB from "@mui/lab";
import * as MUI from "@mui/material";
import { useState } from "react";

enum Tab {
  post = "myPage",
  bookmark = "bookmark",
}

export default function Tabs() {
  const [value, setValue] = useState(Tab.post);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue as Tab);
  };

  return (
    <MUI_LAB.TabContext value={value}>
      <MUI_LAB.TabList aria-label="一覧切り替え" onChange={handleChange}>
        <MUI.Tab label="投稿一覧" value={Tab.post} />
        <MUI.Tab label="ブックマーク一覧" value={Tab.bookmark} />
      </MUI_LAB.TabList>
    </MUI_LAB.TabContext>
  );
}
