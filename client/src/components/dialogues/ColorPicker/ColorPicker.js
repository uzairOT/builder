import React, { useState } from 'react'
import { HexColorPicker, RgbaColorPicker, RgbaStringColorPicker } from "react-colorful";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@mui/material';
import "./ColorPicker.css";

function ColorPicker() {

    const [open, setOpen] = useState(false);

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
                            <RgbaStringColorPicker />
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

export default ColorPicker
