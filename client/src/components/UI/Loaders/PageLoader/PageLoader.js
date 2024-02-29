import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

const PageLoader = () => {
  return( 
  <Stack height={'100vh'} width={'100%'} justifyContent={'center'} alignItems={'center'} backgroundColor={'#F5F5F5'}>
    <CircularProgress />
  </Stack>);
};

export default PageLoader;
