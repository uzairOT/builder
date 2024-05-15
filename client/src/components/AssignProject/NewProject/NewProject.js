
import React, { useEffect, useState } from "react";
import AssignNewProjectStep2 from "../AssignNewProjectStep2/AssignNewProjectStep2";
import AssignNewProjectStep3 from "../AssignNewProjectStep3/AssignNewProjectStep3";

import Header from "../Header/Header";
import AssignProject from "../../../pages/AssignProject/AssignProject";
import { UNSAFE_NavigationContext, useNavigate } from "react-router-dom";
import SaveAsProject from "../SaveAsProject/SaveAsProject";
import Footer from "../Footer/Footer";

function NewProject() {
    const navigate = useNavigate()
    const [step, setStep] = useState(0);
    const [isSaveAs,setIsSaveAs] = useState(false)
    const [projectId, setProjectId] = useState(null);
    const [locationKeys, setLocationKeys] = useState([]);




    
 
    const onSaveStep = () => {
        setStep(0);
    }
    const onNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };
    useEffect(() => {
        console.log('step: ', step);
        localStorage.setItem('step', step);
        const step1 = parseInt(localStorage.getItem('step'), 10); // Convert to number
        setStep(step1);
    }, [step]);

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
                        <Header step={step} step2={true}  handlePreviousStep={handlePreviousStep} />
                        <AssignNewProjectStep2 isSaveAs={isSaveAs} setProjectId={setProjectId} projectId={projectId} onNextStep={onNextStep} />
                    </div>
                );
            case 1:
                return (
                    <div>
                        <Header step={step} handlePreviousStep={handlePreviousStep} />
                        <AssignNewProjectStep3 projectId={projectId} onNextStep={onNextStep} />
                        <Footer onNextStep={onNextStep} />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <Header step={step} handlePreviousStep={handlePreviousStep} />
                        <SaveAsProject setIsSaveAs={setIsSaveAs} onSaveStep={onSaveStep} />
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
