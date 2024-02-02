import React from "react";
import { useNavigate } from "react-router-dom";

import {
 
  Button, Box,
} from "@mui/material";
import Header from "../Header/Header"
import StepTitles from "../StepTitles/StepTitles";
import StepBoxes from "../StepBoxes/StepBoxes";
import FooterCircles from "../FooterCircles/FooterCircles"
import YellowBtn from "../../UI/button";
import shallowButton from "../../UI/shallowButton";
import StepForm from "../StepForm/StepForm";

function AssignProjectFirstStep({ onNextStep }) {
  const navigate = useNavigate();

  const handleNextStep = () => {
    // Navigate to home page
    navigate("/assignproject");
    // Trigger the next step in Home component
    onNextStep();
  };

  return (
 <>
      <Header />
      <StepTitles />
      <StepBoxes />
      <StepForm />
      <Box sx={buttonBox}>
         <Button
            variant="outlined"
            sx={{...YellowBtn,  ...shallowButton,}}
          >
            Next
          </Button>
          </Box>
      <FooterCircles />

      <h1>Step 1</h1>
      {/* Your Step 1 content goes here */}
      <button onClick={handleNextStep}>Next Step</button>
  </>
  );
}

const buttonBox ={
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop:"2rem"
}



export default AssignProjectFirstStep;
