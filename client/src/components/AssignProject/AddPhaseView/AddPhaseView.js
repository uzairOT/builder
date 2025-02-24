import React, { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  Typography,
  Box,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PhaseCard from "../AddPhaseCard/AddPhaseCard";
import { useDeleteProjectPhaseMutation } from "../../../redux/apis/Project/projectApiSlice";
import { useDispatch, useSelector } from "react-redux";
import UpdatePhaseDialogue from "../../dialogues/UpdatePhaseDialogue/UpdatePhaseDialogue";
import AddPhaseDialogue from "../../dialogues/AddPhaseDialogue/AddPhaseDialogue";
import { useRef } from "react";
import generatePDF from "react-to-pdf";
import {
  addInitialPhase,
  addPhase,
  clearPhases,
} from "../../../redux/slices/Project/projectInitialProposal";
import RequestWorkOrderModal from "../../dialogues/RequestWorkOrder/RequestWorkOrderModal";
import axios from "axios";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import { getTokenFromLocalStorage } from "../../../redux/apis/apiSlice";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import GenerateInvoicePopup from "../../dialogues/GenerateInvoice/GenerateInvoicePopup";
import ShareModal from "../../dialogues/ShareModal/ShareModal";
import {
  selectWorkOrderDeclineRecall,
  toggleWorkOrderDeclineRecall,
} from "../../../redux/slices/Notifications/notificationSlice";
import GenerateInvoice from "../../dialogues/GenerateInvoice/GenerateInvoice";
import AreYouSureModal from "../../dialogues/AreYouSureModal/AreYouSureModal";
import AddIcon from "@mui/icons-material/Add";
import { socket } from "../../../socket";
import { useProjectPermissionCheck } from "../../Projects/ProjectPermissions/ProjectsPermissionCheck";
import ChangeOrderRequestModal from "../../dialogues/ChangeOrderRequestModal/ChangeOrderRequestModal";
import InitialProposalButtons from "./InitialProposalButtons";
import GenerateInvoiceButtons from "./GenerateInvoiceButtons";
import WorkOrderButtons from "./WorkOrderButtons";
import DefaultButtons from "./DefaultButtons";
import GenerativeAiDialogue from "../../dialogues/GenerativeAIDialogue/GenerativeAiDialogue";
import { currencyFormatter, headerFormatter } from "../../../utils/Formatters/excelFormatters";
import XLSX from "xlsx-js-style";
import RenderPhases from "./RenderPhases";
import { useTranslation } from "react-i18next";
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
  handleUpdateOpen: hanldeEditChangeLineItem,
  handleAddOpen: handleAddChangeLineItem,
  handleDeleteOpen: handleDeleteChangeLineItem,
  selectedProjectId,
  selectedProjectData,
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
  const [showGenerativeAiDialouge, setShowGenerativeAiDialouge] = useState(false);
  const [rowCheckboxes, setRowCheckboxes] = useState({}); // State to track the checked state of each checkbox in the table rows
  const location = useLocation();
  const pathCheck = location.pathname;
  const changeOrderSelected = useSelector(
    (state) => state.projectInitialProposal.changeOrderLineItems
  );
  const [isLoadingSendApproval, setIsLoadingSendApproval] = useState(false)
  const newChangePath = `/projects/${projectId}/change-order`;
  const newWorkPath = `/projects/${projectId}/work-order`;
  const navigate = useNavigate();
  const { t } = useTranslation();
  // const projects = useSelector(
  //   (state) => state.userProjects.projects
  // );

  //console.log("Selected Checked Data", changeOrderSelected);
  let formattedView = view ? view.toLowerCase().replace(/\s+/g, "") : view;

  if (InitialProposalAndChange === true) {
    formattedView = "initialchange";
  }

  const dispatch = useDispatch();

  const toggleWorkOrderDeclineRecall1 = useSelector(
    selectWorkOrderDeclineRecall
  );

  const [isLoading, setIsLoading] = useState(
    changeOrderSelected ? false : true
  );
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
    if (changeOrderSelectedView) {
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
            `https://builderbuilder.net/project/getInitialPhases/${id}`,
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
            `https://builderbuilder.net/project/getPhases/${id}?query=${formattedView}`,
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
          `https://builderbuilder.net/project/getPhases/${projectId}`,
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
    // console.log("UserEffect run");
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
    setIsLoadingSendApproval(true)
    socket.emit("sendApprovalNotification", { projectId, sentBy }, (data) => {
      const toastType = data?.success === true ? "success" : "error";
      toast[toastType](data?.message);
      dispatch(toggleWorkOrderDeclineRecall());
      setIsLoadingSendApproval(false)
      if (data?.success) {
        window.location.reload();
      }
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
      toast.info("Please select a phase");
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
  const handleGenAiDialogue = () => {
    setShowGenerativeAiDialouge(true);
  }
  const closeGenAiDialogue = () => {
    setShowGenerativeAiDialouge(false);
  }
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
      toast.info("Please select a phase");
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

  useEffect(() => {
    if (pathCheck.includes("change-order") && !changeOrderSelectedView) {
      dispatch(clearPhases());
    }
  }, [pathCheck]);
  // const permissionsState = useSelector((state) => state?.permissions?.permissions);
  // console.log("Permissions Test", permissionsState)

  const handleChangeOpen = () => {
    navigate(newChangePath);
  };

  const handleWorkOpen = () => {
    navigate(newWorkPath);
  };


  const handleExportPhases = () => {
    const allPhases = [...phases, ...initialPhases];

    const phaseRows = [];

    // Function to process phases and their line items
    const processPhase = (phase) => {
      phase.forEach((p) => {
        // Process line items for each phase
        p.LineItems.forEach((lineItem) => {
          phaseRows.push({
            LineItemTitle: lineItem.title,
            LineItemDescription: lineItem.description,
            LineItemStatus: lineItem.status,
            LineItemUnit: lineItem.unit,
            LineItemQuantity: lineItem.quantity,
            LineItemUnitPrice: Number(lineItem.unit_price) || 0,
            LineItemTotalAmount: Number(lineItem.total) || 0,
            Margin: lineItem.margin,
            PaymentPending: lineItem.paymentPending || 0,
            PhaseName: p.phase_name,
            PhaseStatus: p.status,
          });
        });
      });
    };

    // Process both phases and initialPhases
    console.log(allPhases)
    allPhases.forEach((phaseArray, index) => {
      const status = index < phases.length ? "Not Approved" : "Approved";
      processPhase(phaseArray, status);
    });

    const worksheet = XLSX.utils.json_to_sheet(phaseRows);
    const currencyColumns = ["LineItemUnitPrice", "LineItemTotalAmount", "PaymentPending"]
    currencyFormatter(currencyColumns, phaseRows, worksheet);
    headerFormatter(worksheet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Project Phases");
    XLSX.writeFile(workbook, `Project-Phases-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };
  const renderPhasesProps = {
    isLoading,
    InitialProposalView,
    changeOrderSelectedView,
    initialPhases,
    changeOrderSelected,
    phases,
    selectedPhaseId,
    slectedCardStyle,
    themeStyle,
    adminProjectView,
    id,
    projectId,
    handleGridToggle,
    handleSelectCard,
    setRowCheckboxes,
    handleAddRow,
    authUserRole,
    hanldeEditChangeLineItem,
    handleAddChangeLineItem,
    handleDeleteChangeLineItem,
    view,
    changeOrderView,
    InitialProposalAndChange,
    pathCheck,
    rowCheckboxes,
  };
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
          {view === t("ProjectInitialProposal.title1") ? (
            <>
            <InitialProposalButtons handleExportPhases={handleExportPhases} handleChangeOpen={handleChangeOpen} handleWorkOpen={handleWorkOpen} isLoading={isLoading} handleAddPhase={handleAddPhase} handleEditPhase={handleEditPhase} handleOpenModal={handleOpenModal} handleSendApproval={handleSendApproval} isLoadingSendApproval={isLoadingSendApproval}/>
            </>
          ) : view === t("ProjectInvoices.title1") ? (
            <>
            <GenerateInvoiceButtons handleGenerateInvoice={handleGenerateInvoice}/>
            </>
          ) : view === t("ProjectWorkOrder.title1") ? (
            <>
              <WorkOrderButtons adminProjectView={adminProjectView} rowCheckboxes={rowCheckboxes} setRowCheckboxes={setRowCheckboxes} phases={phases} fetchData={fetchData} refetchChangeOrder={refetchChangeOrder} changeOrderView={changeOrderView} selectedProjectData={selectedProjectData} />
            </>
          ) : (
            <DefaultButtons
              authUserRole={authUserRole}
              view={view}
              isLoading={isLoading}
              handleAddPhase={handleAddPhase}
              handleGenAiDialogue={handleGenAiDialogue}
              handleEditPhase={handleEditPhase}
              handleOpenModal={handleOpenModal}
              rowCheckboxes={rowCheckboxes}
              adminProjectView={adminProjectView}
              setRowCheckboxes={setRowCheckboxes}
              fetchData={fetchData}
              refetchChangeOrder={refetchChangeOrder}
              changeOrderView={changeOrderView}
              selectedProjectData={selectedProjectData}
            />
          )}
        </Stack>
        {view !== t("ProjectInitialProposal.title1") &&
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
          {/* Previous code is save in notes*/}
        <RenderPhases {...renderPhasesProps} />

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
            formattedView={formattedView}
            handleAddOpen={handleAddOpen}
            handleAddClose={handleAddClose}
            setPhaseData={setSelectedPhaseData}
            onSubmit={handleAddSubmit}
            InitialProposalView={InitialProposalView}
            adminProjectView={adminProjectView}
          />
        )}
        {showGenerativeAiDialouge && (
          <GenerativeAiDialogue
            closeGenAiDialogue={closeGenAiDialogue}
            projectId={projectId}
            fetchData={fetchData}
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
          text={t("PhaseModal.areYouSure")}
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


export default AddPhaseView;
