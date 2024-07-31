// store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setCookie } from 'nookies';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    
      setCookie(null, 'authToken', action.payload, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    
    },
    clearToken(state) {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
 
