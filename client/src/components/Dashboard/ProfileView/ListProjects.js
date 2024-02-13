  import { Box, Divider, Typography, Stack } from "@mui/material";
  import React from "react";
  import ProjectCard from "../../UI/Card/ProjectCard";
  import projects from "./assets/data/projects.json";

  const ListProjects = () => {
    return (
      <Box sx={{ padding: 1}} >
        <Typography
          sx={{
            color: "#4C8AB1",
            fontSize: "16px",
            fontWeight: "400",
            padding: 1,
          }}
        >
          User Projects
        </Typography>
        <Divider variant="middle" />
        <Typography
          sx={{
            fontSize: "12px",
            color: "var(--textField, rgba(83, 83, 83, 0.79))",
            padding: 2,
          }}
        >
          All Listed Projects
        </Typography>
        <Box sx={{ overflowY: 'auto', height:'45vh' ,...themeStyle.scrollable }}>
        <Stack spacing={1} pl={2} pr={2} >
          <>
          {projects.map((projectProfileCard) => {
            return (
              <ProjectCard
              key={projectProfileCard.image}
              projectProfileCard={projectProfileCard}
              />
              );
            })}
            </>
        </Stack>
            </Box>
      </Box>
    );
  };

  export default ListProjects;
 const themeStyle ={
  scrollable: {
    overflow: 'scroll',
    scrollbarWidth: 'none',  // For Firefox
    '-ms-overflow-style': 'none',  // For IE and Edge
    '&::-webkit-scrollbar': {
      width: '6px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
      transition: 'background-color 0.3s',
    },
    '&:hover::-webkit-scrollbar-thumb': {
      backgroundColor: '#ddd',
    },
  }
 }