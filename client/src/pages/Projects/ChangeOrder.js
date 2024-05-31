import { Paper } from '@mui/material'
import React from 'react'
import ProjectsChangeOrder from '../../components/Projects/ProjectsChangeOrder/ProjectsChangeOrder'
import { useParams } from 'react-router-dom';
import { useGetProjectChangeOrderQuery } from '../../redux/apis/Project/projectApiSlice';

const ChangeOrder = () => {
  const params = useParams();
  const { id: currentProjectId } = params;
  const currentUser = localStorage.getItem("userInfo");
  const user = JSON.parse(currentUser);
  const { data, refetch } = useGetProjectChangeOrderQuery({
    projectId: currentProjectId,
    userId: user.user.id,
    changeOrder: true
  });
  return (
    <Paper style={{ ...themeStyle.borders, width: "99%", marginBottom:'4px',  marginTop:'8px'}}>
      <ProjectsChangeOrder data={data} refetch={refetch} />
    </Paper>
  )
}

export default ChangeOrder

const themeStyle = {
    borders: {
      borderRadius: "14px",
      padding: "8px",
    },
    border: {
      borderRadius: '14px'
    }
  };
  
  
  
  