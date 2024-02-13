import React from 'react'
import { Box, Grid, TextField, useMediaQuery, MenuItem, } from '@mui/material';
import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf"
import "./StepForm.css"

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
function StepForm() {

  const isMobile = useMediaQuery('(max-width:600px)');
  const lableResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" }
  return (
    <Grid
      item
      lg={12}
      sx={firstGrid}
    >
      <form style={formStyle}>
        <Box sx={{ marginTop: "0.5rem", }}>
          <label style={{ ...labelStyle, ...lableResponsiveFont }} htmlFor="email">Project Name</label>
          <input className='placeholder' type="email" id="email" style={{ ...inputStyle, ...lableResponsiveFont }} placeholder="e.g. Your Existing Project Name                                          0/50" />
        </Box>


        <Box sx={{ marginTop: "0.2rem" }}>
          <label style={{ ...labelStyle, ...lableResponsiveFont }} htmlFor="email">Location</label>
          <TextField className='placeholder' sx={{ ...inputStyle, borderButtom: "none" }}


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
        <Box sx={{ marginTop: "0.2rem" }}>
          <label style={{ ...labelStyle, ...lableResponsiveFont }} htmlFor="email">Client Name</label>
          <input className='placeholder' type="email" id="email" style={{
            ...inputStyle,
            ...lableResponsiveFont
          }} placeholder="Enter Name here" />
        </Box>
      </form>
    </Grid>

  )
}


const firstGrid = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  gap: "1rem",

}

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  color: '#202227',
  fontFamily: "Inter",
  fontSize: '1rem',
  fontWeight: 500,
}

const inputStyle = {
  width: '100%',
  height: "1.5rem",
  marginBottom: '0.5rem',
  alignSelf: "stretch",
  padding: '8px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '12px',
  color: "#202227",
  fontFamily: GTWalsheimTrial,
  paddingLeft: "-1.5rem",
};

const formStyle = {
  marginTop: "0.1rem", width: "240%"

}
export default StepForm






