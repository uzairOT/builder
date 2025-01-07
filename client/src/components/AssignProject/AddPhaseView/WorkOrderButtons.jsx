import { Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { buttonBox } from "./stylingObjects";
import RequestWorkOrderModal from "../../dialogues/RequestWorkOrder/RequestWorkOrderModal";

//HEADER BUTTONS
const WorkOrderButtons = ({
  adminProjectView,
  rowCheckboxes,
  setRowCheckboxes,
  phases,
  fetchData,
  refetchChangeOrder,
  changeOrderView,
  selectedProjectData,
}) => {
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down("md"));
  console.log("adminProjectView", adminProjectView);
  return (
    <>
      <Stack direction={"row"} sx={buttonBox}>
        {adminProjectView && !mobileView ? (
          <RequestWorkOrderModal
            rowCheckboxes={rowCheckboxes}
            setRowCheckboxes={setRowCheckboxes}
            phases={phases}
            fetchData={fetchData}
            refetchChangeOrder={refetchChangeOrder}
            changeOrderView={changeOrderView}
            selectedProjectData={selectedProjectData}
          />
        ) : (
          <></>
        )}
      </Stack>
    </>
  );
};

export default WorkOrderButtons;
