import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Stack,
  Typography,
  Box,
  Modal,
  Container,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SendIcon from "@mui/icons-material/Send";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import PhaseCard from "../AddPhaseCard/AddPhaseCard";
import actionButton from "../../UI/actionButton";
import { useDeleteProjectPhaseMutation } from "../../../redux/apis/Project/projectApiSlice";
import { useDispatch, useSelector } from "react-redux";
import UpdatePhaseDialogue from "../../dialogues/UpdatePhaseDialogue/UpdatePhaseDialogue";
import AddPhaseDialogue from "../../dialogues/AddPhaseDialogue/AddPhaseDialogue";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useRef } from "react";
import generatePDF from "react-to-pdf";
import {
  addInitialPhase,
  addPhase,
} from "../../../redux/slices/Project/projectInitialProposal";
import RequestWorkOrderModal from "../../dialogues/RequestWorkOrder/RequestWorkOrderModal";
import { selectAddPhase } from "../../../redux/slices/addPhaseSlice";
import axios from "axios";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getTokenFromLocalStorage } from "../../../redux/apis/apiSlice";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import GenerateInvoiceTable from "../../dialogues/GenerateInvoice/GenerateInvoiceTable";
import GenerateInvoicePopup from "../../dialogues/GenerateInvoice/GenerateInvoicePopup";
import ShareModal from "../../dialogues/ShareModal/ShareModal";
import GenerateInvoiceDone from "../../dialogues/GenerateInvoice/GenerateInvoiceDone";
import {
  selectWorkOrderDeclineRecall,
  toggleWorkOrderDeclineRecall,
} from "../../../redux/slices/Notifications/notificationSlice";
// import { BuilderProNavbarLogo } from "./assets/svgs/builder-pro-logo-navbar.svg";
import BuilderProNavbarLogo from "../../Navbar/assets/svgs/builder-pro-logo-navbar.svg";
import GenerateInvoice from "../../dialogues/GenerateInvoice/GenerateInvoice";
import AreYouSureModal from "../../dialogues/AreYouSureModal/AreYouSureModal";
import AddIcon from "@mui/icons-material/Add";
import { usePermissionCheck } from "../../Settings/PermissionAccess/PermissionCheck";
import { socket } from "../../../socket";
import { useProjectPermissionCheck } from "../../Projects/ProjectPermissions/ProjectsPermissionCheck";
//import "react-toastify/dist/ReactToastify.css";

