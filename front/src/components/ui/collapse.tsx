"use client";

import * as Mantine from "@mantine/core";
import dynamic from "next/dynamic";

const MdKeyboardArrowUp = dynamic(
  () => import("rocketicons/md").then((mod) => mod.MdKeyboardArrowUp),
  { ssr: false }
);

const MdKeyboardArrowDown = dynamic(
  () => import("rocketicons/md").then((mod) => mod.MdKeyboardArrowUp),
  { ssr: false }
);

export default function Collapse({
  opened,
  toggle,
  children,
}: {
  opened: boolean;
  toggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <Mantine.Collapse in={opened} className={opened ? "" : "gradientText"}>
        {children}
      </Mantine.Collapse>
      <div className="w-full text-center mt-4">
        <Mantine.Button
          type="button"
          className="w-full bg-green-400 border border-green-600 hover:bg-green-500  hover:border-green-800 bg-opacity-50 rounded transition-all"
          onClick={toggle}
        >
          {opened ? (
            <MdKeyboardArrowUp className="icon-gray" />
          ) : (
            <MdKeyboardArrowDown className="icon-gray" />
          )}
        </Mantine.Button>
      </div>
    </>
  );
}
