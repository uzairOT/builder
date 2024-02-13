import { Typography, Grid } from '@mui/material'
import React from 'react'
import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf";


function StepTitles({ Heading, stepHeading, stepDiscription, projectName }) {
  return (
    <Grid
      item
      lg={12}
      sx={firstGrid}
    >
      <Typography sx={{ ...stepGeneralText, marginBottom: "0.5rem" }}>
        {stepHeading}
      </Typography >
      <Typography sx={{ ...stepGeneralText, ...headingStyle }}>
        {Heading}
      </Typography>
      <Typography sx={{ ...stepGeneralText, ...headingStyle, color: "#FFAC00" }}>
        {projectName}
      </Typography>
      <Typography sx={{ ...stepGeneralText, ...discriptionTypo }}>
        {stepDiscription}
      </Typography>
    </Grid>
  )
}
const firstGrid = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "2rem",
  gap: "0.5rem"
}
const discriptionTypo = {
  color: "#202227", width: "60%", maxWidth: "44%"
}
const stepGeneralText = {
  fontFamily: GTWalsheimTrial,
  fontSize: '1rem',
  letterSpacing: '0.01em',
  color: "#4C8AB1",
  textAlign: 'center'
}
const headingStyle = {
  fontSize: "3rem", maxWidth: "46rem"
}


export default StepTitles
