import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterCircles from "../FooterCircles/FooterCircles";
import YellowBtn from "../../UI/button";
import StepTitles from "../StepTitles/StepTitles";
import AttachFileSharpIcon from "@mui/icons-material/AttachFileSharp";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SkipInvite from "../../dialogues/SkipInvite/SkipInvite";

import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  updateUserEmail,
  updateUserRole,
  selectUsers,
  resetUserAndRoleEmail
} from "../../../redux/slices/projectFormSlice";

import { Button, Box, useMediaQuery } from "@mui/material";
import StepFormField from "../StepFormField/StepFormField";
import {
  selectProjectForm,
  setProjectName,
  setLocation,
} from "../../../redux/slices/projectFormSlice";
import { useAssignProjectMutation } from "../../../redux/apis/usersApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetUserProjectsQuery } from "../../../redux/apis/Project/userProjectApiSlice";


function AssignNewProjectStep2({
  onNextStep,
  setProjectId,
  isSaveAs,
  projectId,
}) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTab = useMediaQuery("(max-width:900px)");
  const userInfo = useSelector((state) => state.auth.userInfo);
  const formWidth = { width: isMobile ? "75%" : isTab ? "65%" : "48%" };
  const [assignProject, { isLoading }] = useAssignProjectMutation({
    userId: userInfo.user.id,
  });
  const borderRadiusResponsive = {
    borderRadius: isMobile ? "0.5rem" : "0.75rem",
  };
  const labelResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" };
  const [emailCount, setEmailCount] = useState(1);
  const [showSkipInvite, setShowSkipInvite] = useState(false);
  const { projectName } = useSelector(selectProjectForm);
  const { refetch } = useGetUserProjectsQuery({ userId: userInfo.user.id });

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
    handleCreateNewProject();
  };

  const Data = useSelector(selectProjectForm);
  //console.log(Data);

  const handleCreateNewProject = async () => {
    localStorage.removeItem("projectId");
    localStorage.removeItem("projectId");
    try {
      const userdata = userInfo.user.id;
      //console.log(userdata);

      const userId = userdata;
      //console.log(userId);
      const FormData = {
        ...Data,
        userId: userId,
        isSaveAs: isSaveAs,
        projectId: projectId,
      };

      // Call the assignProject function and wait for the result
      const res = await assignProject(FormData).unwrap();


      // If successful, store the project ID in local storage
      localStorage.setItem("projectId", res.project.id);
      setProjectId(res.project.id);
      await refetch();
      localStorage.setItem("projectId", res.project.id);
      setProjectId(res.project.id);
      await refetch();
      onNextStep();
      dispatch(resetUserAndRoleEmail());
    } catch (error) {
      // If an error occurs during the process, handle it here
      toast.error("Error creating new project:", error.message);
      toast.error("Error creating new project:", error.message);
      return;
    }
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

      <div style={{ marginTop: "5rem" }}>
        <FooterCircles width2={"4rem"} background2={"#4C8AB1"} />
      </div>
      {showSkipInvite && (
        <SkipInvite
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleNextStep={handleNextStep}
          isTab={isTab}
          isMobile={isMobile}
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

const inputStyle = {
  width: "100%", // Set width to 100% for responsiveness
  height: "2rem",
  marginBottom: "0.5rem",
  alignSelf: "center",
  padding: "8px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "12px",
  color: "#202227",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  paddingLeft: "-1.5rem",
};

const fieldBox1 = {
  flex: 4,
  marginRight: "1rem",
  marginLeft: "-1rem",
  position: "relative",
};

const formStyle = {
  marginTop: "0.1rem",
};

const formBox = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "0.5rem",
};

export default AssignNewProjectStep2;
