import React from "react";
import LineItemElement from "../LineItemElement/LineItemElement";
function AddLineDialogue({
  phaseData,
  handleAddOpen,
  handleAddClose,
  handleAddRow,
  projectId,
  InitialProposalView,
  setRowCheckboxes,
  showAddLine,
  changeOrderView
}) {
  return (
    <div>
      <LineItemElement
        setRowCheckboxes={setRowCheckboxes}
        InitialProposalView={InitialProposalView}
        projectId={projectId}
        phaseData={phaseData}
        LineHeading={"Add Line Item"}
        handleAddOpen={handleAddOpen}
        handleAddClose={handleAddClose}
        handleAddRow={handleAddRow}
        showAddLine={showAddLine}
        changeOrderView={changeOrderView}
      />
    </div>
  );
}

export default AddLineDialogue;
