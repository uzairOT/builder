import React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  Link,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import {
  ArrowUp,
  BuilderIcnSm,
  DownloadAppStore,
  DownloadGooglePlay,
} from "../assets/svg";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Box component="footer" style={styles.footer}>
      <Container maxWidth={"xl"}>
        <Grid container spacing={4} justifyContent={"center"}>
          <Grid item xs={12}>
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <Box style={styles.newsletter}>
                <Typography variant="h6" style={{ color: "#000" }}>
                  Subscribe to our newsletter
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Enter your email"
                  style={styles.subscribeInput}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          sx={{
                            borderRadius: 2,
                            backgroundColor: "#2E728F",
                            color: "white",
                            fontWeight: 600,
                          }}
                        >
                          Submit
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            mt={{ lg: -10, xs: 0 }}
            justifyContent={{ lg: "left", xs: "center" }}
            textAlign={{ lg: "left", xs: "center" }}
          >
            <Typography variant="h6" gutterBottom>
              <BuilderIcnSm />
            </Typography>
            <Typography variant="body2">
              Builder Pro is the leading construction management solution,
              designed to help you streamline your projects from start to
              finish. With our powerful tools and features, you can manage every
              aspect of your construction projects with ease and efficiency.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            justifyContent={{ lg: "left", xs: "center" }}
            textAlign={{ lg: "left", xs: "center" }}
          >
            <Typography variant="h6" gutterBottom>
              Product
            </Typography>
            <Link href="#" style={{ color: "#fff" }} variant="body2">
              Dashboard
            </Link>
            <br />
            <Link href="#" style={{ color: "#fff" }} variant="body2">
              Chats
            </Link>
            <br />
            <Link href="#" style={{ color: "#fff" }} variant="body2">
              Knowledge Base
            </Link>
            <br />
            <Link href="#" style={{ color: "#fff" }} variant="body2">
              Tasks
            </Link>
            <br />
            <Link href="#" style={{ color: "#fff" }} variant="body2">
              Admin
            </Link>
            <br />
            <Link href="#" style={{ color: "#fff" }} variant="body2">
              Profile Management
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            justifyContent={{ lg: "left", xs: "center" }}
            textAlign={{ lg: "left", xs: "center" }}
          >
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Link href="#" style={{ color: "#fff" }} variant="body2">
              Blog
            </Link>
            <br />
            <Link href="#" style={{ color: "#fff" }} variant="body2">
              Contact Us
            </Link>
            <br />
            <Link href="#" style={{ color: "#fff" }} variant="body2">
              About Us
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            justifyContent={{ lg: "left", xs: "center" }}
            textAlign={{ lg: "left", xs: "center" }}
          >
            <Typography variant="h6" gutterBottom>
              Install App
            </Typography>
            <Container
              style={styles.appButtons}
              justifyContent={{ lg: "left", xs: "center" }}
              textAlign={{ lg: "left", xs: "center" }}
            >
              <Button
                startIcon={<DownloadAppStore />}
                style={styles.appButton}
              ></Button>
              <Button
                startIcon={<DownloadGooglePlay />}
                style={styles.appButton}
              ></Button>
            </Container>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            justifyContent={{ lg: "right", xs: "center" }}
            textAlign={{ lg: "left", xs: "center" }}
          >
            <Button onClick={scrollToTop}>
              <ArrowUp />
            </Button>
          </Grid>
        </Grid>
        <Box style={styles.footerBottom}>
          <Box>
            <Typography variant="body2">
              © Copyright 2024, All Rights Reserved by MediTask Pro
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">
              <Link href="#" style={{ color: "#fff" }}>
                Privacy Policy
              </Link>
              {" | "}
              <Link href="#" style={{ color: "#fff" }}>
                Terms & Conditions
              </Link>
              {" | "}
              <Link href="#" style={{ color: "#fff" }}>
                Support
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

const styles = {
  footer: {
    backgroundColor: "#4C8AB1",
    color: "#fff",
    padding: "40px 0",
  },
  newsletter: {
    marginTop: "-80px",
    width: "800px",
    justifyContent: "center",
    height: "100px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "25px",
    display: "flex",
    alignItems: "center",
    marginBottom: "40px",
  },
  subscribeInput: {
    // marginRight: "10px",
    // flexGrow: 1,
  },
  appButtons: {
    display: "flex",
    flexDirection: "column",
    alignItems: { lg: "flex-start", xs: "center" },
  },
  appButton: {
    marginTop: "10px",
  },
  footerBottom: {
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    textAlign: "center",
    borderTop: "1px solid #fff",
    paddingTop: "10px",
    marginTop: "20px",
  },
};
