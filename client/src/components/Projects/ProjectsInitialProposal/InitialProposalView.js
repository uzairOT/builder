import { Stack } from '@mui/material'
import React from 'react'
import AddPhaseView from '../../AssignProject/AddPhaseView.js/AddPhaseView'

const InitialProposalView = () => {
  return (
    <Stack p={1} borderRadius={'14px'}>
      <AddPhaseView adminProjectView={true} view={'Initial Proposal'}/>
    </Stack>
  )
}

export default InitialProposalView