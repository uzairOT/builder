import { Modal, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Done from './assets/gifs/done.gif'

const GenerateInvoiceDone = ({setDone}) => {
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        setTimeout(() => {
          setDone(false);
        }, 2000);
      }, []);

  return (
    <>
    <Modal open={open} onClose={setDone}>
    <Stack sx={style} justifyContent={'center'} alignItems={'center'}>
        <img src={Done} alt="/"></img>
            <Typography fontWeight={'600'} fontSize={'22px'}>Done </Typography>
         </Stack>
    </Modal>
    </>
  )
}

export default GenerateInvoiceDone

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '14px'
  };
  