import React from "react";
import { useNavigate } from "react-router-dom";
import AddPhaseView from "../AddPhaseView/AddPhaseView"
import Footer from "../Footer/Footer"

function AssignNewProjectStep3({ onNextStep }) {
  const navigate = useNavigate();



  return (
    <div >
      <AddPhaseView onNextStep={onNextStep} />
    </div>
  );
}

export default AssignNewProjectStep3;
