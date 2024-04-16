"use client";
import { RecoilRoot } from "recoil";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
