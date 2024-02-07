import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterCircles from "../FooterCircles/FooterCircles";
import YellowBtn from '../../UI/button';
import Header from "../Header/Header";
import StepTitles from "../StepTitles/StepTitles";
import AttachFileSharpIcon from '@mui/icons-material/AttachFileSharp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../StepForm/StepForm.css"




import {
  useMediaQuery,
  Button, Box, Typography, TextField, MenuItem, selectClasses
} from "@mui/material";
import StepFormField from "../StepFormField/StepFormField";
import AssignNewProjectStep3 from "../AssignNewProjectStep3/AssignNewProjectStep3";



function ExistenceProjectStep2({ onNextStep }) {

  const [projectStep, setProjectStep] = useState(null)


  const handleExistenceProjectStep = (value) => {
    setProjectStep(value)
  };

  const [emailCount, setEmailCount] = useState(3);

  const handleAddEmail = () => {
    setEmailCount(emailCount + 1);
  };
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
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



const inputStyle = {
  width: "250%", // Set width to 100% for responsiveness
  height: "2rem",
  marginBottom: '1rem',
  alignSelf: "center",
  padding: '8px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '12px',
  color: "#202227"
};
const formBox = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  marginRight: "28rem",
  gap: "1.5rem"
};
const counterTypo = {
  position: 'absolute', right: '-18rem', bottom: '2rem', fontSize: '0.8rem',
  color: "#B8B8B8",
  fontFamily: 'Inter',
  fontWeight: 500
}
const selectLable = {
  padding: "0rem 1rem",
  marginTop: "-0.5rem",
  color: "#202227",
  fontFamily: 'Inter',
  fontWeight: 500

}
export default ExistenceProjectStep2;
