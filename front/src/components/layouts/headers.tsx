"use client";
import { Link, useRouter } from "@/lib";
import * as RecoilState from "@/recoilState";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import Image from "next/image";
import { RequiredLoginModal } from "@/components/ui";
import { IoMdSearch, IoMdSettings } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import * as Mantine from "@mantine/core";
import { FaRegBookmark } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IconContext } from "react-icons/lib";

export default function Headers() {
  const t_Header = useTranslations("Header");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const setModalOpen = useSetRecoilState(RecoilState.modalOpenState);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return;
    const searchWords = search.split(/\s|　/).join(",");
    router.push(`/illusts?search=${searchWords}`);
  };

  const handlePost = () => {
    // TODO : ログインユーザーであれば画面遷移する
    // router.push("/illusts/post");
    // TODO : ログインユーザーでなければログインや登録を促す
    setModalOpen(true);
  };

  return (
    <>
      <header className="flex justify-between items-center ml-2 md:mx-8 md:my-2">
        <h1>
          <Link href="/">
            <Image
              src="/logo.png"
              width={150}
              height={300}
              style={{ width: "150px", height: "auto" }}
              alt="logo"
              priority={true}
            />
          </Link>
        </h1>
        <div className="md:flex md:items-center md:justify-center md:gap-8">
          <div className="hidden  md:flex md:flex-col md:justify-end md:items-start">
            <form
              className="md:flex md:justify-center md:items-center gap-2"
              onSubmit={handleSearch}
            >
              <label className="bg-green-100 rounded md:text-sm md:flex md:justify-center md:items-center text-gray-400">
                <IconContext.Provider value={{ size: "1.5rem" }}>
                  <IoMdSearch />
                </IconContext.Provider>
                <Mantine.TextInput
                  className="bg-green-100 focus:outline-none w-60 text-black"
                  placeholder={t_Header("searchPlaceholder")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearch(e.target.value)
                  }
                  variant="transparent"
                />
              </label>
              <Mantine.Button
                type="submit"
                variant="contained"
                size="small"
                className="bg-green-200 hover:bg-green-400 text-black transition-all"
              >
                {t_Header("searchButton")}
              </Mantine.Button>
            </form>
          </div>
          <Mantine.Button
            variant="contained"
            onClick={handlePost}
            className="hidden md:block bg-orange-200 hover:bg-orange-400 text-black  transition-all"
          >
            {t_Header("postButton")}
          </Mantine.Button>
          {AccountMenu()}
        </div>
      </header>
      <RequiredLoginModal />
    </>
  );
}

function AccountMenu() {
  const t_Menu = useTranslations("MyMenu");
  const router = useRouter();

  const handleLink = (path: string) => {
    router.push(`/${path}`);
  };

  const handleLogout = async () => {
    // TODO : ログアウト処理をここに書く
  };

  return (
    <Mantine.Menu shadow="md" width={200}>
      <Mantine.Menu.Target>
        <Mantine.Avatar
          alt="icon"
          variant="light"
          src="https://placehold.jp/300x300.png"
          className="cursor-pointer"
          radius="xl"
          size="lg"
        />
      </Mantine.Menu.Target>
      <Mantine.Menu.Dropdown>
        <Mantine.Menu.Item onClick={() => handleLink("users/1")}>
          <div className="flex justify-center items-center">
            <Mantine.Avatar
              alt="icon"
              src="https://placehold.jp/300x300.png"
              variant="light"
              radius="xl"
              size="lg"
            />
            <span className="ml-4">ユーザー名</span>
          </div>
        </Mantine.Menu.Item>
        <div className="flex justify-center items-center">
          <Mantine.Menu.Item onClick={() => handleLink("#")}>
            <div className="flex flex-col justify-center items-center">
              <span className="text-center">{t_Menu("follow")}</span>
              <span>10</span>
            </div>
          </Mantine.Menu.Item>
          <Mantine.Menu.Item onClick={() => handleLink("#")}>
            <div className="flex flex-col justify-center items-center">
              <span>{t_Menu("follower")}</span>
              <span>10</span>
            </div>
          </Mantine.Menu.Item>
        </div>
        <Mantine.Menu.Item
          onClick={() => handleLink("users/1")}
          leftSection={<VscAccount />}
        >
          {t_Menu("myPage")}
        </Mantine.Menu.Item>
        <Mantine.Menu.Item
          onClick={() => handleLink("users/1/bookmarks")}
          leftSection={<FaRegBookmark />}
        >
          {t_Menu("bookmark")}
        </Mantine.Menu.Item>
        <Mantine.Menu.Item
          onClick={() => handleLink("account/1")}
          leftSection={<IoMdSettings />}
        >
          {t_Menu("setting")}
        </Mantine.Menu.Item>
        <Mantine.Menu.Item onClick={handleLogout} leftSection={<MdLogout />}>
          {t_Menu("logout")}
        </Mantine.Menu.Item>
      </Mantine.Menu.Dropdown>
    </Mantine.Menu>
  );
}
