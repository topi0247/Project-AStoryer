"use client";
import { RecoilRoot } from "recoil";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
