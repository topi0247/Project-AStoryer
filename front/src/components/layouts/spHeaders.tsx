"use client";

import { useEffect, useRef, useState } from "react";
import * as Mantine from "@mantine/core";
import * as UI from "@/components/ui";
import { IoMdSearch, IoMdSettings } from "rocketicons/io";
import { ImPencil } from "rocketicons/im";
import { VscAccount } from "rocketicons/vsc";
import { MdLogout } from "rocketicons/md";
import { LayoutGroup, motion } from "framer-motion";
import { IUser } from "@/types";
import { useRouter } from "@/lib";
import { RouterPath } from "@/settings";
import { useSetRecoilState } from "recoil";
import { modalOpenState } from "@/recoilState";
import { useTranslations } from "use-intl";

export default function SpHeaders({
  user,
  handleLogout,
}: {
  user: IUser;
  handleLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [avatarIconPos, setAvatarIconPos] = useState({ x: 0, y: 0 });
  const [searchIconPos, setSearchIconPos] = useState({ x: 0, y: 0 });
  const [pencilIconPos, setPencilIconPos] = useState({ x: 0, y: 0 });
  const [settingIconPos, setSettingIconPos] = useState({ x: 0, y: 0 });
  const [logoutIconPos, setLogoutIconPos] = useState({ x: 0, y: 0 });
  const [search, setSearch] = useState("");
  const router = useRouter();
  const setModalOpen = useSetRecoilState(modalOpenState);
  const t_Header = useTranslations("Header");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const tapNode = event.target as HTMLElement;
      if (tapNode.id === "sp-menu-back") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setSearchIconPos({ x: rect.right, y: rect.bottom });
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (open) {
      setAvatarIconPos({ x: rect.x + 10, y: rect.y - 90 });
      setSearchIconPos({ x: rect.x - 40, y: rect.y - 90 });
      setPencilIconPos({ x: rect.x - 90, y: rect.y - 90 });
      setSettingIconPos({ x: rect.x - 90, y: rect.y - 40 });
      setLogoutIconPos({ x: rect.x - 90, y: rect.y + 10 });
    } else {
      setAvatarIconPos({ x: rect.x, y: rect.y });
      setSearchIconPos({ x: rect.x, y: rect.y });
      setPencilIconPos({ x: rect.x, y: rect.y });
      setSettingIconPos({ x: rect.x, y: rect.y });
      setLogoutIconPos({ x: rect.x, y: rect.y });
    }
  }, [open]);

  const handleMenuOpen = () => {
    const nextOpen = !open;
    setOpen(nextOpen);
    if (!nextOpen) {
      setModalOpen(false);
    }
  };

  const handleLink = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  const handleSearchModal = (isOpen: boolean) => {
    setModalOpen(isOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return;
    const searchWords = search.split(/\s|　/).join(",");
    router.push(RouterPath.illustSearch(searchWords));
    setOpen(false);
    setModalOpen(false);
  };

  return (
    <>
      <div
        id="sp-menu-back"
        className={`${
          open ? "block" : "hidden"
        } md:hidden fixed bottom-0 right-0 w-full min-h-screen z-50 bg-black bg-opacity-40`}
      >
        <LayoutGroup>
          {user.name && (
            <motion.button
              className="absolute top-0 left-0 w-12 h-12 bg-green-300 hover:bg-green-400 rounded-full p-2 "
              animate={{ x: avatarIconPos.x, y: avatarIconPos.y }}
              transition={{ type: "spring" }}
              onClick={() => handleLink(RouterPath.users(user.id))}
            >
              <VscAccount className="w-full h-full icon-white" />
            </motion.button>
          )}
          <motion.button
            className="absolute top-0 left-0 w-12 h-12 bg-green-300 hover:bg-green-400 rounded-full p-2 "
            animate={{ x: searchIconPos.x, y: searchIconPos.y }}
            transition={{ type: "spring" }}
            onClick={() => handleSearchModal(true)}
          >
            <IoMdSearch className="w-full h-full icon-white" />
          </motion.button>
          {user.name && (
            <>
              <motion.button
                className="absolute top-0 left-0 w-12 h-12 bg-green-300 hover:bg-green-400 rounded-full p-2 "
                animate={{ x: pencilIconPos.x, y: pencilIconPos.y }}
                transition={{ type: "spring" }}
                onClick={() => handleLink(RouterPath.illustPost)}
              >
                <ImPencil className="w-full h-full icon-white" />
              </motion.button>
              <motion.button
                className="absolute top-0 left-0 w-12 h-12 bg-green-300 hover:bg-green-400 rounded-full p-2 "
                animate={{ x: settingIconPos.x, y: settingIconPos.y }}
                transition={{ type: "spring" }}
                onClick={() => handleLink(RouterPath.account)}
              >
                <IoMdSettings className="w-full h-full icon-white" />
              </motion.button>
              <motion.button
                className="absolute top-0 left-0 w-12 h-12 bg-green-300 hover:bg-green-400 rounded-full p-2 "
                animate={{ x: logoutIconPos.x, y: logoutIconPos.y }}
                transition={{ type: "spring" }}
                onClick={handleLogout}
              >
                <MdLogout className="w-full h-full icon-white" />
              </motion.button>
            </>
          )}
        </LayoutGroup>
      </div>
      <div
        id="sp-menu"
        className="fixed bottom-4 right-4 z-50 w-14 h-14 flex justify-end items-end"
      >
        <div
          ref={ref}
          className="w-12 h-12 bg-green-300 rounded-full flex justify-center items-center cursor-pointer"
        >
          <Mantine.Button
            color="transparent"
            onClick={handleMenuOpen}
            className="bg-transparent hover:bg-transparent p-0"
          >
            <MenuIconAnim open={open} />
          </Mantine.Button>
        </div>
      </div>
      <UI.TransitionsModal centered>
        <h2 className="text-center text-xl mb-4">検索</h2>
        <form
          className="flex flex-col justify-center items-center gap-2"
          onSubmit={handleSearch}
        >
          <label className="bg-green-100 rounded text-sm flex justify-center items-center text-gray-400 pl-2">
            <IoMdSearch className="icon-gray-600" />
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
      </UI.TransitionsModal>
    </>
  );
}

export function MenuIconAnim({ open = false }: { open: boolean }) {
  return (
    <svg
      id="hamburger"
      className="Header__toggle-svg bg-green-300 rounded-full w-12 h-12"
      viewBox="0 0 60 40"
    >
      <g
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          id="top-line"
          className={open ? "activated" : ""}
          d="M10,10 L50,10 Z"
        ></path>
        <path
          id="middle-line"
          className={open ? "activated" : ""}
          d="M10,20 L50,20 Z"
        ></path>
        <path
          id="bottom-line"
          className={open ? "activated" : ""}
          d="M10,30 L50,30 Z"
        ></path>
      </g>
    </svg>
  );
}
