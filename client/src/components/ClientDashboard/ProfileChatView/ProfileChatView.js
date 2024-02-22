import React, { useState } from 'react'

import { Box, Link, Stack, Typography } from '@mui/material'
import ProfileReport from '../../../pages/Reports/ProfileReport'
import SearchBar from '../../UI/SearchBar/SearchBar'
import { useParams } from 'react-router-dom'
import ProjectsSidebar from '../../Projects/ProjectsDashboard/ProjectsSidebar'
import ProjectCard from '../../UI/Card/ProjectCard'
import projects from "../../Projects/ProjectsDashboard/assets/data/projects.json"
import BuilderProButton from '../../UI/Button/BuilderProButton'

function ProfileChatView() {
    const [activeBtn, setActiveBtn] = useState('New build')

    const handleListedProjectsButton = (btn) => {
        setActiveBtn(btn);
    }
    const { id } = useParams();
    return (
        <div>
            <Box sx={{ padding: "1rem", }}>
                <ProfileReport name={"Devid Peters"} description={"Senior Developer"} />
                <SearchBar />
                <Stack direction={'row'} ml={'-16px'} mr={'-16px'} mt={'1rem'} justifyContent={'center'} >
                    <BuilderProButton variant={'contained'} marginLeft={'4px'} padding={'8px 8px'} backgroundColor={activeBtn === 'Remodel' ? '#FFCA5B' : '#F2F2F2'} handleOnClick={() => { handleListedProjectsButton('Remodel') }}>
                        <Typography fontSize={'11px'} fontWeight={'500'} color={'black'} fontFamily={'Inter, sans-serif'} width={'100%'}>
                            Remodel
                        </Typography>
                    </BuilderProButton>
                    <BuilderProButton variant={'contained'} marginLeft={'4px'} padding={'8px 8px'} backgroundColor={activeBtn === 'New build' ? '#FFCA5B' : '#F2F2F2'} handleOnClick={() => { handleListedProjectsButton('New build') }}>
                        <Typography fontSize={'11px'} fontWeight={'500'} color={'black'} fontFamily={'Inter, sans-serif'} width={'100%'}>

                            New build
                        </Typography>
                    </BuilderProButton>
                    <BuilderProButton variant={'contained'} marginLeft={'4px'} padding={'8px 8px'} backgroundColor={activeBtn === 'Commercial' ? '#FFCA5B' : '#F2F2F2'} handleOnClick={() => { handleListedProjectsButton('Commercial') }}>
                        <Typography fontSize={'11px'} fontWeight={'500'} color={'black'} fontFamily={'Inter, sans-serif'}>
                            Commercial
                        </Typography>
                    </BuilderProButton>
                </Stack>
                <hr style={{ border: "1px solid #CDCDCD", marginTop: "1rem" }}></hr>
                <Box sx={{ ...themeStyle.scrollable, height: '70vh', marginTop: "1rem" }}>
                    <Stack spacing={1} pl={2} pr={2} pt={1} >
                        <>
                            {projects.map((projectProfileCard) => {
                                const selected = projectProfileCard.id == id;
                                return (
                                    <Link key={projectProfileCard.id} underline="none">
                                        <ProjectCard
                                            projectProfileCard={projectProfileCard}
                                            selected={selected}
                                        />
                                    </Link>
                                );
                            })}
                        </>
                    </Stack>
                </Box>
            </Box>

        </div >
    )
}



const themeStyle = {


    scrollable: {
        scrollbarWidth: 'none',  // For Firefox
        '-ms-overflow-style': 'none',  // For IE and Edge
        '&::-webkit-scrollbar': {
            width: '6px'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'transparent',
            transition: 'background-color 0.3s',
        },
        '&:hover::-webkit-scrollbar-thumb': {
            backgroundColor: '#ddd',
        },
        overflowY: 'scroll'
    }
}
export default ProfileChatView
