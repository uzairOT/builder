import React, { useState } from 'react'
import { HexColorPicker, RgbaColorPicker, RgbaStringColorPicker, HexColorInput, } from "react-colorful";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography } from '@mui/material';
import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf";
import actionButton from "../../UI/actionButton";


import "./ColorPickerElement.css";

function ColorPickerElement({ handleOpen, handleClose }) {

    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("#aabbcc");
    const [colorMode, setColorMode] = useState('rgba');

    const handleClickOpen = () => {
        handleOpen()
        setOpen(true);
    };

    const handleClickClose = () => {
        handleClose()
        setOpen(false);

    };

    const toggleColorMode = () => {
        setColorMode(prevMode => prevMode === 'rgba' ? 'hex' : 'rgba'); // Toggle between rgba and hex modes
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const { phaseName } = formJson; // Extract phaseName from form data
        const selectedColor = color; // Get the selected color from state
        console.log("Phase:", phaseName);
        console.log("Color:", selectedColor);
        handleClose();
    };
    return (
        <div className="App">

            <>
                <Dialog
                    open={handleClickOpen}
                    onClose={handleClickClose}
                    PaperProps={{
                        sx: { ...paperPropsStyle },
                        component: 'form',
                        onSubmit: handleSubmit
                    }}

                >
                    <DialogTitle sx={typoTitle} >Add Phase</DialogTitle>
                    <DialogContent sx={{ padding: "3rem" }}>
                        <Typography sx={typoText}>
                            Phase
                        </Typography>
                        <TextField
                            sx={inputStyle}
                            // autoFocus
                            required
                            margin="dense"
                            id="phaseName"
                            name="phaseName"
                            // label="Email Address"
                            type="text"
                            variant="standard"
                        />
                        <Typography sx={typoText}>
                            Select Color
                        </Typography>
                        <div className="custom-pointers example">


                            {colorMode === 'rgba' ? ( // Render RGBA color picker if colorMode is 'rgba'
                                <Box sx={generalBox}>
                                    <RgbaStringColorPicker sx={{ gap: "0.5rem", ...generalBox }} color={color} onChange={setColor} />
                                </Box>
                            ) : (
                                <Box sx={generalBox}>
                                    <HexColorPicker color={color} onChange={setColor} />
                                </Box>
                            )}

                            <Box sx={{ ...generalBox, ...inputColorBox }} >
                                <HexColorInput style={{ width: "60%" }} color={color} onChange={setColor} />
                                <Box sx={{ ...colorBox, background: color }} />
                            </Box>
                            <Box sx={generalBox} onClick={toggleColorMode}>
                                <Typography sx={{ ...typoText, cursor: "pointer" }}>{colorMode === 'rgba' ? 'RGBA' : 'HEX'}</Typography>
                            </Box>

                        </div>
                    </DialogContent>
                    <DialogActions sx={generalBox}>
                        <Button sx={{ ...actionButton, ...addPhaseButton }} type="submit">Add Phase</Button>
                    </DialogActions>
                </Dialog>

            </>

        </div >



    )
}

const typoTitle = {
    fontFamily: GTWalsheimTrial,
    fontSize: "1.5rem",
    color: "#4C8AB1"
}
const inputStyle = {
    width: "100%", // Set width to 100% for responsiveness
    height: "2rem",
    marginBottom: '1rem',
    alignSelf: "center",
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    color: "#202227",
    fontFamily: GTWalsheimTrial,
    paddingLeft: "-1.5rem",
    backgroundColor: "#EDF2F6"

};

const generalBox = {
    display: "flex", justifyContent: "center", marginTop: "1rem"
}

const paperPropsStyle = {
    borderRadius: "1rem",
    width: { lg: "25%", md: "50%", sm: "50%", xs: "50%" },
    padding: "0.5rem"// Change background color here
}

const typoText = {
    fontFamily: GTWalsheimTrial,
    fontSize: "1rem",
    color: "#202227"
}
const colorBox = {
    height: "2rem",
    width: "2rem",
}
const inputColorBox = {
    gap: "0.3rem",
    marginTop: "0.2rem",

}
const addPhaseButton = {
    height: "70%", width: "9rem",
    marginTop: "-2rem"
}
export default ColorPickerElement
