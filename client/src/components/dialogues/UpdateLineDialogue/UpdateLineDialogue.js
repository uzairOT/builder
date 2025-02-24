import React from "react";
import LineItemElement from "../LineItemElement/LineItemElement";
import { useTranslation } from "react-i18next";
function UpdateLineDialogue({
  reqWorkOrderModal,
  InitialProposalView,
  LineItem,
  handleUpdateOpen,
  handleUpdateClose,
  handleUpdateRow,
  selectedRowIndex,
  rowData,
  adminProjectView,
  MasterLineItem,
  setPhaseItems,
  projectId,
  showUpdateLine,
  setRowCheckboxes,
  updateRow,
  setUpdateRow,
  lineItemIndex,
  addPhaseId
}) {
  const {t} = useTranslation()
  return (
    <div>
      <LineItemElement
        setRowCheckboxes={setRowCheckboxes}
        reqWorkOrderModal={reqWorkOrderModal}
        updateRow={updateRow}
        setUpdateRow={setUpdateRow}
        projectId={projectId}
        setPhaseItems={setPhaseItems}
        adminProjectView={adminProjectView}
        LineHeading={t("LineItem.updateLineItem")}
        handleUpdateOpen={handleUpdateOpen}
        lineItemIndex={lineItemIndex}
        handleUpdateClose={handleUpdateClose}
        handleUpdateRow={handleUpdateRow}
        selectedRowIndex={selectedRowIndex}
        rowData={rowData}
        LineItem={LineItem}
        MasterLineItem={MasterLineItem}
        InitialProposalView={InitialProposalView}
        showUpdateLine={showUpdateLine}
        addPhaseId={addPhaseId}
      />
    </div>
  );
}

export default UpdateLineDialogue;
