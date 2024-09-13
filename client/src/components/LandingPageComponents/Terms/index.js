import React from "react";
import Navbar from "../NavBar/Navbar";
import TermsAndConditions from "./Terms";
import GetInTouch from "../ContactForm/GetInTouch";
import StatsAndDownload from "../Statistics/StatsAndDownload";
import Footer from "../Footer/Footer";
import { Grid } from "@mui/material";

export default function TermsPage() {
  return (
    <>
      {/* <Navbar /> */}
      <Grid mt={5}>
        <TermsAndConditions />
      </Grid>
      {/* <Grid sx={{ mb: 25 }}>
        <GetInTouch />
      </Grid> */}
      {/* <StatsAndDownload/> */}
      {/* <Footer /> */}
    </>
  );
}
