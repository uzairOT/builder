import React, { useState, useEffect } from "react";

import {
  Box,
  Grid,
  Button,
} from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import builder1 from "../../Signup/Assets/pngs/builderProYellowLogo.png";

function Header({gap}) {
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }} gap={gap}>
          <img src={builder1} width={"12%"} alt="" />
          <Button
            sx={{ height: "50%", marginTop: "2rem" }}
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
