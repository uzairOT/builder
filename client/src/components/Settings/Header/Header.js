import React, { useEffect, useState } from "react";
import { Typography, Box, TextField ,Hidden,IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Button from "../../UI/CustomButton";
import Search from "../../UI/CustomSearchInput";
import AddIcon from '@mui/icons-material/Add';
import  axios  from "axios";

function Header({ title, OpenAddModal }) {
 

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // useEffect(()=>{
  //   const getData = setTimeout(()=>{
  //     axios.get('').then((res) =>{//console.log(res)});

  //   },1000)
  //   return () => clearTimeout(getData)
  // },[searchInput])

  const handleKeyPress = (event) => {};

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <div>
        <Typography variant="h4" sx={headingStyle}>
          {title}
        </Typography>
        <Typography variant="subtitle1" sx={subheadingStyle}>
          All Active Members
        </Typography>
      </div>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Hidden smUp>
        <IconButton aria-label="menu" onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={OpenAddModal}>
            <AddIcon /> Add
          </MenuItem>
        </Menu>
      </Hidden>

      {/* Existing content */}
      <Hidden smDown>
        <Search
          value={searchInput}
          onChange={handleSearchInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search Name"
          backgroundColor="#E7E7E7"
        />

        {!(title ==='Master Line Item') && <Button
          onClick={OpenAddModal}
          buttonText="Add"
          color="#ffffff"
          backgroundColor="#FFAC00"
          width="112px"
          height="38px"
          borderRadius="50px"
        />}
{/* 
        <Button
          buttonText="Block"
          color="#ffffff"
          backgroundColor="#D02E2E"
          width="80px"
          height="38px"
          borderRadius="50px"
        /> */}
      </Hidden>
      </Box>
    </Box>
  );
  
}

export default Header;

const headingStyle = {
  marginTop: "20px",
  marginBottom: "10px",
  fontFamily: "Poppins",
  fontWeight: "600",
  fontSize: "22px",
  color: "#4C8AB1",
};
const subheadingStyle = {
  ...headingStyle,
  display: {
    xs: 'none', 
    sm: 'block', 
  },
  marginTop: "0px",
  fontWeight: "400",
  fontSize: "14px",
};