import React from 'react'
import LineItemElement from "../LineItemElement/LineItemElement"
function AddLineDialogue({phaseData, handleAddOpen, handleAddClose, handleAddRow, projectId, InitialProposalView, setRowCheckboxes }) {
    return (
        <div>
            <LineItemElement setRowCheckboxes={setRowCheckboxes} InitialProposalView={InitialProposalView} projectId={projectId} phaseData={phaseData} LineHeading={"Add Line Item"} handleAddOpen={handleAddOpen} handleAddClose={handleAddClose} handleAddRow={handleAddRow} />
        </div>
    )
}

export default AddLineDialogue
