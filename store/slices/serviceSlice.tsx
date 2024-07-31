import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ServiceForm } from '@/config/service.model';

interface ServiceState {
  service: ServiceForm | null;
}

const initialState: ServiceState = {
    service: null,
};
let i = 1;
const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setService(state, action: PayloadAction<ServiceForm>) {
      console.log('------------------')
      ++i;
      console.log(action.payload);
      console.log(i);
      state.service = action.payload;
    },
     
  },
});

export const { setService } = serviceSlice.actions;
 

export default serviceSlice.reducer;
