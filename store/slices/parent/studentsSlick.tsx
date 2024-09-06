import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from "@/config/user.modal";
import StudentRecord from '@/components/parents/student.modal';

interface StudentState {
    student: StudentRecord[] | null;
}

const initialState: StudentState = {
    student: null,
};

const studentsSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        setStudentsList(state, action: PayloadAction<StudentRecord[]>) {

            state.student = action.payload;
        },
    },
});

export const { setStudentsList } = studentsSlice.actions;

export default studentsSlice.reducer;
