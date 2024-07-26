import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from "@/config/user.modal";

interface ApplicantState {
  applicant: UserProfile | null;
}

const initialState: ApplicantState = {
  applicant: null,
};

const applicantSlice = createSlice({
  name: 'applicant',
  initialState,
  reducers: {
    setApplicant(state, action: PayloadAction<UserProfile>) {
    
      state.applicant = action.payload;
    },
  },
});

export const { setApplicant } = applicantSlice.actions;

export default applicantSlice.reducer;
