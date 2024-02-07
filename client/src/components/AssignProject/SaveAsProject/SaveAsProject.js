import React from 'react'
import Header from '../Header/Header'
import {
 useMediaQuery,
  Button, Box, Typography,
} from "@mui/material";
import "../StepForm/StepForm.css"
import FooterCircles from '../FooterCircles/FooterCircles'
import StepBoxes from '../StepBoxes/StepBoxes'
import YellowBtn from "../../UI/button";
import shallowButton from "../../UI/shallowButton";
import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf"
import StepForm from '../StepForm/StepForm';
import StepTitles from '../StepTitles/StepTitles';
function SaveAsProject() {
       const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <div>
      <Header />
      <StepTitles Heading={"Save as Project with New Name"} />
      <Box sx={typoBox}>
        <Typography sx={typoText}>
Lorem ipsum dolor sit amet consectetur. Pretium aliquam egestas interdum varius sed at libero. Sed vestibulum vel platea accumsan in elit morbi eu erat. Purus non urna et purus. Libero nec nec quam pulvinar massa nulla et tincidunt.
        </Typography>
     </Box>
      <StepBoxes/>
      <Box
        sx={formBox}
      >
      <form style={{ marginTop: "0.1rem" }}>
             <Box sx={{marginTop:"0.5rem",width:"300%"  }}>
                                        <label style={{...labelStyle, fontSize: isMobile ? "0.8rem" : "1rem"}} htmlFor="email">Project Name</label>
                                        <input className='placeholder' type="email" id="email" style={{ ...inputStyle,  fontFamily: GTWalsheimTrial, paddingLeft:"-1.5rem", fontSize: isMobile ? "0.8rem" : "1rem"}} placeholder="e.g. Project name                                                                                                 0/50" />
                                    </Box> 
                                     </form>
                                     </Box>
  
          <Box sx={buttonBox}>
         <Button
            variant="outlined"
            sx={{...YellowBtn,  ...shallowButton,}}
          >
            Done
          </Button>
          </Box>
          <div style={{marginTop:"10rem"}}>
      <FooterCircles width1={"4rem"} background1={"#4C8AB1"} />
      </div>
    </div>
  )
}

const buttonBox ={
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop:"2rem"
}

const labelStyle ={
     display: 'block',
     marginBottom: '5px',
    color: '#202227',
     fontFamily: "Inter",
     fontSize: '1rem',
        fontWeight: 500,
  }

const inputStyle = {
     width: "100%", // Set width to 100% for responsiveness
    height: "2rem",
    marginBottom: '1rem',
    alignSelf: "center",
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    color:"#202227"
  };
const formBox = {
  display: "flex",
  flexDirection: "column", 
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  marginRight:"28rem",
  gap: "1.5rem"
};
const typoBox ={
display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "4rem",
          gap:"1.5rem"
}
 
const typoText = {
fontFamily: GTWalsheimTrial,
    fontSize: '1rem',
    letterSpacing: '0.01em',
    color: "#4C8AB1",
    textAlign: 'center',
     width:"40%",
}
export default SaveAsProject
