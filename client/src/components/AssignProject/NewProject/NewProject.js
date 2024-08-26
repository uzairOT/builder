
import React, { useEffect, useState } from "react";
import AssignNewProjectStep2 from "../AssignNewProjectStep2/AssignNewProjectStep2";
import AssignNewProjectStep3 from "../AssignNewProjectStep3/AssignNewProjectStep3";

import Header from "../Header/Header";
import AssignProject from "../../../pages/AssignProject/AssignProject";
import { UNSAFE_NavigationContext, useNavigate } from "react-router-dom";
import SaveAsProject from "../SaveAsProject/SaveAsProject";
import Footer from "../Footer/Footer";
import {setBackButtonProjectId } from "../../../redux/slices/Project/handlingProjectFlowSlice";
import { useDispatch } from "react-redux";

function NewProject({step3}) {
    const navigate = useNavigate()
    const [step, setStep] = useState(step3 ? step3 : 0);
    // const [isSaveAs,setIsSaveAs] = useState(false)
    const [projectId, setProjectId] = useState(null);
    const [backButtonProject, setBackButtonProject]=useState(null)
    const [locationKeys, setLocationKeys] = useState([]);
    const local = localStorage.getItem("userInfo");
    const currentUser = JSON.parse(local);

const dispatch=useDispatch()
console.log(currentUser)

    
 
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
                        <AssignProject  />
                    </div>
                )
            case 0:
                return (
                    <div>
                        <Header step={step} step2={true} handlePreviousStep={handlePreviousStep} />
                        <AssignNewProjectStep2 setBackButtonProjectId={setBackButtonProject} setProjectId={setProjectId} projectId={projectId} onNextStep={onNextStep} />
                    </div>
                );
            case 1:
                return (
                    <div>
                        <Header step={step} step3={true} handlePreviousStep={handlePreviousStep} />
                        <AssignNewProjectStep3   projectId={currentUser?.incompleteProject?.incomplete ?  currentUser?.incompleteProject?.projectId : projectId} onNextStep={onNextStep} />
                        <Footer onNextStep={onNextStep} projectId={currentUser?.incompleteProject?.incomplete ?  currentUser?.incompleteProject?.projectId : projectId}  />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <Header step={step} handlePreviousStep={handlePreviousStep} />
                        <SaveAsProject currentUserId={currentUser?.user?.id}  onSaveStep={onSaveStep} />
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
