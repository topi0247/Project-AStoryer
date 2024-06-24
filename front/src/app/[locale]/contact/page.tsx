"use client";

import { Settings } from "@/settings";
import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function Contact() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <article className="m-auto flex justify-center items-start overflow-hidden">
      <iframe
        src={Settings.FORM_URL}
        width="640"
        height={mobile ? "1900" : "1600"}
      >
        Now Loading...
      </iframe>
    </article>
  );
}
