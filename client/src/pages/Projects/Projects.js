import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Grid, Paper, Stack } from '@mui/material'
import projects from './assets/data/projects.json'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import ProjectsNavbar from '../../components/Projects/ProjectsNavbar'
import ProjectsDashboard from '../../components/Projects/ProjectsDashboard/ProjectsSidebar'
import ProjectsDefault from '../../components/Projects/ProjectsDefault/ProjectsDefault'
import InitialProposalView from '../../components/Projects/ProjectsInitialProposal/InitialProposalView'
import ImagesView from '../../components/Projects/ProjectsImages/ImagesView'
import PermitView from '../../components/Projects/ProjectsPermit/PermitView'
import DrawingFilesView from '../../components/Projects/ProjectsDrawingFiles/DrawingFilesView'
import WorkOrderView from '../../components/Projects/ProjectsWorkOrder/WorkOrderView'
import ChatView from '../../components/Projects/ProjectsChat/ChatView'
import NotesView from '../../components/Projects/ProjectNotes/NotesView'
import ReportView from '../../components/Projects/ProjectsReport/ReportView'



const Projects = () => {
    const params = useParams();
    const {view: currentView} = params;


  console.log(projects);
  
    switch (currentView) {
      case 'initial-proposal':
        return <InitialProposalView />;
      case 'images':
        return <ImagesView />;
      case 'permit':
        return <PermitView />;
      case 'drawing-files':
        return <DrawingFilesView />;
      case 'work-order':
        return <WorkOrderView />;
      case 'chat':
        return <ChatView />;
      case 'notes':
        return <NotesView />;
      case 'project-report':
        return <ReportView />;
      default:
        return <ProjectsDefault />;
    }
  };
  
  
  
  export default Projects
  
  // <>
  //   <Navbar />
  //   <Grid container  height={'100vh'} backgroundColor={'#eff5ff'} spacing={1}>
    
  //     <Grid item xl={2} height={'99vh'}>
  //         <Paper sx={{height:'100%', borderRadius: '14px'}}><ProjectsDashboard /></Paper>
  //         </Grid>
  //     <Grid item  xl={10} pr={1}>
  //     <Stack ><Paper sx={{height:'100%', borderRadius: '14px'}}><ProjectsNavbar project={selectedProjectId} /></Paper></Stack>
  //     <>
  //     <ProjectsDefault />
  //     </>
  //     </Grid>
    
  //   </Grid>
  // </>