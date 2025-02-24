import React from "react";

import AddPhaseView from "../AddPhaseView/AddPhaseView";
import StepTitles from "../StepTitles/StepTitles";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
function AssignNewProjectStep3({ projectId, onNextStep }) {
  const { t } = useTranslation();
  // console.log(projectId);

  return (
    <div>
      <StepTitles
        stepHeading={t("AssignNewProjectStep3.title1")}
        Heading={t("AssignNewProjectStep3.title2")}
        // projectName={projectName}
        stepDiscription={t("AssignNewProjectStep3.title3")}
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
