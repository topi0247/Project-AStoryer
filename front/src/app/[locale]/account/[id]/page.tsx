"use client";

import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";
import { useState } from "react";

const noticeStatesDummy = {
  app: {
    favorite: false,
    bookmark: false,
    comment: false,
    follow: false,
  },
  email: {
    favorite: false,
    bookmark: false,
    comment: false,
    follow: false,
  },
};

export default function AccountPage() {
  const t_AccountSettings = useTranslations("AccountSettings");
  const [noticeStates, setNoticeStates] =
    useState<NoticeStates>(noticeStatesDummy);

  return (
    <article className="my-8 m-auto w-full px-4">
      <div className="bg-white p-8 rounded max-w-[480px] w-full m-auto flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {t_AccountSettings("settings")}
        </h2>
        <section className="max-w-96 w-full">
          <dl className="md:grid md:grid-cols-2 md:gap-y-2 m-auto">
            <dt className="md:border-b md:border-slate-300 md:pb-2">
              {t_AccountSettings("accountName")}
            </dt>
            <dd className="ml-4 md:ml-0 border-b border-slate-300 pb-2">
              アカウント名
            </dd>
            <dt className="md:border-b md:border-slate-300 md:pb-2">
              {t_AccountSettings("email")}
            </dt>
            <dd className="flex flex-col ml-4 md:ml-0 border-b border-slate-300 pb-2">
              *****@example.com
              <div>
                <Mantine.Button
                  variant="contained"
                  size="small"
                  className="text-xs inline-block"
                >
                  {t_AccountSettings("changeEmail")}
                </Mantine.Button>
              </div>
            </dd>
            <dt className="md:border-b md:border-slate-300 md:pb-2">
              {t_AccountSettings("password")}
            </dt>
            <dd className="ml-4 md:ml-0 border-b border-slate-300 pb-2">
              <button className="text-sm text-blue-500 underline hover:opacity-50 transition-all">
                {t_AccountSettings("changePassword")}
              </button>
            </dd>
          </dl>

          <h3 className="text-xl font-semibold text-center mt-10 mb-2">
            {t_AccountSettings("notificationSettings")}
          </h3>
          <Tabs noticeStates={noticeStates} setNoticeStates={setNoticeStates} />
          <div className="text-center">
            <Mantine.Button>保存</Mantine.Button>
          </div>
        </section>
      </div>
    </article>
  );
}

interface NoticeState {
  favorite: boolean;
  bookmark: boolean;
  comment: boolean;
  follow: boolean;
}

enum NoticeType {
  app = "app",
  email = "email",
}

interface NoticeStates {
  app: NoticeState;
  email: NoticeState;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
  noticeState: NoticeState;
  setNoticeStates: React.Dispatch<React.SetStateAction<NoticeStates>>;
}

function Tabs({
  noticeStates,
  setNoticeStates,
}: {
  noticeStates: NoticeStates;
  setNoticeStates: React.Dispatch<React.SetStateAction<NoticeStates>>;
}) {
  const [value, setValue] = useState<string>(NoticeType.app);
  const t_AccountSettings = useTranslations("AccountSettings");

  const handleChange = (newValue: string | null) => {
    if (newValue === value) return;

    if (newValue === null) {
      setValue(NoticeType.app);
      return;
    }
    setValue(newValue);
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
          <CustomTabPanel
            value={value}
            index={NoticeType.app}
            noticeState={noticeStates.app}
            setNoticeStates={setNoticeStates}
          />
        </Mantine.Tabs.Panel>
        <Mantine.Tabs.Panel value={NoticeType.email} className="my-5">
          <CustomTabPanel
            value={value}
            index={NoticeType.email}
            noticeState={noticeStates.email}
            setNoticeStates={setNoticeStates}
          />
        </Mantine.Tabs.Panel>
      </Mantine.Tabs>
    </Mantine.Box>
  );
}

function CustomTabPanel(props: TabPanelProps) {
  const { value, noticeState, index, setNoticeStates, ...other } = props;
  const t_AccountSettings = useTranslations("AccountSettings");

  const handleChange = (key: string, value: boolean) => {
    const newNoticeState = {
      ...noticeState,
      [key]: value,
    };
    setNoticeStates((prevState) => ({
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
            label={t_AccountSettings("follow")}
            checked={noticeState.follow}
            onChange={() => handleChange("follow", !noticeState.follow)}
          />
        </>
      )}
    </div>
  );
}
