import React, { useState } from "react";

import {

  Button, Box,
} from "@mui/material";
import StepTitles from "../StepTitles/StepTitles";
import StepBoxes from "../StepBoxes/StepBoxes";
import FooterCircles from "../FooterCircles/FooterCircles"
import YellowBtn from "../../UI/button";
import shallowButton from "../../UI/shallowButton";
import StepForm from "../StepForm/StepForm";

function ExistenceProjectStep1({ onNextStep }) {
  const handleNextStep = () => {
    onNextStep();
  };

  return (
    <>

      <StepTitles Heading="Existing Project" stepHeading={"Step 1 of 3"} stepDiscription={"Lorem ipsum dolor sit amet consectetur. Pretium aliquam egestas interdum varius sed at libero. Sed vestibulum vel platea accumsan in elit morbi eu erat. Purus non urna et purus. Libero nec nec quam pulvinar massa nulla et tincidunt."} />
      <StepBoxes />
      <StepForm />
      <Box sx={buttonBox}>
        <Button
          variant="outlined"
          sx={{ ...YellowBtn, ...shallowButton, }}
          onClick={handleNextStep}
        >
          Next
        </Button>
      </Box>
      <FooterCircles width1="4rem" background1="#4C8AB1" />

    </>
  );
}

const buttonBox = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  marginBottom: "1rem"
}


export default ExistenceProjectStep1;
