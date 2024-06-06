"use client";

import React, { useState } from "react";
import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";
import { Put2API } from "@/lib";
import { AccountProps } from "@/types";

export default function EmailChange({ account }: { account: AccountProps }) {
  const [email, setEmail] = useState(account.email);
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const t_AccountSettings = useTranslations("AccountSettings");

  const handleEmailSave = async (e: React.FormEvent) => {
    // TODO : メアド変更はセンシティブなのでAPIを介するようにする
    // e.preventDefault();
    // const response = await Put2API("/account", JSON.stringify({ email }));
    // if (response.status !== 200) {
    //   alert("更新に失敗しました");
    //   return;
    // }
    // localStorage.setItem("Uid", email);
    // alert("更新しました");
    // setIsChangeEmail(false);
  };

  const changeableEmail = () => {
    return false;

    // TODO : メアド変更はセンシティブなのでAPIを介するようにする
    if (account.google_oauth2 || account.discord) {
      return false;
    }
    return true;
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
          {changeableEmail() && (
            <Mantine.Button
              variant="transparent"
              size="xs"
              className="text-xs inline-block p-0"
              onClick={() => setIsChangeEmail(true)}
            >
              {t_AccountSettings("change")}
            </Mantine.Button>
          )}
        </div>
      )}
    </>
  );
}
