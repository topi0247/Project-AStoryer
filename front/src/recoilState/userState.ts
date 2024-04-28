"use client";
import { IUser } from "@/types";
import { atom } from "recoil";

export const userState = atom<IUser>({
  key: "userState",
  default: {
    id: -1,
    name: "",
  },
});
