import React from 'react'
import LineItemElement from "../LineItemElement/LineItemElement"
function UpdateLineDialogue({ handleUpdateOpen, handleUpdateClose, handleUpdateRow, selectedRowIndex, rowData }) {
    return (
        <div>
            <LineItemElement LineHeading={"Update Line Item"} handleUpdateOpen={handleUpdateOpen} handleUpdateClose={handleUpdateClose} handleUpdateRow={handleUpdateRow} selectedRowIndex={selectedRowIndex}
                rowData={rowData} />
        </div>
    )
}

export default UpdateLineDialogue
