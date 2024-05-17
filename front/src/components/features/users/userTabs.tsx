"use client";
import { useState } from "react";
import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";

enum Tab {
  post = "myPage",
  bookmark = "bookmark",
}

export default function UserTabs() {
  const [value, setValue] = useState<string | null>(Tab.post);
  const t_UserPage = useTranslations("UserPage");

  const handleChange = (newValue: string | null) => {
    if (newValue === value) return;

    if (newValue === null) {
      setValue(Tab.post);
      return;
    }
    setValue(newValue as Tab);
  };

  return (
    <Mantine.Tabs value={value} onChange={handleChange}>
      <Mantine.Tabs.List
        aria-label="一覧切り替え"
        className="before:border-none"
      >
        <Mantine.Tabs.Tab
          value={Tab.post}
          className="border-green-400 transition-all hover:bg-transparent cursor-default"
        >
          {t_UserPage("post")}
        </Mantine.Tabs.Tab>
        {/* TODO : ブックマーク機能を追加したら追加 */}
        {/* <Mantine.Tabs.Tab value={Tab.bookmark}>
          {t_UserPage("bookmark")}
        </Mantine.Tabs.Tab> */}
      </Mantine.Tabs.List>
    </Mantine.Tabs>
  );
}
