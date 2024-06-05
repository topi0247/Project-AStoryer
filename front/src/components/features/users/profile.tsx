"use client";

import { useDisclosure } from "@mantine/hooks";
import * as Mantine from "@mantine/core";
import * as UI from "@/components/ui";
import { useEffect, useState } from "react";

export default function Profile({ profileText }: { profileText: string }) {
  const [opened, { toggle }] = useDisclosure(false);
  const [isCollapse, setIsCollapse] = useState(false);
  const MAX_TEXT_LENGTH = 200;
  const MAX_BREAK_COUNT = 2;

  if (!profileText || profileText.length === 0) {
    return null;
  }

  useEffect(() => {
    const breakCount = profileText.split("\n").length;
    setIsCollapse(
      breakCount > MAX_BREAK_COUNT || profileText.length > MAX_TEXT_LENGTH
    );
  }, [profileText]);

  return (
    <Mantine.Box className="bg-white p-5 rounded w-full relative">
      <Mantine.Text
        className={`text-lg whitespace-pre ${
          opened || !isCollapse ? "max-h-auto" : `gradientText max-h-32`
        }
        }`}
      >
        {profileText}
      </Mantine.Text>
      <button
        type="button"
        className={`w-full bg-blue-300 border border-blue-600 border-opacity-50 bg-opacity-50 hover:bg-opacity-25 hover:border-opacity-25 flex justify-center items-center rounded py-1 transition-all ${
          opened && "mt-3"
        } `}
        onClick={toggle}
      >
        <span className={`${opened ? "rotate-180" : ""} transition-all`}>
          ▼
        </span>
      </button>
    </Mantine.Box>
  );
}
