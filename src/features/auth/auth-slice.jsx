import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogined: false,
  user: null,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLogined = true;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      state.role = action.payload.role;
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('role', action.payload.role);
      localStorage.setItem('userId', action.payload.user);
    },
    logout(state) {
      state.isLogined = false;
      state.user = null;
      state.token = null;
      state.role = null;
      if (localStorage.getItem('refreshToken'))
        localStorage.removeItem('refreshToken');
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
