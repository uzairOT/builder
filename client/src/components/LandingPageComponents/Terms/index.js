import React from "react";
import TermsAndConditions from "./Terms";
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
