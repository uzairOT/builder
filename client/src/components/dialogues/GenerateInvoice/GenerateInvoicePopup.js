import React, { useEffect, useState } from "react";
import loader from "./assets/gifs/loader.gif";
import { Box, Modal, Stack, Typography } from "@mui/material";
import BuilderProButton from "../../UI/Button/BuilderProButton";

const GenerateInvoicePopup = ({setGenerateInvoice, setShareToClient}) => {
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      handleClose();
      setGenerateInvoice(false)
      setShareToClient(true);
    }, 4000);
  }, []);
  return (
      <Modal open={open} onClose={setGenerateInvoice}>
          <Stack sx={style} justifyContent={'center'} alignItems={'center'}>
            <Typography fontWeight={'600'} fontSize={'22px'}>Generating Invoice</Typography>
        <img src={loader} alt="/"></img>
            <Typography fontWeight={'600'} fontSize={'22px'}>Please Wait ... </Typography>
         </Stack>
      </Modal>
  );
};

export default GenerateInvoicePopup;
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '14px'
  };
  