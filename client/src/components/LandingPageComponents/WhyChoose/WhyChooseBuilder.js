import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import {
  ComprehensiveIcn,
  ColabIcn,
  ScaleIcn,
  InnovateIcn,
} from "../assets/svg";
import { motion } from "framer-motion";





// Define the hover effect animation variants
const popEffect = {
  hidden: { scale: 1 },
  hover: { scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 15 } },
};

const features = [
  {
    icon: <ComprehensiveIcn />,
    title: "Comprehensive Solution",
    description:
      "Manage all aspects of your projects seamlessly with BuilderBUILDER PRO’s complete toolkit.",
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
      "Trust BuilderBUILDER PRO’s cutting-edge technology for reliable project management innovations.",
  },
];

const WhyChooseBuilder = () => {
  return (
    <Box mb={5}>
      <Container>
        <Typography align="center" sx={styles.titleFont}>
          Why Choose BuilderBUILDER PRO?
        </Typography>
        <Typography sx={styles.SubtitleFont} align="center">
          We understand the unique challenges of the construction industry.
        </Typography>

        <Typography sx={styles.DecsFont}>
          Our platform is designed by construction professionals for
          construction professionals, offering unmatched functionality, ease of
          use, and mobile accessibility. With BuilderBUILDER PRO, you gain a
          partner committed to your success, providing the tools you need to
          manage your projects with confidence and precision.
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          mt={2}
          alignItems={"center"}
        >
          {features.map((feature, index) => (
            <Grid item xs={12} md={3} key={index} alignItems={"center"}>
               <motion.div
          initial="hidden"
          whileHover="hover"
          variants={popEffect}
        >

              <Box textAlign="center">
                <Typography>{feature.icon}</Typography>
                <Typography sx={styles.featureTitle} gutterBottom>
                  {feature.title}
                </Typography>
                <Typography sx={styles.featureDesc}>
                  {feature.description}
                </Typography>
              </Box>
</motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseBuilder;

const styles = {
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
  },
  featureTitle: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "24px", sm: "24px", xs: "22px" },
    fontWeight: 500,
  },
  featureDesc: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "16px", sm: "16px", xs: "14px" },
    fontWeight: 400,
    color: "#454245",
    textAlign:'left'
  },
};
