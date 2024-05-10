import React from 'react'
import LineItemElement from "../LineItemElement/LineItemElement"
function UpdateLineDialogue({LineItem, handleUpdateOpen, handleUpdateClose, handleUpdateRow, selectedRowIndex, rowData,adminProjectView, MasterLineItem, setPhaseItems }) {
    return (
        <div>
            <LineItemElement setPhaseItems={setPhaseItems} adminProjectView={adminProjectView} LineHeading={"Update Line Item"} handleUpdateOpen={handleUpdateOpen} handleUpdateClose={handleUpdateClose} handleUpdateRow={handleUpdateRow} selectedRowIndex={selectedRowIndex}
                rowData={rowData} LineItem={LineItem} MasterLineItem={MasterLineItem}/>
        </div>
    )
}

export default UpdateLineDialogue
