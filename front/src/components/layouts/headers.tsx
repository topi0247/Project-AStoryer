"use client";
import { useRecoilState } from "recoil";
import { useAuth } from "@/hook";
import { IUser } from "@/types";
import { Link, useRouter } from "@/lib";
import * as RecoilState from "@/recoilState";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { IoMdSearch, IoMdSettings } from "rocketicons/io";
import { VscAccount } from "rocketicons/vsc";
import * as Mantine from "@mantine/core";
import { FaRegBookmark } from "rocketicons/fa";
import { MdLogout } from "rocketicons/md";
import { RouterPath } from "@/settings";
import SpHeaders from "./spHeaders";
import { LoginLink, SearchModal } from "../ui";

export default function Headers() {
  const [user, setUser] = useRecoilState(RecoilState.userState);
  const { autoLogin, logout, setAccessTokens } = useAuth();
  const t_Header = useTranslations("Header");
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user.name !== "") return;
    const fetchData = async () => {
      const params = new URLSearchParams(window.location.search);
      const status = params.get("status");
      if (status === "error") {
        // TODO : 表示方法を考える
        alert("ログインに失敗しました。");
        return;
      }

      const accessToken = params.get("token");
      const uid = params.get("uid");
      const client = params.get("client");
      const expiry = params.get("expiry");
      if (accessToken && uid && client && expiry) {
        setAccessTokens(accessToken, client, uid, expiry);
      }

      const result = await autoLogin();
      if (result.success && result.user) {
        setUser(result.user);
        return;
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return;
    const searchWords = search.split(/\s|　/).join(",");
    router.push(RouterPath.illustSearch(`search=${searchWords}`));
  };

  const handlePost = () => {
    router.push(RouterPath.illustPost);
  };

  const handleLogout = async () => {
    const result = await logout();
    setUser({
      id: -1,
      name: "",
      avatar: "",
      following_count: 0,
      follower_count: 0,
    });
    router.push(RouterPath.home);
  };

  return (
    <>
      <header className="p-2 flex justify-center md:justify-between items-center md:mx-8 md:my-2">
        <h1>
          <Link
            href={RouterPath.home}
            className="flex flex-col justify-center items-center w-32 h-auto object-contain"
          >
            <Mantine.Image src="/assets/AppLogo.png" />
          </Link>
        </h1>
        <div className="ml-8 md:ml-0 md:flex md:items-center md:justify-center md:gap-8">
          <div className="hidden md:flex md:flex-col md:justify-end md:items-start">
            {/* TODO : OR検索がうまくできないので一旦後回し */}
            {/* <form
              className="md:flex md:justify-center md:items-center gap-2"
              onSubmit={handleSearch}
            >
              <label className="bg-green-100 rounded md:text-sm md:flex md:justify-center md:items-center text-gray-400 pl-2">
                <IoMdSearch className="icon-gray-500" />
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
            </form> */}
            <SearchModal />
          </div>
          {user.name ? (
            <>
              <Mantine.Button
                variant="contained"
                onClick={handlePost}
                className="hidden md:block bg-orange-200 hover:bg-orange-400 text-black  transition-all"
              >
                {t_Header("postButton")}
              </Mantine.Button>
              <div className="hidden md:block">
                <AccountMenu user={user} handleLogout={handleLogout} />
              </div>
            </>
          ) : (
            <LoginLink />
          )}
        </div>
      </header>

      {/* SP */}
      <div className="md:hidden">
        <SpHeaders user={user} handleLogout={handleLogout} />
      </div>
    </>
  );
}

export function AccountMenu({
  user,
  handleLogout,
}: {
  user: IUser;
  handleLogout: () => void;
}) {
  const t_Menu = useTranslations("MyMenu");
  const router = useRouter();

  const handleLink = (path: string) => {
    router.push(`/${path}`);
  };

  return (
    <Mantine.Menu shadow="md" width={200}>
      <Mantine.Menu.Target>
        <Mantine.Avatar
          alt="icon"
          variant="default"
          src={user.avatar}
          className="cursor-pointer"
          radius="xl"
          size="lg"
        />
      </Mantine.Menu.Target>
      <Mantine.Menu.Dropdown>
        <Mantine.Menu.Item
          onClick={() => handleLink(RouterPath.users(user.id))}
        >
          <div className="flex justify-start items-center">
            <Mantine.Avatar
              alt="icon"
              src={user.avatar}
              variant="default"
              radius="xl"
              size="lg"
            />
            <span className="ml-4">{user.name}</span>
          </div>
        </Mantine.Menu.Item>
        {/* <div className="flex justify-center items-center">
          <Mantine.Menu.Item
            onClick={() => handleLink(RouterPath.users(user.id))}
          >
            <div className="flex flex-col justify-center items-center">
              <span className="text-center">{t_Menu("follow")}</span>
              <span>{user.following_count}</span>
            </div>
          </Mantine.Menu.Item>
          <Mantine.Menu.Item
            onClick={() => handleLink(RouterPath.users(user.id))}
          >
            <div className="flex flex-col justify-center items-center">
              <span>{t_Menu("follower")}</span>
              <span>{user.follower_count}</span>
            </div>
          </Mantine.Menu.Item>
        </div> */}
        <Mantine.Menu.Item
          onClick={() => handleLink(RouterPath.users(user.id))}
          leftSection={<VscAccount />}
        >
          {t_Menu("myPage")}
        </Mantine.Menu.Item>
        {/* <Mantine.Menu.Item
          onClick={() => handleLink(RouterPath.bookmark(user.id))}
          leftSection={<FaRegBookmark />}
        >
          {t_Menu("bookmark")}
        </Mantine.Menu.Item> */}
        <Mantine.Menu.Item
          onClick={() => handleLink(RouterPath.account)}
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
