import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const machineStorageSlice = createSlice({
  name: "machineS", // Ensure this matches the key in the store
  initialState,
  reducers: {
    initialize: (state, action) => {
      state.data = [...action.payload]; // Update the state with the payload
    }, 
    addNew: (state, action) => {
      // Implement adding a new grave
      state.data = [...state.data, action.payload];
    }
  },
});

// Correct selector to access the data
export const machineSelector = (state) => state.machineS.data;

// Export the reducer and actions
export const { initialize, addNew } = machineStorageSlice.actions;

export default machineStorageSlice.reducer;
