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

  const progress = Number.isNaN((completedLineItems / totalLineItems) * 100)
    ? 0
    : (completedLineItems / totalLineItems) * 100;

  const TotalProfit =
    project.totalProfit == null ||
    isNaN(project.totalProfit) ||
    project.totalProfit === 0
      ? 0
      : project.totalProfit;

  const totalProfitFromPaidInvoices =
      project.totalProfitFromPaidInvoices == null ||
      isNaN(project.totalProfitFromPaidInvoices) ||
      project.totalProfitFromPaidInvoices === 0
        ? 0
        : project.totalProfitFromPaidInvoices;

  return (
    <Box style={{ textDecoration: "none" }}>
      <Link to={`/projects/${project.id}`} style={{ textDecoration: "none" }}>
      <ProgressCardHeader project={project} />
      <Divider variant="fullWidth"></Divider>
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
        <ProfitDetails TotalProfit={TotalProfit} totalProjectCost={totalProjectCost} totalProfitFromPaidInvoices={totalProfitFromPaidInvoices} />
      </Link>
    </Box>
  );
};

export default ProgressCard;
