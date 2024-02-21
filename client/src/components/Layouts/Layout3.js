import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import SideBar from "../Settings/SideBar/SideBar";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar.js";
function Layout3() {
  useEffect(() => {
    console.log("hi");
  });
  return (
    <>
      <Navbar />
      <main>
        <Grid sx={themeStyle.dashboard} container pt={1}>
          {/* Side bar */}
          <Grid item xs={12} sm={12} md={12} lg={2}>
            <Paper sx={{ borderRadius: "0 14px 14px 0", height: "97%" }}>
              <SideBar />{" "}
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={10}
            mb={1}
            style={{ paddingTop: "0px", paddingLeft: "10px" }}
          >
            <Paper sx={themeStyle.Layout3Pages} margin={1}>
              <Outlet />
            </Paper>
          </Grid>
        </Grid>
      </main>
    </>
  );
}

export default Layout3;

const themeStyle = {
  dashboard: {
    backgroundColor: "#eff5ff",
    height: "100vh",
  },
  dashboardViews: {
    height: "100%",
  },
  Layout3Pages: {
    // height: "100%",
    width: "100%",
    // margin: "1px",
    borderRadius: "14px",
  },
  scrollable: {
    overflowY: "scroll",
    scrollbarWidth: "none", // For Firefox
    "-ms-overflow-style": "none", // For IE and Edge
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
      transition: "background-color 0.3s",
    },
    "&:hover::-webkit-scrollbar-thumb": {
      backgroundColor: "#ddd",
    },
  },
};
