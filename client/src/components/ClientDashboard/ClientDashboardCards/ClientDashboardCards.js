import React from 'react'
import { Grid, Paper, Box } from "@mui/material";
import WhatsHappeningCard from '../WhatsHappeningCard/WhatsHappeningCard';
import ProjectCard from '../ProjectCard/ProjectCard';
import ScheduleCard from '../ScheduleCard/ScheduleCard';


function ClientDashboardCards() {
    return (
        <div style={{ width: "100%" }}>
            <Box sx={themeStyle.boxStyle}>

                <Box sx={themeStyle.projectCard}>
                    <WhatsHappeningCard />
                </Box>
                <Box sx={themeStyle.projectCard} >
                    <ProjectCard />
                </Box>
            </Box>
            <Box sx={themeStyle.scheduleCard}>
                <ScheduleCard />

            </Box>
        </div>
    )
}
const themeStyle = {
    boxStyle: {
        display: "flex",
        flexDirection: { lg: "row", md: "column", sm: "column", xs: "column" },
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        height: { lg: "40vh", xs: "100vh" },
        margin: { lg: "1rem", xs: "0rem" },
    },
    projectCard: {
        width: { lg: "50%", md: "80%", sm: "85%", xs: "78%" },
        height: "100%",
        backgroundColor: "#eff5ff",
        marginTop: { lg: "2rem", xs: "0.5rem" },
        borderRadius: "1rem",
        padding: "1.5rem",
        contain: "content"
    },
    scheduleCard: {
        height: { lg: "30vh", md: "100vh", xs: "100vh" },
        backgroundColor: "#eff5ff",
        margin: {
            lg: "3.5rem 1rem 0rem 1rem", xs: "0.5rem 1rem 0rem 1rem"
        },
        borderRadius: "1rem",
        padding: "1rem 2rem",
        overflowY: 'auto',
    },
}
export default ClientDashboardCards
