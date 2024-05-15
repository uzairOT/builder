import React from 'react'
import LineItemElement from "../LineItemElement/LineItemElement"
function UpdateLineDialogue({reqWorkOrderModal, InitialProposalView,  LineItem, handleUpdateOpen, handleUpdateClose, handleUpdateRow, selectedRowIndex, rowData,adminProjectView, MasterLineItem, setPhaseItems ,projectId }) {
    return (
        <div>
            <LineItemElement reqWorkOrderModal={reqWorkOrderModal} projectId={projectId} setPhaseItems={setPhaseItems} adminProjectView={adminProjectView} LineHeading={"Update Line Item"} handleUpdateOpen={handleUpdateOpen} handleUpdateClose={handleUpdateClose} handleUpdateRow={handleUpdateRow} selectedRowIndex={selectedRowIndex}
                rowData={rowData} LineItem={LineItem} MasterLineItem={MasterLineItem} InitialProposalView={InitialProposalView}/>
        </div>
    )
}

export default UpdateLineDialogue
