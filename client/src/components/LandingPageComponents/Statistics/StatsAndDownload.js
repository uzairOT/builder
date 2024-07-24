import React from "react";
import { Box, Typography, Grid, Container, Button } from "@mui/material";
import {
  BuilderLgIcn,
  DownloadAppStore,
  DownloadGooglePlay,
} from "../assets/svg";

const StatsAndDownload = () => {
  return (
    <Box sx={styles.section}>
      <Grid container spacing={5} alignItems="center" justifyContent={"space"}>
        <Grid item xs={12} md={6} justifyContent={"center"}>
          <Container maxWidth={"xs"}>
            <Typography variant="h4" sx={styles.heading}>
              Numbers are telling our story
            </Typography>
            <Typography variant="body1" sx={styles.subHeading}>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </Typography>
          </Container>
        </Grid>
        <Grid item xs={12} md={6} sx={{ justifyContent: "center" }}>
          <Container sx={styles.statsGrid} maxWidth={"sm"}>
            <Box maxWidth={"sm"} sx={styles.statItem}>
              <Typography variant="h5" sx={styles.statValue}>
                2M+
              </Typography>
              <Typography variant="body2" sx={styles.statLabel}>
                Tickets Delivered This Month
              </Typography>
            </Box>
            <Box maxWidth={"sm"} sx={styles.statItem}>
              <Typography variant="h5" sx={styles.statValue}>
                46K+
              </Typography>
              <Typography variant="body2" sx={styles.statLabel}>
                Active Customers Rate
              </Typography>
            </Box>
            <Box maxWidth={"sm"} sx={styles.statItem}>
              <Typography variant="h5" sx={styles.statValue}>
                99%
              </Typography>
              <Typography variant="body2" sx={styles.statLabel}>
                Customer Satisfaction Rate
              </Typography>
            </Box>
          </Container>
        </Grid>
      </Grid>
      <Container
        maxWidth={"lg"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { lg: "space-between", xs: "center" },
          marginTop: "40px",
        }}
      >
        <Box sx={styles.logoContainer}>
          <BuilderLgIcn />
        </Box>
        <Box sx={styles.downloadSection}>
          <Typography variant="body2" sx={styles.downloadText}>
            TRY ON MOBILE
          </Typography>
          <Typography variant="h5" sx={styles.heading}>
            Download our app for free
          </Typography>
          <Box sx={styles.appIcons}>
            <Button>
              <DownloadAppStore />
            </Button>
            <Button>
              <DownloadGooglePlay />
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default StatsAndDownload;

const styles = {
  section: {
    padding: "50px 0",
    textAlign: "left",
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subHeading: {
    marginBottom: "20px",
    color: "gray",
  },
  statsGrid: {
    justifyContent: "center",
    alignItems: "center",
    background: "url('https://i.ibb.co/b12Ls06/Ellipse-33.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  statItem: {
    marginBottom: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundBlendMode: "overlay",
    backdropFilter: "blur(5px)",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: { lg: "30rem", md: "20rem", xs: "80%" },
  },
  statValue: {
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#333",
  },
  statLabel: {
    color: "gray",
  },
  logoContainer: {
    display: { md: "flex", xs: "none" },
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "150px",
    height: "auto",
  },
  downloadSection: {
    textAlign: "center",
  },
  downloadText: {
    color: "gray",
    marginBottom: "10px",
  },
  appIcons: {
    display: "flex",
    flexDirection: { lg: "Row", xs: "column" },
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
};
