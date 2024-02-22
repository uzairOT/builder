  import { Box, Divider, Typography, Stack } from "@mui/material";
  import React from "react";
  import ProjectCard from "../../UI/Card/ProjectCard";
  import projects from "./assets/data/projects.json";
  import Link from '@mui/material/Link';
  
  const ListProjects = () => {
    return (
      <Box sx={{ padding: 1}} >
        <Typography
          sx={{
            color: "#4C8AB1",
            fontSize: "16px",
            fontWeight: "400",
            padding: 1,
            fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
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
            fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
            fontWeight: "400",
          }}
        >
          All Listed Projects
        </Typography>
        <Box sx={{...themeStyle.scrollable }}  style={{height:'50vh',}}>
        <Stack spacing={1} pl={2} pr={2} >
          <>
          {projects.map((projectProfileCard) => {
            return (
              <Link key={projectProfileCard.id} href={`projects/${projectProfileCard.id}/default`} underline="none">
              <ProjectCard
              projectProfileCard={projectProfileCard}
              />
              </Link>
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
    overflowY: 'scroll'
  }
 }