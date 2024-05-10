import React from 'react'
import ColorPickerElement from '../ColorPickerElement/ColorPickerElement'

function AddPhaseDialogue({ handleAddOpen, handleAddClose,  setPhaseData, onSubmit,adminProjectView, InitialProposalView }) {
    
    return (
        <div>
            <ColorPickerElement InitialProposalView={InitialProposalView} adminProjectView={adminProjectView} PhaseHeading={"Add Phase"} handleAddOpen={handleAddOpen} handleAddClose={handleAddClose}  setPhaseData={setPhaseData} onSubmit={onSubmit} />
        </div>
    )
}

export default AddPhaseDialogue
