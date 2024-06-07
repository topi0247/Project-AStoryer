"use client";

import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";
import { Tab } from "@/types";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoilState";
import { useEffect, useState } from "react";

export default function UserTabs({
  userUuid,
  tabType,
  handleTabChange,
}: {
  userUuid: string;
  tabType: Tab;
  handleTabChange: (value: Tab) => void;
}) {
  const [tab, setTab] = useState<Tab>(tabType);
  const t_UserPage = useTranslations("UserPage");
  const user = useRecoilValue(userState);

  useEffect(() => {
    setTab(tabType);
  }, [tabType]);

  const handleChange = (tabName: string | null) => {
    if (!tabName) return;
    setTab(tabName as Tab);
    handleTabChange(tabName as Tab);
  };

  return (
    <Mantine.Tabs
      value={tab}
      onChange={handleChange}
      color="rgb(74 222 128)"
      className="overflow-x-auto"
    >
      <Mantine.Tabs.List aria-label="一覧切り替え">
        <Mantine.Tabs.Tab value={Tab.post} className="transition-all">
          {t_UserPage("post")}
        </Mantine.Tabs.Tab>
        <Mantine.Tabs.Tab value={Tab.bookmark} className="transition-all">
          {t_UserPage("bookmark")}
        </Mantine.Tabs.Tab>
        {user.uuid === userUuid && (
          <Mantine.Tabs.Tab value={Tab.following} className="transition-all">
            {t_UserPage("following")}
          </Mantine.Tabs.Tab>
        )}
        <Mantine.Tabs.Tab value={Tab.follower} className="transition-all">
          {t_UserPage("follower")}
        </Mantine.Tabs.Tab>
      </Mantine.Tabs.List>
    </Mantine.Tabs>
  );
}
