import React from "react";
import { useNavigate } from "react-router-dom";

function AssignProjectSecondStep({ onNextStep }) {
  const navigate = useNavigate();

  const handleNextStep = () => {
    // Navigate to home page
        navigate("/assignproject");

    // Trigger the next step in Home component
    onNextStep();
  };

  return (
    <div>
      <h1>Step 2</h1>
      {/* Your Step 1 content goes here */}
      <button onClick={handleNextStep}>Next Step</button>
    </div>
  );
}

export default AssignProjectSecondStep;
