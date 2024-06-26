import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Stack, Typography } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import PhaseCard from "../AddPhaseCard/AddPhaseCard";
import actionButton from "../../UI/actionButton";
import ColorPickerElement from "../../dialogues/ColorPickerElement/ColorPickerElement";
import { useDeleteProjectPhaseMutation } from "../../../redux/apis/Project/projectApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetPhasesQuery } from "../../../redux/apis/Project/projectApiSlice";
import UpdatePhaseDialogue from "../../dialogues/UpdatePhaseDialogue/UpdatePhaseDialogue";
import AddPhaseDialogue from "../../dialogues/AddPhaseDialogue/AddPhaseDialogue";
import { addPhase } from "../../../redux/slices/Project/projectInitialProposal";
import RequestWorkOrderModal from "../../dialogues/RequestWorkOrder/RequestWorkOrderModal";
import {
  selectAddPhase,
  setRowCheckbox,
} from "../../../redux/slices/addPhaseSlice";
import axios from 'axios';
import {useParams} from 'react-router-dom';

function  AddPhaseView({ adminProjectView, view ,projectId }) {
  const [cardPhase, setCardPhase] = useState();
  const [selectedPhaseId, setSelectedPhaseId] = useState(null);
  const [selectedPhaseData, setSelectedPhaseData] = useState(null);
  const local = localStorage.getItem('userInfo');
  const {id} = useParams()
  const currentUser = JSON.parse(local);
  console.log("Add PhaseView:",currentUser)
  const [deleteProjectPhase] = useDeleteProjectPhaseMutation({userId: currentUser.id});
  const phases = useSelector((state) => state.projectInitialProposal.phases);
  // const  [getPhases  { data, error, isLoading}] = useGetPhasesQuery({projectId: projectId});
  const [showUpdatePhaseDialogue, setShowUpdatePhaseDialogue] = useState(false);
  const [showAddPhaseDialogue, setShowAddPhaseDialogue] = useState(false);
  const { rowCheckbox } = useSelector(selectAddPhase);
  const [rowCheckboxes, setRowCheckboxes] = useState({}); // State to track the checked state of each checkbox in the table rows

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  const fetchData = async () => {
    setIsLoading(true);
    if(projectId === null){
      return;
    }else if(adminProjectView){
      try {
        const response = await axios.get(`http://192.168.0.105:8080/project/getPhases/${id}`);
        console.log(response)
        dispatch(addPhase(response.data.phases));
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }
    else{

      try {
        const response = await axios.get(`http://192.168.0.105:8080/project/getPhases/${projectId}`);
        console.log(response)
        dispatch(addPhase(response.data.phases));
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    
  }
  useEffect(() => {
    
    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, [projectId]);

  const handleAddRow = () => {
    fetchData();
  };

  useEffect(()=>{
    console.log(rowCheckboxes)
  },[rowCheckboxes])

  const handleGridToggle = (currentIndex, previousIndex) => {
    // Ensure indices are within the valid range
    if (
      currentIndex < 0 ||
      currentIndex >= cardPhase.length ||
      previousIndex < 0 ||
      previousIndex >= cardPhase.length
    ) {
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
    setShowUpdatePhaseDialogue(true);
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
      const selectedPhase = cardPhase.find((phase) => phase.id === id);
      setSelectedPhaseData(selectedPhase);
    }
  };

  const handleDeletePhase = () => {
    if (selectedPhaseId) {
      deleteProjectPhase(selectedPhaseId);
      const updatedCardPhase = cardPhase.filter(
        (card) => card.id !== selectedPhaseId
      );
      setCardPhase(updatedCardPhase);
      console.log(updatedCardPhase);
      setSelectedPhaseId(null);
      setSelectedPhaseData(null);
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
  };
  console.log(phases)
  return (
    <Grid container sx={firstGrid}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack>
          {adminProjectView && (
            <Typography
              pl={3}
              pt={1}
              color={"#4C8AB1"}
              fontFamily={"Poppins, san serif"}
              fontSize={"22px"}
              fontWeight={"600"}
            >
              {view}
            </Typography>
          )}
        </Stack>
        {view === "Initial Proposal" ? (
          <></>
        ) : (
          <Stack direction={"row"} sx={buttonBox}>
            <Button
              sx={{ ...actionButton }}
              startIcon={<ModeEditOutlinedIcon />}
              onClick={handleAddPhase}
            >
              Edit
            </Button>
            <Button sx={{ ...actionButton }} startIcon={<DeleteOutlinedIcon />}>
              Delete
            </Button>
            <Button
              sx={{ ...actionButton, background: "#FFAC00" }}
              onClick={handleAddPhase}
            >
              Add Phase
            </Button>
            {adminProjectView ? (
               <RequestWorkOrderModal rowCheckboxes={rowCheckboxes} phases={phases} />
            ) : (
              <Button sx={{ ...actionButton, ...approvalButton }}>
                Send Approval
              </Button>
            )}
          </Stack>
        )}
      </Stack>
      {/* <Box sx={buttonBox}>
        <Button
          sx={{ ...actionButton, ...displayButton }}
          startIcon={<ModeEditOutlinedIcon />}
          onClick={handleEditPhase}
        >
          Edit
        </Button>
        <Button
          sx={{ ...actionButton, ...displayButton }}
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
      
      </Box> */}

      {phases !== null && phases[0] !== undefined && phases[0].length !== 0 ? (
        phases[0]?.map((phase, index) => {
          return (
            <Stack
              key={phase.id}
              style={{
                ...slectedCardStyle,
                backgroundColor: selectedPhaseId === phase.id ? "#000" : "#FFF",
              }}
            >
              <PhaseCard
                projectId= {adminProjectView ? id : projectId}
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
          No data available
        </div>
      )}
      {showUpdatePhaseDialogue && (
        <UpdatePhaseDialogue
          handleUpdateOpen={handleUpdateOpen}
          handleUpdateClose={handleUpdateClose}
          phaseData={selectedPhaseData}
          setPhaseData={setSelectedPhaseData}
          // onSubmit={handleColorPickerSubmit}
          onSubmit={(phaseName, color) =>
            handleUpdateSubmit(phaseName, color, selectedPhaseData)
          }
        />
      )}
      {showAddPhaseDialogue && (
        <AddPhaseDialogue
          handleAddOpen={handleAddOpen}
          handleAddClose={handleAddClose}
          setPhaseData={setSelectedPhaseData}
          onSubmit={handleAddSubmit}
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
    md: "0.1rem 2rem",
    sm: "1rem 2rem",
    xs: "0rem 0rem",
  },
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
    lg: "0rem 5rem",
    md: "0.1rem 2rem",
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
  padding: "0.1rem 0rem 1rem 0rem",
  margin: "0rem",
  cursor: "pointer",
};

export default AddPhaseView;
