import { Divider, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import BuilderProButton from '../../UI/Button/BuilderProButton'
import { useParams } from 'react-router-dom'

const ProjectsSidebar = () => {
    const [activeBtn, setActiveBtn] = useState('New build')

    const handleListedProjectsButton = (btn)=>{
        setActiveBtn(btn);
    }
    
  return (
    <>
        <Stack p={2}>
            {/* PROJECT DASHBOARD */}
            <Typography sx={themeStyle.title} pb={1.5}>Projects Dashboard</Typography>
            <Typography sx={themeStyle.subtile} pb={1.5}>User Projects</Typography>
            <Divider  variant='fullWidth'sx={{marginLeft:'2px',marginRight:'2px'}}/>

            {/* LIST OF PROJECTS */}
            <Typography sx={themeStyle.listTitle} pt={1.5} pb={4}>All listed Projects</Typography>

            {/* BUTTON STACK */}
            <Stack direction={'row'}  ml={'-16px'} mr={'-16px'} justifyContent={'center'} >
            <BuilderProButton variant={'contained'} marginLeft={'4px'} padding={'8px 8px'} backgroundColor={activeBtn === 'Remodel' ? '#FFCA5B' : '#F2F2F2'} handleOnClick={() => {handleListedProjectsButton('Remodel')}}>
                <Typography fontSize={'11px'} fontWeight={'500'} color={'black'} fontFamily={ 'Inter, sans-serif'} width={'100%'}>
                Remodel
                </Typography>
                </BuilderProButton>
            <BuilderProButton variant={'contained'} marginLeft={'4px'} padding={'8px 8px'} backgroundColor={activeBtn === 'New build' ? '#FFCA5B' : '#F2F2F2'} handleOnClick={() => {handleListedProjectsButton('New build')}}>
            <Typography fontSize={'11px'} fontWeight={'500'}color={'black'} fontFamily={ 'Inter, sans-serif'} width={'100%'}>

             New build
            </Typography>
                </BuilderProButton>
            <BuilderProButton variant={'contained'} marginLeft={'4px'} padding={'8px 8px'} backgroundColor={activeBtn === 'Commercial' ? '#FFCA5B' : '#F2F2F2'} handleOnClick={() => {handleListedProjectsButton('Commercial')}}>
            <Typography fontSize={'11px'} fontWeight={'500'} color={'black'} fontFamily={ 'Inter, sans-serif'}>
                Commercial
                </Typography>
                </BuilderProButton>
            </Stack>
            <Stack>

            </Stack>
        </Stack>
    </>
  )
}

export default ProjectsSidebar

const themeStyle = {
    title: {
        fontSize: '22px',
        fontWeight: '500',
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        color: '#000000'
    },
    subtile:{
        fontSize: '16px',
        fontWeight: '500',
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        color: '#4C8AB1'
    },
    listTitle:{
        fontSize: '12px',
        fontWeight: '500',
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        color: '#535353C9'
    }
}