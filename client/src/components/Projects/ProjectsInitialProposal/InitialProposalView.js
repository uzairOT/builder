import { Paper, Stack } from '@mui/material'
import React from 'react'
import AddPhaseView from '../../AssignProject/AddPhaseView/AddPhaseView'
import { useGetProjectUserRoleMutation } from '../../../redux/apis/Project/projectApiSlice'
import { useLoaderData, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {getTokenFromLocalStorage } from '../../../redux/apis/apiSlice';
import { getUserRoleFromRedux } from '../../../redux/slices/auth/userRoleSlice'

const InitialProposalView = () => {
  // const loader = useLoaderData();
  const authUserRole= useSelector(getUserRoleFromRedux);
  const { id } = useParams();
  const projectId = id;
  return (
    <>
    <Paper  style={{ ...themeStyle.borders, ...themeStyle.scrollable,  width: "100%", marginBottom:'4px', marginTop:'8px'}}>
   <Stack p={1} borderRadius={'14px'}  width={'99%'} >
      <AddPhaseView projectId={projectId} InitialProposalView={true} adminProjectView={true} view={'Initial Proposal'} authUserRole={authUserRole.userRole}/>
    </Stack>
    </Paper>
    </>
  )
}

const themeStyle = {
  borders: {
    borderRadius: "14px",
  },
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
export const projectUserRoleAuth = async ({params, request}) =>{
  // const user = localStorage.getItem('userInfo')
  // const currentUser = JSON.parse(user);
  //   const userId = currentUser.user.id;
  //   const projectId = params.id;
  //   try {
  //     const response = await fetch('http://192.168.0.113:8080/project/getUserProjectRole', {
  //       method: 'POST',
  //       body: JSON.stringify({ projectId, userId }), // Stringify the body data
  //       headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${getTokenFromLocalStorage()}` }, // Set content type header
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`Error fetching user role: ${response.statusText}`); // Throw error for non-2xx responses
  //     }
  
  //     return await response.json();
  //   } catch (error) {
  //     console.error('Error fetching user role:', error); // Log the error for debugging
  //     // Handle the error in a more appropriate way (e.g., display an error message to the user)
  //   }
  return null
}

export default InitialProposalView