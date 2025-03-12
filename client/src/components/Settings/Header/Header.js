import React, { useState } from "react";
import { Typography, Box ,Hidden } from "@mui/material";
import Button from "../../UI/CustomButton";
import Search from "../../UI/CustomSearchInput";
import { useTranslation } from "react-i18next";
function Header({ title, OpenAddModal, searchInput, setSearchInput }) {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);


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
      </div>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {/* <Hidden smUp>
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
      </Hidden> */}

      {/* Existing content */}
      <Hidden smDown>
        <Search
          value={searchInput}
          onChange={handleSearchInputChange}
          onKeyPress={handleKeyPress}
          placeholder={`${t("Search.placeholder")} ${title}`}
          backgroundColor="#E7E7E7"
        />


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
      {!(title ===t("Settings.master") || title==="Permission Access" || title===t("ProjectPermissions.header")) && <Button
          onClick={OpenAddModal}
          buttonText={t("Button.add")}
          color="#ffffff"
          backgroundColor="#FFAC00"
          // width="112px"
          height="38px"
          borderRadius="50px"
        />}
      </Box>
    </Box>
  );
  
}

export default Header;

const headingStyle = {
  marginTop: "20px",
  marginBottom: "10px",
  fontFamily: 'var(--main-font-family)',
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