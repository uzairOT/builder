import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  phases: [], // Array to store phases
};

// Create slice
const projectInitialProposalSlice = createSlice({
  name: 'projectInitialProposal',
  initialState,
  reducers: {
    // Add a new phase to the array
    addPhase: (state, action) => {
      state.phases.push(action.payload);
    },
    // Add a line item to a phase
    updatePhase: (state, action) => {
      const updatedPhase = action.payload;
      const index = state.phases.findIndex(phase => phase.id === updatedPhase.id);
      if (index !== -1) {
        state.phases[index] = updatedPhase;
      }
    },
    // Remove a phase
    deletePhase: (state, action) => {
      const phaseIdToDelete = action.payload;
      state.phases = state.phases.filter(phase => phase.id !== phaseIdToDelete);
    },
    // Remove a line item from a phase
    removeLineItem: (state, action) => {
      const { phaseIndex, lineItemId } = action.payload;
      state.phases[phaseIndex].lineItems = state.phases[phaseIndex].lineItems.filter(
        item => item.id !== lineItemId
      );
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
          console.error('Line item not found in phase:', phaseId);
          // Consider throwing an error or taking other appropriate actions
        }
      } else {
        // Handle case where phase not found
        console.error('Phase not found:', phaseId);
        // Consider throwing an error or taking other appropriate actions
      }
    },

    // Clear all phases
    clearPhases: state => {
      state.phases = [];
    },
    // You can define other reducers as needed
  },
});

// Export actions
export const {  addPhase, updatePhase, deletePhase, addLineItem, removeLineItem, clearPhases ,updateLineItem } = projectInitialProposalSlice.actions;

// Export reducer
export default projectInitialProposalSlice.reducer;
