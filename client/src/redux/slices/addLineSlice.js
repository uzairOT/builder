import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    formData: {
        phaseName: '',
        description: '',
        unit: '',
        quantity: '',
        unitPrice: '',
        total: '',
        start: '',
        end: '',
        longDescription: '',
    },
};

const addLineSlice = createSlice({
    name: 'addLine',
    initialState,
    reducers: {
        updateFormData(state, action) {
            state.formData = { ...state.formData, ...action.payload };
        },
        resetFormData(state) {
            state.formData = initialState.formData;
        },
    },
});

export const { updateFormData, resetFormData } = addLineSlice.actions;
export default addLineSlice.reducer;
