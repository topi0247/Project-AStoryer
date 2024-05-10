"use client";
import { atom } from "recoil";

export const modalOpenState = atom({
  key: "modalOpenState",
  default: false,
});

export const modalTitleState = atom({
  key: "modalTitleState",
  default: "",
});

export const requireModalOpenState = atom({
  key: "requireModalOpenState",
  default: false,
});
