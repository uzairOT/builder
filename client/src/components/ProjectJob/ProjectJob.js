import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Checkbox,
  TextField,
  FormControl,
  InputLabel,
  NativeSelect,
  useMediaQuery,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import builder1 from "../Signup/Assets/pngs/builderProYellowLogo.png";
import YellowBtn from "../UI/button";
import GTWalsheimTrial from "../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf";
import BottomCircle from "../UI/bottomCircle";

function ProjectJob() {
  return (
    <Grid
      container
      sx={{
        padding: {
          lg: "4.5rem 3rem",
          md: "4.5rem 2rem",
          sm: "1rem 2rem",
          xs: "0rem 0rem",
        },
        backgroundColor: "#FFF",
        marginTop: { lg: "-1rem", sm: "-4rem", xs: "0rem" },
        display: "flex",
        flexDirection: "column",
        // border: "2px solid red",
      }}
    >
      <Grid
        item
        lg={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "0rem 6rem",
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.5rem",
            marginTop: "1.5rem",
          }}
        >
          <Button sx={{ ...actionButton }} startIcon={<ModeEditOutlinedIcon />}>
            Edit
          </Button>
          <Button sx={{ ...actionButton }} startIcon={<DeleteOutlinedIcon />}>
            Delete
          </Button>
          <Button sx={{ ...actionButton, background: "#FFAC00", left: "2rem" }}>
            Add Phase
          </Button>
        </Box>
      </Grid>

      <Grid
        item
        lg={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "12rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2.3rem",
          }}
        >
          <Button sx={{ ...YellowBtn, padding: "1rem 3.5rem" }}>Done</Button>
          <Button
            variant="outlined"
            sx={{
              ...YellowBtn,
              border: "1px solid #FFAC00",
              background: "#FFF",
              color: "#FFAC00",
              "&:hover": {
                background: "#FFF",
              },
            }}
          >
            Save as
          </Button>
        </Box>
        <Typography sx={{ ...redText }}>
          Save as to start the Duplicate the Project with same line Item and
          Phases.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              ...BottomCircle,

              marginTop: "1.5rem",
            }}
          />
          <Box
            sx={{
              ...BottomCircle,
              marginTop: "1.5rem",
            }}
          />
          <Box
            sx={{
              ...BottomCircle,
              width: "4rem",
              backgroundColor: "#4C8AB1",
              marginTop: "1.5rem",
            }}
          />
        </Box>
      </Grid>
      <Grid
        item
        lg={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "4rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "12rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              marginRight: "2.3rem", // Add marginRight instead of using gap
            }}
          >
            124312421
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              marginRight: "2.3rem", // Add marginRight instead of using gap
            }}
          >
            QQqqqqqqqqqqqqqqqqqq
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            ppppppppppppppp
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

const actionButton = {
  display: "flex",
  height: "2.375rem",
  padding: "0.75rem 1.5rem",
  justifyContent: "center",
  alignItems: "center",

  flexShrink: 0,
  alignSelf: "stretch",
  borderRadius: "2.8125rem",
  background: "#4C8AB1",
  color: "#FFF",
  textTransform: "none",
  "&:hover": {
    background: "#357899",
  },
};

const redText = {
  color: "#BE1D1D",
  marginTop: "1.25rem",
  fontFamily: GTWalsheimTrial,
  fontSize: "0.875rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "150%", // 1.3125rem
  letterSpacing: "-0.00875rem",
};

export default ProjectJob;
