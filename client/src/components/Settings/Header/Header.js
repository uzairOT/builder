import React from 'react';
import { Typography, Box, TextField } from '@mui/material';
import Button from '../../UI/CustomButton' 
import SearchBar from '../../UI/SearchBar/SearchBar';
function Header({ title,OpenAddModal  }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <div>
        <Typography variant="h4" sx={headingStyle}>{title}</Typography>
        <Typography variant="subtitle1" sx={subheadingStyle}>All Active Members</Typography>
      </div>
      <Box sx={{ display: 'flex', alignItems: 'center',gap: 2 }}>
      <SearchBar />
       
        <Button onClick={OpenAddModal} buttonText="Add more" color="#ffffff" backgroundColor="#FFAC00" width="112px" height="38px" borderRadius="50px"/>
        
        <Button buttonText="Block" color="#ffffff" backgroundColor="#D02E2E" width="80px" height="38px" borderRadius="50px"/>
      </Box>
    </Box>
  );
}

export default Header;
const headingStyle = { marginTop: '20px', marginBottom: '10px',fontFamily: 'Poppins',fontWeight:"600", fontSize:"22px", color: '#4C8AB1' }
const  subheadingStyle ={
  ...headingStyle,
  marginTop: '0px',
  fontWeight:"400",
  fontSize:"14px",
  
}