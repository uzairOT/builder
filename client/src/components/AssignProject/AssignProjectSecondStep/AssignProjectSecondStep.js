import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import FooterCircles from "../FooterCircles/FooterCircles";
import YellowBtn from '../../UI/button';
import Header from "../Header/Header";
import StepTitles from "../StepTitles/StepTitles";
import AttachFileSharpIcon from '@mui/icons-material/AttachFileSharp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf"


import {
 useMediaQuery,
  Button, Box, Typography, TextField, MenuItem
} from "@mui/material";
const currencies = [
  {
    value: 'Pakistan',
    label: 'Pakistan',
  },
  {
    value: 'India',
    label: 'India',
  },
  {
    value: 'England',
    label: 'England',
  },
  {
    value: 'Franch',
    label: 'Franch',
  },
];
function AssignProjectSecondStep({ onNextStep }) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  const handleNextStep = () => {
    // Navigate to home page
        navigate("/assignproject");

    // Trigger the next step in Home component
    onNextStep();
  };
const [text, setText] = useState('');
  const maxCharacters = 50;

  const handleChange = (event) => {
    const inputText = event.target.value;
    // Ensure the input doesn't exceed the maximum characters
    if (inputText.length <= maxCharacters) {
      setText(inputText);
    }
  };
  return (
    <div>



        <Header />
        <StepTitles stepHeading={"Step 2 of 3"} Heading={"invite your Team to the"} projectName={"Project Name"} stepDiscription={"Lorem ipsum dolor sit amet consectetur. Pretium aliquam egestas interdum varius sed at libero. Sed vestibulum vel platea accumsan in elit morbi eu erat. Purus non urna et purus. Libero nec nec quam pulvinar massa nulla et tincidunt."} />



{/* <TextField
        label={`Character Count: ${text.length}/${maxCharacters}`}
       
        value={text}
        onChange={handleChange}
      /> */}

             <Box
        sx={formBox}
      >
      <form style={{ marginTop: "0.1rem" }}>
        <Box sx={{...buttonBox,  }}>
             <Box sx={{marginTop:"0.5rem",width:"300%"  }}>
                                       
                                        <input className='placeholder' type="email" id="email" style={{ ...inputStyle,  fontFamily: GTWalsheimTrial, paddingLeft:"-1.5rem", fontSize: isMobile ? "0.8rem" : "1rem"}} placeholder="e.g. Project name                                                                                                 0/50" />
                                    </Box> 
                                     <Box sx={{marginTop:"0.2rem"}}>
                                         <TextField className='placeholder' sx={{...inputStyle,  borderButtom:"none"}}
                                       
                                       
                                            id="standard-select-currency"
                                             select
                                                 variant="standard"
                                                         >
                                     {currencies.map((option) => (
                                             <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                               </MenuItem>
                                              ))}
                                         </TextField>
                                    </Box>
                                    </Box>
                                     </form>
                                     </Box>



   <Box
          sx={{...buttonBox, justifyContent:"space-evenly" }}
        >
              <Button
            sx={buttonLnks}
            startIcon={<AddCircleOutlineIcon />}
          >
           Add Another Email
          </Button>
                 <Button
            sx={buttonLnks}
            startIcon={<AttachFileSharpIcon sx={{transform: 'rotate(30deg)'}} />}
          >
            Get a shareable invite link
          </Button>
        </Box>



   <Box
          sx={buttonBox}
        >
            <Button sx={{ ...YellowBtn, padding: "1rem 3.5rem" }}
            onClick={handleNextStep}>Next</Button>
               <Button sx={{ ...YellowBtn, padding: "1rem 3.5rem" }}>Skip</Button>
        </Box>

         <div style={{marginTop:"10rem"}}>

      <FooterCircles width1={"4rem"} background1={"#4C8AB1"} />
      </div>












    </div>
  );
}



const buttonBox = {
            display: "flex",
            justifyContent: "center",
            alignItems:"center",
            gap: "3rem",
            marginTop:"3rem"
}
const buttonLnks = {
fontFamily:"Inter",fontWeight:500, height: "50%", marginTop: "2rem", textTransform:"none", color:"#4C8AB1"
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
export default AssignProjectSecondStep;
