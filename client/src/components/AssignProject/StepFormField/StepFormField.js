

import React, { useState } from 'react'
import {
  useMediaQuery,
  Button, Box, Typography, TextField, MenuItem, FormControl, formControlStyle, Select,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "../../../App.css"
import "./StepFormField.css"

function ProjectFormFields({ index, email, role, onUpdateEmail, onUpdateRole, removeIndex}) {
  const MAX_EMAIL_LENGTH = 50;


  const isMobile = useMediaQuery('(max-width:600px)');
  const isTab = useMediaQuery('(max-width:900px)');
  const formWidth = { width: isMobile ? "75%" : isTab ? "65%" : "48%" }
  const borderRadiusResponsive = { borderRadius: isMobile ? "0.5rem" : "0.75rem" }
  const labelResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" }
  const placeholderText = !isTab && !isMobile ? 'e.g. johndoe@workmail.com' : '@mail';

  const handleEmailChange = (event) => {
    const { value } = event.target;
    if (value.length <= MAX_EMAIL_LENGTH) {
      onUpdateEmail(value);
    }
  };

  const handleRoleChange = (event) => {
    onUpdateRole(event.target.value);
  };


  return (
    <div>
      <Box
        sx={formBox}
      >
        <form style={{ ...formStyle, ...formWidth }}>
          <Box sx={formInnerBox}>
            <Box sx={fieldBox1}>
              <input className='placeholder' type="email" id="email" style={{ ...inputStyle, ...borderRadiusResponsive, ...labelResponsiveFont }} placeholder={placeholderText}
               value={email}
               onChange={handleEmailChange}
              />
              <Typography color={email.length > MAX_EMAIL_LENGTH ? 'error' : 'textSecondary'} sx={counterTypo}>
                {email.length}/{MAX_EMAIL_LENGTH}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>

              <TextField sx={{
                ...inputStyle, ...borderRadiusResponsive,
                '& input': {
                  borderBottom: 'none', // Remove bottom border of the input
              },
              }}

              inputProps={{ maxLength: 50 }}
                id="standard-select-currency"
                select
                variant="standard"
                value={role}
                
                onChange={handleRoleChange}
              >

                <MenuItem sx={menuItem} value={'admin'}>Admin</MenuItem>
                <MenuItem sx={menuItem} value={'projectManager'}>Project Manager</MenuItem>
                <MenuItem sx={menuItem} value={'client'}>Client</MenuItem>
                <MenuItem sx={menuItem} value={'subcontractor'}>Subcontractor</MenuItem>
                <MenuItem sx={menuItem} value={'supplier'}>Supplier</MenuItem>
                <MenuItem sx={menuItem} value={'employee'}>Employee</MenuItem>
              </TextField>
            </Box>
             <Box display={'flex'} alignItems={'center'} pb={'8px'}>{!(index === 0) ? <IconButton onClick={() => {removeIndex(index)}}><CloseIcon /></IconButton> : <Box width={'40px'}></Box>}</Box>
          </Box>
        </form>
      </Box>
    </div>
  )
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
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "0.5rem",
};

const formInnerBox = {
  display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: { lg: "2rem", md: "1.5rem", sm: "1rem", xs: "0.5rem" }
}
const fieldBox1 = {
  flex: 4,
  marginRight: "1rem",
  marginLeft: "-1rem",
  position: "relative",
}

const formStyle = {
  marginTop: "0.1rem",
}

const counterTypo = {
  position: 'absolute', right: '-0.2rem', bottom: '1.5rem', fontSize: '0.8rem',
  color: "#B8B8B8",
  fontFamily: 'Inter',
  fontWeight: 500
}

const menuItem = {
  fontSize: { lg: "1rem", md: "0.9rem", sm: "0.8rem", xs: "0.7rem" }
}
export default ProjectFormFields
