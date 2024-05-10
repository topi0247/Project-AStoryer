"use client";

import { useEffect, useRef, useState } from "react";
import * as Mantine from "@mantine/core";
import { IoMdSearch, IoMdSettings } from "rocketicons/io";
import { LayoutGroup, motion } from "framer-motion";
import { MdLogout } from "rocketicons/md";
import { VscAccount } from "rocketicons/vsc";
import { IUser } from "@/types";
import { useRouter } from "@/lib";
import { RouterPath } from "@/settings";

export default function SpHeaders({
  user,
  handleLogout,
}: {
  user: IUser;
  handleLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [searchIconPos, setSearchIconPos] = useState({ x: 0, y: 0 });
  const [avatarIconPos, setAvatarIconPos] = useState({ x: 0, y: 0 });
  const [settingIconPos, setSettingIconPos] = useState({ x: 0, y: 0 });
  const [logoutIconPos, setLogoutIconPos] = useState({ x: 0, y: 0 });
  const router = useRouter();

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
      setAvatarIconPos({ x: rect.x + 3, y: rect.y - 85 });
      setSearchIconPos({ x: rect.x - 45, y: rect.y - 75 });
      setSettingIconPos({ x: rect.x - 75, y: rect.y - 35 });
      setLogoutIconPos({ x: rect.x - 90, y: rect.y + 10 });
    } else {
      setAvatarIconPos({ x: rect.x, y: rect.y });
      setSearchIconPos({ x: rect.x, y: rect.y });
      setSettingIconPos({ x: rect.x, y: rect.y });
      setLogoutIconPos({ x: rect.x, y: rect.y });
    }
  }, [open]);

  const handleLink = (path: string) => {
    console.log(path);
    setOpen(false);
    router.push(path);
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
              <VscAccount className="w-full h-full text-white" />
            </motion.button>
          )}
          <motion.div
            className="absolute top-0 left-0 w-12 h-12 bg-green-300 hover:bg-green-400 rounded-full p-2 "
            animate={{ x: searchIconPos.x, y: searchIconPos.y }}
            transition={{ type: "spring" }}
          >
            <Mantine.Button
              color="transparent"
              bg="transparent"
              className="w-full h-full p-0"
            >
              <IoMdSearch className="w-full h-full text-white" />
            </Mantine.Button>
          </motion.div>
          {user.name && (
            <>
              <motion.div
                className="w-12 h-12 bg-green-300 hover:bg-green-400 rounded-full p-2 "
                animate={{ x: settingIconPos.x, y: settingIconPos.y }}
                transition={{ type: "spring" }}
              >
                <Mantine.Button
                  color="transparent"
                  bg="transparent"
                  className="w-full h-full p-0"
                  onClick={() => handleLink(RouterPath.account)}
                >
                  <IoMdSettings className="w-full h-full text-white" />
                </Mantine.Button>
              </motion.div>
              <motion.div
                className="absolute top-0 left-0 w-12 h-12 bg-green-300 hover:bg-green-400 rounded-full p-2 "
                animate={{ x: logoutIconPos.x, y: logoutIconPos.y }}
                transition={{ type: "spring" }}
              >
                <Mantine.Button
                  color="transparent"
                  bg="transparent"
                  className="w-full h-full p-0"
                  onClick={handleLogout}
                >
                  <MdLogout className="w-full h-full text-white" />
                </Mantine.Button>
              </motion.div>
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
            onClick={() => setOpen(!open)}
            className="bg-transparent hover:bg-transparent p-0"
          >
            <MenuIconAnim open={open} />
          </Mantine.Button>
        </div>
      </div>
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
