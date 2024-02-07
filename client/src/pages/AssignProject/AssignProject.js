

import React, { useState } from 'react'

import {
  useMediaQuery,
  Button, Box, Typography,
} from "@mui/material";


import GTWalsheimTrial from "../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf";
import FooterCircles from '../../components/AssignProject/FooterCircles/FooterCircles'
import YellowBtn from '../../components/UI/button';
import StepTitles from '../../components/AssignProject/StepTitles/StepTitles';
import StepBoxes from '../../components/AssignProject/StepBoxes/StepBoxes';


import { useNavigate } from 'react-router-dom';
import Header from '../../components/AssignProject/Header/Header';
import NewProject from '../../components/AssignProject/NewProject/NewProject';
import ExistingProject from '../../components/AssignProject/ExistingProject/ExistingProject';


function AssignProject() {
  const [projectType, setProjectType] = useState(null)


  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate()

  const handleProjectChange = (value) => {
    setProjectType(value)
  };

  const [step, setStep] = useState(0);
  const handlePreviousStep = () => {
    setStep(step - 1);
  };





  return (
    <>

      {projectType === null ? (<> <div>
        <Header handlePreviousStep={handlePreviousStep} />
        <StepTitles stepHeading={"Step 1 of 3"} Heading={"What projects is your team currently engaged in"} stepDiscription={"Lorem ipsum dolor sit amet consectetur. Pretium aliquam egestas interdum varius sed at libero. Sed vestibulum vel platea accumsan in elit morbi eu erat. Purus non urna et purus. Libero nec nec quam pulvinar massa nulla et tincidunt."} />
        <StepBoxes />
        <Box
          sx={formBox}
        >
          <form style={{ marginTop: "0.1rem" }}>
            <Box sx={{ marginTop: "0.5rem", width: "300%" }}>
              <label style={{ ...labelStyle, fontSize: isMobile ? "0.8rem" : "1rem" }} htmlFor="email">Project Name</label>
              <input className='placeholder' type="email" id="email" style={{ ...inputStyle, fontFamily: GTWalsheimTrial, paddingLeft: "-1.5rem", fontSize: isMobile ? "0.8rem" : "1rem" }} placeholder="e.g. Project name                                                                                                 0/50" />
            </Box>
          </form>
        </Box>

        <Box
          sx={buttonBox}
        >

          <Button
            variant="outlined"
            sx={{
              ...YellowBtn,
              ...NewProjectButton
            }}
            onClick={() => handleProjectChange("New")}
          >
            New Project
          </Button>
          <Typography sx={{ fontFamily: GTWalsheimTrial }}>
            OR
          </Typography>
          <Button sx={{ ...YellowBtn, padding: "1rem 2.5rem" }}
            onClick={() => handleProjectChange("Existing")}>Existing Project</Button>
        </Box>

        <div style={{ marginTop: "10rem" }}>
          <FooterCircles width1={"4rem"} background1={"#4C8AB1"} />
        </div>
      </div></>) : (<>
        {projectType === 'New' ? (<NewProject />) : (<ExistingProject />)}


      </>)}

    </>
  )
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
const buttonBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1.2rem",
  marginTop: "3rem"
}

const NewProjectButton = {
  border: "1px solid #FFAC00",
  background: "#FFF",
  color: "#FFAC00",
  "&:hover": {
    background: "#FFF",
  },
}

export default AssignProject
