import React, { useState } from "react";
import FooterCircles from "../FooterCircles/FooterCircles";
import YellowBtn from '../../UI/button';
import StepTitles from "../StepTitles/StepTitles";
import AttachFileSharpIcon from '@mui/icons-material/AttachFileSharp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../StepForm/StepForm.css"
import {
  Button, Box,
} from "@mui/material";
import StepFormField from "../StepFormField/StepFormField";


function ExistenceProjectStep2({ onNextStep }) {

  const [emailCount, setEmailCount] = useState(3);

  const handleAddEmail = () => {
    setEmailCount(emailCount + 1);
  };
  const handleNextStep = () => {
    onNextStep();
  };
  return (

    <div>
      <StepTitles stepHeading={"Step 2 of 3"} Heading={"Add More Team to the"} projectName={"Project Name"} stepDiscription={"Lorem ipsum dolor sit amet consectetur. Pretium aliquam egestas interdum varius sed at libero. Sed vestibulum vel platea accumsan in elit morbi eu erat. Purus non urna et purus. Libero nec nec quam pulvinar massa nulla et tincidunt."} />

      {[...Array(emailCount)].map((_, index) => ( // Render StepFormField based on emailCount
        <StepFormField key={index} />
      ))}

      <Box
        sx={{ ...buttonBox, justifyContent: "space-evenly", marginTop: "-1rem" }}
      >
        <Button
          sx={buttonLnks}
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddEmail}
        >
          Add Another Email
        </Button>
        <Button
          sx={buttonLnks}
          startIcon={<AttachFileSharpIcon sx={{ transform: 'rotate(30deg)' }} />}
        >
          Get a shareable invite link
        </Button>
      </Box>
      <Box
        sx={buttonBox}
      >
        <Button sx={{ ...YellowBtn, padding: "1rem 3.5rem" }}
          onClick={handleNextStep}>Next</Button>
        <Button sx={{ ...YellowBtn, padding: "1rem 3.5rem" }}>Skip</Button>
      </Box>

      <div style={{ marginTop: "10rem" }}>

        <FooterCircles width2={"4rem"} background2={"#4C8AB1"} />
      </div>
    </div>
  );
}



const buttonBox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "3rem",
  marginTop: "3rem"
}
const buttonLnks = {
  fontFamily: "Inter", fontWeight: 500, height: "50%", marginTop: "2rem", textTransform: "none", color: "#4C8AB1"
}


export default ExistenceProjectStep2;
