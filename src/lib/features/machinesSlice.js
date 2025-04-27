import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const machineStorageSlice = createSlice({
  name: "machineS", // Ensure this matches the key in the store
  initialState,
  reducers: {
    initialize: (state, action) => {
      console.log("Initializing machine data:", action.payload); // Log the payload for debugging
      state.data = [...action.payload]; // Update the state with the payload
      console.log("Updated machine data:", state.data); // Log the updated state for debugging
    }, 
    addNew: (state, action) => {
      // Implement adding a machine to the state
      state.data = [...state.data, action.payload];
    }
  },
});

// Correct selector to access the data
export const machineSelector = (state) => state.machineS.data;

// Export the reducer and actions
export const { initialize, addNew } = machineStorageSlice.actions;

export default machineStorageSlice.reducer;
