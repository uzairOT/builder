import React, { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography } from '@mui/material';
import actionButton from "../../UI/actionButton";
import upload from "./assets/upload.png"
import "../../../App.css"


function AddImage({ handleOpen, handleClose, heading }) {

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const objectFit = { objectFit: image ? "cover" : "none" }
    const dotBorder = { border: image ? "none" : "2px dashed #D9D9D9" }

    const handleClickOpen = () => {
        handleOpen()
        setOpen(true);
        setImage(null)
    };

    const handleClickClose = () => {
        handleClose()
        setOpen(false);
    };
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        previewImage(file);
    };

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };



    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        handleClose();
    };
    return (
        <div className="App">

            <>
                <Dialog
                    open={handleClickOpen}
                    onClose={handleClickClose}
                    PaperProps={{
                        sx: { ...themeStyle.paperPropsStyle },
                        component: 'form',
                        onSubmit: handleSubmit
                    }}

                >
                    <DialogTitle sx={themeStyle.typoTitle} >{heading}</DialogTitle>
                    <DialogContent >
                        <div style={{ textAlign: "center" }}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnter={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: "none" }}
                                id="avatarInput"
                            />
                            <label htmlFor="avatarInput">
                                <div
                                    style={{ ...themeStyle.avatarBox, ...dotBorder }}
                                >
                                    <img
                                        src={image ? image : upload}
                                        alt={image ? "Uploaded Avatar" : "Placeholder Avatar"}
                                        style={{
                                            ...themeStyle.avatarImg,
                                            ...objectFit,
                                        }}
                                    />
                                    <Typography sx={themeStyle.avatarText}>
                                        {image ? "" : "Drag your file here"}
                                    </Typography>


                                </div>

                            </label>

                        </div>
                        <Box sx={{ textAlign: "center" }}>
                            <TextField
                                sx={themeStyle.inputStyle}
                                required
                                placeholder='Type Note Here .....'
                                margin="dense"
                                id="name"
                                name="name"
                                type="name"
                                variant="standard"
                            />
                        </Box>

                    </DialogContent>
                    <DialogActions sx={themeStyle.generalBox}>
                        <Button sx={{ ...actionButton, ...themeStyle.sendButton }} type="submit">Send</Button>
                    </DialogActions>
                </Dialog>

            </>

        </div >



    )
}
const themeStyle = {
    typoTitle: {
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontSize: "1.5rem",
        color: "#4C8AB1",
        marginLeft: "-1rem",
    },
    inputStyle: {
        // width: "100%", // Set width to 100% for responsiveness
        width: "90%",
        height: "3rem",
        marginBottom: '2rem',
        padding: "0.5rem",
        fontSize: '14px',
        border: '1px solid #D8D8D8',
        borderRadius: '0.5rem',
        color: "#202227",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        backgroundColor: "#FAFAFA"

    },
    generalBox: {
        display: "flex", justifyContent: "flex-end", marginTop: "1rem"
    },

    paperPropsStyle: {
        borderRadius: "1rem",
        width: { lg: "50%", md: "60%", sm: "60%", xs: "70%" },
        padding: "1rem 2rem"// Change background color here
    },

    typoText: {
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontSize: "1rem",
        color: "#202227"
    },
    sendButton: {
        width: { lg: "20%", md: "20%", sm: "30%", xs: "40%" },
        marginTop: "-2rem"
    },
    avatarImg: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",

    },
    avatarBox: {
        width: "90%",
        height: 150,
        borderRadius: "0.5rem",
        // border: "2px dashed #D9D9D9",
        overflow: "hidden",
        display: "inline-block",
        position: "relative",
    },
    avatarText: {
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: '0.8rem',
        color: '#121212',
        marginTop: "6rem"
    }
}

export default AddImage
