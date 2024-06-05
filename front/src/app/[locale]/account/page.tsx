"use client";

import useSWR from "swr";
import { useTranslations } from "next-intl";
import { Email, Name, NoticeTabs } from "@/components/features/account";
import { GetFromAPI, useRouter } from "@/lib";
import { LoadingOverlay } from "@mantine/core";
import { RouterPath } from "@/settings";

interface AccountProps {
  name: string;
  email?: string;
  google_oauth2?: string;
  discord?: string;
}

const fetcher = (url: string) => GetFromAPI(url).then((res) => res.data);

export default function AccountPage() {
  const { data, error } = useSWR("/account", fetcher);
  const t_AccountSettings = useTranslations("AccountSettings");
  const router = useRouter();
  if (error) {
    router.push(RouterPath.notFound);
  }
  if (data === undefined) return <LoadingOverlay visible />;
  const account = data?.account as AccountProps;

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
              <Name accountName={account.name} />
            </dd>
            <dt className="md:border-b md:border-slate-300 md:pb-2">
              {t_AccountSettings("email")}
            </dt>
            <dd className="flex flex-col justify-center ml-4 md:ml-0 border-b border-slate-300 pb-2">
              {account.email ? (
                <Email email={account.email} />
              ) : (
                <span className="text-xs">SNS連携でログインしています</span>
              )}
            </dd>
            <dt className="md:border-b md:border-slate-300 md:pb-2">SNS連携</dt>
            <dd className="ml-4 md:ml-0 border-b border-slate-300 pb-2 flex justify-start items-start flex-wrap gap-2">
              <span
                className={`border rounded text-xs px-2 py-1  ${
                  account.google_oauth2
                    ? "border-red-500 text-red-500"
                    : "border-gray-500 text-gray-500"
                }`}
              >
                Google{account.google_oauth2 ? "連携中" : "未連携"}
              </span>
              <span
                className={`border rounded text-xs px-2 py-1  ${
                  account.discord
                    ? "border-red-500 text-red-500"
                    : "border-gray-500 text-gray-500"
                }`}
              >
                Discord{data.account.discord ? "連携中" : "未連携"}
              </span>
            </dd>
            {/* TODO : パスワード再設定はあとにする */}
            {/* <dt className="md:border-b md:border-slate-300 md:pb-2">
              {t_AccountSettings("password")}
            </dt>
            <dd className="ml-4 md:ml-0 border-b border-slate-300 pb-2">
              <button className="text-sm text-blue-500 underline hover:opacity-50 transition-all">
                {t_AccountSettings("changePassword")}
              </button>
            </dd> */}
          </dl>

          {/* TODO : 通知設定はあとにする */}
          {/* <h3 className="text-xl font-semibold text-center mt-10 mb-2">
            {t_AccountSettings("notificationSettings")}
          </h3>
          <NoticeTabs noticeState={data.notices} /> */}
        </section>
      </div>
    </article>
  );
}
