import { Box, Button, Divider, IconButton,  Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useParams,Link } from 'react-router-dom';
import ProjectNavbarDrawer from './ProjectNavbarDrawer';


const ProjectsNavbar = ({project}) => {
  const params = useParams();
  const theme = useTheme();
  const showHamburger = useMediaQuery(theme.breakpoints.down("lg"));
    console.log(showHamburger);
    const navLinks = [
        {
          title: "Initial Proposal",
          path: `initial-proposal`,
        },
        {
          title: "Images",
          path: "images",
        },
        {
          title: "Permit",
          path: "permit",
        },
        {
          title: "Drawing Files",
          path: "drawing-files",
        },
        {
          title: "Work Order",
          path: "work-order",
        },
        {
          title: "Chat",
          path: "chat",
        },
        {
          title: "Notes",
          path: "notes",
        },
        {
          title: "Project Report",
          path: "project-report",
        },
      ];

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} p={1} >
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
    <IconButton><ChevronLeftIcon style={{color:'black'}}/></IconButton>
      {/* <img src={project?.image} alt='Project' width={'60px'} height={'35px'} style={{borderRadius: '12px'}}></img> */}
    <Link to={``} style={{textDecoration: 'none'}}>
      <Typography color={'#494A4A'} fontSize={'20px'} fontWeight={'600'} fontFamily={'GT-Walsheim-Regular-Trial, sans-serif'}>
      {project?.projectName}
      </Typography>
    </Link>
        </Stack>

      { showHamburger && <ProjectNavbarDrawer navLinks={navLinks} />}
      <Stack direction={'row'} alignItems={'center'} spacing={1} pr={2} display={{xl:'flex', lg:'flex', md:'none', sm:'none', xs:'none'}}>
        {navLinks.map((navlink, index) => (
          <React.Fragment key={index}>
            <Link to={`${navlink.path}`} style={{textDecoration: 'none'}}>
              <Typography
                color={'#494A4A'}
                fontSize={'15px'}
                fontWeight={'400'}
                fontFamily={'GT-Walsheim-Regular-Trial, sans-serif'}
                pr={1}
              >
                {navlink.title}
              </Typography>
            </Link>
            {index !== navLinks.length - 1 && <Divider orientation="vertical" style={{borderWidth:'1px'}} flexItem />}
          </React.Fragment>
        ))}
      </Stack>
      
    </Stack>
  )
}

export default ProjectsNavbar
