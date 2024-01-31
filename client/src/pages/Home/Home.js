import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectJob from "../../components/ProjectJob/ProjectJob";
import ProjStep1 from "../../components/Step1/ProjStep1";
import ProjStep2 from "../../components/Step2/ProjStep2";
import ProjStep3 from "../../components/Step3/ProjStep3";

function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <ProjStep1 onNextStep={handleNextStep} />;
      case 2:
        return <ProjStep2 onNextStep={handleNextStep} />;
      case 3:
        return <ProjStep3 onNextStep={handleNextStep} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <ProjectJob />
      {renderCurrentStep()}
      <button onClick={handlePreviousStep} disabled={currentStep === 1}>
        Previous Step
      </button>
    </div>
  );
}

export default Home;
