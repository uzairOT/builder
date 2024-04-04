import React from 'react'
import ColorPickerElement from '../ColorPickerElement/ColorPickerElement'

function AddPhaseDialogue({ handleAddOpen, handleAddClose,  setPhaseData, onSubmit,adminProjectView }) {
    
    return (
        <div>
            <ColorPickerElement adminProjectView={adminProjectView} PhaseHeading={"Add Phase"} handleAddOpen={handleAddOpen} handleAddClose={handleAddClose}  setPhaseData={setPhaseData} onSubmit={onSubmit} />
        </div>
    )
}

export default AddPhaseDialogue
