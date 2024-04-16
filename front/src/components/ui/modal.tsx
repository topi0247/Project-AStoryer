"use client";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useRecoilState, useRecoilValue } from "recoil";
import * as ModalState from "@/recoilState";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
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
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 300,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              {title}
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, mx: "auto" }}
            >
              {children}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
