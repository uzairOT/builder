import {
  Button,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import { useSelector } from "react-redux";
import { useProjectPermissionCheck } from "../../Projects/ProjectPermissions/ProjectsPermissionCheck";
import { useLocation } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import SendIcon from "@mui/icons-material/Send";
import actionButton from "../../UI/actionButton";
import AddIcon from "@mui/icons-material/Add";
import { buttonBox } from "./stylingObjects";

//HEADER BUTTONS
const InitialProposalButtons = ({
  handleChangeOpen,
  handleWorkOpen,
  isLoading,
  handleAddPhase,
  handleEditPhase,
  handleSendApproval,
  handleOpenModal,
  isLoadingSendApproval,
}) => {
  const location = useLocation();
  const theme = useTheme();
  const downView = useMediaQuery(theme.breakpoints.down("lg"));
  const mobileView = useMediaQuery(theme.breakpoints.down("md"));
  const currentRoute = location.pathname;
  const initialPhases = useSelector(
    (state) => state.projectInitialProposal.initialPhases
  );

  const permissionsState = useSelector(
    (state) => state?.permissions?.permissions
  );
  const changeOrderPermission = useProjectPermissionCheck(
    "change-order",
    permissionsState
  );
  const projectManagementPermission = useProjectPermissionCheck(
    "project-management",
    permissionsState,
    currentRoute
  );
  const ProjectApprovalSendPermission = useProjectPermissionCheck(
    "project-approval",
    permissionsState
  );
  const workOrderPermission = useProjectPermissionCheck(
    "work-order",
    permissionsState
  );
  // checks
  const initalApproved = initialPhases?.[0]?.[0]?.status === "approved";
  const initialLengthZero =
    initialPhases?.[0]?.length === 0 || initialPhases?.length === 0;
  const initalUnapprovedPendingDeclined =
    initialPhases?.[0]?.[0]?.status === "not approved" ||
    initialPhases?.[0]?.[0]?.status === "declined" ||
    initialPhases?.[0]?.[0]?.status === "pending";
  const initalUnapprovedDeclined =
    initialPhases?.[0]?.[0]?.status === "not approved" ||
    initialPhases?.[0]?.[0]?.status === "declined";
  const initialPending = initialPhases?.[0]?.[0]?.status === "pending";
  return (
    <>
      <>
        {initalApproved && (
          <>
            <Stack direction={"row"} sx={buttonBox}>
              <Tooltip
                title={
                  changeOrderPermission
                    ? ""
                    : "You don't have permission to access this feature"
                }
                arrow
              >
                <span>
                  <BuilderProButton
                    disabled={!changeOrderPermission}
                    backgroundColor={"#FFAC00"}
                    variant={"contained"}
                    fontFamily={"var(--main-font-family)"}
                    fontSize={{ lg: "16px", xs: "11px" }}
                    fontWeight={"600"}
                    padding={{
                      sm: "6px 32px 6px 32px",
                      xs: "5px 20px 5px 20px",
                    }}
                    handleOnClick={handleChangeOpen}
                  >
                    Change Order
                  </BuilderProButton>
                </span>
              </Tooltip>

              <Tooltip
                title={
                  workOrderPermission
                    ? ""
                    : "You don't have permission to access this feature"
                }
                arrow
              >
                <span>
                  <BuilderProButton
                    disabled={!workOrderPermission}
                    backgroundColor={"#FFAC00"}
                    variant={"contained"}
                    fontFamily={"var(--main-font-family)"}
                    fontSize={{ lg: "16px", xs: "11px" }}
                    fontWeight={"600"}
                    padding={{
                      sm: "6px 32px 6px 32px",
                      xs: "5px 20px 5px 20px",
                    }}
                    handleOnClick={handleWorkOpen}
                  >
                    Work Order
                  </BuilderProButton>
                </span>
              </Tooltip>
            </Stack>
          </>
        )}

        {initalUnapprovedPendingDeclined || initialLengthZero ? (
          <Stack direction={"row"} sx={buttonBox}>
            {(initalUnapprovedDeclined || initialLengthZero) && (
              <>
                <Tooltip
                  title={
                    projectManagementPermission
                      ? ""
                      : "You don't have permission to access this feature"
                  }
                  arrow
                >
                  <span>
                    <Button
                      disabled={!projectManagementPermission}
                      sx={{
                        ...actionButton,
                        padding: { lg: "0.75rem 1.5rem" },
                        background: "#FFAC00",
                        whiteSpace: "nowrap",
                        height:
                          initialLengthZero || isLoading ? "4rem" : "2.375rem",
                        display: isLoading ? "none" : "flex",
                        fontSize:
                          initialLengthZero || isLoading ? "24px" : "18px",
                        width:
                          initialLengthZero || isLoading
                            ? "300px"
                            : downView
                            ? "40px"
                            : "150px",
                        height:
                          initialLengthZero || isLoading ? "50px" : "40px",
                      }}
                      onClick={handleAddPhase}
                    >
                      {downView && <AddIcon />}
                      {downView ? (mobileView ? "" : "Add") : "Add Phase"}
                    </Button>
                  </span>
                </Tooltip>
                <Tooltip
                  title={
                    projectManagementPermission
                      ? ""
                      : "You don't have permission to access this feature"
                  }
                  arrow
                >
                  <span>
                    <Button
                      disabled={!projectManagementPermission}
                      sx={{
                        ...actionButton,
                        display:
                          initialLengthZero || isLoading ? "none" : "flex",
                        fontSize: { lg: "18px", xs: "11px" },
                      }}
                      startIcon={
                        <ModeEditOutlinedIcon
                          sx={{ marginLeft: { md: "0px", xs: "12px" } }}
                        />
                      }
                      onClick={handleEditPhase}
                    >
                      <Typography
                        sx={{
                          fontFamily: "var(--main-font-family)",
                          fontSize: { lg: "18px", xs: "11px" },
                          display: { md: "block", xs: "none" },
                        }}
                      >
                        Edit
                      </Typography>
                    </Button>
                  </span>
                </Tooltip>

                <Tooltip
                  title={
                    projectManagementPermission
                      ? ""
                      : "You don't have permission to access this feature"
                  }
                  arrow
                >
                  <span>
                    <Button
                      disabled={!projectManagementPermission}
                      sx={{
                        ...actionButton,
                        display:
                          initialLengthZero || isLoading ? "none" : "flex",
                        fontSize: { lg: "18px", xs: "11px" },
                      }}
                      startIcon={
                        <DeleteOutlinedIcon
                          sx={{ marginLeft: { md: "0px", xs: "12px" } }}
                        />
                      }
                      onClick={handleOpenModal}
                    >
                      <Typography
                        sx={{
                          fontFamily: "var(--main-font-family)",
                          fontSize: { lg: "18px", xs: "11px" },
                          display: { md: "block", xs: "none" },
                        }}
                      >
                        Delete
                      </Typography>
                    </Button>
                  </span>
                </Tooltip>
              </>
            )}

            <Tooltip
              title={
                ProjectApprovalSendPermission
                  ? ""
                  : "You don't have permission to access this feature"
              }
              arrow
            >
              <span>
                <Button
                  onClick={handleSendApproval}
                  startIcon={
                    <SendIcon sx={{ marginLeft: { md: "0px", xs: "12px" } }} />
                  }
                  sx={{
                    ...actionButton,
                    display: initialLengthZero || isLoading ? "none" : "flex",
                  }}
                  disabled={
                    !ProjectApprovalSendPermission ||
                    initialPending ||
                    isLoadingSendApproval
                  }
                >
                  <Typography
                    sx={{
                      fontFamily: "var(--main-font-family)",
                      fontSize: { lg: "18px", xs: "11px" },
                      display: { md: "block", xs: "none" },
                    }}
                  >
                    {initialPending ? "Pending" : "Send Approval"}
                  </Typography>
                </Button>
              </span>
            </Tooltip>
          </Stack>
        ) : (
          <></>
        )}
      </>
    </>
  );
};

export default InitialProposalButtons;
