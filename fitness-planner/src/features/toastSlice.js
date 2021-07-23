import { createSlice } from '@reduxjs/toolkit';
import { userLogin, userRegister, userLogout } from '../features/userSlice';

export const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    show: false,
    message: '',
  },
  reducers: {
    showToast: (state, action) => {
      state.show = action.payload.show;
      state.message = action.payload.message;
    },
  },
  extraReducers: {
    [userLogin.fulfilled]: (state) => {
      state.show = true;
      state.message = 'Login Successful!';
    },
    [userRegister.fulfilled]: (state) => {
      state.show = true;
      state.message = 'Registration Successful!';
    },
    [userLogout.fulfilled]: (state) => {
      state.show = true;
      state.message = 'Logout Successful!';
    },
  },
});

export const { showToast } = toastSlice.actions;

export default toastSlice.reducer;
