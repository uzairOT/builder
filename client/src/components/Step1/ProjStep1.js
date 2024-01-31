import React from "react";
import { useNavigate } from "react-router-dom";

function ProjStep1({ onNextStep }) {
  const navigate = useNavigate();

  const handleNextStep = () => {
    // Navigate to home page
    navigate("/home");
    // Trigger the next step in Home component
    onNextStep();
  };

  return (
    <div>
      <h1>Step 1</h1>
      {/* Your Step 1 content goes here */}
      <button onClick={handleNextStep}>Next Step</button>
    </div>
  );
}

export default ProjStep1;
