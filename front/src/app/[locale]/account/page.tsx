"use client";

import useSWR from "swr";
import { useTranslations } from "next-intl";
import { Email, Name } from "@/components/features/account";
import { Delete2API, GetFromAPI, Link, useRouter } from "@/lib";
import { Button, Checkbox, LoadingOverlay, Modal } from "@mantine/core";
import { RouterPath } from "@/settings";
import { AccountProps } from "@/types";
import { useState } from "react";
import { useAuth } from "@/hook";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoilState";

const fetcher = (url: string) => GetFromAPI(url).then((res) => res.data);

export default function AccountPage() {
  const { data, error } = useSWR("/account", fetcher);
  const { setAccessTokens } = useAuth();
  const setUser = useSetRecoilState(userState);
  const t_AccountSettings = useTranslations("AccountSettings");
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleteConfirmation, setIsDeleteConfirmation] =
    useState<boolean>(false);
  const [deleteConfirmationError, setDeleteConfirmationError] = useState("");
  const router = useRouter();
  if (error) return router.push(RouterPath.error);
  if (data === undefined) return <LoadingOverlay visible />;
  if (data === null) return router.push(RouterPath.notFound);
  const account = data?.account as AccountProps;

  const handleAccountDelete = async () => {
    if (!isDeleteConfirmation) {
      setDeleteConfirmationError("削除するにはチェックを入れてください");
      return;
    }

    try {
      const res = await Delete2API("/auth");
      if (res.status !== 200) {
        throw new Error("削除に失敗しました");
      }
      setAccessTokens("", "", "", "");
      setUser({
        uuid: "",
        name: "",
        avatar: "",
        following_count: 0,
        follower_count: 0,
      });
      setModalOpen(false);
      router.push(RouterPath.home);
    } catch (error) {
      alert("エラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <article className="my-8 m-auto w-full px-4">
      <div className="bg-white p-8 rounded max-w-[480px] w-full m-auto flex flex-col justify-center items-center gap-8">
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
                <Email account={account} />
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
            <dt className="md:border-b md:border-slate-300 md:pb-2">
              {t_AccountSettings("password")}
            </dt>
            <dd className="ml-4 md:ml-0 border-b border-slate-300 pb-2">
              <Link
                href={RouterPath.requestPasswordReset}
                className="text-sm text-blue-500 underline hover:opacity-50 transition-all"
              >
                {t_AccountSettings("changePassword")}
              </Link>
            </dd>
          </dl>
        </section>
        <section>
          <Button
            color="red"
            className="transition-all hover:bg-red-700"
            onClick={() => setModalOpen(true)}
          >
            アカウント削除
          </Button>
          <Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
            <div className="flex flex-col justify-center items-center text-center gap-4">
              <p>
                投稿データが永続的に失われます。
                <br />
                本当に削除してよろしいですか？
              </p>
              <Checkbox
                label="アカウントを削除する"
                size="md"
                radius="xl"
                color="red"
                checked={isDeleteConfirmation}
                onChange={(event) =>
                  setIsDeleteConfirmation(event.currentTarget.checked)
                }
              />
              {deleteConfirmationError !== "" && (
                <p className="text-red-400">{deleteConfirmationError}</p>
              )}
              <Button
                type="button"
                color="red"
                onClick={() => handleAccountDelete()}
              >
                削除
              </Button>
              <Button
                type="button"
                color="gray"
                onClick={() => {
                  setModalOpen(false);
                  setIsDeleteConfirmation(false);
                  setDeleteConfirmationError("");
                }}
              >
                戻る
              </Button>
            </div>
          </Modal>
        </section>
        <section>
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
