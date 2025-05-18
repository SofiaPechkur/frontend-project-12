/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initToken = localStorage.getItem('token') ?? '';
const initUsername = localStorage.getItem('username') ?? '';

const initialState = {
  username: initUsername,
  isAuthenticated: !!initToken,
  token: initToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { username, token } = action.payload;
      state.username = username;
      state.isAuthenticated = true;
      state.token = token;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    },
    removeAuth: (state) => {
      state.username = '';
      state.isAuthenticated = false;
      state.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
