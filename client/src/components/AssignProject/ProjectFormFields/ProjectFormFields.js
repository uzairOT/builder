import React from 'react'
import {
    useMediaQuery,
    Button, Box, Typography, TextField, MenuItem
} from "@mui/material";

import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf";

function ProjectFormFields() {


    const isMobile = useMediaQuery('(max-width:600px)');
    const labelResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" }
    const formWidth = { width: isMobile ? "80%" : "40%" }
    const labelDisplay = { display: isMobile ? "none" : "block" }
    const borderRadiusResponsive = { borderRadius: isMobile ? "0.5rem" : "0.75rem" }

    const Locations = [
        {
            value: 'Pakistan',
            label: 'Pakistan',
        },
        {
            value: 'India',
            label: 'India',
        },
        {
            value: 'England',
            label: 'England',
        },
        {
            value: 'Franch',
            label: 'Franch',
        },
    ];
    return (
        <div>
            <Box
                sx={formBox}
            >
                <form style={{ ...formStyle, ...formWidth }}>
                    <Box sx={{ marginTop: "0.5rem", }}>
                        <label style={{ ...labelStyle, ...labelDisplay, ...labelResponsiveFont }} htmlFor="email">Project Name</label>
                        <input className='placeholder' type="email" id="email" style={{ ...inputStyle, ...borderRadiusResponsive, ...labelResponsiveFont }} placeholder="e.g. Project name                                                                                                             0/50" />
                    </Box>
                    <Box sx={{ marginTop: "0.2rem" }}>
                        <label style={{ ...labelStyle, ...labelDisplay, ...labelResponsiveFont }} htmlFor="email">Location</label>
                        <TextField className='placeholder' sx={{ ...inputStyle, ...borderRadiusResponsive, borderButtom: "none" }}


                            id="standard-select-currency"
                            select
                            variant="standard"
                        >
                            {Locations.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
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
    padding: '8px',
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
}

export default ProjectFormFields
