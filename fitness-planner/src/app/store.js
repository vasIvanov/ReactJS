import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import { userSlice } from '../features/userSlice';
import toastReducer from '../features/toastSlice';
import { danceSlice } from '../features/danceSlice';
import { planSlice } from '../features/planSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice.reducer,
    toast: toastReducer,
    dance: danceSlice.reducer,
    plan: planSlice.reducer,
  },
});
