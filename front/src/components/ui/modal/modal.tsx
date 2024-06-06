"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import * as ModalState from "@/recoilState";
import { Modal } from "@mantine/core";

export default function TransitionsModal({
  children,
  onClose,
  centered,
}: {
  children: React.ReactNode;
  onClose?: () => void;
  centered?: boolean;
}) {
  const [open, setOpen] = useRecoilState(ModalState.modalOpenState);

  const handleClose = () => {
    setOpen(false);
    onClose && onClose();
  };

  return (
    <>
      <Modal opened={open} onClose={handleClose} centered={centered}>
        {children}
      </Modal>
    </>
  );
}
