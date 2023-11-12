import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogined: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLogined = true;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    logout(state) {
      state.isLogined = false;
      state.user = null;
      state.token = null;
      if (localStorage.getItem('refreshToken'))
        localStorage.removeItem('refreshToken');
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
