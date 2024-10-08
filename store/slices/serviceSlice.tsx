import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ServiceForm } from '@/config/service.model';

interface ServiceState {
  service: ServiceForm | null;
}

const initialState: ServiceState = {
    service: null,
};
const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setService(state, action: PayloadAction<ServiceForm>) {
      console.clear();
      console.log('from set service state');
      console.log(action.payload);
      state.service = action.payload;
    },
     
  },
});

export const { setService } = serviceSlice.actions;
 

export default serviceSlice.reducer;
