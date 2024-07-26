import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice'; // Adjust the import based on your actual slice file
import applicantSlice from '../slices/applicantSlice';
import studydetailsSlice from '../slices/studydetailsSlice';

const rootReducer = combineReducers({
  user: userReducer,
  applicant:applicantSlice,
  studyDetails:studydetailsSlice
  // Add other slices here
});

export default rootReducer;