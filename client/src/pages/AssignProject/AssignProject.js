import React, { useState } from 'react'

import {
  useMediaQuery,
  Button, Box, Typography, TextField, MenuItem
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
import ProjectFormFields from '../../components/AssignProject/ProjectFormFields/ProjectFormFields';


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


        <ProjectFormFields />
        {!isMobile ?
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
            <Typography sx={orTypo}>
              OR
            </Typography>
            <Button sx={{ ...YellowBtn, padding: "1rem 2.5rem" }}
              onClick={() => handleProjectChange("Existing")}>Existing Project</Button>
          </Box> : <Box
            sx={buttonBox}
          >
            <Button sx={{ ...YellowBtn, ...buttonStyle }}
              onClick={() => handleProjectChange("Existing")}>Existing Project</Button>
            <Typography sx={orTypo}>
              OR
            </Typography>
            <Button
              variant="outlined"
              sx={{
                ...YellowBtn,
                ...NewProjectButton,
                ...buttonStyle
              }}
              onClick={() => handleProjectChange("New")}
            >
              New Project
            </Button>

          </Box>

        }

        <div style={{ marginTop: "1rem" }}>
          <FooterCircles width1={"4rem"} background1={"#4C8AB1"} />
        </div>
      </div></>) : (<>
        {projectType === 'New' ? (<NewProject />) : (<ExistingProject />)}


      </>)}

    </>
  )
}


const buttonBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: { lg: "1.2rem", md: "1rem", sm: "0.8rem", xs: "0.5rem" },
  marginTop: "1rem",
  padding: { xs: "0rem 4rem" }
}

const NewProjectButton = {
  border: "1px solid #FFAC00",
  background: "#FFF",
  color: "#FFAC00",
  "&:hover": {
    background: "#FFF",
  },
}

const buttonStyle = {
  fontSize: { lg: '1.25rem', md: "1rem", sm: "1rem", xs: "0.8rem" },
  padding: "1rem 0.5rem"
}
const orTypo = {
  fontFamily: GTWalsheimTrial,
  fontSize: "0.8rem"
}

export default AssignProject
