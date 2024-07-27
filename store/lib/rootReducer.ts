import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice'; // Adjust the import based on your actual slice file
import applicantSlice from '../slices/applicantSlice';
import studydetailsSlice from '../slices/studydetailsSlice';
import serviceSlice from '../slices/serviceSlice';

const rootReducer = combineReducers({
  user: userReducer,
  applicant:applicantSlice,
  studyDetails:studydetailsSlice,
  service:serviceSlice
  // Add other slices here
});

export default rootReducer;