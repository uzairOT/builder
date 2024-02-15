import React, { useState } from 'react'
import { HexColorPicker, RgbaColorPicker, RgbaStringColorPicker, HexColorInput, } from "react-colorful";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography } from '@mui/material';
import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf";
import actionButton from "../../UI/actionButton";
// import { setOpen, setColor, setColorMode, setPhaseName } from '../../../redux/slices/addPhaseSlice';
// import { useDispatch, useSelector } from 'react-redux';

import { setOpen, setColor, setColorMode, setPhaseName } from '../../../redux/slices/addPhaseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddPhase } from '../../../redux/slices/addPhaseSlice';
import { useAddProjectPhaseMutation } from "../../../redux/apis/projectApiSlice";
import "./ColorPickerElement.css";

function ColorPickerElement({ handleOpen, handleClose }) {
    const [addPhase, { isLoading }] = useAddProjectPhaseMutation();
    const dispatch = useDispatch();
    const addPhaseState = useSelector(selectAddPhase);
    const { open, color, colorMode, phaseName } = useSelector(selectAddPhase);


    const handleClickClose = () => {
        handleClose();
        dispatch(setOpen(false));
    };

    const toggleColorMode = () => {
        const newColorMode = colorMode === 'rgba' ? 'hex' : 'rgba';
       
        dispatch(setColorMode(newColorMode));
    };
    const handleColorChange = (newColor) => {
        dispatch(setColor(newColor)); // Dispatch setColor action
      };
    
      const handlePhaseNameChange = (event) => {
        dispatch(setPhaseName(event.target.value)); // Dispatch setPhaseName action
      };

   
      
      const handleSubmit = async (event) => {
        event.preventDefault();
        const projectId = localStorage.getItem('projectId');

        if (!projectId) {
            console.error('Project ID not found in local storage');
            return;
        }

        const addPhaseData= { ...addPhaseState, projectId };
        const { open, ...data } = addPhaseData;
        console.log(data)
        // Call addPhase function with updated addPhaseState
        const res = await addPhase(data).unwrap();
        console.log(res);
        handleClose();
    };


    return (
        <div className="App">

            <>
         
            <Dialog open={open} onClose={handleClickClose} PaperProps={{   sx: { ...paperPropsStyle },component: 'form', onSubmit: handleSubmit }}>
                    <DialogTitle sx={typoTitle} >Add Phase</DialogTitle>
                    <DialogContent sx={{ padding: "3rem" }}>
                        <Typography sx={typoText}>
                            Phase
                        </Typography>
                        <TextField
                            sx={inputStyle}
                            required
                            margin="dense"
                            id="phaseName"
                            name="phaseName"
                            type="text"
                            variant="standard"
                            value={phaseName}
                            onChange={handlePhaseNameChange}
                        />
                    
                        <Typography sx={typoText}>
                            Select Color
                        </Typography>
                        <div className="custom-pointers example">


                            {colorMode === 'rgba' ? ( // Render RGBA color picker if colorMode is 'rgba'
                                <Box sx={generalBox}>
                                    <RgbaStringColorPicker sx={{ gap: "0.5rem", ...generalBox }} color={color} onChange={handleColorChange} />
                                </Box>
                            ) : (
                                <Box sx={generalBox}>
                                    <HexColorPicker color={color} onChange={handleColorChange} />
                                </Box>
                            )}

                            <Box sx={{ ...generalBox, ...inputColorBox }} >
                                <HexColorInput style={{ width: "60%" }} color={color} onChange={handleColorChange} />
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
