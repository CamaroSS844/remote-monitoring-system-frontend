import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const kpiSlice = createSlice({
  name: "kpiS", // Ensure this matches the key in the store
  initialState,
  reducers: {
    initializeKPIs: (state, action) => {
      state.data = action.payload; // Update the state with the payload
    }
  },
});

// Correct selector to access the data
export const KPIselector = (state) => state.kpiS.data;

// Export the reducer and actions
export const { initializeKPIs } = kpiSlice.actions;

export default kpiSlice.reducer;
