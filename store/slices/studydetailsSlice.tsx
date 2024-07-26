import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudyDetails } from '@/config/service.model';

interface studyDetails {
  studyDetails: StudyDetails | null;
}

const initialState: studyDetails = {
  studyDetails: null,
};

const studyDetailsSlice = createSlice({
  name: 'studyDetails',
  initialState,
  reducers: {
    setStudyDetails(state, action: PayloadAction<StudyDetails>) {
      state.studyDetails = action.payload;
    },
  },
});

export const { setStudyDetails } = studyDetailsSlice.actions;

export default studyDetailsSlice.reducer;
