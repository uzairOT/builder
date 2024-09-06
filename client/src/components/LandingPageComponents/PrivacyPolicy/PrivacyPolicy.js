import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { policyData } from "./PolicyData";

const PrivacyPolicy = () => {
  return (
    <Grid container spacing={{ xs: 0, lg: 2 }} mt={2}>
      <Grid item xs={12} textAlign="center">
        <Typography sx={styles.font1} gutterBottom>
          Privacy Statement
        </Typography>
        <Typography sx={styles.font2}>
          Understanding Our Practices for Data Collection and Usage
        </Typography>
      </Grid>
      <Grid padding={{ xs: 0, lg: 10 }}>
        <Typography
          textAlign={{ xs: "center", lg: "left" }}
          sx={{
            fontFamily: "var(--main-font-family)",
            fontWeight: 400,
            fontSize: "16px",
            color: "#00000099",
          }}
        >
          At BuilderBUILDER PRO, we are committed to protecting your privacy and
          ensuring that your personal information is handled responsibly. This
          Privacy Statement outlines the types of information we collect, how we
          use it, and the measures we take to safeguard it.
        </Typography>
        {policyData.map((section, index) => (
          <Box key={index} mt={2} textAlign={{ xs: "center", lg: "left" }}>
            <Typography sx={styles.font4}>{section.title}</Typography>
            {section.content.map((paragraph, idx) => (
              <Typography key={idx} sx={styles.font3}>
                {paragraph}
              </Typography>
            ))}
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

export default PrivacyPolicy;

const styles = {
  font1: {
    fontFamily: "var(--main-font-family)",
    color: "#2E728F",
    fontWeight: 500,
    fontSize: "16px",
  },
  font2: {
    fontFamily: "var(--main-font-family)",
    fontWeight: 500,
    fontSize: "36px",
  },
  font3: {
    fontFamily: "var(--main-font-family)",
    fontWeight: 400,
    mt: 2,
    fontSize: "16px",
    color: "#00000099",
  },
  font4: {
    fontFamily: "var(--main-font-family)",
    fontWeight: 700,
    fontSize: "17px",
  },
};
