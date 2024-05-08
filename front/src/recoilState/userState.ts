"use client";
import { IUser } from "@/types";
import { atom } from "recoil";

export const userState = atom<IUser>({
  key: "userState",
  default: {
    id: -1,
    name: "",
    avatar: "",
    following_count: 0,
    follower_count: 0,
  },
});
