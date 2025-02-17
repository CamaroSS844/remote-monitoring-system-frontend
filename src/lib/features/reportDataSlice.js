import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const reportDataStorageSlice = createSlice({
  name: "dataStorageS", // Ensure this matches the key in the store
  initialState,
  reducers: {
    initializeData: (state, action) => {
      console.log("data saved")
      state.data = [...action.payload]; // Update the state with the payload
    }, 
    addNew: (state, action) => {
      // Implement adding a new grave
      state.data = [...state.data, action.payload];
    }
  },
});

// Correct selector to access the data
export const dataSelector = (state) => {
  console.log(`data storage check ${state.machineS}`)
  return state.dataStorageS.data
};

// Export the reducer and actions
export const { initializeData, addNew } = dataStorageSlice.actions;

export default dataStorageSlice.reducer;
