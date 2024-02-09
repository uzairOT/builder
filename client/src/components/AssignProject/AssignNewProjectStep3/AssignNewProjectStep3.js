import React from "react";
import { useNavigate } from "react-router-dom";
import AddPhaseView from "../AddPhaseView/AddPhaseView"
import Footer from "../Footer/Footer"

function AssignNewProjectStep3({ onNextStep }) {
  const navigate = useNavigate();

  // const handleNextStep = () => {
  //   // Navigate to home page
  //   navigate("/assignproject");

  //   // Trigger the next step in Home component
  //   onNextStep();
  // };

  return (
    <div >

      <AddPhaseView onNextStep={onNextStep} />
      {/* <Footer /> */}


    </div>
  );
}

export default AssignNewProjectStep3;
