import React, { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography, MenuItem, Avatar } from '@mui/material';
import actionButton from "../../UI/actionButton";
import placeholderImage from "../Assets/pngs/AvatarPlaceholder.png";
import "../../../App.css"


function UpdateProfileDetails() {

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const objectFit = { objectFit: image ? "cover" : "none" }
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const Status = [
        {
            value: 'pending',
            label: 'Pending',
        },
        {
            value: 'approved',
            label: 'Approved',
        },
        {
            value: 'block',
            label: 'Blocked',
        },

    ];


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
                        sx: { ...paperPropsStyle, },
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email;
                            //console.log(email);
                            handleClose();
                        },
                    }}

                >
                    <DialogTitle sx={typoTitle} >Add Line Item</DialogTitle>
                    <DialogContent sx={{ padding: "2rem 3rem" }}>

                        <Box sx={dialogueBox}>
                            <Box sx={sectionBox}>
                                <div style={{ textAlign: "center" }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        style={{ display: "none" }}
                                        id="avatarInput"
                                    />
                                    <label htmlFor="avatarInput">
                                        <div
                                            style={avatarBox}
                                        >
                                            <img
                                                src={image ? image : placeholderImage}
                                                alt={image ? "Uploaded Avatar" : "Placeholder Avatar"}
                                                style={{
                                                    ...avatarImg,
                                                    ...objectFit
                                                }}
                                            />
                                        </div>
                                    </label>
                                </div>

                                <Typography align="center" marginTop={"1rem"}>Change Profile</Typography>
                            </Box>
                            <Box sx={sectionBox}>
                                <Box sx={innerBox}>
                                    <Typography sx={typoText}>
                                        Name
                                    </Typography>
                                    <TextField
                                        sx={{ ...inputStyle, ...leftSpace }}
                                        required
                                        placeholder='Jane cooper'
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        type="name"
                                        variant="standard"
                                    />
                                </Box>

                                <Box sx={innerBox}>
                                    <Typography sx={typoText}>
                                        Projects
                                    </Typography>
                                    <TextField
                                        sx={{ ...inputStyle, ...leftSpace }}
                                        required
                                        placeholder='Job Name'
                                        margin="dense"
                                        id="projectName"
                                        name="projectName"
                                        type="name"
                                        variant="standard"
                                    />
                                </Box>

                                <Box sx={innerBox}>
                                    <Typography sx={typoText}>
                                        Email
                                    </Typography>
                                    <TextField
                                        sx={{ ...inputStyle, ...leftSpace }}
                                        required
                                        placeholder='jane@microsoft.com'
                                        margin="dense"
                                        id="email"
                                        name="email"
                                        type="email"
                                        variant="standard"
                                    />
                                </Box>
                            </Box>
                            <Box sx={sectionBox}>
                                <Box sx={innerBox}>
                                    <Typography sx={typoText}>
                                        Phone Number
                                    </Typography>
                                    <TextField
                                        sx={{ ...inputStyle, ...leftSpace }}
                                        required
                                        placeholder='(225) 555-0118'
                                        margin="dense"
                                        id="phone"
                                        name="phone"
                                        type="phoneNumber"
                                        variant="standard"
                                    />
                                </Box>
                                <Box sx={innerBox}>
                                    <Typography sx={typoText}>
                                        Countary
                                    </Typography>
                                    <TextField
                                        sx={{ ...inputStyle, ...leftSpace }}
                                        required
                                        placeholder='United States'
                                        margin="dense"
                                        id="countary"
                                        name="countary"
                                        type="countaryName"
                                        variant="standard"
                                    />
                                </Box>



                                <Box sx={innerBox}>
                                    <Typography sx={typoText}>
                                        Status
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

                                        {Status.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Box>
                            <Box sx={sectionBox}>
                                <Box sx={innerBox}>
                                    <Box sx={rightButtonBox}>
                                        <Button sx={{ ...actionButton, ...doneButton }} type="submit">Update</Button>
                                        <Button sx={{ ...actionButton, ...doneButton, ...cancleButton }} type="submit">Cancel</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </DialogContent>
                </Dialog>

            </>

        </div >



    )
}

const typoTitle = {
    fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
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
    fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
    paddingLeft: "-1.5rem",
    backgroundColor: "#EDF2F6"

};
const dialogueBox = {
    display: "flex", flexDirection: "row", gap: "4rem"
}

const sectionBox = {
    display: "flex", justifyContent: "center", flexDirection: "column", gap: "0.5rem"
}
const avatarBox = {
    width: 200,
    height: 200,
    borderRadius: "50%",
    border: "2px dashed black",
    backgroundColor: "#EDF2F6",
    overflow: "hidden",
    display: "inline-block",
    position: "relative",
}

const avatarImg = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",

}
const rightButtonBox = {
    display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "10rem",
}

const paperPropsStyle = {
    borderRadius: "1rem",
    // width: { lg: "25%", md: "50%", sm: "50%", xs: "50%" },
    width: '50%', maxWidth: "none",
    display: "flex",
    padding: "0.5rem"// Change background color here
}

const typoText = {
    fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
    fontSize: "0.8rem",
    color: "#202227"
}
const doneButton = {
    width: "7rem",
    marginBottom: "1rem"
}


const innerBox = {
    display: "flex", flexDirection: "column", width: "100%"
}
const leftSpace = {
    marginLeft: "1rem"
}
const cancleButton = {
    background: '#FFF',
    color: '#357899',
    border: "1px solid #357899",
    '&:hover': {
        background: '#FFF',

    },
};
export default UpdateProfileDetails