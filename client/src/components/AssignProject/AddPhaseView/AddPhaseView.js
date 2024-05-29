import React, { useState, useEffect } from "react";
import { Grid, Button, Stack, Typography, Box } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import PhaseCard from "../AddPhaseCard/AddPhaseCard";
import actionButton from "../../UI/actionButton";
import { useDeleteProjectPhaseMutation } from "../../../redux/apis/Project/projectApiSlice";
import { useDispatch, useSelector } from "react-redux";
import UpdatePhaseDialogue from "../../dialogues/UpdatePhaseDialogue/UpdatePhaseDialogue";
import AddPhaseDialogue from "../../dialogues/AddPhaseDialogue/AddPhaseDialogue";
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
  const [selectedPhaseId, setSelectedPhaseId] = useState(null);
  const [selectedPhaseData, setSelectedPhaseData] = useState(null);
  const { id } = useParams();
  const [deleteProjectPhase] = useDeleteProjectPhaseMutation();
  const phases = useSelector((state) => state.projectInitialProposal.phases);
  const initialPhases = useSelector(
    (state) => state.projectInitialProposal.initialPhases
  );
  const [showUpdatePhaseDialogue, setShowUpdatePhaseDialogue] = useState(false);
  const [showAddPhaseDialogue, setShowAddPhaseDialogue] = useState(false);
  const [rowCheckboxes, setRowCheckboxes] = useState({}); // State to track the checked state of each checkbox in the table rows

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => {
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
    console.log("UserEffect run");
    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, [projectId]);

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
  return (
    <Grid container sx={{ ...firstGrid, width: "100%" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        boxShadow={'0px 6px 0px 0px rgba(0, 0, 0, 0.02)'}
        mb={'4px'}
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
                phases={phases}
                fetchData={fetchData}
                refetchChangeOrder={refetchChangeOrder}
              />
            ) : (
              <></>
            )}
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
                    changeOrder={changeOrder}
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

export default AddPhaseView;
