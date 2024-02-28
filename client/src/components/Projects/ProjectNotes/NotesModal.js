import { Modal, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import BuilderProButton from '../../UI/Button/BuilderProButton';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import ImageIcon from '@mui/icons-material/Image';
import CreateIcon from '@mui/icons-material/Create';
import LinkIcon from '@mui/icons-material/Link';

const NotesModal = () => {
    const [open, setOpen] = useState(false);
        const handleOpen = () => {
            setOpen(true);
        }
        const handleClose = () => {
            setOpen(false)
        }
  return (
    <> 
    <BuilderProButton variant={'contained'} backgroundColor={'#4C8AB1'} fontSize={'11px'} fontFamily={'Inter, sans serif'} handleOnClick={handleOpen}>Add Notes</BuilderProButton>
    <Modal open={open} onClose={handleClose}>
        <Stack  sx={style}>
        <Typography fontFamily={'inherit'} fontSize={'24px'} fontWeight={'500'}>Add Notes</Typography>
        <Stack spacing={2}>
        <Input variant="soft" placeholder='Type Note Subject...' />
        <Textarea minRows={8} variant="soft" placeholder="Type your text here..."/>
        </Stack>
        <Stack direction={'row'} pt={6} justifyContent={'space-between'} alignItems={'center'}>
        <Stack direction={'row'} spacing={1}>
            <FormatColorTextIcon  style={{color:'#4C8AB1'}}/>
            <EmojiEmotionsOutlinedIcon style={{color:'#4C8AB1'}} />
            <AddToDriveIcon style={{color:'#4C8AB1'}} />
            <ImageIcon style={{color:'#4C8AB1'}} />
            <CreateIcon  style={{color:'#4C8AB1'}}/>
            <LinkIcon style={{ transform: "rotate(135deg)", color:'#4C8AB1' }}/>
        </Stack>
        <BuilderProButton variant={'contained'} backgroundColor={'#4C8AB1'} fontSize={'11px'} fontFamily={'Inter, sans serif'}>Add Notes</BuilderProButton>
        </Stack>
        </Stack>
    </Modal>
    </>
  )
}

export default NotesModal

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