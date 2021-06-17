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
  localStorage.removeItem('user');
  const res = await fetch('http://localhost:9999/api/user/logout', {
    method: 'POST',
    credentials: 'include',
  });

  return res.status === 200 ? res.text() : Promise.reject(res);
});

export const userToggleFavorite = createAsyncThunk(
  'user/userAddFavoriteDance',
  async (data) => {
    const res = await fetch(`http://localhost:9999/api/user/${data._id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const text = await res.text();

    return res.status === 200 ? text : Promise.reject(text);
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: null,
  },
  reducers: {
    toggleFavoriteDance: (state, action) => {
      if (action.payload.add) {
        state.user.dances.push(action.payload.dance);
      } else {
        const index = state.user.dances.indexOf(action.payload.dance);
        state.user.dances.splice(index, 1);
      }
    },
    toggleFavoritePlan: (state, action) => {
      if (action.payload.add) {
        state.user.plans.push(action.payload.plan);
      } else {
        const index = state.user.plans.indexOf(action.payload.plan);
        state.user.plans.splice(index, 1);
      }
    },
  },
  extraReducers: {
    [userLogin.fulfilled]: (state, { payload }) => {
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
    [userToggleFavorite.fulfilled]: (state, { payload }) => {
      state.status = 'completed';
      return state;
    },
    [userToggleFavorite.pending]: (state, { payload }) => {
      state.status = 'loading';
    },
    [userToggleFavorite.rejected]: (state, { payload }) => {
      state.status = 'failed';
    },
  },
});

export const { toggleFavoriteDance } = userSlice.actions;
export const { toggleFavoritePlan } = userSlice.actions;
