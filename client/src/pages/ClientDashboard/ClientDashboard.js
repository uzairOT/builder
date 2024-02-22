import React, { useEffect, useState } from "react";
import { Grid, Paper, Box } from "@mui/material";
import { Outlet, useLocation, Link } from "react-router-dom";
import ClientNavbar from "../../components/ClientDashboard/ClientNavbar/ClientNavbar";
import ProfileView from "../../components/ClientDashboard/ProfileView/ProfileView";
import RecentImagesAndComments from "../../components/ClientDashboard/RecentImagesAndComments/RecentImagesAndComments";



const ClientDashboard = () => {


    // Function to update the heading

    const location = useLocation();
    const { state } = location;
    const heading = state ? state.heading : "";
    return (
        <>
            <ClientNavbar />
            <main>
                <Grid sx={themeStyle.dashboard} container pt={1} >
                    {/* Profile View */}
                    <Grid item xs={12} sm={3} md={2} height={themeStyle.dashboardViews}>
                        <Paper sx={themeStyle.dashboardViews}>
                            <ProfileView heading={heading} />
                        </Paper>
                    </Grid>


                    <Grid item xs={12} sm={9} md={7} height={themeStyle.dashboardViews}>
                        <Grid container sx={themeStyle.scrollable} height={'100vh'} margin={'auto'}>
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{ height: "20vh", paddingTop: '0px', paddingLeft: '8px' }}>
                                <Paper sx={themeStyle.progressCard} padding={5} >

                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{ height: { lg: "85vh", xs: "100vh" }, margin: '8px', }}>
                                <Box sx={themeStyle.alternativeBox}>
                                    <Outlet />
                                </Box>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={3} height={themeStyle.dashboardViews}>

                        <RecentImagesAndComments />
                    </Grid>
                </Grid>
            </main >
        </>
    );
};

export default ClientDashboard;

const themeStyle = {
    dashboard: {
        backgroundColor: "#eff5ff",
        height: "100vh",
    },
    dashboardViews: {
        height: '100%',

    },
    progressCard: {
        height: "100%",
        width: "100%",
        margin: '1px'
    },

    alternativeBox: {
        height: "100vh", background: "#FFF",
        display: "flex",
    },
    scrollable: {
        overflowY: 'scroll',
        overflowX: 'hidden',
        scrollbarWidth: 'none',  // For Firefox
        '-ms-overflow-style': 'none',  // For IE and Edge
        '&::-webkit-scrollbar': {
            width: '6px'
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#FFF',
            transition: 'background-color 0.3s',
        },
        '&:hover::-webkit-scrollbar-thumb': {
            background: "#FFF",
        },
    }
};