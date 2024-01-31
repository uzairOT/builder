import { Box, Stack, Typography } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import React from "react";

const ProfitDetails = () => {
  return <Box pl={4} pt={2} >
     <Typography textAlign={'left'} sx={themeStyle.title}>Profit Details</Typography>
    <Stack direction={'row'} width={'100%'} p={2}>
        <Box>
        <Stack direction={'row'} sx={themeStyle.innerStackLayout}>
         <Typography textAlign={'left'} sx={themeStyle.innerTitle}>Total Profit</Typography>
         <Typography textAlign={'left'} sx={themeStyle.innerSubtitle}>$491,739.09</Typography>
     </Stack>
     <Stack direction={'row'} sx={themeStyle.innerStackLayout}>
         <Typography textAlign={'left'} sx={themeStyle.innerTitle}>Gross Profit</Typography>
         <Typography textAlign={'left'} sx={themeStyle.innerSubtitle}>$286,657.13</Typography>
     </Stack>
     <Stack direction={'row'} sx={themeStyle.innerStackLayout}>
         <Typography textAlign={'left'} sx={themeStyle.innerTitle}>Profit Earned</Typography>
         <Typography textAlign={'left'} sx={themeStyle.innerSubtitle}>$154,567.13</Typography>
     </Stack>
        </Box>
        <Stack pl={4} justifyContent={'flex-end'} >
            <Stack direction={'row'} alignItems={'flex-end'}>
            <ArrowUpwardIcon fontSize="small" style={{color: "#00AC4F"}} />
            <Typography sx={themeStyle.innerStacktext}><span style={themeStyle.spanItems}>16%</span>this month</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'flex-end'}> 
            <ArrowUpwardIcon fontSize="small" style={{color: "#00AC4F"}}/>
            <Typography sx={themeStyle.innerStacktext}><span style={themeStyle.spanItems}>6%</span> this month</Typography>
            </Stack>
        </Stack>
    </Stack>
  </Box>;
};

export default ProfitDetails;

const themeStyle = {
    title: {
        fontFamily: 'inherit',
        color: '#202224',
        opacity: '0.7'
    },
    innerStackLayout: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    innerTitle: {
        fontFamily: 'inherit',
        color: '#202227',
        fontSize: '10px',
        paddingRight: '32px'
    },
    innerSubtitle: {
        fontFamily: 'inherit',
        color: '#202227',
        fontSize: '20px',
    },
    innerStacktext: {
        fontSize: '10px',
        color: '#292D32',
    },
    spanItems: {
        color: '#00AC4F', 
        fontWeight: '700',
    }
}