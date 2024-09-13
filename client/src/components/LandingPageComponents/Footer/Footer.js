import React, { useEffect } from "react";
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
  FooterBotomRibbon,
  FooterTopRibbon,
} from "../assets/svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useSendContactFormMutation } from "../../../redux/apis/usersApiSlice";
import { useNavigate } from "react-router-dom";
import googlePlay from "../../../assets/FileSvg/googlePlay.svg";
import appStore from "../../../assets/FileSvg/appStore.svg";
import { motion } from "framer-motion";

const popEffect = {
  hidden: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

const Footer = () => {
  const [sendContactForm] = useSendContactFormMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "subscribe",
      privacyPolicy: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await sendContactForm({
          email: values.email,
          message: "subscribe",
          contactUsType: "newsletter",
        }).unwrap();
        toast.success("You have subscribed to our newsletter!");
        resetForm();
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const ProtectedLink = ({ href, children }) => {
    const navigate = useNavigate();

    const handleClick = (event) => {
      event.preventDefault();
      const userInfo = localStorage.getItem("userInfo");
      const userParsedInfo = JSON.parse(userInfo);
      if (!userInfo) {
        toast.error("Please login to access this page");
        navigate("/login");
      } else {
        if (userParsedInfo?.user?.hasValidSubscription) {
          navigate(href);
        } else {
          navigate('/subscription');
        }
      }
    };

    return (
      <Link
        href={href}
        onClick={handleClick}
        style={{ color: "#fff" }}
        variant="body2"
      >
        {children}
      </Link>
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box component="footer" style={styles.footer}>
      <Container maxWidth={"xl"}>
        <Grid
          container
          spacing={4}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <Box sx={styles.newsletter}>
                <Typography
                  variant="h6"
                  sx={styles.newletterStyles}
                  style={{ color: "#000" }}
                >
                  Subscribe to our newsletter
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    sx={{
                      border: "1px solid silver",
                      borderRadius: "5px",
                      backgroundColor: "#EEEEEE",
                      "& .MuiOutlinedInput-root": {
                        "&::placeholder": {
                          color: "#4C8AB1",
                          fontWeight: "bold",
                          fontFamily: "var(--main-font-family)",
                        },
                      },
                    }}
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
                            type="submit"
                            sx={{
                              backgroundColor: "#2E728F",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "grey",
                                color: "white",
                              },
                              fontWeight: 500,
                              fontFamily: "var(--main-font-family)",
                              borderRadius: "8px",
                              textTransform: "none",
                            }}
                          >
                            Submit
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      sx: {
                        "&::placeholder": {
                          color: "#4C8AB1",
                          fontWeight: "bold",
                          fontFamily: "var(--main-font-family)",
                        },
                      },
                    }}
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </form>
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
          // ml={{ lg: 20, xs: 0 }}
          >
            <Typography variant="h6" gutterBottom>
              <BuilderIcnSm />
            </Typography>
            <Typography variant="body2" style={styles.footerDesc}>
              BuilderBUILDER PRO is the leading construction management
              solution, designed to help you streamline your projects from start
              to finish. With our powerful tools and features, you can manage
              every aspect of your construction projects with ease and
              efficiency.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            justifyContent={{ lg: "left", xs: "center" }}
            textAlign={{ lg: "left", xs: "center" }}
          >
            <Typography variant="h6" gutterBottom style={styles.footerLinks}>
              Product
            </Typography>
            <Typography style={styles.footerLinks}>
              <ProtectedLink href="/dashboard">Dashboard</ProtectedLink>
              <br />
              <ProtectedLink href="/projects">Projects</ProtectedLink>
              <br />
              <ProtectedLink href="/reports">Reports</ProtectedLink>
              <br />
              <ProtectedLink href="/subscription">Subscription</ProtectedLink>
              <br />
              <ProtectedLink href="/settings">Settings</ProtectedLink>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            justifyContent={{ lg: "left", xs: "center" }}
            textAlign={{ lg: "left", xs: "center" }}
          >
            <Typography sx={styles.footerIntallText} variant="h6" gutterBottom>
              Install App
            </Typography>
            <Container
              style={styles.appButtons}
              justifyContent={{ lg: "left", xs: "center" }}
              textAlign={{ lg: "left", xs: "center" }}
            >
              <motion.div
                initial="hidden"
                whileHover="hover"
                variants={popEffect}
              >
                <Box>
                  <a
                    href="https://testflight.apple.com/join/Fejy1iQ6"
                    target="blank"
                  >
                    <img alt="App Store" src={appStore} />
                    {/* <DownloadAppStore /> */}
                  </a>
                </Box>
              </motion.div>

              <motion.div
                initial="hidden"
                whileHover="hover"
                variants={popEffect}
              >
                <Box>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.octathorn.builder_builder_pro&pcampaignid=web_share"
                    target="blank"
                  >
                    <img alt="Play Store" src={googlePlay} />

                    {/* <DownloadGooglePlay /> */}
                  </a>
                </Box>
              </motion.div>
            </Container>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            justifyContent={{ lg: "right", xs: "center" }}
            textAlign={{ lg: "left", xs: "center" }}
            ml={{ md: 10, xs: 0 }}
          >
            <Button onClick={scrollToTop}>
              <ArrowUp />
            </Button>
          </Grid>
        </Grid>
        <Box style={styles.footerBottom}>
          <Box>
            <Typography variant="body2" styles={styles.footerCopyright}>
              © Copyright 2024, All Rights Reserved by BuilderBUILDER PRO
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" style={styles.footerLinks}>
              <Link
                onClick={() => {
                  openInNewTab("/privacypolicy");
                }}
                style={{ color: "#fff", cursor: "pointer" }}
              >
                Privacy Policy
              </Link>
              {" | "}
              <Link
                onClick={() => {
                  openInNewTab("/terms");
                }}
                style={{ color: "#fff", cursor: "pointer" }}
              >
                Terms & Conditions
              </Link>
              {" | "}
              <Link href="/help" style={{ color: "#fff" }}>
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
    marginTop: "-130px",
    width: "800px",
    justifyContent: "center",
    height: { md: "100px", xs: "100%" },
    backgroundColor: "#fff",
    borderRadius: "20px",
    border: "1px solid silver",
    padding: "30px",
    display: "flex",
    alignItems: "center",
    marginBottom: "60px",
    gap: { md: 5, xs: 2 },
    flexDirection: { md: "row", xs: "column" },
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
    flexDirection: { sm: "column", xs: "row" },
    textAlign: "center",
    borderTop: "1px solid #fff",
    paddingTop: "10px",
    marginTop: "20px",
  },
  footerIntallText: {
    ml: 2,
    fontFamily: "var(--main-font-family)",
  },
  footerDesc: {
    fontFamily: "var(--main-font-family)",
  },
  footerCopyright: {
    fontFamily: "var(--main-font-family)",
  },
  footerLinks: {
    fontFamily: "var(--main-font-family)",
  },
  newletterStyles: {
    fontFamily: "var(--main-font-family)",
    fontSize: { md: "32px", xs: "18px" },
  },
};
