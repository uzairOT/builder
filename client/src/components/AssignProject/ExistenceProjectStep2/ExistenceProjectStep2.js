import React, { useState } from "react";
import FooterCircles from "../FooterCircles/FooterCircles";
import YellowBtn from '../../UI/button';
import StepTitles from "../StepTitles/StepTitles";
import AttachFileSharpIcon from '@mui/icons-material/AttachFileSharp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SkipInvite from "../../dialogues/SkipInvite/SkipInvite";
import "../StepForm/StepForm.css"
import {
  Button, Box,
} from "@mui/material";
import StepFormField from "../StepFormField/StepFormField";
import { useDispatch, useSelector } from "react-redux";
import { selectProjectForm } from "../../../redux/slices/projectFormSlice";
import { useAssignProjectMutation } from "../../../redux/apis/usersApiSlice";

function ExistenceProjectStep2({ onNextStep }) {

  const [emailCount, setEmailCount] = useState(3);
  const [showSkipInvite, setShowSkipInvite] = useState(false);
  const [assignProject, { isLoading }] = useAssignProjectMutation();
  const handleAddEmail = () => {
    setEmailCount(emailCount + 1);
  };
  const handleNextStep = () => {
    onNextStep();
    handleDoneClick()
  };

  const handleSkip = () => {
    setShowSkipInvite(true);
  };

  const handleOpen = () => {
    setShowSkipInvite(true);
  };

  const handleClose = () => {
    setShowSkipInvite(false);
  };

  const Data = useSelector(selectProjectForm);
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log(userInfo);

  const handleDoneClick = async () => {
    // const userdata =  userInfo.id
    const userId =userInfo.user.id
    console.log(userId)
     const FormData = { ...Data,userId  };
     console.log(userInfo.user.id);
 
     const res = await assignProject(FormData).unwrap();
     localStorage.setItem('projectId', res.project.id);
     console.log(res.project.id);
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
        <Button sx={{ ...YellowBtn, padding: "1rem 3.5rem" }}
          onClick={handleSkip}
        >Skip</Button>
      </Box>

      <div style={{ marginTop: "2rem" }}>

        <FooterCircles width2={"4rem"} background2={"#4C8AB1"} />
      </div>
      {showSkipInvite && (
        <SkipInvite
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}



const buttonBox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "3rem",
  marginTop: "1.5rem"
}
const buttonLnks = {
  fontFamily: "Inter", fontWeight: 500, height: "50%", marginTop: "2rem", textTransform: "none", color: "#4C8AB1"
}


export default ExistenceProjectStep2;
