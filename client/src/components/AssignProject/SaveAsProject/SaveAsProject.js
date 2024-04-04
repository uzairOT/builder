import React from 'react'
import {
  useMediaQuery,
  Button, Box, Typography, TextField, MenuItem
} from "@mui/material";
import "../StepFormField/StepFormField.css"
import FooterCircles from '../FooterCircles/FooterCircles'
import StepBoxes from '../StepBoxes/StepBoxes'
import YellowBtn from "../../UI/button";
import shallowButton from "../../UI/shallowButton";
import "../../../App.css"
import StepTitles from '../StepTitles/StepTitles';
import ProjectFormFields from '../ProjectFormFields/ProjectFormFields';
function SaveAsProject({ onSaveStep, onNextStep , setIsSaveAs}) {



  const handleDone = () => {

    onSaveStep();
    setIsSaveAs(true)
    // onNextStep();
  };

  return (
    <div>
      <StepTitles Heading={"Save as Project with New Name"} />
      <Box sx={typoBox}>
        <Typography sx={typoText}>
          Lorem ipsum dolor sit amet consectetur. Pretium aliquam egestas interdum varius sed at libero. Sed vestibulum vel platea accumsan in elit morbi eu erat. Purus non urna et purus. Libero nec nec quam pulvinar massa nulla et tincidunt.
        </Typography>
      </Box>
      <StepBoxes />

      <ProjectFormFields />

      <Box sx={buttonBox}>
        <Button
          variant="outlined"
          sx={{ ...YellowBtn, ...shallowButton, ...responsiveDone }}
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

const typoBox = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "2rem",
  gap: "1.5rem"
}

const typoText = {
  fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
  letterSpacing: '0.01em',
  color: "#202227",
  textAlign: 'center',
  width: { lg: "40%", md: "60%", sm: "70%", xs: "90%" },
  fontSize: { lg: "1rem", md: "0.9rem", sm: "0.8rem", xs: "0.75rem" },
}

const responsiveDone = {
  width: { lg: "auto", md: "auto", sm: "auto", xs: "10%" },
  background: { lg: "auto", md: "auto", sm: "#FFF", xs: "#FFAC00" },
  color: { lg: "auto", md: "auto", sm: "#FFAC00", xs: "#FFF" },

}
export default SaveAsProject
