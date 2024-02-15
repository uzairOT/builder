import React, { useState } from 'react'
import {
    useMediaQuery,
    Button, Box, Typography, TextField, MenuItem
} from "@mui/material";
import "../StepFormField/StepFormField.css"

import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf";

function ProjectFormFields() {


    const isMobile = useMediaQuery('(max-width:600px)');
    const isTab = useMediaQuery('(max-width:900px)');
    const labelResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" }
    const formWidth = { width: isMobile ? "85%" : isTab ? "65%" : "45%" }
    const labelDisplay = { display: isMobile ? "none" : "block" }
    const borderRadiusResponsive = { borderRadius: isMobile ? "0.5rem" : "0.75rem" }


    const [location, setLocation] = useState(0);
    const handleChanges = (event) => {
        setLocation(event.target.value);
    };

    return (
        <div>
            <Box
                sx={formBox}
            >
                <form style={{ ...formStyle, ...formWidth }}>
                    <Box sx={{ marginTop: "0.5rem", }}>
                        <label style={{ ...labelStyle, ...labelDisplay, ...labelResponsiveFont }} htmlFor="email">Project Name</label>
                        <input className='placeholder' type="email" id="email" style={{ ...inputStyle, ...borderRadiusResponsive, ...labelResponsiveFont }} placeholder="e.g. Project name" />
                    </Box>
                    <Box sx={{ marginTop: "0.2rem" }}>
                        <label style={{ ...labelStyle, ...labelDisplay, ...labelResponsiveFont }} htmlFor="email">Location</label>
                        <TextField className='placeholder' sx={{ ...inputStyle, ...borderRadiusResponsive, borderButtom: "none" }}
                            id="standard-select-currency"
                            select
                            variant="standard"
                            value={location}
                            onChange={handleChanges}
                        >

                            <MenuItem value={0} sx={{ ...menuItem, color: 'gray', }}>
                                Select Location
                            </MenuItem>
                            <MenuItem sx={menuItem} value={10}>Pakistan</MenuItem>
                            <MenuItem sx={menuItem} value={20}>India</MenuItem>
                            <MenuItem sx={menuItem} value={30}>France</MenuItem>
                        </TextField>
                    </Box>
                </form>
            </Box>
        </div>
    )
}




const labelStyle = {
    marginBottom: '5px',
    color: '#202227',
    fontFamily: "Inter",
    fontSize: '1rem',
    fontWeight: 500,
}

const inputStyle = {
    width: "100%", // Set width to 100% for responsiveness
    height: "2rem",
    marginBottom: '0.5rem',
    alignSelf: "center",
    padding: '0.5rem 0.5rem',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    color: "#202227",
    fontFamily: GTWalsheimTrial,
    paddingLeft: "-1.5rem",
};
const formBox = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "0.5rem",
    gap: "1.5rem"
};
const formStyle = {
    marginTop: "0.1rem",
    marginLeft: "-1.2rem",
}
const menuItem = {
    fontSize: { lg: "1rem", md: "0.9rem", sm: "0.8rem", xs: "0.7rem" }
}
export default ProjectFormFields
