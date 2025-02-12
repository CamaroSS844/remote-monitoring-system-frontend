import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sensorData: [],
};

export const sensorDataStorageSlice = createSlice({
  name: "sensorDataStorageS", // Ensure this matches the key in the store
  initialState,
  reducers: {
    initializeSensorData: (state, action) => {
      state.sensorData = action.payload; // Update the state with the payload
    }, 
    addNew: (state, action) => {
      // Implement adding a new grave
      state.sensorData = [...state.sensorData, action.payload];
    }
  },
});

// Correct selector to access the sensorData
export const sensorDataSelector = (state) => {
  console.log(`try to fix you ${JSON.stringify(state)}`);
  return state.sensorS.sensorData
};

// Export the reducer and actions
export const { initializeSensorData, addNew } = sensorDataStorageSlice.actions;

export default sensorDataStorageSlice.reducer;
