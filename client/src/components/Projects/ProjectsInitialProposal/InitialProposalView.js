import { Paper, Stack } from '@mui/material'
import React from 'react'
import AddPhaseView from '../../AssignProject/AddPhaseView/AddPhaseView'
import { useGetProjectUserRoleMutation } from '../../../redux/apis/Project/projectApiSlice'
import { useLoaderData, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {getTokenFromLocalStorage } from '../../../redux/apis/apiSlice';

const InitialProposalView = () => {
  const loader = useLoaderData();
  const authUserRole= loader.role;
  const { id } = useParams();
  const projectId = id;
  return (
    <>
    <Paper  style={{ ...themeStyle.borders, width: "99%", marginBottom:'4px'}}>
   <Stack p={1} borderRadius={'14px'}>
      <AddPhaseView projectId={projectId} InitialProposalView={true} adminProjectView={true} view={'Initial Proposal'} authUserRole={authUserRole}/>
    </Stack>
    </Paper>
    </>
  )
}

const themeStyle = {
  borders: {
    borderRadius: "14px",
  },
}
export const projectUserRoleAuth = async ({params, request}) =>{
  const user = localStorage.getItem('userInfo')
  const currentUser = JSON.parse(user);
    const userId = currentUser.user.id;
    const projectId = params.id;
    try {
      const response = await fetch('http://3.135.107.71/project/getUserProjectRole', {
        method: 'POST',
        body: JSON.stringify({ projectId, userId }), // Stringify the body data
        headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${getTokenFromLocalStorage()}` }, // Set content type header
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching user role: ${response.statusText}`); // Throw error for non-2xx responses
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching user role:', error); // Log the error for debugging
      // Handle the error in a more appropriate way (e.g., display an error message to the user)
    }
}

export default InitialProposalView