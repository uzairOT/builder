import { Box, Divider, Typography, Stack } from "@mui/material";
import React from "react";
import ProjectCard from "../../UI/Card/ProjectCard";
import projects from "./assets/data/projects.json";

const ListProjects = () => {
  return (
    <Box sx={{ padding: 1 }}>
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
      <Stack spacing={2}>
        {projects.map((projectProfileCard) => {
          return (
            <ProjectCard
              key={projectProfileCard.image}
              projectProfileCard={projectProfileCard}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default ListProjects;
