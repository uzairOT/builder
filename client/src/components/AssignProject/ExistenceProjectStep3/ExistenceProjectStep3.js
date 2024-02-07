import React from "react";
import { useNavigate } from "react-router-dom";
import AddPhaseView from "../AddPhaseView/AddPhaseView"
import Footer from "../Footer/Footer"

function ExistenceProjectStep3({ onNextStep }) {
    const navigate = useNavigate();

    const handleNextStep = () => {
        navigate("/assignproject");
        onNextStep();
    };

    return (
        <div >

            <AddPhaseView />
            <Footer />


        </div>
    );
}

export default ExistenceProjectStep3;
