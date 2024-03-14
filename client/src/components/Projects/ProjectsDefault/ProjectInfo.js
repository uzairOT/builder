import { Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#4C8AB1' : '#4C8AB1',
    },
    width: '60%'
  }));

const ProjectInfo = () => {
  return (
    <Stack >
        <Typography sx={themeStyle.title}>Burrow - Home Build</Typography>
        <Stack  direction={'row'} width={'60%'} justifyContent={'space-between'}>
            <Typography sx={themeStyle.label} fontSize={'13px'}>Start</Typography>
            <Typography sx={themeStyle.label} fontSize={'13px'}>End</Typography>
        </Stack>
        <Stack direction={'row'} pt={1}>
        <BorderLinearProgress variant="determinate" value={50}/>
        <Typography sx={themeStyle.label} fontSize={'10px'} pl={1}>2/6</Typography>
        </Stack>
        <Stack spacing={0.5} pt={1} pb={1.2} width={'100%'} >
             <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography sx={themeStyle.text}>Job Type</Typography>
                <Stack width={'55%'} alignSelf={'center'}>
                <Divider  variant='middle' orientation="horizontal" style={{borderStyle:'dashed', borderWidth: '1px', color:'#C5C5C5'}}  />
                </Stack>
                <Typography sx={themeStyle.text}>Job Type</Typography>
             </Stack>
             <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography sx={themeStyle.text}>Remodel Type</Typography>
                <Stack width={'55%'} alignSelf={'center'}>
                <Divider  variant='middle' orientation="horizontal" style={{borderStyle:'dashed', borderWidth: '1px', color:'#C5C5C5'}}  />
                </Stack>
                <Typography sx={themeStyle.text}>Job Type</Typography>
             </Stack>
             <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography sx={themeStyle.text}>Sales Rep</Typography>
                <Stack width={'55%'} alignSelf={'center'}>
                <Divider  variant='middle' orientation="horizontal" style={{borderStyle:'dashed', borderWidth: '1px', color:'#C5C5C5'}}  />
                </Stack>
                <Typography sx={themeStyle.text}>Job Type</Typography>
             </Stack>
             <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography sx={themeStyle.text}>Project Manager</Typography>
                <Stack width={'55%'} alignSelf={'center'}>
                <Divider  variant='middle' orientation="horizontal" style={{borderStyle:'dashed', borderWidth: '1px', color:'#C5C5C5'}}  />
                </Stack>
                <Typography sx={themeStyle.text}>Job Type</Typography>
             </Stack>
             <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography sx={themeStyle.text}>Job Status</Typography>
                <Stack width={'55%'} alignSelf={'center'}>
                <Divider  variant='middle' orientation="horizontal" style={{borderStyle:'dashed', borderWidth: '1px', color:'#C5C5C5'}}  />
                </Stack>
                <Typography sx={themeStyle.text}>Job Type</Typography>
             </Stack>
        </Stack>
    </Stack>
  )
}

export default ProjectInfo

const themeStyle = {
    title: {
        fontSize: '16px',
        color: '#4C8AB1',
        fontFamily:'GT-Walsheim-Regular-Trial, sans-serif',
        
    },
    text: {
        fontFamily:'GT-Walsheim-Regular-Trial, sans-serif',
        fontSize:'14px',
        width:'160px',
        color: '#202227'
    },
    label: {
        fontFamily:'GT-Walsheim-Regular-Trial, sans-serif',
        color:'#202227'
    }

}