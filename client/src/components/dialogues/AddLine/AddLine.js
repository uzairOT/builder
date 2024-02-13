import React, { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography, MenuItem } from '@mui/material';
import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf";
import actionButton from "../../UI/actionButton";

import "./AddLine.css"

function AddLine({ handleOpen, handleClose }) {

    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        handleOpen()
        setOpen(true);
    };

    const handleClickClose = () => {
        handleClose()
        setOpen(false);

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const { phaseName, description, unit, quantity, unitPrice, total, start, end, longDescription } = formJson;
        console.log("phaseName:", phaseName);
        console.log("description:", description);
        console.log("unit:", unit);
        console.log("quantity:", quantity);
        console.log("unitPrice:", unitPrice);
        console.log("total:", total);
        console.log("start:", start);
        console.log("end:", end);
        console.log("longDescription:", longDescription);



        handleClose();
    };


    const Units = [
        {
            value: 'sqft',
            label: 'Square Feet',
        },
        {
            value: 'sqm',
            label: 'Square Meters',
        },
        {
            value: 'acres',
            label: 'Acres',
        },
        {
            value: 'hectares',
            label: 'Hectares',
        },
        {
            value: 'sqyds',
            label: 'Square Yards',
        },
        {
            value: 'sqmi',
            label: 'Square Miles',
        },
    ];
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
                        // handleClose();
                    }}

                >
                    <DialogTitle sx={typoTitle} >Add Line Item</DialogTitle>
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
                        />

                        <Typography sx={typoText}>
                            Description
                        </Typography>
                        <TextField
                            sx={inputStyle}
                            required
                            margin="dense"
                            id="description"
                            name="description"
                            type="text"
                            variant="standard"
                        />
                        <Box sx={parallelBox}>
                            <Box sx={innerBox}>
                                <Typography sx={typoText}>
                                    Unit
                                </Typography>


                                <TextField
                                    sx={{ ...inputStyle, ...leftSpace }}
                                    required
                                    margin="dense"
                                    id="unit"
                                    name="unit"
                                    type="text"
                                    select
                                    variant="standard"

                                >
                                    {Units.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                            </Box>
                            <Box sx={innerBox}>
                                <Typography sx={typoText}>
                                    Quantity
                                </Typography>
                                <TextField
                                    sx={{ ...inputStyle, ...leftSpace }}
                                    required
                                    margin="dense"
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    variant="standard"
                                />
                            </Box>
                        </Box>
                        <Typography sx={typoText}>
                            Unit Price
                        </Typography>
                        <TextField
                            sx={inputStyle}
                            required
                            margin="dense"
                            id="unitPrice"
                            name="unitPrice"
                            type="price"
                            variant="standard"
                        />

                        <Typography sx={typoText}>
                            Total
                        </Typography>
                        <TextField
                            sx={inputStyle}
                            required
                            margin="dense"
                            id="total"
                            name="total"
                            type="number"
                            variant="standard"
                        />
                        <Box sx={parallelBox}>
                            <Box sx={innerBox}>
                                <Typography sx={typoText}>
                                    Start
                                </Typography>
                                <TextField
                                    sx={{ ...inputStyle, ...leftSpace }}
                                    required
                                    margin="dense"
                                    id="start"
                                    name="start"
                                    type="text"
                                    variant="standard"
                                />
                            </Box>
                            <Box sx={innerBox}>
                                <Typography sx={typoText}>
                                    End
                                </Typography>
                                <TextField
                                    sx={{ ...inputStyle, ...leftSpace }}
                                    required
                                    margin="dense"
                                    id="end"
                                    name="end"
                                    type="text"
                                    variant="standard"
                                />
                            </Box>
                        </Box>
                        <Typography sx={typoText}>
                            Description
                        </Typography>
                        <TextField
                            sx={{ ...inputStyle, height: "5rem" }}

                            required
                            margin="dense"
                            id="longDescription"
                            name="longDescription"
                            type="text"
                            multiline
                            rows={3}
                            variant="standard"

                        />

                    </DialogContent>
                    <DialogActions sx={generalBox}>
                        <Button sx={{ ...actionButton, ...doneButton }} type="submit">Done</Button>
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
    height: "1.8rem",
    marginBottom: '0.5rem',
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
    fontSize: "0.8rem",
    color: "#202227"
}
const doneButton = {
    height: "70%", width: "7rem",
    marginTop: "-3rem", marginBottom: "1.5rem"
}

const parallelBox = {
    display: "flex", gap: "2rem", justifyContent: "center", alignItems: "center"
}
const innerBox = {
    display: "flex", flexDirection: "column", width: "50%"
}
const leftSpace = {
    marginLeft: "1rem"
}
export default AddLine