import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import {
  ComprehensiveIcn,
  ColabIcn,
  ScaleIcn,
  InnovateIcn,
} from "../assets/svg";

const features = [
  {
    icon: <ComprehensiveIcn />,
    title: "Comprehensive Solution",
    description:
      "Manage all aspects of your projects seamlessly with Builder Pro’s complete toolkit.",
  },
  {
    icon: <ColabIcn />,
    title: "Real-Time Collaboration ",
    description:
      "Stay connected and make decisions faster with our live updates and collaborative tools",
  },
  {
    icon: <ScaleIcn />,
    title: "Scalable & Flexible",
    description:
      "Grow effortlessly with customizable features and adaptable pricing plans.",
  },
  {
    icon: <InnovateIcn />,
    title: "Innovative & Reliability",
    description:
      "Trust Builder Pro’s cutting-edge technology for reliable project management innovations.",
  },
];

const WhyChooseBuilder = () => {
  return (
    <Box py={8}>
      <Container>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ mb: 3, color: "#2D6F8C" }}
        >
          Why Choose Builder Pro?
        </Typography>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mb: 5, color: "#003366" }}
        >
          Simplify Your Experience
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Box textAlign="center">
                {feature.icon}
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1">{feature.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseBuilder;
