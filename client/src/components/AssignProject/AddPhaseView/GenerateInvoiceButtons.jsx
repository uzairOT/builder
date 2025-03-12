import { Button, Stack, Tooltip } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useProjectPermissionCheck } from "../../Projects/ProjectPermissions/ProjectsPermissionCheck";
import { buttonBox } from "./stylingObjects";
import actionButton from "../../UI/actionButton";
import { useTranslation } from "react-i18next";

//HEADER BUTTONS
const GenerateInvoiceButtons = ({handleGenerateInvoice}) => {
  const { t } = useTranslation();
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
              : t("ProjectInvoices.noPermission")
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
              {t("ProjectInvoices.title1")}
            </Button>
          </span>
        </Tooltip>
      </Stack>
    </>
  );
};

export default GenerateInvoiceButtons;
