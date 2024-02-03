import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header"
import AddPhaseView from "../AddPhaseView/AddPhaseView"
import Footer from "../Footer/Footer"

function AssignProjectThirdStep({ onNextStep }) {
  const navigate = useNavigate();

  const handleNextStep = () => {
    // Navigate to home page
       navigate("/assignproject");

    // Trigger the next step in Home component
    onNextStep();
  };

  return (
    <div >

<Header/>
<AddPhaseView />
<Footer  />


      <h1>Step 3</h1>
      {/* Your Step 1 content goes here */}
      <button onClick={handleNextStep}>Done</button>
    </div>
  );
}

export default AssignProjectThirdStep;
