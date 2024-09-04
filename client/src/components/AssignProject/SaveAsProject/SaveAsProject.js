import React from "react";
import {
  useMediaQuery,
  Button,
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import "../StepFormField/StepFormField.css";
import FooterCircles from "../FooterCircles/FooterCircles";
import StepBoxes from "../StepBoxes/StepBoxes";
import YellowBtn from "../../UI/button";
import shallowButton from "../../UI/shallowButton";
import "../../../App.css";
import StepTitles from "../StepTitles/StepTitles";
import ProjectFormFields from "../ProjectFormFields/ProjectFormFields";
import { useDispatch, useSelector } from "react-redux";
import { selectProjectForm } from "../../../redux/slices/projectFormSlice";
import { toast } from "react-toastify";
import { useCheckProjectDuplicationMutation } from "../../../redux/apis/Project/projectApiSlice";
import { setIsSaveAs } from "../../../redux/slices/Project/handlingProjectFlowSlice";
//import "react-toastify/dist/ReactToastify.css";
function SaveAsProject({ onSaveStep, onNextStep, currentUserId }) {
  const dispatch = useDispatch();
  const { projectName, location, projectColor } =
    useSelector(selectProjectForm);
  const [checkProjectDuplication, { isLoading }] =
    useCheckProjectDuplicationMutation();

  const handleDone = async () => {
    if (projectName === "") {
      toast.warning("Please enter project name");
    } else if (projectColor === "") {
      toast.warning("Please select project color");
    } else {
      const data = {
        userId: currentUserId,
        projectName: projectName,
      };
      try {
        const res = await checkProjectDuplication(data);
        console.log(res);
        if (res?.data?.success) {
          onSaveStep();
          dispatch(setIsSaveAs(true))
          // setIsSaveAs(true);
        } else {
          toast.error(res.error.data.message || "Project name error");
        }
      } catch (error) {
        console.log(error);
      }
    }
    // onNextStep();
  };

  return (
    <div>
      <StepTitles Heading={"Save as project with new name"} />
      <Box sx={typoBox}>
        <Typography sx={typoText}>Select your type.</Typography>
      </Box>
      <StepBoxes />

      <ProjectFormFields />

      <Box sx={buttonBox}>
        <Button
          variant="outlined"
          sx={{
            ...YellowBtn,
            ...shallowButton,
            ...responsiveDone,
            width: "fit-content",
            margin: "auto",
          }}
          onClick={handleDone}
        >
          Done
        </Button>
      </Box>
      <div style={{ marginTop: "3rem" }}>
        <FooterCircles width1={"4rem"} background1={"#4C8AB1"} />
      </div>
    </div>
  );
}

const buttonBox = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1.5rem",
};

const typoBox = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "2rem",
  gap: "1.5rem",
};

const typoText = {
  fontFamily: 'var(--main-font-family)',
  letterSpacing: "0.01em",
  color: "#202227",
  textAlign: "center",
  width: { lg: "40%", md: "60%", sm: "70%", xs: "90%" },
  fontSize: { lg: "1rem", md: "0.9rem", sm: "0.8rem", xs: "0.75rem" },
};

const responsiveDone = {
  width: { lg: "auto", md: "auto", sm: "auto", xs: "10%" },
  background: { lg: "auto", md: "auto", sm: "#FFF", xs: "#FFAC00" },
  color: { lg: "auto", md: "auto", sm: "#FFAC00", xs: "#FFF" },
};
export default SaveAsProject;
