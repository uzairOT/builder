import React from 'react'
import { Box, Grid, TextField, useMediaQuery, MenuItem, } from '@mui/material';
import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf"
import "./StepForm.css"

const currencies = [
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
  return (
    <Grid
      item
      lg={12}
      sx={firstGrid}
    >
      <form style={{ marginTop: "0.1rem" }}>
        <Box sx={{ marginTop: "0.5rem", }}>
          <label style={{ ...labelStyle, fontSize: isMobile ? "0.8rem" : "1rem" }} htmlFor="email">Project Name</label>
          <input className='placeholder' type="email" id="email" style={{ ...inputStyle, fontSize: isMobile ? "0.8rem" : "1rem" }} placeholder="e.g. Your Existing Project Name                                          0/50" />
        </Box>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "8rem",
          marginBottom: "0.3rem",
        }}>
          <Box sx={{ marginTop: "0.2rem" }}>
            <label style={{ ...labelStyle, fontSize: isMobile ? "0.8rem" : "1rem" }}
              htmlFor="firstName">Workdone</label>
            <input className='placeholder' type="text" id="firstName" style={inputStyle} placeholder="Workdone" />
          </Box>
          <Box sx={{ marginTop: "0.2rem" }}>
            <label style={{ ...labelStyle, fontSize: isMobile ? "0.8rem" : "1rem" }} htmlFor="lastName">Estimated Price</label>
            <input className='placeholder' type="text" id="lastName" style={inputStyle} placeholder="Estimated Price" />
          </Box>
        </Box>

        <Box sx={{ marginTop: "0.2rem" }}>
          <label style={{ ...labelStyle, fontSize: isMobile ? "0.8rem" : "1rem" }} htmlFor="email">Location</label>
          <TextField className='placeholder' sx={{ ...inputStyle, borderButtom: "none" }}


            id="standard-select-currency"
            select
            variant="standard"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ marginTop: "0.2rem" }}>
          <label style={{ ...labelStyle, fontSize: isMobile ? "0.8rem" : "1rem" }} htmlFor="email">Client Name</label>
          <input className='placeholder' type="email" id="email" style={{
            ...inputStyle,
            fontFamily: `'${GTWalsheimTrial}', sans-serif`,
            paddingLeft: '-1.5rem',
            fontSize: isMobile ? '0.8rem' : '1rem',
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
  marginTop: "1.5rem",
  gap: "1.5rem",

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
  height: "2rem",
  marginBottom: '1rem',
  alignSelf: "stretch",
  padding: '8px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '12px',
  color: "#202227",
  fontFamily: GTWalsheimTrial,
  paddingLeft: "-1.5rem",

};
export default StepForm

