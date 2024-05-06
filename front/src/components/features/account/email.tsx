"use client";

import React, { useState } from "react";
import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";
import { Put2API } from "@/lib";

interface AuthInfoProps {
  email?: string;
  google?: string;
  discord?: string;
}

export default function EmailChange(account: AuthInfoProps) {
  const [email, setEmail] = useState(account.email || "");
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const t_AccountSettings = useTranslations("AccountSettings");

  const handleEmailSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await Put2API("/account", JSON.stringify({ email }));
    if (response.status !== 200) {
      alert("更新に失敗しました");
      return;
    }
    localStorage.setItem("Uid", email);
    alert("更新しました");
    setIsChangeEmail(false);
  };

  return (
    <>
      {isChangeEmail ? (
        <form onSubmit={handleEmailSave}>
          <Mantine.TextInput
            type="email"
            placeholder={t_AccountSettings("email")}
            className="w-full"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
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
              setEmail(account.email || "");
              setIsChangeEmail(false);
            }}
          >
            変更をやめる
          </Mantine.Button>
        </form>
      ) : (
        <div className="flex flex-col justify-center items-start">
          {email}
          <Mantine.Button
            variant="transparent"
            size="xs"
            className="text-xs inline-block p-0"
            onClick={() => setIsChangeEmail(true)}
          >
            {t_AccountSettings("change")}
          </Mantine.Button>
        </div>
      )}
    </>
  );
}
