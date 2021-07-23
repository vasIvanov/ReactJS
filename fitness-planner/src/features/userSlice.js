import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const userLogin = createAsyncThunk('user/userLogin', async (data) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
});

export const userRegister = createAsyncThunk(
  'user/userRegister',
  async (data) => {
    try {
      const res = await fetch('http://localhost:9999/api/user/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await res.json();

      return res.status === 200 ? json : Promise.reject(json);
    } catch (error) {
      console.log(error);
    }
  }
);

export const userLogout = createAsyncThunk('user/userLogout', async () => {
  try {
    localStorage.removeItem('user');
    const res = await fetch('http://localhost:9999/api/user/logout', {
      method: 'POST',
      credentials: 'include',
    });

    return res.status === 200 ? res.text() : Promise.reject(res);
  } catch (error) {
    console.log(error);
  }
});

export const userToggleFavorite = createAsyncThunk(
  'user/userAddFavoriteDance',
  async (data) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
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
    [userLogin.pending]: (state) => {
      state.status = 'loading';
    },
    [userLogin.rejected]: (state) => {
      state.status = 'failed';
    },
    [userLogout.fulfilled]: (state) => {
      state.user = null;
      state.status = 'completed';
      return state;
    },
    [userLogout.pending]: (state) => {
      state.status = 'loading';
    },
    [userLogout.rejected]: (state) => {
      state.status = 'failed';
    },
    [userRegister.fulfilled]: (state) => {
      state.status = 'completed';
      return state;
    },
    [userRegister.pending]: (state) => {
      state.status = 'loading';
    },
    [userRegister.rejected]: (state) => {
      state.status = 'failed';
    },
    [userToggleFavorite.fulfilled]: (state) => {
      state.status = 'completed';
      return state;
    },
    [userToggleFavorite.pending]: (state) => {
      state.status = 'loading';
    },
    [userToggleFavorite.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { toggleFavoriteDance } = userSlice.actions;
export const { toggleFavoritePlan } = userSlice.actions;
