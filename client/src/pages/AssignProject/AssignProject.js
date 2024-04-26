import React, { useState } from "react";
import {
  useMediaQuery,
  Button,
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";

import "../../App.css";
import FooterCircles from "../../components/AssignProject/FooterCircles/FooterCircles";
import YellowBtn from "../../components/UI/button";
import StepTitles from "../../components/AssignProject/StepTitles/StepTitles";
import StepBoxes from "../../components/AssignProject/StepBoxes/StepBoxes";
import { useNavigate } from "react-router-dom";
import Header from "../../components/AssignProject/Header/Header";
import NewProject from "../../components/AssignProject/NewProject/NewProject";
import ExistingProject from "../../components/AssignProject/ExistingProject/ExistingProject";
import ProjectFormFields from "../../components/AssignProject/ProjectFormFields/ProjectFormFields";
import { useExistingProjectMutation } from "../../redux/apis/usersApiSlice";
import { selectProjectForm } from "../../redux/slices/projectFormSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AssignProject() {
  const local = localStorage.getItem("userInfo");
  const currentUser = JSON.parse(local);
  const currentUserId = currentUser?.user.id;
  const [projectType, setProjectType] = useState(null);
  const { projectName, location, projectColor } = useSelector(selectProjectForm);
  const [postExistingProject] = useExistingProjectMutation();
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const labelResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" };

  const handleProjectChange = async (value) => {
    if (value === "Existing") {
      const data = {
        userId: currentUserId,
        projectName: projectName,
      };
      const res = await postExistingProject(data);
      
      if (res.data?.success) {
        setProjectType(value);
      } else {
        toast.error(res.error.data.message);
      }
    } else if (projectName === "") {
      toast.warning("Please enter project name");
    } else if(projectColor === ''){
      toast.warning("Please select project color");
    } else if (location === "") {
      toast.warning("Please enter project location");
    } else if (projectName !== "") {
      
      setProjectType(value);
    }
  };

  const [step, setStep] = useState(0);
  const handlePreviousStep = () => {
    if (projectName === "") {
      return;
    } else {
      setStep(step - 1);
    }
  };

  return (
    <>
      {projectType === null ? (
        <>
          {" "}
          <div>
            <Header handlePreviousStep={handlePreviousStep} step={0} />
            <StepTitles
              stepHeading={"Step 1 of 3"}
              Heading={"What projects is your team currently engaged in"}
              stepDiscription={
                "Lorem ipsum dolor sit amet consectetur. Pretium aliquam egestas interdum varius sed at libero. Sed vestibulum vel platea accumsan in elit morbi eu erat. Purus non urna et purus. Libero nec nec quam pulvinar massa nulla et tincidunt."
              }
            />
            <StepBoxes />

            <ProjectFormFields />
            {!isMobile ? (
              <Box sx={buttonBox}>
                <Button
                  variant="outlined"
                  sx={{
                    ...YellowBtn,
                    ...NewProjectButton,
                  }}
                  onClick={() => handleProjectChange("New")}
                >
                  New Project
                </Button>
                <Typography sx={orTypo}>OR</Typography>
                <Button
                  sx={{ ...YellowBtn, padding: "1rem 2.5rem" }}
                  onClick={() => handleProjectChange("Existing")}
                >
                  Existing Project
                </Button>
              </Box>
            ) : (
              <Box sx={buttonBox}>
                <Button
                  sx={{ ...YellowBtn, ...buttonStyle }}
                  onClick={() => handleProjectChange("Existing")}
                >
                  Existing Project
                </Button>
                <Typography sx={orTypo}>OR</Typography>
                <Button
                  variant="outlined"
                  sx={{
                    ...YellowBtn,
                    ...NewProjectButton,
                    ...buttonStyle,
                  }}
                  onClick={() => handleProjectChange("New")}
                >
                  New Project
                </Button>
              </Box>
            )}

            <div style={{ marginTop: "1rem" }}>
              <FooterCircles width1={"4rem"} background1={"#4C8AB1"} />
            </div>
          </div>
        </>
      ) : (
        <>{projectType === "New" ? <NewProject /> : <ExistingProject />}</>
      )}
    </>
  );
}

const buttonBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: { lg: "1.2rem", md: "1rem", sm: "0.8rem", xs: "0.5rem" },
  marginTop: "1rem",
  padding: { xs: "0rem 4rem" },
};

const NewProjectButton = {
  border: "1px solid #FFAC00",
  background: "#FFF",
  color: "#FFAC00",
  "&:hover": {
    background: "#FFF",
  },
};

const buttonStyle = {
  fontSize: { lg: "1.25rem", md: "1rem", sm: "1rem", xs: "0.8rem" },
  padding: "1rem 0.5rem",
};
const orTypo = {
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: "0.8rem",
};

export default AssignProject;
