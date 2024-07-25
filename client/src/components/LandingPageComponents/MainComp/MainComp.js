import React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DownloadAppStore, DownloadGooglePlay } from "../assets/svg";
import devicesimg from "../assets/PNG/devices.png";


const MainContent = () => {
  const theme = useTheme();
  const downView = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Grid container md={12} sx={styles.container}>
      <Grid>
        <Grid container md={12}>
          <Grid item md={10} xs={12}>
            <Typography component="div" sx={styles.heading1}>
              Your Trusted Construction Management
            </Typography>
            <Typography component="div" sx={styles.heading2}>
              Streamline Your Construction Projects
            </Typography>
            <Typography component="div" sx={styles.heading3}>
              Manage. Organize. Succeed.
            </Typography>

            <Typography component="div" sx={styles.bodyText}>
              Builder Pro is your all-in-one solution to efficiently manage
              construction projects from start to finish. Designed for
              professionals who demand precision, organization, and results,
              Builder Pro offers robust features to streamline every aspect of
              your project management.
            </Typography>

            <Button variant="outlined" sx={styles.demoButton}>
              Schedule a Demo
            </Button>
          </Grid>

          <Grid item md={2} xs={12} sx={{textAlign:"center"}}>
            <Typography
              component="div"
              sx={styles.downloadText}
            >
              DOWNLOAD NOW!
            </Typography>
            <Button>
              <DownloadAppStore />
            </Button>
            <Button>
              <DownloadGooglePlay />
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={styles.imageBox}>
        <img
          src={devicesimg}
          alt="Dashboard Screenshot"
          style={{ width: downView ? "100%" : "100%" }}
        />
      </Box>
    </Grid>
  );
};

export default MainContent;

const styles = {
  container: {
    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
    url('https://i.ibb.co/QYQ2d9k/behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash.png')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: { lg: 15,md:10, xs: 0 },
    width:"100%",
    overflowX: "hidden",
    overflowY: "auto",
    justifyContent: { xs: "center", md: "left" },
    textAlign: { md: "left", xs: "center" },
    height:{lg:"80vh", xs:"100%"}
  },
  heading1: {
    color: "#ffffff",
    fontFamily: "Arial Rounded MT, sans-serif",
    fontWeight: 600,
    fontSize: { lg: "22px", xs: "16px" },
  },
  heading2: {
    color: "#ffffff",
    marginTop: 2,
    fontFamily: "Arial Rounded MT, sans-serif",
    fontWeight: 700,
    fontSize: { lg: "40px", xs: "20px" },
  },
  heading3: {
    color: "#ffffff",
    marginTop: 1,
    fontFamily: "Arial Rounded MT, sans-serif",
    fontWeight: 700,
    fontSize: { lg: "48px", xs: "25px" },
  },
  bodyText: {
    color: "#ffffff",
    marginTop: 2,
    maxWidth: { md: "60%", xs: "100%" },
    fontFamily: "Arial Rounded MT, sans-serif",
    fontWeight: 500,
    fontSize: { lg: "16", xs: "14px" },
  },
  demoButton: {
    color: "#2E728F",
    backgroundColor: "white",
    border: "2px solid white",
    marginTop: 4,
    fontWeight:"bold"
  },
  downloadText: {
    fontSize:"13px",
    fontWeight:700,
    fontFamily: "Arial Rounded MT, sans-serif",
    color: "#ffffff",
    marginBottom: 1,
  },
  imageBox: {
    position: "absolute",
    top: { xl: "40%", lg: "60%", md:"50%" },
    left: { xl: "40%", lg: "30%", md:"40%" },
    display: { xs: "none", md: "flex" },
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
  },
};
