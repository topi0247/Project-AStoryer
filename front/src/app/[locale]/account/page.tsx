"use client";

import useSWR from "swr";
import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";
import { NoticeTabs } from "@/components/features/account";
import { useGet } from "@/hook";

const fetcher = (url: string) => useGet(url);

export default function AccountPage() {
  const { data, error } = useSWR("/account", fetcher);
  const t_AccountSettings = useTranslations("AccountSettings");
  // TODO : ローディング・エラー画面
  if (error) return <div>error</div>;
  if (data === undefined) return <div>Now Loading</div>;

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
              {data.account.name}
            </dd>
            <dt className="md:border-b md:border-slate-300 md:pb-2">
              {t_AccountSettings("email")}
            </dt>
            <dd className="flex flex-col ml-4 md:ml-0 border-b border-slate-300 pb-2">
              {data.account.email ?? data.account.google | data.account.discord}
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
          <NoticeTabs noticeStates={data.notices} />
        </section>
      </div>
    </article>
  );
}
