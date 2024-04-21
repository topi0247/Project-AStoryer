"use client";

import * as MUI from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

const noticeStates = {
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
                <MUI.Button
                  variant="contained"
                  size="small"
                  className="text-xs inline-block"
                >
                  {t_AccountSettings("changeEmail")}
                </MUI.Button>
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
          <Tabs noticeStates={noticeStates} />
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

interface NoticeStates {
  app: NoticeState;
  email: NoticeState;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  noticeState: NoticeState;
}

function Tabs({ noticeStates }: { noticeStates: NoticeStates }) {
  const [value, setValue] = useState(0);
  const t_AccountSettings = useTranslations("AccountSettings");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <MUI.Box sx={{ width: "100%" }}>
      <MUI.Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MUI.Tabs
          value={value}
          onChange={handleChange}
          aria-label={t_AccountSettings("notificationSettings")}
        >
          <MUI.Tab label={t_AccountSettings("app")} {...a11yProps(0)} />
          <MUI.Tab label={t_AccountSettings("mail")} {...a11yProps(1)} />
        </MUI.Tabs>
      </MUI.Box>
      <CustomTabPanel value={value} index={0} noticeState={noticeStates.app} />
      <CustomTabPanel
        value={value}
        index={1}
        noticeState={noticeStates.email}
      />
    </MUI.Box>
  );
}

function CustomTabPanel(props: TabPanelProps) {
  const { value, index, ...other } = props;
  const [noticeState, setNoticeState] = useState<NoticeState>(
    props.noticeState
  );
  const t_AccountSettings = useTranslations("AccountSettings");

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
          <MUI.FormControlLabel
            control={
              <MUI.Switch
                onChange={() =>
                  setNoticeState((prevState) => ({
                    ...prevState,
                    favorite: !prevState.favorite,
                  }))
                }
              />
            }
            label={t_AccountSettings("favorite")}
            checked={noticeState.favorite}
          />
          <MUI.FormControlLabel
            control={
              <MUI.Switch
                onChange={() =>
                  setNoticeState((prevState) => ({
                    ...prevState,
                    bookmark: !prevState.bookmark,
                  }))
                }
              />
            }
            label={t_AccountSettings("bookmark")}
            checked={noticeState.bookmark}
          />
          <MUI.FormControlLabel
            control={
              <MUI.Switch
                onChange={() =>
                  setNoticeState((prevState) => ({
                    ...prevState,
                    comment: !prevState.comment,
                  }))
                }
              />
            }
            label={t_AccountSettings("comment")}
            checked={noticeState.comment}
          />
          <MUI.FormControlLabel
            control={
              <MUI.Switch
                onChange={() =>
                  setNoticeState((prevState) => ({
                    ...prevState,
                    follow: !prevState.follow,
                  }))
                }
              />
            }
            label={t_AccountSettings("follow")}
            checked={noticeState.follow}
          />
        </>
      )}
    </div>
  );
}
