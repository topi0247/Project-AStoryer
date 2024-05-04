"use client";

import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";
import { useState } from "react";

const noticeStatesDummy = {
  app: {
    favorite: true,
    bookmark: true,
    comment: true,
    follow: true,
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
          <Tabs noticeStates={noticeStatesDummy} />
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

enum NoticeTypes {
  app = "app",
  email = "email",
}

interface NoticeStates {
  app: NoticeState;
  email: NoticeState;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: string | null;
  value: string | null;
  noticeState: NoticeState;
}

function Tabs({ noticeStates }: { noticeStates: NoticeStates }) {
  const [value, setValue] = useState<string | null>("");
  const t_AccountSettings = useTranslations("AccountSettings");

  const handleChange = (newValue: string | null) => {
    if (newValue === value) return;

    if (newValue === null) {
      setValue(NoticeTypes.app);
      return;
    }
    setValue(newValue);
  };

  // const a11yProps = (index: number) => {
  //   return {
  //     id: `simple-tab-${index}`,
  //     "aria-controls": `simple-tabpanel-${index}`,
  //   };
  // };

  return (
    <Mantine.Box>
      <Mantine.Tabs value={value} onChange={handleChange}>
        <Mantine.Tabs.List
          aria-label={t_AccountSettings("notificationSettings")}
        >
          <Mantine.Tabs.Tab value={NoticeTypes.app}>
            {t_AccountSettings("app")}
          </Mantine.Tabs.Tab>
          <Mantine.Tabs.Tab value={NoticeTypes.email}>
            {t_AccountSettings("mail")}
          </Mantine.Tabs.Tab>
        </Mantine.Tabs.List>
        <Mantine.Tabs.Panel value={NoticeTypes.app}>
          <CustomTabPanel
            value={value}
            index={NoticeTypes.app}
            noticeState={noticeStates.app}
          />
          <CustomTabPanel
            value={value}
            index={NoticeTypes.app}
            noticeState={noticeStates.email}
          />
        </Mantine.Tabs.Panel>
      </Mantine.Tabs>
    </Mantine.Box>
  );
}

function CustomTabPanel(props: TabPanelProps) {
  const { value, noticeState, index, ...other } = props;

  const [newNoticeState, setNewNoticeState] =
    useState<NoticeState>(noticeState);
  const t_AccountSettings = useTranslations("AccountSettings");

  if (value === null) return null;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          <Mantine.Switch
            label={t_AccountSettings("favorite")}
            checked={newNoticeState.favorite}
            onChange={() =>
              setNewNoticeState((prevState) => ({
                ...prevState,
                favorite: !prevState.favorite,
              }))
            }
          />
          <Mantine.Switch
            label={t_AccountSettings("bookmark")}
            checked={newNoticeState.bookmark}
            onChange={() =>
              setNewNoticeState((prevState) => ({
                ...prevState,
                bookmark: !prevState.bookmark,
              }))
            }
          />
          <Mantine.Switch
            label={t_AccountSettings("comment")}
            checked={newNoticeState.comment}
            onChange={() =>
              setNewNoticeState((prevState) => ({
                ...prevState,
                comment: !prevState.comment,
              }))
            }
          />
          <Mantine.Switch
            label={t_AccountSettings("follow")}
            checked={newNoticeState.follow}
            onChange={() =>
              setNewNoticeState((prevState) => ({
                ...prevState,
                follow: !prevState.follow,
              }))
            }
          />
        </>
      )}
    </div>
  );
}
