import React from "react";
import Navbar from "../NavBar/Navbar";
import GetInTouch from "../ContactForm/GetInTouch";
import StatsAndDownload from "../Statistics/StatsAndDownload";
import Footer from "../Footer/Footer";
import PrivacyPolicy from "./PrivacyPolicy";
import { Grid } from "@mui/material";

export default function PolicyPage() {
  return (
    <>
      {/* <Navbar/> */}
      <Grid mt={5}>
        <PrivacyPolicy />
      </Grid>
      {/* <Grid sx={{mb:25}}>
    <GetInTouch/>
    </Grid> */}
      {/* <StatsAndDownload/> */}
      {/* <Footer /> */}
    </>
  );
}