function AddPhaseView({
  // changeOrderSelected,
  adminProjectView,
  view,
  projectId,
  InitialProposalView,
  authUserRole,
  refetchChangeOrder,
  changeOrder,
  changeOrderView,
  InitialProposalAndChange,
  changeOrderSelectedView,
  handleUpdateOpen : hanldeEditChangeLineItem,
  handleAddOpen: handleAddChangeLineItem,
  handleDeleteOpen: handleDeleteChangeLineItem
  // canGenerate
}) {
  const [cardPhase, setCardPhase] = useState([]);
  const [invoiceData, setInvoiceData] = useState();
  const [selectedPhaseId, setSelectedPhaseId] = useState(null);
  const [selectedPhaseData, setSelectedPhaseData] = useState(null);
  const user = useSelector((state) => state.auth.userInfo);
  const userId = user.user.id;
  const { id } = useParams();
  const [deleteProjectPhase, { isDeletePhaseLoading }] =
    useDeleteProjectPhaseMutation();
  const phases = useSelector((state) => state.projectInitialProposal.phases);
  const targetRef = useRef();
  const theme = useTheme();
  const downView = useMediaQuery(theme.breakpoints.down("lg"));
  const mobileView = useMediaQuery(theme.breakpoints.down("md"));
  const [openModal, setOpenModal] = useState(false);
  const initialPhases = useSelector(
    (state) => state.projectInitialProposal.initialPhases
  );
  const [showUpdatePhaseDialogue, setShowUpdatePhaseDialogue] = useState(false);
  const [showAddPhaseDialogue, setShowAddPhaseDialogue] = useState(false);
  const [rowCheckboxes, setRowCheckboxes] = useState({}); // State to track the checked state of each checkbox in the table rows
  const location = useLocation();
  const pathCheck = location.pathname;
  const changeOrderSelected = useSelector(
    (state) => state.projectInitialProposal.changeOrderLineItems
  );
  //console.log("Selected Checked Data", changeOrderSelected);

  const dispatch = useDispatch();

  const toggleWorkOrderDeclineRecall1 = useSelector(
    selectWorkOrderDeclineRecall
  );

  const [isLoading, setIsLoading] = useState(changeOrderSelected ? false : true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [generateInvoice, setGenerateInvoice] = useState(false);
  const [shareToClient, setShareToClient] = useState(false);
  const [done, setDone] = useState(false);


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleInvoicePrint = () => {
    generatePDF(targetRef, { filename: "page.pdf" });
    //console.log("Invoice Generated Successfully");
  };
  const fetchData = async () => {
    if(changeOrderSelectedView){
      return;
    }
    setIsLoading(true);
    setSelectedPhaseId(null);
    if (projectId === null) {
      return;
    } else if (adminProjectView) {
      if (InitialProposalView) {
        try {
          const response = await axios.get(
            `http://3.135.107.71/project/getInitialPhases/${id}`,
            {
              headers: {
                Authorization: `Bearer ${getTokenFromLocalStorage()}`,
              },
            }
          );

          dispatch(addInitialPhase(response.data.phases));
        } catch (error) {
          setError(error);
        }
      } else {
        try {
          //console.log("fetching data...");
          const response = await axios.get(
            `http://3.135.107.71/project/getPhases/${id}`,
            {
              headers: {
                Authorization: `Bearer ${getTokenFromLocalStorage()}`,
              },
            }
          );
          //console.log(response);

          dispatch(addPhase(response.data.phases));
        } catch (error) {
          setError(error);
        }
      }
      setIsLoading(false);
    } else {
      try {
        const response = await axios.get(
          `http://3.135.107.71/project/getPhases/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${getTokenFromLocalStorage()}`,
            },
          }
        );
        //console.log(response);

        dispatch(addPhase(response.data.phases));
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    //console.log("UserEffect run");
    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, [projectId, toggleWorkOrderDeclineRecall1]);

  const handleAddRow = () => {
    fetchData();
  };

  const handleSendApproval = () => {
    const sentBy = userId;
    socket.emit("sendApprovalNotification", { projectId, sentBy }, (data) => {
      toast(data?.message, {
        className:
          data?.success === true
            ? "toast-success"
            : data?.success === false
            ? "toast-error"
            : "toast-default",
      });
      dispatch(toggleWorkOrderDeclineRecall());
    });
  };

  // console.log(projectId);

  const handleGridToggle = (currentIndex, previousIndex) => {
    // Ensure indices are within the valid range
    if (
      currentIndex < 0 ||
      currentIndex >= cardPhase.length ||
      previousIndex < 0 ||
      previousIndex >= cardPhase.length
    ) {
      //console.log("click", currentIndex, previousIndex, cardPhase);
      return;
    }

    const updatedCardPhase = [...cardPhase];

    // For the first card, handle replacement differently
    if (currentIndex === 0) {
      // Replace the position of the first card with the second card
      updatedCardPhase[currentIndex] = {
        ...cardPhase[previousIndex],
        currentIndex: currentIndex,
      };
      updatedCardPhase[previousIndex] = {
        ...cardPhase[currentIndex],
        currentIndex: previousIndex,
      };
    } else {
      // Replace the position of the clicked phase card with the add phase card
      updatedCardPhase[currentIndex] = {
        ...cardPhase[previousIndex],
        currentIndex: currentIndex,
      };
      updatedCardPhase[previousIndex] = {
        ...cardPhase[currentIndex],
        currentIndex: previousIndex,
      };
    }

    // Update the state with the modified array
    setCardPhase(updatedCardPhase);
  };

  const handleEditPhase = () => {
    if (selectedPhaseId) {
      setShowUpdatePhaseDialogue(true);
    } else {
      toast.info("Please Select a Phase");
    }
  };

  const handleUpdateOpen = () => {
    setShowUpdatePhaseDialogue(true);
  };

  const handleUpdateClose = () => {
    setShowUpdatePhaseDialogue(false);
  };

  const handleAddPhase = () => {
    setShowAddPhaseDialogue(true);
  };
  const handleGenerateInvoice = () => {
    if (Object.keys(rowCheckboxes).length < 1) {
      toast.warn("Please select a line item.", { toastId: "Inovice toast" });
      return;
    }
    //console.log("InvoiceGenerated");
    setDone(false);
    setGenerateInvoice(true);
    handleOpen();
  };
  const handleAddOpen = () => {
    setShowAddPhaseDialogue(true);
  };

  const handleAddClose = () => {
    setShowAddPhaseDialogue(false);
  };

  const handleSelectCard = (id) => {
    if (selectedPhaseId === id) {
      setSelectedPhaseId(null);
    } else {
      setSelectedPhaseId(id);
      if (InitialProposalView) {
        const selectedPhase = initialPhases[0]?.find(
          (phase) => phase.id === id
        );
        setSelectedPhaseData(selectedPhase);
      } else {
        const selectedPhase = phases[0]?.find((phase) => phase.id === id);
        setSelectedPhaseData(selectedPhase);
      }
      //console.log(selectedPhase);
    }
  };

  const handleOpenModalClose = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    if (selectedPhaseId) {
      setOpenModal(true);
    } else {
      toast.info("Please Select a Phase");
    }
  };
  const handlePhaseDelete = (isDelete) => {
    if (isDelete) {
      handleDeletePhase();
    } else {
      handleOpenModalClose();
    }
  };
  const handleDeletePhase = async () => {
    //console.log('clicked!')

    //console.log('in IF statement ', selectedPhaseId)
    await deleteProjectPhase({ id: selectedPhaseId });
    const updatedCardPhase = cardPhase.filter(
      (card) => card.id !== selectedPhaseId
    );
    setCardPhase(updatedCardPhase);
    //console.log(updatedCardPhase);
    setSelectedPhaseId(null);
    setSelectedPhaseData(null);
    fetchData();
    handleOpenModalClose();
  };

  const handleAddSubmit = (phaseName, color) => {
    setShowAddPhaseDialogue(false);
  };

  const handleUpdateSubmit = (phaseName, color, selectedPhaseData) => {
    const updatedPhaseData = {
      ...selectedPhaseData,
      phaseName: phaseName,
      color: color,
    };

    const updatedCardPhase = cardPhase.map((phase) => {
      if (phase.id === selectedPhaseData.id) {
        return updatedPhaseData;
      }
      return phase;
    });

    setCardPhase(updatedCardPhase);
    setSelectedPhaseData(updatedPhaseData);
    setShowUpdatePhaseDialogue(false);
    fetchData();
  };
  // console.log(
  //   "This is rowCheckboxes lenght",
  //   Object.keys(rowCheckboxes).length < 1
  // );
  // console.log("rows", rowCheckboxes);
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  // const permissionsState = useSelector((state) => state?.permissions?.permissions);
  // console.log("Permissions Test", permissionsState)


  const permissionsState = useSelector((state) => state?.permissions?.permissions);
  const ProjectApprovalSendPermission =
    useProjectPermissionCheck("project-approval", permissionsState);
  
  return (
    <>
      <Grid container sx={{ ...firstGrid, width: "100%" }}>
        <Stack
          direction={"row"}
          justifyContent={view ? "space-between" : "center"}
          sx={{ borderBottom: "2px solid rgba(0, 0, 0, 0.2)", borderRadius: 1 }}

          // sx={{ width: "100%" }}
        >
          <Stack sx={{ justifyContent: "center" }}>
            {adminProjectView && (
              <Typography
                // pl={3}
                // pt={1}
                color={"#4C8AB1"}
                fontFamily={"var(--main-font-family)"}
                fontSize={{
                  xl: "22px",
                  lg: "15px",
                  md: "15px",
                  sm: "14px",
                  xs: "13px",
                }}
                fontWeight={"600"}
              >
                {view}
              </Typography>
            )}
          </Stack>
          {view === "Initial Proposal" ? (
            <>
              <>
                {initialPhases?.[0]?.[0]?.status === "not approved" ||
                initialPhases?.[0]?.[0]?.status === "declined" ||
                initialPhases?.[0]?.[0]?.status === "pending" ? (
                  <Stack direction={"row"} sx={buttonBox}>
                    {(initialPhases?.[0]?.[0]?.status === "not approved" ||
                      initialPhases?.[0]?.[0]?.status === "declined") && (
                      <>
                        <Button
                          sx={{
                            ...actionButton,
                            padding: { lg: "0.75rem 1.5rem" },
                            background: "#FFAC00",
                            whiteSpace: "nowrap",
                            height:
                              initialPhases[0]?.length < 1 || isLoading
                                ? "4rem"
                                : "2.375rem",
                            display: isLoading ? "none" : "flex",
                            fontSize:
                              initialPhases[0]?.length < 1 || isLoading
                                ? "24px"
                                : "18px",
                            width:
                              initialPhases[0]?.length < 1 || isLoading
                                ? "300px"
                                : downView
                                ? "40px"
                                : "150px",
                            height:
                              initialPhases[0]?.length < 1 || isLoading
                                ? "50px"
                                : "40px",
                          }}
                          onClick={handleAddPhase}
                        >
                          {downView && <AddIcon />}
                          {downView ? (mobileView ? "" : "Add") : "Add Phase"}
                        </Button>
                        <Button
                          sx={{
                            ...actionButton,
                            display:
                              initialPhases[0]?.length < 1 || isLoading
                                ? "none"
                                : "flex",
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
                        <Button
                          sx={{
                            ...actionButton,
                            display:
                              initialPhases[0]?.length < 1 || isLoading
                                ? "none"
                                : "flex",
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
                            <SendIcon
                              sx={{ marginLeft: { md: "0px", xs: "12px" } }}
                            />
                          }
                          sx={{
                            ...actionButton,
                            display:
                              initialPhases[0]?.length < 1 || isLoading
                                ? "none"
                                : "flex",
                          }}
                          disabled={
                            !ProjectApprovalSendPermission ||
                            initialPhases?.[0]?.[0]?.status === "pending"
                          }
                        >
                          <Typography
                            sx={{
                              fontFamily: "var(--main-font-family)",
                              fontSize: { lg: "18px", xs: "11px" },
                              display: { md: "block", xs: "none" },
                            }}
                          >
                            {initialPhases?.[0]?.[0]?.status === "pending"
                              ? "Pending"
                              : "Send Approval"}
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
          ) : view === "Generate Invoice" ? (
            <>
              {/* {canGenerate &&  */}
              <Stack direction={"row"} sx={buttonBox}>
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
                      sx={{ ...actionButton }}
                      style={{
                        color:
                          Object.keys(rowCheckboxes).length < 1
                            ? "white"
                            : "white",
                      }}
                      onClick={handleGenerateInvoice}
                    >
                      Generate Invoice
                    </Button>
                  </span>
                </Tooltip>
              </Stack>
              {/* } */}
            </>
          ) : (
            <>
              {(authUserRole === "superadmin" ||
                authUserRole === "" ||
                authUserRole === "projectManager" ||
                authUserRole === "admin") && (
                <Stack direction={"row"} sx={buttonBox}>
                  {view === "Change Order" &&
                  pathCheck.includes("initial-proposal") ? (
                    <></>
                  ) : (
                    <>
                      <Button
                        sx={{
                          ...actionButton,
                          whiteSpace: "nowrap",
                          background: "#FFAC00",
                          fontSize:
                            phases[0]?.length < 1 || isLoading
                              ? "40px"
                              : { lg: "18px", xs: "12px" },
                          width:
                            phases[0]?.length < 1 || isLoading
                              ? downView
                                ? "300px"
                                : "450px"
                              : downView
                              ? "40px"
                              : "130px",
                          height:
                            phases[0]?.length < 1 || isLoading
                              ? "90px"
                              : "40px",
                          display: isLoading ? "none" : "flex",
                        }}
                        onClick={handleAddPhase}
                      >
                        {downView && !(phases[0]?.length < 1) && <AddIcon />}
                        {downView
                          ? phases[0]?.length < 1
                            ? "Add Phase"
                            : mobileView
                            ? ""
                            : "Add"
                          : "Add Phase"}
                      </Button>
                      <Button
                        sx={{
                          ...actionButton,
                          display:
                            phases[0]?.length < 1 || isLoading
                              ? "none"
                              : "flex",
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
                      <Button
                        sx={{
                          ...actionButton,
                          display:
                            phases[0]?.length < 1 || isLoading
                              ? "none"
                              : "flex",
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
                    </>
                  )}
                  {/* <Button
                    startIcon={
                      <SendIcon
                        sx={{ marginLeft: { md: "0px", xs: "12px" } }}
                      />
                    }
                    sx={{
                      ...actionButton,
                      display:
                        phases[0]?.length < 1 || isLoading ? "none" : "flex",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "var(--main-font-family)",
                        fontSize: { lg: "18px", xs: "11px" },
                        display: { md: "block", xs: "none" },
                      }}
                    >
                      Send Approval
                    </Typography>
                  </Button> */}

                  {adminProjectView && !mobileView ? (
                    <RequestWorkOrderModal
                      rowCheckboxes={rowCheckboxes}
                      setRowCheckboxes={setRowCheckboxes}
                      phases={phases}
                      fetchData={fetchData}
                      refetchChangeOrder={refetchChangeOrder}
                      changeOrderView={changeOrderView}
                    />
                  ) : (
                    <></>
                  )}
                </Stack>
              )}
            </>
          )}
        </Stack>
        {view !== "Initial Proposal" &&
          (authUserRole === "superadmin" ||
            authUserRole === "" ||
            authUserRole === "projectManager" ||
            authUserRole === "admin") &&
          adminProjectView &&
          mobileView && (
            <Stack justifyContent={"center"} alignItems={"center"} py={1}>
              {" "}
              <RequestWorkOrderModal
                rowCheckboxes={rowCheckboxes}
                setRowCheckboxes={setRowCheckboxes}
                phases={phases}
                fetchData={fetchData}
                refetchChangeOrder={refetchChangeOrder}
                changeOrderView={changeOrderView}
              />
            </Stack>
          )}
        {isLoading ? (
          <Stack
            height={"44vh"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CircularProgress />
          </Stack>
        ) : (
          <>
            {InitialProposalView ? (
              <Box
                sx={{
                  height: "calc(60vh - 140px)",
                  ...themeStyle.scrollable,
                  width: {
                    xl: "100%",
                    lg: "100%",
                    md: "100%",
                    sm: "100%",
                    xs: "95vw",
                  },
                }}
              >
                {initialPhases !== null &&
                initialPhases[0] !== undefined &&
                initialPhases[0].length !== 0 &&
                !isLoading ? (
                  initialPhases[0]?.map((phase, index) => {
                    // console.log("inital",view)
                    return (
                      <Stack
                        key={phase.id}
                        style={{
                          ...slectedCardStyle,
                          // width: "100%",
                          cursor: "pointer", // Add cursor pointer to indicate clickable
                          borderRadius: "8px", // Rounded corners
                          boxShadow:
                            selectedPhaseId === phase.id
                              ? `0 0 0 2px #1B1B1B, 0 5px 20px ${phase.color}`
                              : "none", // Border and glow effect
                          transition: "background-color 0.3s, box-shadow 0.3s", // Smooth transition
                          marginTop: "1rem",
                          // padding:5,
                          marginRight: "1rem",
                          marginLeft: "1rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <PhaseCard
                          projectId={adminProjectView ? id : projectId}
                          key={phase?.id}
                          phaseData={phase}
                          length={phase.length}
                          onGridToggle={() =>
                            handleGridToggle(index, phase?.previousIndex)
                          }
                          handleSelectCard={handleSelectCard}
                          adminProjectView={adminProjectView}
                          setRowCheckboxes={setRowCheckboxes}
                          handleAddRow={handleAddRow}
                          InitialProposalView={InitialProposalView}
                          authUserRole={authUserRole}
                          rowCheckboxes={rowCheckboxes}
                        />
                      </Stack>
                    );
                  })
                ) : (
                  <div
                    style={{
                      height: "44vh",
                      alignItems: "center",
                      display: "grid",
                      textAlign: "center",
                    }}
                  >
                    No Phases Available
                  </div>
                )}
              </Box>
            ) : changeOrderSelectedView ? (
              <Box
                sx={{
                  height: "calc(93vh - 400px)",
                  ...themeStyle.scrollable,
                  width: {
                    xl: "100%",
                    lg: "100%",
                    md: "100%",
                    sm: "100%",
                    xs: "95vw",
                  },
                }}
              >
                {changeOrderSelected !== null &&
                changeOrderSelected !== undefined &&
                changeOrderSelected.length !== 0 &&
                !isLoading ? (
                  changeOrderSelected?.map((phase, index) => {
                    // console.log("inital",view)
                    return (
                      <Stack
                        key={phase.id}
                        style={{
                          ...slectedCardStyle,
                          width: "100%",
                          cursor: "pointer", // Add cursor pointer to indicate clickable
                          borderRadius: "8px", // Rounded corners
                          boxShadow:
                            selectedPhaseId === phase.id
                              ? `0 0 0 2px #1B1B1B, 0 5px 20px ${phase.color}`
                              : "none", // Border and glow effect
                          transition: "background-color 0.3s, box-shadow 0.3s", // Smooth transition
                          marginTop: "1rem",
                          // padding:5,
                          marginRight: "1rem",
                          marginLeft: "1rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <PhaseCard
                          hanldeEditChangeLineItem={hanldeEditChangeLineItem}
                          projectId={adminProjectView ? id : projectId}
                          key={phase?.id}
                          phaseData={phase}
                          length={phase.length}
                          onGridToggle={() =>{}}
                          handleSelectCard={() =>{}}
                          adminProjectView={adminProjectView}
                          setRowCheckboxes={setRowCheckboxes}
                          handleAddRow={handleAddRow}
                          changeOrderSelectedView={changeOrderSelectedView}
                          authUserRole={authUserRole}
                          rowCheckboxes={rowCheckboxes}
                          handleAddChangeLineItem={handleAddChangeLineItem}
                          handleDeleteChangeLineItem={handleDeleteChangeLineItem}
                        />
                      </Stack>
                    );
                  })
                ) : (
                  <div
                    style={{
                      height: "44vh",
                      alignItems: "center",
                      display: "grid",
                      textAlign: "center",
                    }}
                  >
                    No Phases Available
                  </div>
                )}
              </Box>
            ): (
              <Box
                sx={{
                  height: adminProjectView
                    ? view === "Generate Invoice"
                      ? "calc(93vh - 140px)"
                      : "calc(92vh - 300px)"
                    : "",
                  ...themeStyle.scrollable,
                  width: {
                    xl: "100%",
                    lg: "100%",
                    md: "100%",
                    sm: "100%",
                    xs: "95vw",
                  },
                }}
              >
                {phases !== null &&
                phases[0] !== undefined &&
                phases[0].length !== 0 &&
                !isLoading ? (
                  phases[0]?.map((phase, index) => {
                    //console.log("PHASE", phase.status);
                    if (
                      view === "Work Order" &&
                      (phase.status === "pending" ||
                        phase.status === "not approved" ||
                        phase.status === "declined")
                    ) {
                      return <></>;
                    }
                   
                    if (InitialProposalAndChange && phase.initial) {
                      return <></>;
                    }
                    return (
                      <Stack
                        key={phase.id}
                        style={{
                          ...slectedCardStyle,
                          // width: "100%",
                          cursor: "pointer", // Add cursor pointer to indicate clickable
                          borderRadius: "8px", // Rounded corners
                          boxShadow:
                            selectedPhaseId === phase.id
                              ? `0 0 0 2px #1B1B1B, 0 5px 20px ${phase.color}`
                              : "none", // Border and glow effect
                          transition: "background-color 0.3s, box-shadow 0.3s", // Smooth transition
                          marginTop: "1rem",
                          marginRight: "1rem",
                          marginLeft: "1rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <PhaseCard
                          projectId={adminProjectView ? id : projectId}
                          key={phase?.id}
                          phaseData={phase}
                          length={phase.length}
                          onGridToggle={() =>
                            handleGridToggle(index, phase?.previousIndex)
                          }
                          view={view}
                          handleSelectCard={handleSelectCard}
                          adminProjectView={adminProjectView}
                          setRowCheckboxes={setRowCheckboxes}
                          handleAddRow={handleAddRow}
                          rowCheckboxes={rowCheckboxes}
                          changeOrderView={changeOrderView}
                        />
                      </Stack>
                    );
                  })
                ) : (
                  <div
                    style={{
                      height: "44vh",
                      alignItems: "center",
                      display: "grid",
                      textAlign: "center",
                    }}
                  >
                    No Phases Available
                  </div>
                )}
              </Box>
            )}
          </>
        )}

        {showUpdatePhaseDialogue && (
          <UpdatePhaseDialogue
            handleUpdateOpen={handleUpdateOpen}
            handleUpdateClose={handleUpdateClose}
            phaseData={selectedPhaseData}
            setPhaseData={setSelectedPhaseData}
            // onSubmit={handleColorPickerSubmit}
            InitialProposalView={InitialProposalView}
            onSubmit={(phaseName, color) => {
              handleUpdateSubmit(phaseName, color, selectedPhaseData);
            }}
          />
        )}
        {showAddPhaseDialogue && (
          <AddPhaseDialogue
            handleAddOpen={handleAddOpen}
            handleAddClose={handleAddClose}
            setPhaseData={setSelectedPhaseData}
            onSubmit={handleAddSubmit}
            InitialProposalView={InitialProposalView}
            adminProjectView={adminProjectView}
          />
        )}
      </Grid>
      {/* {open && ( */}
      {done && (
        <GenerateInvoice
          open={open}
          handleClose={handleClose}
          invoiceData={invoiceData}
          rowCheckboxes={rowCheckboxes}
        />
      )}
      {generateInvoice && (
        <GenerateInvoicePopup
          setGenerateInvoice={setGenerateInvoice}
          setShareToClient={setShareToClient}
        />
      )}
      {/* {shareToClient && ( */}
      {open && shareToClient && (
        <ShareModal
          rowCheckboxes={rowCheckboxes}
          setShareToClient={setShareToClient}
          setDone={setDone}
          setInvoiceData={setInvoiceData}
          setRowCheckboxes={setRowCheckboxes}
          authUserRole={authUserRole}
        />
      )}
      {openModal && (
        <AreYouSureModal
          open={openModal}
          handleClose={handleOpenModalClose}
          handleConfirmDelete={handlePhaseDelete}
          isLoading={isDeletePhaseLoading}
          text={"Phase"}
        />
      )}
    </>
  );
}

const firstGrid = {
  backgroundColor: "#FFF",
  display: "flex",
  flexDirection: "column",
  padding: {
    lg: "0rem 0rem",
    md: "0.1rem 0.1rem",
    sm: "1rem 2rem",
    xs: "0rem 0rem",
  },
  margin: "auto",
  // border: "2px solid red",
};
const buttonBox = {
  display: "flex",
  justifyContent: {
    lg: "flex-end",
    md: "flex-end",
    sm: "center",
    xs: "center",
  },
  // overflowX: "auto",
  gap: "0.3rem",
  marginTop: "0.5rem",
  padding: {
    //changes
    lg: "0.5rem 2rem",
    md: "0.1rem 0rem",
    sm: "1rem 2rem",
    xs: "0rem 0.10rem",
  },
};
const approvalButton = {
  background: "#FFAC00",
  padding: "1rem 0.5rem",
};

const displayButton = {
  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
};
const slectedCardStyle = {
  padding: "0rem 0rem 0rem 0rem",
  margin: "0rem",
  cursor: "pointer",
};
const themeStyle = {
  scrollable: {
    scrollbarWidth: "thin", // For Firefox
    "-ms-overflow-style": "none", // For IE and Edge
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
      transition: "background-color 0.3s",
    },
    "&:hover::-webkit-scrollbar-thumb": {
      backgroundColor: "#ddd",
    },
    overflowY: "auto",
  },
};

const scrollable = {
  overflow: "scroll",
  scrollbarWidth: "none", // For Firefox
  "-ms-overflow-style": "none", // For IE and Edge
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "transparent",
    transition: "background-color 0.3s",
  },
  "&:hover::-webkit-scrollbar-thumb": {
    backgroundColor: "#ddd",
  },
};
const style = {
  position: "absolute",
  top: { xl: "50%", lg: "50%", md: "50%", sm: "50%", xs: "80%" },
  left: { xl: "50%", lg: "50%", md: "50%", sm: "50%", xs: "55%" },
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "14px",
};

const modalStyle = {
  color: "gray",
  fontSize: "15px",
};

export default AddPhaseView;
