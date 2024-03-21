import React from 'react'
import LineItemElement from "../LineItemElement/LineItemElement"
function AddLineDialogue({phaseData, handleAddOpen, handleAddClose, handleAddRow }) {
    return (
        <div>
            <LineItemElement phaseData={phaseData} LineHeading={"Add Line Item"} handleAddOpen={handleAddOpen} handleAddClose={handleAddClose} handleAddRow={handleAddRow} />
        </div>
    )
}

export default AddLineDialogue
