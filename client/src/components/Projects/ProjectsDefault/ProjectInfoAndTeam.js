import { Divider, Stack } from '@mui/material'
import React from 'react'
import ProjectInfo from './ProjectInfo'
import ProjectTeam from './ProjectTeam'
import { useGetWorkOrdersLineItemsProgressMutation } from '../../../redux/apis/Reports/reportsApiSlice'
import { useEffect } from 'react'

const ProjectInfoAndTeam = ({projectId, userId, SuperAdminId, projectOrganizationId}) => {
  const [getStatus, {data}] = useGetWorkOrdersLineItemsProgressMutation();
  const fetchStats = async () => {
    try {
      const result = await getStatus({
        userId,
        projectId,
      }).unwrap();
      // setProjects(result);
      // console.log(
      //   "Success useGetTotalProjectProfitMarginMutation Results Results Results:",
      //   result
      // );
    } catch (err) {
      console.error("Failed to fetch reports stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Stack direction={{xl:'row', lg:'row', md:'column'}}>
        <Stack width={'100%'}  p={1} pl={3}><ProjectInfo data={data} /></Stack>
        <Divider sx={{borderWidth:'0.8px', color:'#E4E4E4'}} />
        <Stack width={'100%'}  p={1} pl={0} pr={0} ><ProjectTeam SuperAdminId={SuperAdminId} projectOrganizationId={projectOrganizationId}/></Stack>
    </Stack>
  )
}

export default ProjectInfoAndTeam
