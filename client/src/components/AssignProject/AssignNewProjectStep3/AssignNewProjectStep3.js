import React from "react";

import AddPhaseView from "../AddPhaseView/AddPhaseView";
import StepTitles from "../StepTitles/StepTitles";
import { Grid } from "@mui/material";

function AssignNewProjectStep3({ projectId, onNextStep }) {

  // console.log(projectId);

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
