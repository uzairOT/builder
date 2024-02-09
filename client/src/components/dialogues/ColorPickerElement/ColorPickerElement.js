import React, { useState } from 'react'
import { HexColorPicker, RgbaColorPicker, RgbaStringColorPicker, HexColorInput } from "react-colorful";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';
import "./ColorPickerElement.css";

function ColorPickerElement() {

    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("#aabbcc");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="App">

            <>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open form dialog
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email;
                            console.log(email);
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle >Add Phase</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                        <h2>Select Color</h2>
                        <section className="custom-pointers example">
                            {/* <RgbaColorPicker /> */}
                            <RgbaStringColorPicker color={color} onChange={setColor} />

                            <Box sx={{ display: "flex" }} >
                                <HexColorInput color={color} onChange={setColor} />

                            </Box>
                            <Box sx={{
                                height: "2rem",
                                width: "2rem",
                                background: color
                            }} />

                        </section>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">Add Phase</Button>
                    </DialogActions>
                </Dialog>

            </>

        </div>



    )
}

export default ColorPickerElement
