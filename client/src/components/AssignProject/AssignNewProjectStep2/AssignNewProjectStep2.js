import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterCircles from "../FooterCircles/FooterCircles";
import YellowBtn from "../../UI/button";
import StepTitles from "../StepTitles/StepTitles";
import AttachFileSharpIcon from "@mui/icons-material/AttachFileSharp";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SkipInvite from "../../dialogues/SkipInvite/SkipInvite";

// import "../StepForm/StepForm.css";

import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  updateUserEmail,
  updateUserRole,
  selectUsers,
} from "../../../redux/slices/projectFormSlice";

import { Button, Box } from "@mui/material";
import StepFormField from "../StepFormField/StepFormField";
import {
  selectProjectForm,
  setProjectName,
  setLocation,
} from "../../../redux/slices/projectFormSlice";
import { useAssignProjectMutation } from "../../../redux/apis/usersApiSlice";

function AssignNewProjectStep2({ onNextStep }) {
  const [assignProject, { isLoading }] = useAssignProjectMutation();

  const [emailCount, setEmailCount] = useState(1);
  const [showSkipInvite, setShowSkipInvite] = useState(false);
  const { projectName } = useSelector(selectProjectForm);

  const handleAddEmail = () => {
    setEmailCount(emailCount + 1);
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

  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  const handleAddUser = () => {
    dispatch(addUser());
  };
  const handleNextStep = () => {
    onNextStep();
    handleCreateNewProject();
  };

  const Data = useSelector(selectProjectForm);
  const userInfo = useSelector((state) => state.auth.userInfo);
  // console.log(userInfo);

  const handleCreateNewProject = async () => {
    // const userdata =  userInfo.id
   
    // const userId =userInfo.id
    // console.log(userId)
    //  const FormData = { ...Data,userId  };
 
    //  const res = await assignProject(FormData).unwrap();
    //  localStorage.setItem('projectId', res.project.id);
    //  console.log(res.project.id);
   };

  return (
    <>
      <StepTitles
        stepHeading={"Step 2 of 3"}
        Heading={"invite your Team to the"}
        projectName={projectName}
        stepDiscription={
          "Lorem ipsum dolor sit amet consectetur. Pretium aliquam egestas interdum varius sed at libero. Sed vestibulum vel platea accumsan in elit morbi eu erat. Purus non urna et purus. Libero nec nec quam pulvinar massa nulla et tincidunt."
        }
      />

      {users.map((user, index) => (
        <StepFormField
          key={index}
          index={index}
          email={user.email}
          role={user.role}
          onUpdateEmail={(email) => dispatch(updateUserEmail({ index, email }))}
          onUpdateRole={(role) => dispatch(updateUserRole({ index, role }))}
        />
      ))}
      <Box
        sx={{
          ...buttonBox,
          justifyContent: "space-evenly",
          marginTop: "-1rem",
        }}
      >
        <Button
          sx={buttonLnks}
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddUser}
        >
          Add Another Email
        </Button>
        <Button
          sx={buttonLnks}
          startIcon={
            <AttachFileSharpIcon sx={{ transform: "rotate(30deg)" }} />
          }
        >
          Get a shareable invite link
        </Button>
      </Box>
      <Box sx={{ ...buttonBox, ...buttoncontainer }}>
        <Button sx={{ ...YellowBtn, ...buttonStyle }} onClick={handleNextStep}>
          Next
        </Button>
        <Button sx={{ ...YellowBtn, ...buttonStyle }} onClick={handleSkip}>
          Skip
        </Button>
      </Box>

      <div style={{ marginTop: "5rem" }}>
        <FooterCircles width2={"4rem"} background2={"#4C8AB1"} />
      </div>
      {showSkipInvite && (
        <SkipInvite
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleNextStep={handleNextStep}
        />
      )}
    </>
  );
}

const buttonBox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1.5rem",
  gap: "3rem",
};

const buttoncontainer = {
  gap: { lg: "3rem", md: "2.5rem", sm: "2rem", xs: "1rem" },
  padding: "0rem 3rem",
};
const buttonStyle = {
  padding: {
    lg: "1rem 3.5rem",
    md: "1rem 2.5rem",
    sm: "1rem 2rem",
    xs: "1rem 1rem",
  },
};

const buttonLnks = {
  fontFamily: "Inter",
  fontWeight: 500,
  height: "50%",
  marginTop: "2rem",
  textTransform: "none",
  color: "#4C8AB1",
  fontSize: { lg: "0.9rem", md: "0.9rem", sm: "0.8rem", xs: "0.6rem" },
  whiteSpace: "nowrap",
};

export default AssignNewProjectStep2;
