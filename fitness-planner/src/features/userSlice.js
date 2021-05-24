import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const userLogin = createAsyncThunk('user/userLogin', async (data) => {
  const res = await fetch('http://localhost:9999/api/user/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const json = await res.json();

  return res.status === 200 ? json : Promise.reject(json);
});

export const userRegister = createAsyncThunk(
  'user/userRegister',
  async (data) => {
    const res = await fetch('http://localhost:9999/api/user/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await res.json();

    return res.status === 200 ? json : Promise.reject(json);
  }
);

export const userLogout = createAsyncThunk('user/userLogout', async () => {
  localStorage.removeItem('username');
  if (localStorage.getItem('city')) {
    localStorage.removeItem('city');
  }
  if (localStorage.getItem('plans')) {
    localStorage.removeItem('plans');
  }
  localStorage.removeItem('_id');
  localStorage.removeItem('instructor');

  const res = await fetch('http://localhost:9999/api/user/logout', {
    method: 'POST',
    credentials: 'include',
  });

  return res.status === 200 ? res.text() : Promise.reject(res);
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: null,
  },
  reducers: {},
  extraReducers: {
    [userLogin.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.user = payload;
      state.status = 'completed';
      return state;
    },
    [userLogin.pending]: (state, { payload }) => {
      state.status = 'loading';
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.status = 'failed';
    },
    [userLogout.fulfilled]: (state, { payload }) => {
      state.user = null;
      state.status = 'completed';
      return state;
    },
    [userLogout.pending]: (state, { payload }) => {
      state.status = 'loading';
    },
    [userLogout.rejected]: (state, { payload }) => {
      state.status = 'failed';
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      state.status = 'completed';
      return state;
    },
    [userRegister.pending]: (state, { payload }) => {
      state.status = 'loading';
    },
    [userRegister.rejected]: (state, { payload }) => {
      state.status = 'failed';
    },
  },
});
