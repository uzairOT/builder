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
import {
  DashboardCardIcn,
  InvoiceCardIcn,
  ReportCardIcn,
  SubCardIcn,
  TeamCardIcn,
  WorkOrderCardIcn,
} from "../assets/svg";
import { motion } from "framer-motion";

const popEffect = {
  hidden: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

const WhatWeDo = () => {
  return (
    <Grid container style={styles.section}>
      <Container
        sx={{
          justifyContent: "center",
          textAlign: "center",
          mt: 6,
        }}
      >
        <Typography sx={styles.titleFont}>What We Do?</Typography>
        <Typography sx={styles.SubtitleFont}>
          Unlock the Full Potential of Your Construction Projects
        </Typography>
        <Typography variant="body1" sx={styles.DecsFont}>
          BuilderBUILDER PRO offers a comprehensive suite of features designed
          to streamline and optimize every aspect of construction management.
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
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <CardItem
              icon={<DashboardCardIcn />}
              title="Dashboard"
              description="Access detailed project insights, track progress and costs, manage tasks efficiently, and receive personalized updates with real-time analytics and weather integration."
              decorationPosition="topLeft"
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <CardItem
              icon={<WorkOrderCardIcn />}
              title="Work Order Events"
              description="Detailed project overviews, including line items and costs, get real-time weather updates, and organize daily notes for comprehensive information management."
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <CardItem
              icon={<SubCardIcn />}
              title="Subscription"
              description="Display current plan details and renewal dates, provide transparent billing records, highlight plan benefits and features, and offer clear upgrade options."
              decorationPosition="bottomRight"
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <CardItem
              icon={<ReportCardIcn />}
              title="Reports"
              description="Track project costs, invoices, and profit margins with intuitive visuals, monitor workdays to keep timelines on track, and receive automatic deadline alerts for timely project completion."
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <CardItem
              icon={<TeamCardIcn />}
              title="Team Invitations"
              description="Effortlessly create new projects and invite team members to join your secure workspace, streamlining project initiation and collaboration."
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial="hidden" whileHover="hover" variants={popEffect}>
            <CardItem
              icon={<InvoiceCardIcn />}
              title="Invoice Management"
              description="Easily generate detailed invoices with itemized lists, download PDFs for convenient sharing, access invoice history for each project, and customize line items to fit project-specific needs."
            />
          </motion.div>
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
      <Typography sx={styles.CardTitleFont}>{title}</Typography>
      <Typography sx={styles.CardDesc}>{description}</Typography>
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
  titleFont: {
    fontFamily: "var(--main-font-family)",
    fontWeight: 500,
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    mb: 3,
    color: "#4C8AB1",
  },
  SubtitleFont: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "36px", sm: "36px", xs: "18px" },
    fontWeight: 500,
    marginBottom: 2,
  },
  DecsFont: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    fontWeight: 400,
    color: "#454245",
    textAlign:'left'
  },
  CardTitleFont: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "18px", sm: "18px", xs: "16px" },
    fontWeight: 500,
  },
  CardDesc: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    fontWeight: 400,
    color: "#454245",
    textAlign:'left'
  },
  gridContainer: {
    marginTop: 1,
  },
  card: {
    // cursor:"pointer",
    height: { lg: "230px", xs: "290px" },
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
};
