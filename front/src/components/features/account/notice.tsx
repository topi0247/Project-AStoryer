"use client";

import { NoticeState, NoticeStates } from "@/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import * as Mantine from "@mantine/core";
import { Put2API } from "@/lib";

enum NoticeType {
  app = "app",
  email = "email",
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
  noticeState: NoticeState;
  setNewNoticeState: React.Dispatch<React.SetStateAction<NoticeStates>>;
}

export default function NoticeTabs({
  noticeStates,
}: {
  noticeStates: NoticeStates;
}) {
  const [value, setValue] = useState<string>(NoticeType.app);
  const t_AccountSettings = useTranslations("AccountSettings");
  const [newNoticeState, setNewNoticeState] =
    useState<NoticeStates>(noticeStates);
  const t_General = useTranslations("General");

  const handleChange = (newValue: string | null) => {
    if (newValue === value) return;

    if (newValue === null) {
      setValue(NoticeType.app);
      return;
    }
    setValue(newValue);
  };

  const handleSave = async () => {
    const response = await Put2API("/notice", JSON.stringify(newNoticeState));
    if (response.status !== 200) {
      alert("更新に失敗しました");
      return;
    }
    alert("更新しました");
  };

  return (
    <Mantine.Box>
      <Mantine.Tabs value={value} onChange={handleChange}>
        <Mantine.Tabs.List
          aria-label={t_AccountSettings("notificationSettings")}
        >
          <Mantine.Tabs.Tab value={NoticeType.app}>
            {t_AccountSettings("app")}
          </Mantine.Tabs.Tab>
          <Mantine.Tabs.Tab value={NoticeType.email}>
            {t_AccountSettings("mail")}
          </Mantine.Tabs.Tab>
        </Mantine.Tabs.List>
        <Mantine.Tabs.Panel value={NoticeType.app} className="my-5">
          <NoticePanel
            value={value}
            index={NoticeType.app}
            noticeState={newNoticeState.app}
            setNewNoticeState={setNewNoticeState}
          />
        </Mantine.Tabs.Panel>
        <Mantine.Tabs.Panel value={NoticeType.email} className="my-5">
          <NoticePanel
            value={value}
            index={NoticeType.email}
            noticeState={newNoticeState.email}
            setNewNoticeState={setNewNoticeState}
          />
        </Mantine.Tabs.Panel>
      </Mantine.Tabs>
      <div className="text-center">
        <Mantine.Button type="button" onClick={handleSave}>
          {t_General("save")}
        </Mantine.Button>
      </div>
    </Mantine.Box>
  );
}

function NoticePanel(props: TabPanelProps) {
  const { value, index, noticeState, setNewNoticeState, ...other } = props;
  const t_AccountSettings = useTranslations("AccountSettings");

  const handleChange = (key: string, value: boolean) => {
    const newNoticeState = {
      ...noticeState,
      [key]: value,
    };
    setNewNoticeState((prevState) => ({
      ...prevState,
      [index]: newNoticeState,
    }));
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      className="flex flex-col gap-2"
    >
      {value === index && (
        <>
          <Mantine.Switch
            label={t_AccountSettings("favorite")}
            checked={noticeState.favorite}
            onChange={() => handleChange("favorite", !noticeState.favorite)}
          />
          <Mantine.Switch
            label={t_AccountSettings("bookmark")}
            checked={noticeState.bookmark}
            onChange={() => handleChange("bookmark", !noticeState.bookmark)}
          />
          <Mantine.Switch
            label={t_AccountSettings("comment")}
            checked={noticeState.comment}
            onChange={() => handleChange("comment", !noticeState.comment)}
          />
          <Mantine.Switch
            label={t_AccountSettings("follower")}
            checked={noticeState.follower}
            onChange={() => handleChange("follower", !noticeState.follower)}
          />
        </>
      )}
    </div>
  );
}
