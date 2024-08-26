import React from "react";
import { useNavigate } from "react-router-dom";
import AddPhaseView from "../AddPhaseView/AddPhaseView";
import Footer from "../Footer/Footer";
import StepTitles from "../StepTitles/StepTitles";
import { Grid } from "@mui/material";

function AssignNewProjectStep3({ projectId, onNextStep }) {
  const navigate = useNavigate();
  console.log(projectId);

  return (
    <div>
      <StepTitles
        stepHeading={"Step 3 of 3"}
        Heading={"Plan your project"}
        // projectName={projectName}
        stepDiscription={`Divide your project in phases and add line items to phases.`}
      />
      <Grid m={"0px 6px 0px 6px"} >
        <AddPhaseView
          projectId={projectId}
          authUserRole={""}
          onNextStep={onNextStep}
        />
      </Grid>
    </div>
  );
}

export default AssignNewProjectStep3;
