"use client";

import { useState } from "react";
import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";
import { Put2API } from "@/lib";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoilState";

export default function Name({ accountName }: { accountName: string }) {
  const [name, setName] = useState(accountName);
  const [isChangeName, setIsChangeName] = useState(false);
  const t_AccountSettings = useTranslations("AccountSettings");
  const setUser = useSetRecoilState(userState);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await Put2API("/account", JSON.stringify({ name }));
    if (response.status !== 200) {
      alert("更新に失敗しました");
      return;
    }
    setIsChangeName(false);
    setUser((prev) => ({ ...prev, name }));
    alert("更新しました");
  };

  return (
    <>
      {isChangeName ? (
        <form onSubmit={handleSave}>
          <Mantine.TextInput
            type="text"
            placeholder={t_AccountSettings("name")}
            className="w-full"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
          <Mantine.Button
            type="submit"
            variant="transparent"
            size="xs"
            className="text-xs inline-block p-0 mr-2"
          >
            保存
          </Mantine.Button>
          <Mantine.Button
            type="button"
            variant="transparent"
            size="xs"
            className="text-xs inline-block p-0 ml-2"
            onClick={() => {
              setName(accountName);
              setIsChangeName(false);
            }}
          >
            変更をやめる
          </Mantine.Button>
        </form>
      ) : (
        <div className="flex flex-col justify-center items-start">
          {name}
          <Mantine.Button
            variant="transparent"
            size="xs"
            className="text-xs inline-block p-0"
            onClick={() => setIsChangeName(true)}
          >
            {t_AccountSettings("change")}
          </Mantine.Button>
        </div>
      )}
    </>
  );
}
