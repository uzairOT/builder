import { Box, Divider, Stack } from "@mui/material";
import React from "react";
import ProgressCardHeader from "./ProgressCardHeader";
import ProjectProgress from "./ProjectProgress";
import PaymentDetails from "./PaymentDetails";
import ProfitDetails from "./ProfitDetails";
import { Link } from "react-router-dom";

const ProgressCard = ({ project }) => {
  const completedLineItems = project?.completedLineItems;
  const totalLineItems = project?.totalLineItems;
  const totalProjectCost = project?.totalProjectCost
    ? project?.totalProjectCost
    : 0;

  const progress = Number.isNaN((completedLineItems / totalLineItems) * 100) ? 0 : (completedLineItems / totalLineItems) * 100;
    // completedLineItems && totalLineItems
    //   ? (completedLineItems / totalLineItems) * 100
    //   : 0;
  return (
    <Box style={{ textDecoration: "none" }}>
      <ProgressCardHeader project={project} />
      <Divider variant="fullWidth"></Divider>
      <Link to={`/projects/${project.id}`}>
        <Stack direction={"row"} pt={2}>
          <ProjectProgress progress={progress} />
          <Divider
            orientation="vertical"
            variant="fullWidth"
            flexItem
          ></Divider>
          <PaymentDetails totalProjectCost={totalProjectCost} />
        </Stack>
        <Divider variant="fullWidth"></Divider>
        <ProfitDetails />
      </Link>
    </Box>
  );
};

export default ProgressCard;
