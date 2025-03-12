import React from "react";
import LineItemElement from "../LineItemElement/LineItemElement";
import { useTranslation } from "react-i18next";
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
  const {t} = useTranslation()
  return (
    <div>
      <LineItemElement
        setRowCheckboxes={setRowCheckboxes}
        InitialProposalView={InitialProposalView}
        projectId={projectId}
        phaseData={phaseData}
        LineHeading={t("LineItem.addLineItem")}
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
