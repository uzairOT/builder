import { Button, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useProjectPermissionCheck } from "../../Projects/ProjectPermissions/ProjectsPermissionCheck";
import actionButton from "../../UI/actionButton";
import AddIcon from "@mui/icons-material/Add";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ChangeOrderRequestModal from "../../dialogues/ChangeOrderRequestModal/ChangeOrderRequestModal";
import { useTranslation } from "react-i18next";
const DefaultButtons = ({ authUserRole, view, isLoading, handleAddPhase, handleGenAiDialogue, handleEditPhase, handleOpenModal, rowCheckboxes, adminProjectView , setRowCheckboxes, fetchData, refetchChangeOrder, changeOrderView, selectedProjectData}) => {
  const location = useLocation();
  const pathCheck = location.pathname;
  const { t } = useTranslation();
  const theme = useTheme();
  const downView = useMediaQuery(theme.breakpoints.down("lg"));
  const phases = useSelector((state) => state.projectInitialProposal.phases);
  const mobileView = useMediaQuery(theme.breakpoints.down("md"));
  const permissionsState = useSelector(
    (state) => state?.permissions?.permissions
  );
  const projectManagementPermission = useProjectPermissionCheck(
    "project-management",
    permissionsState,
    pathCheck
  );
  const phaseLengthZero =  phases[0]?.length < 1

  //ONLY THESE USERS ARE ALLOW TO SEE THE BUTTONS
  const userRoleCheck =
    authUserRole === "superadmin" ||
    authUserRole === "" ||
    authUserRole === "projectManager" ||
    authUserRole === "admin"||
    authUserRole === "client";

  return (
    <>
      {userRoleCheck && (
        <Stack direction={"row"} justifyContent={'center'} alignItems={'center'} gap={0.5} sx={{ padding: {
            //changes
            lg: "0.5rem 2rem",
            md: "0.1rem 0rem",
            sm: "1rem 2rem",
            xs: "0rem 0.10rem",
          },}}  >
          {view === t("ProjectInitialProposal.title2") && pathCheck.includes("initial-proposal") ? (
            <></>
          ) : (
            <>
            <Stack direction={'row'} justifyContent={'center'} alignItems={"center"} gap={0.5}>
              <Tooltip
                title={
                  projectManagementPermission ? "" : t("PermisionsMessage.noPermission")
                }
                arrow
              >
                <Stack justifyContent={'center'} alignItems={'center'}>
                  <Button
                    disabled={!projectManagementPermission}
                    sx={{
                      ...actionButton,
                      whiteSpace: "nowrap",
                      background: "#FFAC00",
                      height: 'initial',
                      fontSize:
                       phaseLengthZero || isLoading
                          ? "40px"
                          : { lg: "18px", xs: "16px" },
                      display: isLoading ? "none" : "flex",
                    }}
                    onClick={handleAddPhase}
                  >
                    {downView && !(phaseLengthZero) && <AddIcon />}
                    <Typography p={{md:2, xs:0}} sx={{   fontSize:
                       phaseLengthZero || isLoading
                          ? { xl: "40px",lg: "32px", md:'28px', xs: "16px" }
                          : { lg: "18px", xs: "16px" },}}>
                    {downView
                      ?phaseLengthZero
                        ? t("ProjectWorkOrder.button3")
                        : mobileView
                        ? ""
                        : t("ProjectWorkOrder.button4")
                      : t("ProjectWorkOrder.button3")}
                      </Typography>
                  </Button>
                </Stack>
              </Tooltip>
              <Tooltip
                title={
                  projectManagementPermission ? "" : t("PermisionsMessage.noPermission")
                }
                arrow
              >

              </Tooltip>
              {view !== t("ProjectInitialProposal.title2") &&<Stack justifyContent={'center'} alignItems={'center'}>
                  <Button
                    disabled={!projectManagementPermission}
                    sx={{
                      ...actionButton,
                      whiteSpace: "nowrap",
                      background: "#FFAC00",
                      height:'intial',
                    
                    //   height:
                    //    phaseLengthZero || isLoading ? "90px" : "40px",
                      display: isLoading ? "none" : "flex",
                    }}
                    onClick={handleGenAiDialogue}
                  >
                    {downView && !(phaseLengthZero) && <AutoAwesomeIcon />}
                    <Typography p={{md:2, xs:0}} sx={{   fontSize:
                       phaseLengthZero || isLoading
                          ? { xl: "40px",lg: "32px", md:'28px', xs: "16px" }
                          : { lg: "18px", xs: "16px" },}}>
                    {downView
                      ? phaseLengthZero
                      ? t("ProjectWorkOrder.button5")
                      : mobileView
                      ? ""
                      : t("ProjectWorkOrder.button6")
                      : t("ProjectWorkOrder.button5")}
                      </Typography>
                  </Button>
                </Stack>}
              </Stack>
              <Tooltip
                title={
                  projectManagementPermission ? "" : t("PermisionsMessage.noPermission")
                }
                arrow
              >
                <span>
                  <Button
                    disabled={!projectManagementPermission}
                    sx={{
                      ...actionButton,
                      display:
                       phaseLengthZero || isLoading ? "none" : "flex",
                      fontSize: { lg: "18px", xs: "11px" },
                      alignSelf: "end"
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
                      {t("ProjectInitialProposal.button1")}
                    </Typography>
                  </Button>
                </span>
              </Tooltip>
              {view !== t("ProjectInitialProposal.title2") && (
                <Tooltip
                  title={
                    projectManagementPermission ? "" : t("PermisionsMessage.noPermission")
                  }
                  arrow
                >
                  <span>
                    <Button
                      disabled={!projectManagementPermission}
                      sx={{
                        ...actionButton,
                        display:
                         phaseLengthZero || isLoading ? "none" : "flex",
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
                        {t("ProjectInitialProposal.button2")}
                      </Typography>
                    </Button>
                  </span>
                </Tooltip>
              )}
            </>
          )}
          {adminProjectView && !mobileView ? (
            <ChangeOrderRequestModal
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
      )}
    </>
  );
};

export default DefaultButtons;
