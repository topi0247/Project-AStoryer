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
import { useTranslations } from "use-intl";
import { useDisclosure } from "@mantine/hooks";

export default function SpHeaders({
  user,
  handleLogout,
}: {
  user: IUser;
  handleLogout: () => void;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [avatarIconPos, setAvatarIconPos] = useState({ x: 0, y: 0 });
  const [searchIconPos, setSearchIconPos] = useState({ x: 0, y: 0 });
  const [pencilIconPos, setPencilIconPos] = useState({ x: 0, y: 0 });
  const [settingIconPos, setSettingIconPos] = useState({ x: 0, y: 0 });
  const [logoutIconPos, setLogoutIconPos] = useState({ x: 0, y: 0 });
  const [search, setSearch] = useState("");
  const router = useRouter();
  const t_Header = useTranslations("Header");
  const [modalOpen, setModalOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const tapNode = event.target as HTMLElement;
      if (tapNode.id === "sp-menu-back") {
        setOpenMenu(false);
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
    if (openMenu) {
      setSearchIconPos({ x: rect.x, y: rect.y - 140 });
      setPencilIconPos({ x: rect.x - 70, y: rect.y - 140 });
      setAvatarIconPos({ x: rect.x - 140, y: rect.y - 140 });
      setSettingIconPos({ x: rect.x - 140, y: rect.y - 70 });
      setLogoutIconPos({ x: rect.x - 140, y: rect.y });
    } else {
      setSearchIconPos({ x: rect.x, y: rect.y });
      setPencilIconPos({ x: rect.x, y: rect.y });
      setAvatarIconPos({ x: rect.x, y: rect.y });
      setSettingIconPos({ x: rect.x, y: rect.y });
      setLogoutIconPos({ x: rect.x, y: rect.y });
    }
  }, [openMenu]);

  const handleMenuOpen = () => {
    const nextOpen = !openMenu;
    setOpenMenu(nextOpen);
    if (!nextOpen) {
      setModalOpen(false);
    }
  };

  const handleLink = (path: string) => {
    setOpenMenu(false);
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
    setOpenMenu(false);
    setModalOpen(false);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <div
        id="sp-menu-back"
        className={`${
          openMenu ? "block" : "hidden"
        } md:hidden fixed bottom-0 right-0 w-full min-h-screen z-50 bg-black bg-opacity-40`}
      >
        <LayoutGroup>
          <motion.button
            className="absolute top-0 left-0 w-16 aspect-square bg-green-300 hover:bg-green-400 rounded-full p-2 "
            animate={{ x: searchIconPos.x, y: searchIconPos.y }}
            transition={{ type: "spring" }}
            onClick={open}
          >
            <div className="w-full flex flex-col justify-center items-center text-white relative">
              <IoMdSearch className="w-8 h-8 icon-white" />
              <span className="text-xs inline-block leading-3">
                {t_Header("search")}
              </span>
            </div>
          </motion.button>
          {user.name && (
            <>
              <motion.button
                className="absolute top-0 left-0 w-16 aspect-square bg-green-300 hover:bg-green-400 rounded-full p-2 "
                animate={{ x: pencilIconPos.x, y: pencilIconPos.y }}
                transition={{ type: "spring" }}
                onClick={() => handleLink(RouterPath.illustPost)}
              >
                <div className="w-full flex flex-col justify-center items-center text-white relative">
                  <ImPencil className="w-8 h-8 icon-white" />
                  <span className="text-xs inline-block leading-3">
                    {t_Header("post")}
                  </span>
                </div>
              </motion.button>
              {user.name && (
                <motion.button
                  className="absolute top-0 left-0 w-16 aspect-square bg-green-300 hover:bg-green-400 rounded-full p-2 "
                  animate={{ x: avatarIconPos.x, y: avatarIconPos.y }}
                  transition={{ type: "spring" }}
                  onClick={() => handleLink(RouterPath.users(user.uuid))}
                >
                  <div className="w-full flex flex-col justify-center items-center text-white relative">
                    <VscAccount className="w-8 h-8 icon-white" />
                    <span className="text-[8px] inline-block leading-3">
                      {t_Header("myPage")}
                    </span>
                  </div>
                </motion.button>
              )}
              <motion.button
                className="absolute top-0 left-0 w-16 aspect-square bg-green-300 hover:bg-green-400 rounded-full p-2 "
                animate={{ x: settingIconPos.x, y: settingIconPos.y }}
                transition={{ type: "spring" }}
                onClick={() => handleLink(RouterPath.account)}
              >
                <div className="w-full flex flex-col justify-center items-center text-white relative">
                  <IoMdSettings className="w-8 h-8 icon-white" />
                  <span className="text-xs inline-block leading-3">
                    {t_Header("settings")}
                  </span>
                </div>
              </motion.button>
              <motion.button
                className="absolute top-0 left-0 w-16 aspect-square bg-green-300 hover:bg-green-400 rounded-full p-2 "
                animate={{ x: logoutIconPos.x, y: logoutIconPos.y }}
                transition={{ type: "spring" }}
                onClick={handleLogout}
              >
                <div className="w-full flex flex-col justify-center items-center text-white relative">
                  <MdLogout className="w-8 h-8 icon-white" />
                  <span className="text-[8px] inline-block leading-3">
                    {t_Header("logout")}
                  </span>
                </div>
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
          className="w-16 aspect-square bg-green-300 rounded-full flex justify-center items-center cursor-pointer"
        >
          <Mantine.Button
            color="transparent"
            onClick={handleMenuOpen}
            className="bg-transparent hover:bg-transparent p-0"
          >
            <div className="flex flex-col justify-center items-center text-white relative">
              <MenuIconAnim openMenu={openMenu} />
              <span className="text-xs inline-block leading-3">
                {openMenu ? "Close" : "Menu"}
              </span>
            </div>
          </Mantine.Button>
        </div>
      </div>

      {/* OR検索がうまくいっていないので詳細検索を表示 */}
      <UI.SPSearchModal opened={opened} close={close} closeMenu={closeMenu} />
      {/* <Mantine.Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        centered
      >
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
      </Mantine.Modal> */}
    </>
  );
}

export function MenuIconAnim({ openMenu = false }: { openMenu: boolean }) {
  return (
    <svg
      id="hamburger"
      className="Header__toggle-svg h-6 w-8"
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
          className={openMenu ? "activated" : ""}
          d="M10,10 L50,10 Z"
        ></path>
        <path
          id="middle-line"
          className={openMenu ? "activated" : ""}
          d="M10,20 L50,20 Z"
        ></path>
        <path
          id="bottom-line"
          className={openMenu ? "activated" : ""}
          d="M10,30 L50,30 Z"
        ></path>
      </g>
    </svg>
  );
}
