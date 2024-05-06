"use client";

import { useDisclosure } from "@mantine/hooks";
import * as Mantine from "@mantine/core";
import * as UI from "@/components/ui";

export default function Profile({ profileText }: { profileText: string }) {
  const [opened, { toggle }] = useDisclosure(false);

  if (!profileText || profileText.length === 0) {
    return null;
  }

  return (
    <Mantine.Box className="bg-white p-5 rounded w-full">
      <Mantine.Text
        className={`text-lg ${
          opened ? "text-gray-500 opacity-50" : "gradientText"
        }`}
      >
        {profileText.slice(0, 140)}...
      </Mantine.Text>
      <UI.Collapse opened={opened} toggle={toggle}>
        {profileText}
      </UI.Collapse>
    </Mantine.Box>
  );
}
