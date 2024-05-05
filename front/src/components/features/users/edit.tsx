"use client";

import { useState } from "react";
import * as MantineCore from "@mantine/core";

export default function UserEdit() {
  const [open, setOpen] = useState(false);

  return <MantineCore.Drawer opened={open} onClose={() => setOpen(false)} />;
}
