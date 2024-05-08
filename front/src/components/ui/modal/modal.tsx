"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import * as ModalState from "@/recoilState";
import { Modal } from "@mantine/core";

export default function TransitionsModal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) {
  const [open, setOpen] = useRecoilState(ModalState.modalOpenState);
  const title = useRecoilValue(ModalState.modalTitleState);

  const handleClose = () => {
    setOpen(false);
    onClose && onClose();
  };

  return (
    <>
      <Modal opened={open} onClose={handleClose} title={title}>
        {children}
      </Modal>
    </>
  );
}
