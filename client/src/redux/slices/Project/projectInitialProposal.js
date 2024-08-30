import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  phases: [],
  initialPhases: [], // Array to store phases
  changeOrderLineItems: [],
};

// Create slice
const projectInitialProposalSlice = createSlice({
  name: "projectInitialProposal",
  initialState,
  reducers: {
    // Add a new phase to the array
    addPhase: (state, action) => {
      state.phases[0] = action.payload;
    },
    // Add a new phase to the array
    addInitialPhase: (state, action) => {
      state.initialPhases[0] = action.payload;
    },
    // Add a line item to a phase
    updatePhase: (state, action) => {
      const updatedPhase = action.payload;
      const index = state.phases.findIndex(
        (phase) => phase.id === updatedPhase.id
      );
      if (index !== -1) {
        state.phases[index] = updatedPhase;
      }
    },
    // Remove a phase
    deletePhase: (state, action) => {
      const phaseIdToDelete = action.payload;
      state.phases = state.phases.filter(
        (phase) => phase.id !== phaseIdToDelete
      );
    },
    // Remove a line item from a phase
    removeLineItem: (state, action) => {
      const { phaseIndex, lineItemId } = action.payload;
      state.phases[phaseIndex].lineItems = state.phases[
        phaseIndex
      ].lineItems.filter((item) => item.id !== lineItemId);
    },
    updateLineItem: (state, action) => {
      const { phaseId, lineItemId, updatedLineItem } = action.payload;

      // Find the phase index using a utility function (optional for readability)
      const findPhaseIndex = (phases, phaseId) =>
        phases.findIndex((phase) => phase.id === phaseId);

      const phaseIndex = findPhaseIndex(state.phases, phaseId);

      if (phaseIndex !== -1) {
        const lineItemIndex = state.phases[phaseIndex].lineItems.findIndex(
          (item) => item.id === lineItemId
        );

        if (lineItemIndex !== -1) {
          state.phases[phaseIndex].lineItems[lineItemIndex] = updatedLineItem;
        } else {
          // Handle case where line item not found within the phase
          console.error("Line item not found in phase:", phaseId);
          // Consider throwing an error or taking other appropriate actions
        }
      } else {
        // Handle case where phase not found
        console.error("Phase not found:", phaseId);
        // Consider throwing an error or taking other appropriate actions
      }
    },
    updateCheckedItems: (state, action) => {
      const { phaseId,phaseName,lineItems, ...otherProps } = action.payload;
    
      const existingPhaseIndex = state.changeOrderLineItems.findIndex(
        (phase) => phase.id === phaseId
      );
    
      if (existingPhaseIndex !== -1) {
        if (lineItems.length === 0) {
          // Remove the phase if no line items are left
          state.changeOrderLineItems.splice(existingPhaseIndex, 1);
        } else {
          // Update the existing phase's line items and other properties immutably
          state.changeOrderLineItems[existingPhaseIndex] = {
            ...state.changeOrderLineItems[existingPhaseIndex],
            ...otherProps,
            LineItems: [...lineItems],
          };
        }
      } else if (lineItems.length > 0) {
        // Add new phase with line items if it does not exist
        state.changeOrderLineItems.push({
          id: phaseId,
          phase_name: phaseName,
          LineItems: [...lineItems], // Ensure a new array is pushed
          ...otherProps, // Include other properties from phaseData
        });
      }
    },
    removeLineItems: (state, action) => {
      const { phaseId, index } = action.payload;
        console.log(index)
      return {
        ...state,
        changeOrderLineItems: state.changeOrderLineItems.map(phase => 
          phase.id === phaseId
            ? {
                ...phase,
                LineItems: phase.LineItems.filter((_, i) => i !== index)
              }
            : phase
        )
      };
    },
    

    // Clear all phases
    clearPhases: (state) => {
      state.phases = [];
    },
    // You can define other reducers as needed
  },
});

// Export actions
export const {
  addPhase,
  updatePhase,
  deletePhase,
  addLineItem,
  removeLineItem,
  clearPhases,
  updateLineItem,
  addInitialPhase,
  updateCheckedItems,
  removeLineItems
} = projectInitialProposalSlice.actions;

// Export reducer
export default projectInitialProposalSlice.reducer;
