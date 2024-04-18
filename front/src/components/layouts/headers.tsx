"use client";
import { Link, useRouter } from "@/lib";
import * as RecoilState from "@/recoilState";
import * as MUI_ICONS from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import * as MUI from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import * as UI from "@/components/ui";
import Image from "next/image";

export default function Headers() {
  const t_Header = useTranslations("Header");
  const t_Auth = useTranslations("Auth");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const setModalOpen = useSetRecoilState(RecoilState.modalOpenState);
  const setModalTitle = useSetRecoilState(RecoilState.modalTitleState);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO : 検索処理
  };

  const handlePost = () => {
    // TODO : ログインユーザーであれば画面遷移する
    // router.push("/illusts/post");
    // TODO : ログインユーザーでなければログインや登録を促す
    setModalOpen(true);
    setModalTitle("Attention");
  };

  const handleRequired = (path: string) => {
    setModalOpen(false);
    router.push(`/${path}`);
  };

  return (
    <>
      <header className="flex justify-between items-center ml-2 md:mx-8 md:my-2">
        <h1>
          <Link href="/">
            <Image src="/logo.png" width={150} height={300} alt="logo" />
          </Link>
        </h1>
        <div className="md:flex md:items-center md:justify-center md:gap-8">
          <div className="hidden  md:flex md:flex-col md:justify-end md:items-start">
            <form
              className="md:flex md:justify-center md:items-center gap-2"
              onSubmit={handleSearch}
            >
              <label className="bg-green-100 md:p-1 rounded md:text-sm md:flex md:justify-center md:items-center text-gray-400">
                <MUI_ICONS.Search style={{ margin: "0 2px" }} />
                <input
                  type="text"
                  className="bg-green-100 focus:outline-none w-60 text-black"
                  placeholder={t_Header("searchPlaceholder")}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
              <button
                className=" bg-green-100 md:px-2 md:py-1 md:rounded hover:bg-green-300 transition-all"
                type="button"
              >
                {t_Header("searchButton")}
              </button>
            </form>
          </div>
          <button
            onClick={handlePost}
            className="hidden md:block bg-orange-100 px-2 py-1 rounded hover:bg-orange-300 transition-all"
          >
            {t_Header("postButton")}
          </button>
          {AccountMenu()}
        </div>
      </header>
      <UI.Modal>
        <div className="text-center">{t_Auth("requiredAuth")}</div>
        <div className="flex gap-4 justify-center items-center mt-4 w-68 m-auto">
          <button
            onClick={() => handleRequired("signup")}
            className="text-blue-300 underline hover:opacity-80 transition-all"
          >
            {t_Auth("toSignUp")}
          </button>
          <button
            onClick={() => handleRequired("login")}
            className="text-blue-300 underline hover:opacity-80 transition-all"
          >
            {t_Auth("toLogin")}
          </button>
        </div>
      </UI.Modal>
    </>
  );
}

function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLink = (path: string) => {
    handleClose();
    router.push(`/${path}`);
  };

  const handleLogout = async () => {
    handleClose();
    // TODO : ログアウト処理をここに書く
  };

  return (
    <>
      <MUI.Box
        sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
      >
        <MUI.Tooltip title="マイメニュー">
          <MUI.IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <div className="hidden md:block">
              <MUI.Avatar
                alt="icon"
                src="https://placehold.jp/300x300.png"
                sx={{ width: 56, height: 56 }}
              />
            </div>
            <div className="md:hidden m-4">
              <MenuIcon sx={{ width: 32, height: 32 }} />
            </div>
          </MUI.IconButton>
        </MUI.Tooltip>
      </MUI.Box>
      <MUI.Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MUI.MenuItem onClick={() => handleLink("users/1")}>
          <MUI.Avatar
            alt="icon"
            src="https://placehold.jp/300x300.png"
            sx={{ width: 56, height: 56 }}
          />{" "}
          <span className="ml-4">ユーザー名</span>
        </MUI.MenuItem>
        <div className="flex justify-center items-center">
          <MUI.MenuItem onClick={() => handleLink("#")}>
            <Link
              href="#"
              className="flex flex-col justify-center items-center"
            >
              <span>フォロー</span>
              <span>10人</span>
            </Link>
          </MUI.MenuItem>
          <MUI.MenuItem onClick={() => handleLink("#")}>
            <Link
              href="#"
              className="flex flex-col justify-center items-center"
            >
              <span>フォロー</span>
              <span>10人</span>
            </Link>
          </MUI.MenuItem>
        </div>
        <MUI.MenuItem onClick={() => handleLink("users/1")}>
          <MUI.ListItemIcon>
            <MUI_ICONS.AccountCircle fontSize="small" />
          </MUI.ListItemIcon>
          マイページ
        </MUI.MenuItem>
        <MUI.MenuItem onClick={() => handleLink("users/1/bookmarks")}>
          <MUI.ListItemIcon>
            <MUI_ICONS.Bookmark fontSize="small" />
          </MUI.ListItemIcon>
          ブックマーク
        </MUI.MenuItem>
        <MUI.MenuItem onClick={() => handleLink("account/1")}>
          <MUI.ListItemIcon>
            <MUI_ICONS.Settings fontSize="small" />
          </MUI.ListItemIcon>
          設定
        </MUI.MenuItem>
        <MUI.MenuItem onClick={handleLogout}>
          <MUI.ListItemIcon>
            <MUI_ICONS.Logout fontSize="small" />
          </MUI.ListItemIcon>
          ログアウト
        </MUI.MenuItem>
      </MUI.Menu>
    </>
  );
}
