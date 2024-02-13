import React, { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography, MenuItem, Avatar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf";
import YellowBtn from '../../UI/button';




function SkipInvite() {


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Slide in alert dialog
            </Button>
            <Dialog
                PaperProps={{
                    sx: { ...paperPropsStyle },
                    component: 'form',
                }}
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={crossIcon}
                >
                    <CloseIcon />
                </IconButton>
                <DialogTitle sx={typoTitle}>{"Skip without inviting?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={typoTect} id="alert-dialog-slide-description">
                        Are you sure you want to skip this step without inviting ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        sx={{
                            ...YellowBtn,
                            ...skipButton
                        }}
                        onClick={handleClose}
                    >
                        Cancle
                    </Button>
                    <Button sx={{ ...YellowBtn, padding: "1rem 1rem", }}
                        onClick={handleClose}>Yes, Skip</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


const paperPropsStyle = {
    borderRadius: "1rem",
    // width: { lg: "25%", md: "50%", sm: "50%", xs: "50%" },
    width: '30%', maxWidth: "none",
    display: "flex",
    padding: "0.5rem"// Change background color here
}
const crossIcon = {
    position: 'absolute',
    right: 8,
    top: 8,
}
const typoTitle = {
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: '1.5rem',
    color: '#202227',
    marginTop: "1rem",
    marginBottom: "-0.5rem"
}

const typoTect = {
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: '1rem',
    color: '#575757',
}
const skipButton = {
    border: "1px solid #FFAC00",
    background: "#FFF",
    padding: "1rem 1rem",
    color: "#FFAC00",
    "&:hover": {
        background: "#FFF",
    },
}
export default SkipInvite
