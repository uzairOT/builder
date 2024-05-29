import { Box, Divider, Stack } from "@mui/material";
import React from "react";
import ProgressCardHeader from "./ProgressCardHeader";
import ProjectProgress from "./ProjectProgress";
import PaymentDetails from "./PaymentDetails";
import ProfitDetails from "./ProfitDetails";
import { Link } from "react-router-dom";

const ProgressCard = ({ project }) => {
  
  return (
    <Box style={{ textDecoration: "none" }}>
      <ProgressCardHeader project={project} />
      <Divider variant="fullWidth"></Divider>
      <Link to={`/projects/${project.id}`}>
        <Stack direction={"row"} pt={2}>
          <ProjectProgress />
          <Divider
            orientation="vertical"
            variant="fullWidth"
            flexItem
          ></Divider>
          <PaymentDetails />
        </Stack>
        <Divider variant="fullWidth"></Divider>
        <ProfitDetails />
      </Link>
    </Box>
  );
};

export default ProgressCard;
