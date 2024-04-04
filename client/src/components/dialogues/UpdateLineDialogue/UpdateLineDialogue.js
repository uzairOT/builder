import React from 'react'
import LineItemElement from "../LineItemElement/LineItemElement"
function UpdateLineDialogue({LineItem, handleUpdateOpen, handleUpdateClose, handleUpdateRow, selectedRowIndex, rowData,adminProjectView }) {
    return (
        <div>
            <LineItemElement adminProjectView={adminProjectView} LineHeading={"Update Line Item"} handleUpdateOpen={handleUpdateOpen} handleUpdateClose={handleUpdateClose} handleUpdateRow={handleUpdateRow} selectedRowIndex={selectedRowIndex}
                rowData={rowData} LineItem={LineItem} />
        </div>
    )
}

export default UpdateLineDialogue
