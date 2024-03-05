import React from 'react'
import ColorPickerElement from '../ColorPickerElement/ColorPickerElement'

function AddPhaseDialogue({ handleAddOpen, handleAddClose, phaseData, setPhaseData, onSubmit }) {
    return (
        <div>
            <ColorPickerElement PhaseHeading={"Add Phase"} handleAddOpen={handleAddOpen} handleAddClose={handleAddClose} phaseData={phaseData} setPhaseData={setPhaseData} onSubmit={onSubmit} />
        </div>
    )
}

export default AddPhaseDialogue
