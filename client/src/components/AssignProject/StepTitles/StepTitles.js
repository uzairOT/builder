import { Typography, Grid } from '@mui/material'
import React from 'react'
import "../../../App.css"


function StepTitles({ Heading, stepHeading, stepDiscription, projectName }) {
  return (
    <Grid
      item
      lg={12}
      sx={firstGrid}
    >
      <Typography sx={{ ...stepGeneralText,}}>
        {stepHeading}
      </Typography >
      <Typography sx={{ ...stepGeneralText, ...headingStyle }}>
        {Heading}
      </Typography>
      <Typography sx={{ ...stepGeneralText, ...headingStyle, marginBottom:'0.5rem', color: "#FFAC00" }}>
        {projectName}
      </Typography>
      <Typography sx={{ ...stepGeneralText, ...discriptionTypo, textAlign:  'center' , marginLeft:stepDiscription === 'Accepting the invitation grants access to a secure project workspace in BuilderBUILDER Pro' ? '-1rem' : '0px'}}>
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
  marginTop: "0.5rem",
  textAlign:'left'
  // gap: "0.5rem"
}
const discriptionTypo = {
  color: "#202227",
  width: { lg: "40%", md: "60%", sm: "70%", xs: "90%" },
  fontSize: { lg: "0.8rem", md: "0.7rem", sm: "0.6rem", xs: "0.6rem" },
  marginBottom: '1rem'
}
const stepGeneralText = {
  fontFamily: 'var(--main-font-family)',
  fontSize: '1rem',
  letterSpacing: '0.01em',
  color: "#4C8AB1",
  textAlign: 'center'
}
const headingStyle = {
  fontSize: { xl: "2.5rem",lg: "2.2rem", md: "2rem", sm: "1.9rem", xs: "1.5rem" },
  fontWeight: { lg: 400, md: 400, sm: 400, xs: 700 },
  // fontFamily: 'var(--main-font-family)',
  width: { lg: "50%", md: "60%", sm: "70%", xs: "95%" },
  maxWidth: "46rem",
  // whiteSpace: "nowrap",
  // overflow: "hidden",
  // textOverflow: "ellipsis",
}


export default StepTitles
