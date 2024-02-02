import { Typography, Grid } from '@mui/material'
import React from 'react'
import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf";


function StepTitles() {
  return (
       <Grid
        item
        lg={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "4rem",
          gap:"1.5rem"
        }}
      >


        <Typography sx={stepGeneralText}>
Step 1 of 3
        </Typography >
        <Typography sx={{...stepGeneralText, fontSize: "3rem"}}>
New Project
        </Typography>
        <Typography sx={{...stepGeneralText, color:"#202227", width:"50%"}}>
Lorem ipsum dolor sit amet consectetur. Pretium aliquam egestas interdum varius sed at libero. Sed vestibulum vel platea accumsan in elit morbi eu erat. Purus non urna et purus. Libero nec nec quam pulvinar massa nulla et tincidunt.
        </Typography>
      </Grid>
  )
}

const stepGeneralText = {
fontFamily: GTWalsheimTrial,
    fontSize: '1rem',
    letterSpacing: '0.01em',
    color: "#4C8AB1",
    textAlign: 'center'
}


export default StepTitles
