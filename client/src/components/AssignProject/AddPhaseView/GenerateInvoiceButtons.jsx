import { Button, Stack, Tooltip } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useProjectPermissionCheck } from "../../Projects/ProjectPermissions/ProjectsPermissionCheck";
import { buttonBox } from "./stylingObjects";
import actionButton from "../../UI/actionButton";

//HEADER BUTTONS
const GenerateInvoiceButtons = ({handleGenerateInvoice}) => {
  const permissionsState = useSelector(
    (state) => state?.permissions?.permissions
  );

  const GenerateInvoicePermission = useProjectPermissionCheck(
    "generate-invoice",
    permissionsState
  );

  return (
    <>
      <Stack direction={"row"} sx={buttonBox}>
        <Tooltip
          title={
            GenerateInvoicePermission
              ? ""
              : "You don't have permission to access this feature"
          }
          arrow
        >
          <span>
            <Button
              disabled={!GenerateInvoicePermission}
              sx={{ ...actionButton }}
              style={{
                color: "white"
              }}
              onClick={handleGenerateInvoice}
            >
              Generate Invoice
            </Button>
          </span>
        </Tooltip>
      </Stack>
    </>
  );
};

export default GenerateInvoiceButtons;
