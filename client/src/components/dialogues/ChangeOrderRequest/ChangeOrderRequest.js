

import React, { useState, useEffect } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography, Radio, RadioGroup, FormControl, FormControlLabel, Avatar, Stack } from '@mui/material';
import actionButton from "../../UI/actionButton";
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

import Avatarimg from "../Assets/pngs/woman.png"
import "./ChangeOrderRequest.css"

import "../../../App.css"



function ChangeOrderRequest({ handleOpen, handleClose, heading, admin }) {


    const [currentDate, setCurrentDate] = useState(new Date());

    const [value, onChange] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const objectFit = { objectFit: image ? "cover" : "none" }
    const dotBorder = { border: image ? "none" : "2px dashed #D9D9D9" }

    const handleClickOpen = () => {
        handleOpen()
        setOpen(true);
    };

    const handleClickClose = () => {
        handleClose()
        setOpen(false);
    };




    useEffect(() => {
        setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        handleClose();
    };



    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleDateSelect = date => {
        setSelectedDate(date);
        setIsOpen(false); // Close the date picker when a date is selected
    };
    return (
        <div className="App">

            <>
                <Dialog
                    open={handleClickOpen}
                    onClose={handleClickClose}
                    PaperProps={{
                        sx: { ...themeStyle.paperPropsStyle, },
                        component: 'form',
                        onSubmit: handleSubmit
                    }}

                >
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <DialogTitle sx={themeStyle.typoTitle} >{heading}</DialogTitle>
                        <Typography sx={themeStyle.time}>
                            {currentDate.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </Typography>
                    </Box>
                    <hr style={themeStyle.hrLine} />
                    <DialogContent sx={themeStyle.dialogcontentBox}>
                        <Box sx={themeStyle.leftBox}>
                            <Stack direction={'row'} justifyContent={'space-around'} spacing={8}>
                           { admin && <Stack>
                            <Typography sx={themeStyle.headingText}>
                                Phases
                                <Typography sx={{ ...themeStyle.headingText, color: "#9E9E9E", marginTop: "0rem" }}>
                                    1/1
                                </Typography>
                            </Typography>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="Furniture repairing"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel sx={themeStyle.radioText} value="Furniture repairing" control={<Radio sx={themeStyle.radioChecked} />} label="Repairing" />
                                </RadioGroup>
                            </FormControl>
                            <Button
                                sx={themeStyle.linkButton}
                                startIcon={<AddIcon sx={{ color: "#000" }} />}
                            >
                                Add Phase
                            </Button>
                            </Stack>}
                            <Stack >
                            <Typography sx={themeStyle.headingText}>
                                Line Item
                                <Typography sx={{ ...themeStyle.headingText, color: "#9E9E9E", marginTop: "0rem" }}>
                                    1/3
                                </Typography>
                            </Typography>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="Furniture repairing"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel sx={themeStyle.radioText} value="Furniture repairing" control={<Radio sx={themeStyle.radioChecked} />} label="Furniture repairing" />
                                    <FormControlLabel sx={themeStyle.radioText} value="Room renovation" control={<Radio sx={themeStyle.radioChecked} />} label="Room renovation" />
                                    <FormControlLabel sx={themeStyle.radioText} value="Wood work" control={<Radio sx={themeStyle.radioChecked} />} label="Wood work" />
                                </RadioGroup>
                            </FormControl>
                            <Button
                                sx={themeStyle.linkButton}
                                startIcon={<AddIcon sx={{ color: "#000" }} />}
                            >
                                Add Line Item
                            </Button>
                            </Stack>
                            </Stack>
                            <hr style={themeStyle.hrLine} />

                            <Typography sx={themeStyle.headingText}>
                                Total
                            </Typography>
                            <Typography sx={{ ...themeStyle.typoTitle, ...themeStyle.costText }}>
                                $545.66 US
                            </Typography>

                            <DialogActions sx={themeStyle.buttonBox}>
                                <Button sx={{ ...actionButton, ...themeStyle.sendButton, ...themeStyle.declineButton }} type="submit">Decline</Button>
                                <Button sx={{ ...actionButton, ...themeStyle.sendButton }} type="submit">Approve</Button>
                            </DialogActions>

                        </Box>
                        <Box sx={themeStyle.rightBox}>
                            <Typography sx={{ ...themeStyle.headingText, ...themeStyle.rightheadings }}>
                                Status
                            </Typography>
                            <Button
                                sx={{ ...themeStyle.linkButton, ...themeStyle.pendingbutton }}
                                endIcon={<KeyboardArrowDownIcon sx={{ color: "#636363" }} />}
                            >
                                Pending
                            </Button>

                            <hr style={themeStyle.hrLine} />
                            <Typography sx={{ ...themeStyle.headingText, ...themeStyle.rightheadings }}>
                                Assigned Members
                            </Typography>
                            <Box sx={themeStyle.avatarBox}>
                                <Avatar sx={themeStyle.AvatarStyle} src={Avatarimg} />
                                <AddCircleOutlineIcon sx={{ ...themeStyle.AvatarStyle, color: "#A8A8A8" }} />

                            </Box>


                            <hr style={themeStyle.hrLine} />
                            <Typography sx={{ ...themeStyle.headingText, ...themeStyle.rightheadings }}>
                                Start Date
                            </Typography>
                            <Box sx={themeStyle.dateBox}>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateTimePicker']}>
                                        <DateTimePicker
                                            viewRenderers={{
                                                hours: renderTimeViewClock,
                                                minutes: renderTimeViewClock,
                                                seconds: renderTimeViewClock,
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>

                            </Box>




                            <Typography sx={{ ...themeStyle.headingText, ...themeStyle.rightheadings }}>
                                End Date
                            </Typography>
                            <Box sx={themeStyle.dateBox}>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateTimePicker']}>
                                        <DateTimePicker
                                            viewRenderers={{
                                                hours: renderTimeViewClock,
                                                minutes: renderTimeViewClock,
                                                seconds: renderTimeViewClock,
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>

                            </Box>

                        </Box>



                    </DialogContent>

                </Dialog>

            </>

        </div >



    )
}
const themeStyle = {
    typoTitle: {
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontSize: "1.5rem",
        fontWeight: 500,
        color: "#4C8AB1",
        marginLeft: "-1rem",
    },
    buttonBox: {
        display: "flex", flexDirection: { lg: "row", sm: "row", xs: "column" }, justifyContent: "flex-start", marginTop: "3rem", marginBottom: "2rem", gap: "1rem"
    },
    dialogcontentBox: {
        display: "flex", flexDirection: { lg: "row", sm: "column", xs: "column" }, padding: "0rem", margin: "-0.5rem -1rem -1rem 0rem"
    },
    leftBox: {
        width: { lg: "55%", md: "100%", xs: "100%" }, display: "flex", flexDirection: "column", paddingLeft: "1.5rem"
    },
    rightBox: {
        width: { lg: "45%", md: "100%", xs: "100%" }, background: "#EFF5FF", display: "flex", flexDirection: "column",
    },
    paperPropsStyle: {
        borderRadius: "1rem",
        width: { lg: "90%", md: "60%", sm: "60%", xs: "70%" },
        maxWidth: { lg: "50%", md: "60%", sm: "60%", xs: "70%" },
        padding: "1rem 1rem"// Change background color here
    },

    typoText: {
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        fontSize: "1rem",
        color: "#202227"
    },
    sendButton: {
        width: { lg: "35%", md: "35%", sm: "40%", xs: "60%" },
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
    },
    declineButton: {
        background: "#FFF", color: "#4C8AB1", border: "1px solid #4C8AB1",
        ":hover": {
            background: "#FAF9F6",
        }
    },
    time: {
        fontFamily: "inherit",
        fontSize: "1rem",
        fontStyle: 'italic',
        color: '#484848',
        marginTop: "1.5rem",
        whiteSpace: "nowrap",
    },
    hrLine: {
        border: "1px solid #CCCCCC",
        width: "98%",
        marginTop: "-0.7rem"
    },
    radioText: {
        color: "#3D3D3D",
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
    },
    radioChecked: {
        '&, &.Mui-checked': {
            color: '#000',
        },
    },
    headingText: {
        fontFamily: "inherit",
        color: '#000000',
        fontWeight: 500,
        marginTop: "0.5rem",
        fontSize: "1.1rem",
        display: "flex", gap: "1rem"
    },
    rightheadings: {
        fontSize: "0.9rem",
        color: "#636363",
        margin: "1rem 0rem 0rem 2rem"


    },
    linkButton: {
        fontFamily: "Inter", fontWeight: 500, textTransform: "none", color: "#858585", fontSize: { lg: "0.9rem", md: "0.9rem", sm: "0.8rem", xs: "0.6rem" }, justifyContent: "flex-start", marginLeft: "-0.3rem",
        marginBottom: "1rem"
    },
    costText: {
        marginLeft: "0rem",
        fontSize: "1.2rem",
        fontWeight: 700,
    },
    pendingbutton: {
        margin: "0rem 0rem 1rem 1.5rem",
        color: "#D92525"

    },
    avatarBox: {
        display: "flex", margin: "0.2rem 0rem 1rem 1rem", gap: "2rem"
    },
    AvatarStyle: {
        width: 30, height: 30, ml: 2, mt: 1
    },
    dateBox: {
        display: "flex", paddingLeft: "1.5rem", marginTop: "-1rem"
    }
}

export default ChangeOrderRequest