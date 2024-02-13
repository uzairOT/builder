import React from 'react'
import Header from '../Header/Header'
import {
  useMediaQuery,
  Button, Box, Typography, TextField, MenuItem
} from "@mui/material";
import "../StepForm/StepForm.css"
import FooterCircles from '../FooterCircles/FooterCircles'
import StepBoxes from '../StepBoxes/StepBoxes'
import YellowBtn from "../../UI/button";
import shallowButton from "../../UI/shallowButton";
import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf"
import StepTitles from '../StepTitles/StepTitles';
function SaveAsProject({ onSaveStep, onNextStep }) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const labelResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" }
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


  const handleDone = () => {

    onSaveStep();
    // onNextStep();
  };

  return (
    <div>
      {/* <Header /> */}
      <StepTitles Heading={"Save as Project with New Name"} />
      <Box sx={typoBox}>
        <Typography sx={typoText}>
          Lorem ipsum dolor sit amet consectetur. Pretium aliquam egestas interdum varius sed at libero. Sed vestibulum vel platea accumsan in elit morbi eu erat. Purus non urna et purus. Libero nec nec quam pulvinar massa nulla et tincidunt.
        </Typography>
      </Box>
      <StepBoxes />
      <Box
        sx={formBox}
      >
        <form style={formStyle}>
          <Box sx={{ marginTop: "0.5rem", }}>
            <label style={{ ...labelStyle, ...labelResponsiveFont }} htmlFor="email">Project Name</label>
            <input className='placeholder' type="email" id="email" style={{ ...inputStyle, ...labelResponsiveFont }} placeholder="e.g. Project name                                                                                                             0/50" />
          </Box>
          <Box sx={{ marginTop: "0.2rem" }}>
            <label style={{ ...labelStyle, ...labelResponsiveFont }} htmlFor="email">Location</label>
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
        </form>
      </Box>

      <Box sx={buttonBox}>
        <Button
          variant="outlined"
          sx={{ ...YellowBtn, ...shallowButton, }}
          onClick={handleDone}
        >
          Done
        </Button>
      </Box>
      <div style={{ marginTop: "3rem" }}>
        <FooterCircles width1={"4rem"} background1={"#4C8AB1"} />
      </div>
    </div>
  )
}

const buttonBox = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1.5rem"
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
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "0.5rem",
  gap: "1.5rem"
};
const formStyle = {
  marginTop: "0.1rem", width: "38%"
}
const typoBox = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "2rem",
  gap: "1.5rem"
}

const typoText = {
  fontFamily: GTWalsheimTrial,
  fontSize: '1rem',
  letterSpacing: '0.01em',
  color: "#202227",
  textAlign: 'center',
  width: "40%",
}
export default SaveAsProject
