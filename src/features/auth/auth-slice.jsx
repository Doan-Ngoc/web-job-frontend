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
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    logout(state) {
      state.isLogined = false;
      state.user = null;
      state.token = null;
      if (localStorage.getItem('accessToken'))
        localStorage.removeItem('accessToken');
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
