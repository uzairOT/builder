import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Stack,
  Typography,
  Box,
  Modal,
  Container,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
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
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getTokenFromLocalStorage } from "../../../redux/apis/apiSlice";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import GenerateInvoiceTable from "../../dialogues/GenerateInvoice/GenerateInvoiceTable";
import GenerateInvoicePopup from "../../dialogues/GenerateInvoice/GenerateInvoicePopup";
import ShareModal from "../../dialogues/ShareModal/ShareModal";
import GenerateInvoiceDone from "../../dialogues/GenerateInvoice/GenerateInvoiceDone";
import { selectWorkOrderDeclineRecall } from "../../../redux/slices/Notifications/notificationSlice";
// import { BuilderProNavbarLogo } from "./assets/svgs/builder-pro-logo-navbar.svg";
import BuilderProNavbarLogo from "../../Navbar/assets/svgs/builder-pro-logo-navbar.svg";
//import "react-toastify/dist/ReactToastify.css";

function AddPhaseView({
  adminProjectView,
  view,
  projectId,
  InitialProposalView,
  authUserRole,
  refetchChangeOrder,
  changeOrder,
}) {
  const [cardPhase, setCardPhase] = useState([]);
  const [invoiceData, setInvoiceData] = useState();
  const [selectedPhaseId, setSelectedPhaseId] = useState(null);
  const [selectedPhaseData, setSelectedPhaseData] = useState(null);
  const { id } = useParams();
  const [deleteProjectPhase] = useDeleteProjectPhaseMutation();
  const phases = useSelector((state) => state.projectInitialProposal.phases);
  const targetRef = useRef();
  const initialPhases = useSelector(
    (state) => state.projectInitialProposal.initialPhases
  );
  const [showUpdatePhaseDialogue, setShowUpdatePhaseDialogue] = useState(false);
  const [showAddPhaseDialogue, setShowAddPhaseDialogue] = useState(false);
  const [rowCheckboxes, setRowCheckboxes] = useState({}); // State to track the checked state of each checkbox in the table rows

  const dispatch = useDispatch();

  const toggleWorkOrderDeclineRecall = useSelector(selectWorkOrderDeclineRecall);

  const [isLoading, setIsLoading] = useState(true);
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
    console.log("Invoice Generated Successfully");
  };
  const fetchData = async () => {
    setIsLoading(true);
    setSelectedPhaseId(null);
    if (projectId === null) {
      return;
    } else if (adminProjectView) {
      if (InitialProposalView) {
        try {
          const response = await axios.get(
            `http://192.168.0.113:8080/project/getInitialPhases/${id}`,
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
            `http://192.168.0.113:8080/project/getPhases/${id}`,
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
          `http://192.168.0.113:8080/project/getPhases/${projectId}`,
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
    console.log("UserEffect run");
    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, [projectId, toggleWorkOrderDeclineRecall]);

  const handleAddRow = () => {
    fetchData();
  };

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
    console.log("InvoiceGenerated");
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

  const handleDeletePhase = async () => {
    //console.log('clicked!')
    if (selectedPhaseId) {
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
    } else {
      toast.info("Please Select a Phase");
    }
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
  console.log(
    "This is selected lineitem info invoiceData invoiceData",
    invoiceData
  );
  return (
    <>
      <Grid container sx={{ ...firstGrid, width: "100%" }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          // sx={{ width: "100%" }}
        >
          <Stack sx={{ justifyContent: "center" }}>
            {adminProjectView && (
              <Typography
                // pl={3}
                // pt={1}
                color={"#4C8AB1"}
                fontFamily={"Poppins, san serif"}
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
              {(authUserRole === "superadmin" ||
                authUserRole === "projectManager" ||
                authUserRole === "client") && (
                <>
                  <Stack direction={"row"} sx={buttonBox}>
                    <Button
                      sx={{ ...actionButton }}
                      startIcon={<ModeEditOutlinedIcon />}
                      onClick={handleEditPhase}
                    >
                      Edit
                    </Button>
                    <Button
                      sx={{ ...actionButton }}
                      startIcon={<DeleteOutlinedIcon />}
                      onClick={handleDeletePhase}
                    >
                      Delete
                    </Button>
                    <Button
                      sx={{ ...actionButton, background: "#FFAC00" }}
                      onClick={handleAddPhase}
                    >
                      Add Phase
                    </Button>
                  </Stack>
                </>
              )}
            </>
          ) : (
            <Stack direction={"row"} sx={buttonBox}>
              <Button
                sx={{ ...actionButton }}
                startIcon={<ModeEditOutlinedIcon />}
                onClick={handleEditPhase}
              >
                Edit
              </Button>
              <Button
                sx={{ ...actionButton }}
                startIcon={<DeleteOutlinedIcon />}
                onClick={handleDeletePhase}
              >
                Delete
              </Button>
              <Button
                sx={{ ...actionButton, background: "#FFAC00" }}
                onClick={handleAddPhase}
              >
                Add Phase
              </Button>

              {adminProjectView ? (
                <RequestWorkOrderModal
                  rowCheckboxes={rowCheckboxes}
                  setRowCheckboxes={setRowCheckboxes}
                phases={phases}
                  fetchData={fetchData}
                  refetchChangeOrder={refetchChangeOrder}
                />
              ) : (
                <></>
              )}
              <Button sx={{ ...actionButton }} onClick={handleGenerateInvoice}>
                Generate Invoice
              </Button>
            </Stack>
          )}
        </Stack>

        {InitialProposalView ? (
          <Box
            sx={{
              height: "calc(93vh - 140px)",
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
                    />
                  </Stack>
                );
              })
            ) : (
              <div
                style={{
                  height: "60vh",
                  alignItems: "center",
                  display: "grid",
                  textAlign: "center",
                }}
              >
                No Phases Available
              </div>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              height: adminProjectView ? "calc(92vh - 300px)" : "",
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
                    />
                  </Stack>
                );
              })
            ) : (
              <div
                style={{
                  height: "60vh",
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ ...scrollable, height: "100%", width: { xs: "100%" } }}
        >
          <Box sx={style}>
            <Stack
              direction={{
                xl: "row",
                lg: "row",
                md: "row",
                sm: "row",
                xs: "column",
              }}
              justifyContent={"space-between"}
              alignItems={"center"}
              p={2}
            >
              <Typography
                fontSize={"24px"}
                fontFamily={"inherit"}
                fontWeight={"600"}
                color={"#4C8AB1"}
              >
                Generate Invoice
              </Typography>
              <Stack
                direction={"row"}
                alignItems={"center"}
                onClick={() => {
                  // console.log("Click Chala");
                  handleInvoicePrint();
                }}
              >
                <BuilderProButton
                  variant={"contained"}
                  backgroundColor={"#4C8AB1"}
                  fontSize={"16px"}
                  fontFamily={"Inter, sans serif"}
                >
                  Download Invoice
                </BuilderProButton>
              </Stack>
            </Stack>
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "@media print": {
                  height: "auto",
                },
                marginTop: "2rem",
              }}
              ref={targetRef}
            >
              <Box sx={{ width: "100%", maxWidth: "800px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={BuilderProNavbarLogo} alt={"ddd"} />
                </Box>
                {/* <Stack direction={"flex"} justifyContent={"center"}>
                  <Typography
                    sx={{
                      color: "#ffb41a",
                      fontSize: "20px",
                      marginLeft: "5px",
                    }}
                  >
                    Builder
                  </Typography>
                  <Typography
                    sx={{
                      color: "#448cb8",
                      fontSize: "20px",
                      fontWeight: 1000,
                    }}
                  >
                    BUILDER
                  </Typography>
                </Stack> */}
                <Stack
                  direction={{
                    xl: "row",
                    lg: "row",
                    md: "row",
                    sm: "row",
                    xs: "column",
                  }}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={1}
                  pl={2}
                  pr={2}
                  mt={3}
                >
                  <Stack spacing={1}>
                    <Typography sx={modalStyle}>
                      Company:{" "}
                      {invoiceData?.invoiceCompleteObj?.Admin?.companyName}
                    </Typography>
                    <Typography sx={modalStyle}>
                      Name: {invoiceData?.invoiceCompleteObj?.Client?.firstName}
                    </Typography>
                    {/* <Typography sx={modalStyle}>Company Address</Typography>
                <Typography sx={modalStyle}>City,State Zip</Typography>
                <Typography sx={modalStyle}>USA</Typography> */}
                  </Stack>
                  <Stack direction={"row"} spacing={4}>
                    <Stack spacing={1}>
                      <Typography sx={modalStyle} fontWeight={"bold"}>
                        Invoice#
                      </Typography>
                      <Typography sx={modalStyle} fontWeight={"bold"}>
                        Invoice Date
                      </Typography>
                      <Typography sx={modalStyle} fontWeight={"bold"}>
                        Due Date
                      </Typography>
                    </Stack>
                    <Stack spacing={1}>
                      <Typography sx={modalStyle}>
                        {invoiceData?.invoiceCompleteObj?.InvoiceNumber}
                      </Typography>
                      <Stack direction={"row"} spacing={0.5}>
                        <CalendarTodayIcon
                          fontSize="small"
                          style={{ color: "lightgray" }}
                        />
                        <Typography sx={modalStyle}>
                          {" "}
                          {invoiceData?.invoiceCompleteObj?.InvoiceDate}
                        </Typography>
                      </Stack>
                      <Stack direction={"row"} spacing={0.5}>
                        <CalendarTodayIcon
                          fontSize="small"
                          style={{ color: "lightgray" }}
                        />
                        <Typography sx={modalStyle}>
                          {" "}
                          {invoiceData?.invoiceCompleteObj?.InvoiceDueDate}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={{
                    xl: "100%",
                    lg: "100%",
                    md: "100%",
                    sm: "100%",
                    xs: "80%",
                  }}
                >
                  <GenerateInvoiceTable
                    rowCheckboxes={rowCheckboxes}
                    invoiceData={invoiceData}
                  />
                </Stack>
                <Stack
                  direction={{ xl: "row", lg: "row", md: "column" }}
                  justifyContent={"space-between"}
                  p={4}
                  spacing={1}
                >
                  <Stack>
                    <Typography sx={modalStyle} fontWeight={"bold"}>
                      Notes
                    </Typography>
                    <Typography sx={modalStyle}>
                      It was great doing business with you
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography sx={modalStyle} fontWeight={"bold"}>
                      Terms and Condition
                    </Typography>
                    <Typography sx={modalStyle}>
                      Please make payments before the due date
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Container>

            {/* <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              p={2}
            >
              <Button
                variant={"contained"}
                sx={{
                  backgroundColor: "#4C8AB1",
                  borderRadius: "28px",
                  fontFamily: "Inter, sans serif",
                  textTransform: "capitalize",
                  fontSize: "16px",
                }}
                fontSize={"16px"}
                fontFamily={"Inter, sans serif"}
                onClick={() => {
                  handleClose();
                  handleGenerateInvoice();
                }}
              >
                Send Invoice
              </Button>
            </Stack> */}
          </Box>
        </Modal>
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
  overflowX: "auto",
  gap: "0.5rem",
  marginTop: "0.5rem",
  padding: {
    //changes
    lg: "0.5rem 2rem",
    md: "0.1rem 0rem",
    sm: "1rem 2rem",
    xs: "0rem 0rem",
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
    overflowY: "scroll",
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
