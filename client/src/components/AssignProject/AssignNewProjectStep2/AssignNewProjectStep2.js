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
  resetUserAndRoleEmail,
  removeUser,
  setSkipInvite,
} from "../../../redux/slices/projectFormSlice";

import { Button, Box, useMediaQuery, CircularProgress } from "@mui/material";
import StepFormField from "../StepFormField/StepFormField";
import {
  selectProjectForm,
  setProjectName,
  setLocation,
} from "../../../redux/slices/projectFormSlice";
import {
  useAssignProjectMutation,
  useEditAssignProjectMutation,
} from "../../../redux/apis/usersApiSlice";
import { toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import { useGetUserProjectsQuery } from "../../../redux/apis/Project/userProjectApiSlice";
import {
  getBackButtonProjectId,
  getIsSaveAs,
  setBackButtonProjectId,
} from "../../../redux/slices/Project/handlingProjectFlowSlice";

function AssignNewProjectStep2({
  onNextStep,
  setProjectId,
  // isSaveAs,
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
  const isSaveAs = useSelector(getIsSaveAs);
  const { refetch } = useGetUserProjectsQuery({ userId: userInfo.user.id });
  const local = localStorage.getItem("userInfo");
  const currentUser = JSON.parse(local);
  const organizationId = currentUser?.user?.organization?.organizationId;
  const backButtonProjectId = useSelector(getBackButtonProjectId);
  const [editAssignProject, { isLoading: isEditLoading }] =
    useEditAssignProjectMutation();

  const handleAddEmail = () => {
    setEmailCount(emailCount + 1);
  };

  const handleSkip = () => {
    dispatch(setSkipInvite());
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
  const Data = useSelector(selectProjectForm);
  const handleNextStep = () => {
    if (Data.users[0].email === "") {
      toast.warning("Please add your team's email");
      return;
    }
    handleCreateNewProject();
  };

  console.log(Data);

  const handleCreateNewProject = async () => {
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
        projectId: backButtonProjectId ? backButtonProjectId : projectId,
        organizationId: organizationId,
      };

      // Call the assignProject function and wait for the result
      console.log(backButtonProjectId)
      if (backButtonProjectId) {
        console.log(backButtonProjectId)
        const res = await editAssignProject(FormData).unwrap();

        // If successful, store the project ID in local storage
        localStorage.setItem("projectId", res.project.id);
        setProjectId(res.project.id);
        dispatch(setBackButtonProjectId(res.project.id));
        onNextStep();
      } else {
        const res = await assignProject(FormData).unwrap();
        console.log(res)
        if(res.message === "Existing User is not part of the organization."){
          toast.error(
       "Existing User is not part of the organization."
          );
          return;
        }
        // If successful, store the project ID in local storage
        localStorage.setItem("projectId", res?.project?.id);
        setProjectId(res?.project?.id);
        dispatch(setBackButtonProjectId(res?.project?.id));
        onNextStep();
      }

      // await refetch();
      // localStorage.setItem("projectId", res.project.id);
      // setProjectId(res.project.id);
      // await refetch();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || error?.data?.error || error?.message || "Something went wrong!"
      );
      return;
    }
  };
  // console.log("Assign Error", assignProject?.message)
  const removeIndex = (index) => {
    // Input validation (optional but recommended)
    if (index < 0 || index >= users.length) {
      console.error(
        "Invalid index. Please provide a valid index within the array bounds."
      );
      return; // Return the original array if index is out of range
    }
    // console.log(users);
    // // Efficient removal using splice
    // console.log(users.slice(0, index).concat(users.slice(index + 1)));
    dispatch(removeUser(index));
  };
  console.log(showSkipInvite);
  return (
    <>
      <StepTitles
        stepHeading={"Step 2 of 3"}
        Heading={"Invite your team to"}
        projectName={projectName}
        stepDiscription={`Accepting the invitation grants access to a secure project workspace in BuilderBuilder Pro`}
      />

      {users.map((user, index) => (
        <StepFormField
          removeIndex={removeIndex}
          key={index}
          index={index}
          email={user.email}
          role={user.role}
          onUpdateEmail={(email) => dispatch(updateUserEmail({ index, email }))}
          onUpdateRole={(role) => dispatch(updateUserRole({ index, role }))}
          userInfo={userInfo}
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
        <Button
          disabled={isLoading || isEditLoading}
          sx={{ ...YellowBtn, ...buttonStyle }}
          onClick={() => {  
               handleNextStep();

          }}
        >
          {isLoading || isEditLoading ? (
            <CircularProgress size={"1.25rem"} />
          ) : (
            "Next"
          )}
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
          handleNextStep={() => {

              handleCreateNewProject();


          }}
          isTab={isTab}
          isMobile={isMobile}
          isLoading={isLoading || isEditLoading}
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
  fontFamily: "var(--main-font-family)",
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
  fontFamily: "var(--main-font-family)",
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
