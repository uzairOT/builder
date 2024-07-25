import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import { MessageIcn } from "../assets/svg";

const WhatWeDo = () => {
  return (
    <Grid container style={styles.section}>
      <Container sx={{ justifyContent: "center", textAlign: "center" }}>
        <Typography variant="h6" sx={styles.subtitle}>
          What We Do?
        </Typography>
        <Typography variant="h4" sx={styles.title}>
          Unlock the Full Potential of Your Construction Projects
        </Typography>
        <Typography variant="body1" sx={styles.subtitle}>
          Builder Pro offers a comprehensive suite of features designed to
          streamline and optimize every aspect of construction management.
          Discover how our powerful tools can help you achieve success from
          planning to completion.
        </Typography>
      </Container>
      <Grid
        padding={2}
        container
        spacing={2}
        justifyContent="center"
        sx={styles.gridContainer}
      >
        <Grid item xs={12} md={4}>
          <CardItem
            icon={<MessageIcn />}
            title="Dashboard"
            description="Access detailed project insights, track progress and costs, manage tasks efficiently, and receive personalized updates with real-time analytics and weather integration."
            decorationPosition="topLeft"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardItem
            icon={<MessageIcn />}
            title="Work Order Events"
            description="Detailed project overviews, including line items and costs, get real-time weather updates, and organize daily notes for comprehensive information management."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardItem
            icon={<MessageIcn />}
            title="Subscription"
            description="Display current plan details and renewal dates, provide transparent billing records, highlight plan benefits and features, and offer clear upgrade options."
            decorationPosition="bottomRight"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardItem
            icon={<MessageIcn />}
            title="Reports"
            description="Track project costs, invoices, and profit margins with intuitive visuals, monitor workdays to keep timelines on track, and receive automatic deadline alerts for timely project completion."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardItem
            icon={<MessageIcn />}
            title="Team Invitations"
            description="Effortlessly create new projects and invite team members to join your secure workspace, streamlining project initiation and collaboration."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardItem
            icon={<MessageIcn />}
            title="Invoice Management"
            description="Easily generate detailed invoices with itemized lists, download PDFs for convenient sharing, access invoice history for each project, and customize line items to fit project-specific needs."
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WhatWeDo;

const CardItem = ({ icon, title, description, decorationPosition }) => (
  <Card sx={styles.card}>
    <CardMedia>
      <Box sx={styles.icon}>{icon}</Box>
    </CardMedia>
    <CardContent>
      <Typography variant="h6" sx={styles.cardTitle}>
        {title}
      </Typography>
      <Typography variant="body2" sx={styles.cardDescription}>
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const styles = {
  section: {
    padding: 5,
    width: "100%",
    textAlign: "center",
    backgroundColor: "#F7FAFC",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  subtitle: {
    marginBottom: "20px",
    fontFamily: "Arial Rounded MT, sans-serif",
    fontWeight: 600,
    fontSize: "16px",
    color: "#2E728F",
  },
  gridContainer: {
    marginTop: 1,
  },
  card: {
    // cursor:"pointer",
    height: { lg: "230px", xs: "270px" },
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    "&:hover": {
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
    },
  },
  icon: {
    fontSize: "3rem",
    color: "#2E728E",
  },
  cardTitle: {
    fontWeight: "bold",
    marginTop: 2,
  },
  cardDescription: {
    color: "#666666",
    marginTop: 1,
  },
};
