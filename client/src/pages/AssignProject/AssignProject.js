import React, { useEffect, useState } from "react";
import {
  useMediaQuery,
  Button,
  Box,
} from "@mui/material";

import "../../App.css";
import FooterCircles from "../../components/AssignProject/FooterCircles/FooterCircles";
import YellowBtn from "../../components/UI/button";
import StepTitles from "../../components/AssignProject/StepTitles/StepTitles";
import StepBoxes from "../../components/AssignProject/StepBoxes/StepBoxes";
import Header from "../../components/AssignProject/Header/Header";
import NewProject from "../../components/AssignProject/NewProject/NewProject";
import ProjectFormFields from "../../components/AssignProject/ProjectFormFields/ProjectFormFields";
import { useExistingProjectMutation } from "../../redux/apis/usersApiSlice";
import { selectProjectForm } from "../../redux/slices/projectFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { authUserRole } from "../../redux/slices/auth/userRoleSlice";
import { useCheckProjectDuplicationMutation } from "../../redux/apis/Project/projectApiSlice";
import { getBackButtonProjectId } from "../../redux/slices/Project/handlingProjectFlowSlice";
import { useTranslation } from "react-i18next";

function AssignProject() {
  const { t } = useTranslation();
  const local = localStorage.getItem("userInfo");
  const currentUser = JSON.parse(local);
  // console.log(currentUser);
  const currentUserId = currentUser?.user.id;
  const [projectType, setProjectType] = useState(null);
  const { projectName, location, projectColor, start_time, end_time } =
    useSelector(selectProjectForm);
  const [postExistingProject] = useExistingProjectMutation();
  const isMobile = useMediaQuery("(max-width:600px)");
  const labelResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" };
  const backButtonProjectId = useSelector(getBackButtonProjectId);
  // const notify = () => toast.success("Wow so easy!");
  const dispatch = useDispatch();
  const [showLocationWarning, setShowLocationWarning] = useState(false)
  const [checkProjectDuplication, { isLoading }] =
    useCheckProjectDuplicationMutation();
  dispatch(authUserRole(""));

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
        toast.error(res.error.data.message || "Something went wrong!");
        return;
      }
    } else if (projectName === "") {
      toast.warning("Please enter project name");
      // console.log("Please enter project name");
      return;
    }
    else if (location === "") {
      toast.warning("Please enter project location");
      setShowLocationWarning(true)
      // console.log("Please enter project location");
      return;
    }
    // else if (projectColor === "") {
    //   toast.warning("Please select project color");
    //   return;
    // }
    else if (dayjs(start_time)?.isAfter(end_time)) {
      toast.warning("Start date must be before end date");
      return;
    } else if (dayjs(end_time)?.isBefore(start_time)) {
      toast.warning("End date must be after start date");
      return;
    }
    // else if (start_time === null) {
    //   toast.warning("Please enter a start data");
    //   return;
    // } else if (end_time === null) {
    //   toast.warning("Please enter an end date");
    //   return;
    // }
    else if (projectName !== "") {
      if (backButtonProjectId) {
        setProjectType(value);
        return;
      }
      const data = {
        userId: currentUserId,
        projectName: projectName,
      };
      try {
        const res = await checkProjectDuplication(data);

        // console.log(res);
        if (res?.data?.success) {
          setProjectType(value);
        } else {
          toast.error(res.error.data.message || "Project name error");
        }
      } catch (error) {
        console.log(error);
      }
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

  useEffect(() => {
    if (currentUser?.incompleteProject?.incomplete) {
      setProjectType("incomplete");
    }
  }, [currentUser]);

  return (
    <>
      {projectType === null ? (
        <>
          {" "}
          <div>
            <Header handlePreviousStep={handlePreviousStep} step={0} />
            <StepTitles
              stepHeading={t("AssignProject.step1")}
              Heading={t("AssignProject.title1")}
              stepDiscription={t("AssignProject.title2")}
            />
            <StepBoxes />

            <ProjectFormFields showLocationWarning={showLocationWarning} />
            {!isMobile ? (
              <Box sx={buttonBox}>
                <Button
                  variant="outlined"
                  sx={{
                    ...YellowBtn,
                    ...NewProjectButton,
                  }}
                  onClick={() => {
                    handleProjectChange("New");
                  }}
                >
                  {t("AssignProject.newProject")}
                </Button>
                {/* <Typography sx={orTypo}>OR</Typography>
                <Button
                  sx={{ ...YellowBtn, padding: "1rem 2.5rem" }}
                  onClick={() => handleProjectChange("Existing")}
                >
                  Existing Project
                </Button> */}
              </Box>
            ) : (
              <Box sx={buttonBox}>
                {/* <Button
                  sx={{ ...YellowBtn, ...buttonStyle }}
                  onClick={() => handleProjectChange("Existing")}
                >
                  Existing Project
                </Button>
                <Typography sx={orTypo}>OR</Typography> */}
                <Button
                  variant="outlined"
                  sx={{
                    ...YellowBtn,
                    ...NewProjectButton,
                    ...buttonStyle,
                  }}
                  onClick={() => handleProjectChange("New")}
                >
                  {t("AssignProject.newProject")}
                </Button>
              </Box>
            )}

            <div style={{ marginTop: "1rem" }}>
              <FooterCircles width1={"4rem"} background1={"#4C8AB1"} />
            </div>
          </div>
        </>
      ) : (
        <>{projectType === "New" ? <NewProject /> : <NewProject step3={1} />}</>
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
  fontFamily: "var(--main-font-family)",
  fontSize: "0.8rem",
};

export default AssignProject;
