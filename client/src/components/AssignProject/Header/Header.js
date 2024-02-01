import React, { useState, useEffect } from "react";

import {
  Box,
  Grid,
  Button,
} from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import builder1 from "../../Signup/Assets/pngs/builderProYellowLogo.png";

function Header() {
  return (
    <div>
       <Grid
       item
        lg={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "0rem 6rem",
          marginTop:"3.5rem"
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <img src={builder1} width={"13%"} alt="" />
          <Button
            sx={{ height: "50%", marginTop: "1.5rem" }}
            startIcon={<ArrowBackIosIcon />}
          >
            Back
          </Button>
        </Box>
      </Grid>
    </div>
  )
}

export default Header
