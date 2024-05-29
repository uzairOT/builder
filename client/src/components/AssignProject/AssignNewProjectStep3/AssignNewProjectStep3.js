import React from "react";
import { useNavigate } from "react-router-dom";
import AddPhaseView from "../AddPhaseView/AddPhaseView"
import Footer from "../Footer/Footer"
import StepTitles from "../StepTitles/StepTitles";

function AssignNewProjectStep3({projectId, onNextStep }) {
  const navigate = useNavigate();



  return (
    <div >
      <StepTitles
        stepHeading={"Step 3 of 3"}
        Heading={"Plan your project"}
        // projectName={projectName}
        stepDiscription={`Divide your project in Phases and add line items against phases.`}
      />
      <AddPhaseView projectId={projectId} onNextStep={onNextStep} />
    </div>      
  );
}

export default AssignNewProjectStep3;
