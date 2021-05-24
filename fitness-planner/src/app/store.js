import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import { userSlice } from '../features/userSlice';
import toastReducer from '../features/toastSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice.reducer,
    toast: toastReducer,
  },
});
