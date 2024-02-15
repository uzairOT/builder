
import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../Header/Header";
import ExistenceProjectStep1 from "../ExistenceProjectStep1/ExistenceProjectStep1";
import ExistenceProjectStep2 from "../ExistenceProjectStep2/ExistenceProjectStep2";
import ExistenceProjectStep3 from "../ExistenceProjectStep3/ExistenceProjectStep3";
import AssignProject from "../../../pages/AssignProject/AssignProject"
import SaveAsProject from "../SaveAsProject/SaveAsProject";
import Footer from "../Footer/Footer";
import AssignNewProjectStep3 from "../AssignNewProjectStep3/AssignNewProjectStep3";

function ExistingProject() {


    const [step, setStep] = useState(0);



    const onSaveStep = () => {
        setStep(1);
    };


    const onNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };



    const renderExistenceStep = () => {
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
                        <Box
                            sx={{
                                ...normalBox,
                                backgroundColor: "#4C8AB1",
                            }}
                        >
                            <Box sx={{ ...normalBox, ...whiteBox, marginTop: "0.99rem" }}>

                                <Header gap="25rem" handlePreviousStep={handlePreviousStep} />
                                <ExistenceProjectStep1 onNextStep={onNextStep} />


                            </Box >
                        </Box>

                    </div>
                );
            case 1:
                return (
                    <div>
                        <Header handlePreviousStep={handlePreviousStep} />
                        <ExistenceProjectStep2 onNextStep={onNextStep} />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <Header handlePreviousStep={handlePreviousStep} />
                        {/* <ExistenceProjectStep3 onNextStep={onNextStep} /> */}
                        <AssignNewProjectStep3 onNextStep={onNextStep} />
                        <Footer onNextStep={onNextStep} />
                    </div>
                );
            case 3:
                return (
                    <div>
                        <Header handlePreviousStep={handlePreviousStep} />
                        <SaveAsProject onSaveStep={onSaveStep} />
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <div>
            {renderExistenceStep()}
        </div>
    )
}
const normalBox = {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
}

const whiteBox = {
    background: "#FFF", width: { lg: "70%", sm: '80%', xs: "90%" },
    margin: "1rem", padding: { lg: "0rem 2rem", sm: "0rem 2rem", xs: "0rem 2rem" }, borderRadius: '1rem',
}
export default ExistingProject
