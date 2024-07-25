import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Adjust the import based on your actual slice file

const rootReducer = combineReducers({
  user: userReducer,
  // Add other slices here
});

export default rootReducer;