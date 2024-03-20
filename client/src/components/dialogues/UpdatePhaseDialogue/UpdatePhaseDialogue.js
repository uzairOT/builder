import React from 'react'
import ColorPickerElement from '../ColorPickerElement/ColorPickerElement'

function UpdatePhaseDialogue({ handleUpdateOpen, handleUpdateClose, phaseData, setPhaseData, onSubmit }) {
    return (
        <div>
            <ColorPickerElement PhaseHeading={"Update Phase"} handleUpdateOpen={handleUpdateOpen} handleUpdateClose={handleUpdateClose} phaseData={phaseData} setPhaseData={setPhaseData} onSubmit={onSubmit} />
        </div>
    )
}

export default UpdatePhaseDialogue
