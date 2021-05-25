import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getDances = createAsyncThunk(
  'dance/getDances',
  async (id, limit, userId, query) => {
    const res = await fetch(
      `http://localhost:9999/api/dance${id ? `/${id}` : ''}${
        limit ? `?limit=${limit}` : ''
      }${userId ? `?userId=${userId}` : ''}${query ? `?query=${query}` : ''}`
    );

    const json = await res.json();

    return res.status === 200 ? json : Promise.reject(json);
  }
);

export const createDance = createAsyncThunk(
  'dance/createDance',
  async (data, { rejectWithValue }) => {
    const res = await fetch(`http://localhost:9999/api/dance/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    const json = await res.json();

    return res.status === 200 ? json : rejectWithValue(json);
  }
);

export const deleteDance = createAsyncThunk(
  'dance/deleteDance',
  async (id, { rejectWithValue }) => {
    const res = await fetch(`http://localhost:9999/api/dance/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
    });

    const json = await res.json();

    return res.status === 200 ? json : rejectWithValue(json);
  }
);

export const danceSlice = createSlice({
  name: 'dance',
  initialState: {
    dances: null,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getDances.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.dances = payload;
      state.status = 'completed';
      return state;
    },
    [getDances.pending]: (state, { payload }) => {
      state.status = 'loading';
    },
    [getDances.rejected]: (state, { payload }) => {
      state.status = 'failed';
    },
    [createDance.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.dances.push(payload);
      state.error = null;
      state.status = 'completed';
      return state;
    },
    [createDance.pending]: (state, { payload }) => {
      state.status = 'loading';
      state.error = null;
    },
    [createDance.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.errMsg;
      console.log(action);
    },
    [deleteDance.fulfilled]: (state, { payload }) => {
      console.log(state.dances.filter((dance) => dance._id !== payload.id));
      const danceToDelete = state.dances.find(
        (dance) => dance._id === payload.id
      );
      const index = state.dances.indexOf(danceToDelete);
      state.dances.splice(index, 1);
      // state.dances.filter((dance) => dance._id !== payload.id);
      state.error = null;
      state.status = 'completed';
      return state;
    },
    [deleteDance.pending]: (state, { payload }) => {
      state.status = 'loading';
      state.error = null;
    },
    [deleteDance.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.errMsg;
      console.log(action);
    },
  },
});
