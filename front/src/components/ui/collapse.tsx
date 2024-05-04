"use client";

import { useState } from "react";
import Style from "@/styles/index.module.css";

export default function Collapse({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <MUI.Collapse
        in={open}
        collapsedSize={100}
        className={open ? "" : Style.gradientText}
      >
        {children}
      </MUI.Collapse>
      <div className="w-full text-center mt-4">
        <button
          type="button"
          className="w-full bg-green-400 border border-green-600 bg-opacity-50 rounded"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </button>
      </div>
    </>
  );
}
