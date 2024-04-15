"use client";
import { useRouter } from "@/lib";
import {
  Search,
  AccountCircle,
  Bookmark,
  Settings,
  Logout,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export default function Headers() {
  const t_Header = useTranslations("Header");
  return (
    <>
      <header className="flex justify-between items-center ml-2 md:mx-8 md:my-2">
        <h1>
          <Link href="/">
            <img src="logo.png" width={150} />
          </Link>
        </h1>
        <div className="md:flex md:items-center md:justify-center md:gap-8">
          <div className="hidden  md:flex md:flex-col md:justify-end md:items-start">
            <div className="md:flex md:justify-center md:items-center gap-2">
              <label className="bg-green-100 md:p-1 rounded md:text-sm md:flex md:justify-center md:items-center text-gray-400">
                <Search style={{ margin: "0 2px" }} />
                <input
                  type="text"
                  className="bg-green-100 focus:outline-none w-60 text-black"
                  placeholder={t_Header("searchPlaceholder")}
                />
              </label>
              <button className=" bg-green-100 md:px-2 md:py-1 md:rounded hover:bg-green-300 transition-all">
                {t_Header("searchButton")}
              </button>
            </div>
          </div>
          <Link
            href="#"
            className="hidden md:block bg-orange-100 px-2 py-1 rounded hover:bg-orange-300 transition-all"
          >
            {t_Header("postButton")}
          </Link>
          {AccountMenu()}
        </div>
      </header>
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
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="マイメニュー">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <div className="hidden md:block">
              <Avatar
                alt="icon"
                src="https://placehold.jp/300x300.png"
                sx={{ width: 56, height: 56 }}
              />
            </div>
            <div className="md:hidden m-4">
              <MenuIcon sx={{ width: 32, height: 32 }} />
            </div>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleLink("users/1")}>
          <Avatar
            alt="icon"
            src="https://placehold.jp/300x300.png"
            sx={{ width: 56, height: 56 }}
          />{" "}
          <span className="ml-4">ユーザー名</span>
        </MenuItem>
        <div className="flex justify-center items-center">
          <MenuItem onClick={() => handleLink("#")}>
            <Link
              href="#"
              className="flex flex-col justify-center items-center"
            >
              <span>フォロー</span>
              <span>10人</span>
            </Link>
          </MenuItem>
          <MenuItem onClick={() => handleLink("#")}>
            <Link
              href="#"
              className="flex flex-col justify-center items-center"
            >
              <span>フォロー</span>
              <span>10人</span>
            </Link>
          </MenuItem>
        </div>
        <MenuItem onClick={() => handleLink("users/1")}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          マイページ
        </MenuItem>
        <MenuItem onClick={() => handleLink("users/1/bookmarks")}>
          <ListItemIcon>
            <Bookmark fontSize="small" />
          </ListItemIcon>
          ブックマーク
        </MenuItem>
        <MenuItem onClick={() => handleLink("account/1")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          設定
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          ログアウト
        </MenuItem>
      </Menu>
    </>
  );
}
