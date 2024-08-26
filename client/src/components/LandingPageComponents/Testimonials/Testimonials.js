import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { TestimonialColIcns } from "../assets/svg";

const InfoCard = ({ icon, title, description }) => {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Box
        sx={styles.card}
      >
        <Box>
          <Box sx={styles.icon}>{icon}</Box>
          <Typography sx={styles.CardDesc}>{description}</Typography>
        </Box>
        <Typography sx={styles.cardTitle} mt={2}>
          {title}
        </Typography>
      </Box>
    </Grid>
  );
};

export default function Testimonials() {
  return (
    <Grid p={5}>
      <Typography align="center" gutterBottom sx={styles.titleFont}>
        Testimonials
      </Typography>

      <Typography align="center" sx={styles.SubtitleFont} gutterBottom>
        What Our Customers Are Saying
      </Typography>
      <Typography align="center" sx={styles.DecsFont} gutterBottom>
        We're proud to share the positive feedback from our valued customers.
        Here's what they have to say about their experiences with us.{" "}
      </Typography>
      <Container>
        <Grid container sx={styles.gridContainer} p={2} spacing={1}>
          <Grid item xs={12} md={6}>
            <InfoCard
              icon={<TestimonialColIcns />}
              description='"BuilderBuilder Pro has transformed the way we manage our construction projects. The intuitive interface and robust features have saved us time and money while improving our overall project quality."'
              title="John D., Construction Manager"
              position="topLeft"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoCard
              icon={<TestimonialColIcns />}
              description='"With BuilderBuilder Pro, our team can collaborate seamlessly, whether we’re in the office or on-site. It’s a game-changer for our workflow and project success."'
              title="Sarah L., Project Coordinator"
              position="bottomRight"
            />
          </Grid>

          <Grid></Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

const styles = {
  titleFont: {
    fontFamily: 'var(--main-font-family)',
    fontWeight: 500,
    fontSize: { md: "16px",sm:"16px", xs: "14px" },
    color: "#4C8AB1",
  },
  SubtitleFont: {
    fontFamily: 'var(--main-font-family)',
    fontSize: { md: "36px",sm:"36px", xs: "18px" },
    fontWeight: 500,
  },
  DecsFont: {
    fontFamily: 'var(--main-font-family)',
    fontSize: { md: "16px",sm:"16px", xs: "14px" },
    fontWeight: 400,
    color: "#454245",
    mb: 3,
  },
  TouchFont: {
    fontFamily: 'var(--main-font-family)',
    fontSize: { md: "20px",sm:"20px", xs: "18px" },
    fontWeight: 500,
  },
  CardDesc: {
    fontFamily: 'var(--main-font-family)',
    fontSize: { md: "24.5px",sm:"24.5px", xs: "18px" },
    fontWeight: 500,
    color: "#454245",
  },
  container: {
    padding: "32px",
  },
  card: {
    height: { md: "383px", xs: "100%" },
    width: { md: "400px", xs: "100%" },
    padding: 3,
    backgroundColor: "#E4EEF4",
    borderRadius: 5,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  icon: {
    fontSize: "3rem",
    color: "#2E728E",
  },
  cardTitle: {
    fontFamily: 'var(--main-font-family)',
    fontWeight: 500,
    fontSize: { md: "14px",sm:"14px", xs: "13px" },
    textAlign: "left",
    color:"#454245"
  },
  cardDescription: {
    textAlign: "center",

    marginTop: 1,
    color: "#666666",
  },
};
