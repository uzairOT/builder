import React, { useState } from "react";
import { Box, Grid, Typography, InputBase, IconButton } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import TemplateCard from "./TemplateCard";
import Search from "../../UI/CustomSearchInput";
import goBack from '../../../assets/settings/goback.svg'

function EmailTemplate({ setTemplateView }) {
  const handleEmailIconClick = () => {
    setTemplateView(false);
  };
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleKeyPress = (event) => {};
  {
    /* <Typography variant="h4" sx={headingStyle}>{title}</Typography> */
  }
  return (
    <Box sx={{ py: 2, px: 5 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton edge="start" color="inherit" aria-label="back" onClick={handleEmailIconClick}>
            <img src={goBack} alt="" />
       
        </IconButton>
        <Typography variant="h6" component="div" sx={headingStyle}>
          Email Template
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Search
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Search Name"
            backgroundColor={"#E7E7E7"}
          />
        </div>
      </Box>
      <Grid container spacing={2}>
        <Grid item xl={6} xs={12}>
          <TemplateCard />
        </Grid>
        <Grid item xl={6} xs={12}>
          <TemplateCard />
        </Grid>
        <Grid item xl={6} xs={12}>
          <TemplateCard />
        </Grid>
        <Grid item xl={6} xs={12}>
          <TemplateCard />
        </Grid>
      </Grid>
    </Box>
  );
}

export default EmailTemplate;
const headingStyle = {
  flexGrow: 1,
  mr: 2,
  margin: "10px 20px",
  fontFamily: "Poppins",
  fontWeight: "600",
  fontSize: "22px",
  color: "#4C8AB1",
};
