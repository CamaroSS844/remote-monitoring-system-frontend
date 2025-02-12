import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './features/dataStorageSlice';
import machineReducer from './features/machinesSlice';
import kpiReducer from './features/kpiSlice';
import sensorReducer from './features/sensorDataStorageSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
        dataStorageS: dataReducer,
        machineS: machineReducer,
        kpiS: kpiReducer,
        sensorS: sensorReducer
    }
  })
}