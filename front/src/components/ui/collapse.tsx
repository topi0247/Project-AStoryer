"use client";

import Style from "@/styles/index.module.css";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "rocketicons/md";
import { useDisclosure } from "@mantine/hooks";
import * as Mantine from "@mantine/core";

export default function Collapse({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <>
      <Mantine.Collapse
        in={opened}
        className={opened ? "" : Style.gradientText}
      >
        {children}
      </Mantine.Collapse>
      <div className="w-full text-center mt-4">
        <Mantine.Button
          type="button"
          className="w-full bg-green-400 border border-green-600 bg-opacity-50 rounded"
          onClick={toggle}
        >
          {opened ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </Mantine.Button>
      </div>
    </>
  );
}
