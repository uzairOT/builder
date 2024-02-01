import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssignProjectFirstStep from "../../components/AssignProject/AssignProjectFirstStep/AssignProjectFirstStep";
import AssignProjectSecondStep from "../../components/AssignProject/AssignProjectSecondStep/AssignProjectSecondStep";
import AssignProjectThirdStep from "../../components/AssignProject/AssignProjectThirdStep/AssignProjectThirdStep";
import Header from "../../components/AssignProject/Header/Header";
import Footer from "../../components/AssignProject/Footer/Footer";
import AddPhaseView from "../../components/AssignProject/AddPhaseView/AddPhaseView"
import AddPhaseCard from "../../components/AssignProject/AddPhaseCard/AddPhaseCard";


function AssignProject() {
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
        return <AssignProjectFirstStep onNextStep={handleNextStep} />;
      case 2:
        return <AssignProjectSecondStep onNextStep={handleNextStep} />;
      case 3:
        return <AssignProjectThirdStep onNextStep={handleNextStep} />;
      default:
        return null;
    }
  };

  return (
    <div>
     
      {/* <Header /> */}
        {/* <AddPhaseView /> */}
        {/* <AddPhaseCard /> */}
      {/* <Footer /> */}
     
      {renderCurrentStep()}
      <button onClick={handlePreviousStep} disabled={currentStep === 1}>
        Back
      </button>
    </div>
  );
}

export default AssignProject;
