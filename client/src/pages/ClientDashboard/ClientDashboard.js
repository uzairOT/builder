import React, { useEffect, useState } from "react";
import { Grid, Paper, Box } from "@mui/material";
import { Outlet, useLocation, Link } from "react-router-dom";
import ClientNavbar from "../../components/ClientDashboard/ClientNavbar/ClientNavbar";
import ProfileView from "../../components/ClientDashboard/ProfileView/ProfileView";
import RecentImagesAndComments from "../../components/ClientDashboard/RecentImagesAndComments/RecentImagesAndComments";
import WeatherView from "../../components/Dashboard/WeatherView/WeatherView";
import { getFormattedFiveDayWeather } from '../../services/WeatherService.js'
import ProfileChatView from "../../components/ClientDashboard/ProfileChatView/ProfileChatView.js";




const ClientDashboard = () => {
    const [dailyForecast, setDailyForecast] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchWeather = async () => {
            try {
                const data = await getFormattedFiveDayWeather({ lat: "33.6844", lon: "73.0479", units: 'Metric' });
                setDailyForecast(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false)
            }
        }
        fetchWeather();

    }, []);

    // Function to update the heading

    const location = useLocation();
    const { state } = location;
    const heading = state ? state.heading : "Dashboard";
    return (
        <>
            <ClientNavbar />
            <main>
                <Grid sx={themeStyle.dashboard} container pt={1} >
                    {/* Profile View */}
                    <Grid item xs={12} sm={4} md={3} lg={2.5} height={"auto"}>
                        <Paper sx={themeStyle.dashboardViews}>
                            {heading === "Messages" ? <ProfileChatView /> : <ProfileView heading={heading} />}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={8} md={6} lg={6.5} height={themeStyle.dashboardViews}>
                        <Grid container sx={themeStyle.scrollable} height={'100%'} margin={'auto'}>
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{ height: "auto", paddingTop: '0px', paddingLeft: '8px' }}>
                                <Paper sx={themeStyle.progressCard} padding={5} >
                                    <WeatherView dailyForecast={dailyForecast} loading={loading} error={error} userGreetings={"Good Morning, Client"} />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{ height: { lg: "100%", xs: "100%" }, margin: '8px', }}>
                                <Box sx={themeStyle.alternativeBox}>
                                    <Outlet dailyForecast={dailyForecast} />
                                </Box>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} height={"auto"} marginTop={{ lg: "0rem", sm: "0rem", xs: "1rem" }}>

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
        // height: "100vh",
        height: "auto"
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
        height: "100%", background: "#FFF",
        display: "flex",
    },
    scrollable: {
        overflowY: 'scroll',
        overflowX: 'hidden',
        height: "100%",

        scrollbarWidth: 'none',  // For Firefox
        '-ms-overflow-style': 'none',  // For IE and Edge
        '&::-webkit-scrollbar': {
            width: '6px'
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#FFF',
            height: "100%",
            transition: 'background-color 0.3s',
        },
        '&:hover::-webkit-scrollbar-thumb': {
            background: "#FFF",
            height: "100%",
        },
    }
};