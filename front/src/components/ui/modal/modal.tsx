"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import * as ModalState from "@/recoilState";
import { Button, Modal } from "@mantine/core";

const style = {
  position: "absolute" as "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -65%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useRecoilState(ModalState.modalOpenState);
  const title = useRecoilValue(ModalState.modalTitleState);

  return (
    <>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title="Authentication"
      >
        {children}
      </Modal>
    </>
  );
}
