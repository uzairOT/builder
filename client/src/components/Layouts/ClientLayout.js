import { Box, Grid, Paper } from "@mui/material";
import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import RecentImagesAndComments from "../ClientDashboard/RecentImagesAndComments/RecentImagesAndComments";

const ClientLayout = () => {
  const [projectName] = useOutletContext();

  return (
    <>
      <Grid sx={themeStyle.dashboard} container pt={1}>
        <Grid
          item
          xs={12}
          sm={12}
          md={9}
          lg={9}
          height={themeStyle.dashboardViews}
        >
          <Grid
            container
            sx={themeStyle.scrollable}
            height={'calc(93vh - 75px)'}
            margin={"auto"}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ height: 'inherit' }}
            >
              <Box sx={themeStyle.alternativeBox}>
                <Outlet context={[projectName]} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          
          marginTop={{ lg: "0rem", sm: "0rem", xs: "1rem" }}
        >
          <RecentImagesAndComments />
        </Grid>
      </Grid>
    </>
  );
};

const themeStyle = {
  alternativeBox : {
    height:'99%'
  },
  boxStyle: {
    display: "flex",
    flexDirection: { lg: "row", md: "column", sm: "column", xs: "column" },
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    padding: "0.5rem",
    margin: { lg: "0.5rem", xs: "0rem" },
  },

  projectCard: {
    width: { lg: "100%", md: "80%", sm: "85%", xs: "90%" },
    height: "100%",
    backgroundColor: "#eff5ff",
    marginTop: { lg: "0.5rem", xs: "0.5rem" },
    borderRadius: "1rem",
    padding: "0.5rem 0.5rem",
    contain: "content",
  },
  scheduleCard: {
    height: { lg: "auto", md: "100vh", xs: "100vh" },
    backgroundColor: "#eff5ff",
    margin: {
      lg: "0rem 1rem 1rem 1rem",
      xs: "0rem 0.5rem 0rem 0.5rem",
    },
    borderRadius: "1rem",
    overflowY: "auto",
  },
  dashboard:{
    // height:'calc(93vh - 140px)',
  }
};
export default ClientLayout;
