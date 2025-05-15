import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token') ?? '';
const username = localStorage.getItem('username') ?? '';

const initialState = {
  username: username,
  isAuthenticated: token ? true : false,
  token: token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
        const {username, token} = action.payload;
        state.username = username;
        state.isAuthenticated = true;
        state.token = token;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
    }
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
