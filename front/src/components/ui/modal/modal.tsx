"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import * as ModalState from "@/recoilState";
import { Modal } from "@mantine/core";

export default function TransitionsModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useRecoilState(ModalState.modalOpenState);
  const title = useRecoilValue(ModalState.modalTitleState);

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title={title}>
        {children}
      </Modal>
    </>
  );
}
