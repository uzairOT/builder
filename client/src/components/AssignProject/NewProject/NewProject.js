
import React, { useState } from "react";
import AssignNewProjectStep2 from "../AssignNewProjectStep2/AssignNewProjectStep2";
import AssignNewProjectStep3 from "../AssignNewProjectStep3/AssignNewProjectStep3";

import Header from "../Header/Header";
import AssignProject from "../../../pages/AssignProject/AssignProject";
import { useNavigate } from "react-router-dom";

function NewProject() {
    const navigate = useNavigate()
    const [step, setStep] = useState(0);


    const onNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };


    const renderStep = () => {
        switch (step) {
            case -1:
                return (
                    <div>
                        <AssignProject />
                    </div>
                )
            case 0:
                return (
                    <div>
                        <Header handlePreviousStep={handlePreviousStep} />
                        <AssignNewProjectStep2 onNextStep={onNextStep} />
                    </div>
                );
            case 1:
                return (
                    <div>
                        <Header handlePreviousStep={handlePreviousStep} />
                        <AssignNewProjectStep3 onNextStep={onNextStep} />
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <div>
            {renderStep()}

        </div>
    )
}

export default NewProject
