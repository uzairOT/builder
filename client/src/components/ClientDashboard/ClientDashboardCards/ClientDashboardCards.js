import React from 'react'
import {  Paper, Box } from "@mui/material";
import WhatsHappeningCard from '../WhatsHappeningCard/WhatsHappeningCard';
import ProjectCard from '../ProjectCard/ProjectCard';
import TaskCalender from '../../Task/Calender/TaskCalender';
import { useSelector } from 'react-redux';
import { allEvents } from '../../../redux/slices/Events/eventsSlice';
import { getForecast } from '../../../redux/slices/DailyForecast/dailyForecastSlice';


function ClientDashboardCards() {
    const allEvent = useSelector(allEvents);
    const forecast = useSelector(getForecast);;
    const events = allEvent.events;
    const dailyForecast = forecast.dailyForecast;



    return (
        <Paper style={{ width: "100%", borderRadius: '14px' }}>
            <Box sx={themeStyle.boxStyle}>

                <Box sx={themeStyle.projectCard}>
                    <WhatsHappeningCard />
                </Box>
                <Box sx={themeStyle.projectCard} >
                    <ProjectCard />
                </Box>
            </Box>
            <Box sx={themeStyle.scheduleCard}>
                {/* <ScheduleCard /> */}
                <TaskCalender bgColorClient={true} dailyForecast={dailyForecast} eventsArr={events} isProjectPage={true} isDrawerOpen={true} />
            </Box>
        </Paper>
    )
}
const themeStyle = {
    boxStyle: {
        display: "flex",
        flexDirection: { lg: "row", md: "column", sm: "column", xs: "column" },
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        padding: '0.5rem',
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
            lg: "0rem 1rem 1rem 1rem", xs: "0rem 0.5rem 0rem 0.5rem"
        },
        borderRadius: "1rem",
        overflowY: 'auto',

    },
}
export default ClientDashboardCards
