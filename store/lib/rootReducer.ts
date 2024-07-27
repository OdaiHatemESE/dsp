import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice'; // Adjust the import based on your actual slice file
import applicantReducer from '../slices/applicantSlice';
import studydetailsReducer from '../slices/studydetailsSlice';
import serviceReducer from '../slices/serviceSlice';
import authReducer from '../slices/authSlice';

const rootReducer = combineReducers({
  user: userReducer,
  applicant:applicantReducer,
  studyDetails:studydetailsReducer,
  service:serviceReducer,
  auth:authReducer
  // Add other slices here
});

export default rootReducer;