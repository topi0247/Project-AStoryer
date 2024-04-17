"use client";

import * as MUI from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import * as ModalState from "@/recoilState";

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
    <div>
      <MUI.Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: MUI.Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 300,
          },
        }}
      >
        <MUI.Fade in={open}>
          <MUI.Box sx={style}>
            <MUI.Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              {title}
            </MUI.Typography>
            <div id="transition-modal-description" className="mt-4">
              {children}
            </div>
          </MUI.Box>
        </MUI.Fade>
      </MUI.Modal>
    </div>
  );
}
