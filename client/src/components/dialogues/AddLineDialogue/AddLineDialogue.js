import React from 'react'
import LineItemElement from "../LineItemElement/LineItemElement"
function AddLineDialogue({ handleAddOpen, handleAddClose, handleAddRow }) {
    return (
        <div>
            <LineItemElement LineHeading={"Add Line Item"} handleAddOpen={handleAddOpen} handleAddClose={handleAddClose} handleAddRow={handleAddRow} />
        </div>
    )
}

export default AddLineDialogue
