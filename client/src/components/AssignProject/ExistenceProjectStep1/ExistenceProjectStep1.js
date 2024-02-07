import React, { useState } from "react";
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
import ExistenceProjectStep2 from "../ExistenceProjectStep2/ExistenceProjectStep2";

function ExistenceProjectStep1({ onNextStep }) {
  const navigate = useNavigate();
  const [projectStep, setProjectStep] = useState(null)




  const handleNextStep = () => {



    onNextStep();
  };


  return (
    <>

      {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // Set the height as needed
            backgroundColor: "#4C8AB1",
          }}
        > */}
      {/* <Box sx={{ ...buttonBox, ...whiteBox }}> */}
      {/* <Header gap="25rem" /> */}
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

      {/* </Box> */}
      {/* </Box> */}


    </>
  );
}

const buttonBox = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "2rem"
}

const whiteBox = {
  background: "#FFF", width: "70%", margin: "2rem", padding: "2rem 2rem", borderRadius: '1rem',
}


export default ExistenceProjectStep1;
