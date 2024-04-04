import React, { useState } from "react";

import {

  Button, Box, useMediaQuery, Container
} from "@mui/material";
import StepTitles from "../StepTitles/StepTitles";
import FooterCircles from "../FooterCircles/FooterCircles"
import YellowBtn from "../../UI/button";
import shallowButton from "../../UI/shallowButton";
import "../../../App.css"
import { useUpdateProjectMutation } from "../../../redux/apis/usersApiSlice";

import { useDispatch, useSelector } from "react-redux";
import {
  selectProjectForm,
  setClientName,
  addUser,
} from "../../../redux/slices/projectFormSlice";


function ExistenceProjectStep1({ onNextStep }) {
  const local = localStorage.getItem('projectId');
  const projectId = JSON.parse(local);
  const isMobile = useMediaQuery('(max-width:600px)');
  const labelResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" }
  const formWidth = { width: isMobile ? "90%" : "50%" }
  const labelDisplay = { display: isMobile ? "none" : "block" }
  const borderRadiusResponsive = { borderRadius: isMobile ? "0.5rem" : "0.75rem" }
  const [updateExistingProject] = useUpdateProjectMutation()
  const dispatch = useDispatch();
  const {clientName} = useSelector(selectProjectForm);
  console.log(clientName)
  const handleNextStep = async () => {
    onNextStep();
    // const putData = {
    //   projectId: projectId,
    //   clientName: clientName,
    // }
    // try {
    //    const res = await updateExistingProject(putData)
    //    if(res.data?.success){
    //      onNextStep();
    //    }else{
    //     toast.error(res.error.data.message)
    //    }
       
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const handleChange = (e) => {
    dispatch(setClientName(e.target.value));
  }

  const lableResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" }

  return (
    <>
      <StepTitles Heading="Existing Project" stepHeading={"Step 1 of 3"} stepDiscription={"Lorem ipsum dolor sit amet consectetur. Pretium aliquam egestas interdum varius sed at libero. Sed vestibulum vel platea accumsan in elit morbi eu erat. Purus non urna et purus. Libero nec nec quam pulvinar massa nulla et tincidunt."} />

      <Box
        sx={formBox}
      >
        <form style={{ ...formStyle, ...formWidth }}>
          <Box sx={{ marginTop: "0.5rem", }}>
            <label style={{ ...labelStyle, ...labelDisplay, ...labelResponsiveFont }} htmlFor="name">Client Name</label>
            <input className='placeholder' value={clientName} onChange={handleChange} type="email" id="email" style={{ ...inputStyle, ...borderRadiusResponsive, ...labelResponsiveFont }} placeholder="Enter Name here" />
          </Box>
        </form>
      </Box>
      <Box sx={buttonBox}>
        <Button
          variant="outlined"
          sx={{ ...YellowBtn, ...shallowButton, }}
          onClick={handleNextStep}
        >
          Next
        </Button>
      </Box>
      <Box sx={{ paddingTop: "10rem" }}>
        <FooterCircles width1="4rem" background1="#4C8AB1" />
      </Box>
    </>
  );
}



const buttonBox = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  padding: "0rem 1rem 0rem 2rem",
  marginBottom: "1rem"
}


const labelStyle = {
  marginBottom: '5px',
  color: '#202227',
  fontFamily: "Inter",
  fontSize: '1rem',
  fontWeight: 500,
}

const inputStyle = {
  width: "100%", // Set width to 100% for responsiveness
  height: "2rem",
  marginBottom: '0.5rem',
  alignSelf: "center",
  padding: '8px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '12px',
  color: "#202227",
  fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
  paddingLeft: "-1.5rem",
};
const formBox = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "0.5rem",
  gap: "1.5rem"
};
const formStyle = {
  marginTop: "0.1rem",
}

export default ExistenceProjectStep1;
