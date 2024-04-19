import React, { useState } from "react";
import FooterCircles from "../FooterCircles/FooterCircles";
import YellowBtn from "../../UI/button";
import StepTitles from "../StepTitles/StepTitles";
import AttachFileSharpIcon from "@mui/icons-material/AttachFileSharp";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SkipInvite from "../../dialogues/SkipInvite/SkipInvite";
import "../StepFormField/StepFormField.css";
import { Button, Box } from "@mui/material";
import StepFormField from "../StepFormField/StepFormField";
import { useDispatch, useSelector } from "react-redux";
import { 
  selectProjectForm,
  updateUserEmail,
  updateUserRole,
  selectUsers,
  addUser,
} from "../../../redux/slices/projectFormSlice";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAssignProjectMutation, useUpdateProjectMutation } from "../../../redux/apis/usersApiSlice";

function ExistenceProjectStep2({ onNextStep }) {
  const local = localStorage.getItem('projectId');
  const projectId = JSON.parse(local);
  const [emailCount, setEmailCount] = useState(3);
  const [showSkipInvite, setShowSkipInvite] = useState(false);
  const [assignProject, { isLoading }] = useAssignProjectMutation();
  const dispatch = useDispatch();
  const [updateExistingProject] = useUpdateProjectMutation()
  const {clientName, users} = useSelector(selectProjectForm);
  const handleAddEmail = () => {
    dispatch(addUser());
  };
  const handleNextStep = () => {
    handleDoneClick();
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
  //console.log(userInfo);

  const handleDoneClick = async () => {
    // const userdata =  userInfo.id
  const putData = {
      projectId: projectId,
      clientName: clientName,
      users: users
    }
    try {
       const res = await updateExistingProject(putData)
       if(res.data?.success){
         onNextStep();
       }else{
        toast.error(res.error.data.message)
       }
       
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div>
      <StepTitles
        stepHeading={"Step 2 of 3"}
        Heading={"Add More Team to the"}
        projectName={"Project Name"}
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
          onClick={handleAddEmail}
        >
          Add Another Email
        </Button>
        {/* <Button
          sx={buttonLnks}
          startIcon={
            <AttachFileSharpIcon sx={{ transform: "rotate(30deg)" }} />
          }
        >
          Get a shareable invite link
        </Button> */}
      </Box>
      <Box sx={{ ...buttonBox, ...buttoncontainer }}>
        <Button sx={{ ...YellowBtn, ...buttonStyle }} onClick={handleNextStep}>
          Next
        </Button>
        <Button sx={{ ...YellowBtn, ...buttonStyle }} onClick={handleSkip}>
          Skip
        </Button>
      </Box>

      <div style={{ marginTop: "2rem" }}>
        <FooterCircles width2={"4rem"} background2={"#4C8AB1"} />
      </div>
      {showSkipInvite && (
        <SkipInvite handleOpen={handleOpen} handleClose={handleClose} />
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
  marginTop: "1.5rem",
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

export default ExistenceProjectStep2;
