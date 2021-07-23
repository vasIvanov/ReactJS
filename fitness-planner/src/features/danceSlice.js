import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userLogout } from './userSlice';

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

export const getUserCreatedDances = createAsyncThunk(
  'dance/getUserCreatedDances',
  async (userId) => {
    const res = await fetch(
      `http://localhost:9999/api/dance${userId ? `?userId=${userId}` : ''}`
    );

    const json = await res.json();

    return res.status === 200 ? json : Promise.reject(json);
  }
);

export const createDance = createAsyncThunk(
  'dance/createDance',
  async ({ data, history }) => {
    const res = await fetch(`http://localhost:9999/api/dance/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    const json = await res.json();
    if (json.errMsg) {
      return json;
    } else {
      history.push('/plans');
      return json;
    }
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

export const editDance = createAsyncThunk(
  'dance/editDance',
  async ({ id, data, history }) => {
    const res = await fetch(`http://localhost:9999/api/dance/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    const json = await res.json();
    if (json.errMsg) {
      return json;
    } else {
      history.push('/plans');
      return json;
    }
  }
);

export const postDanceComment = createAsyncThunk(
  'dance/postDanceComment',
  async ({ danceId, data }, { rejectWithValue }) => {
    const res = await fetch(
      `http://localhost:9999/api/dance/comment/${danceId}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      }
    );

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
    userCreatedDances: null,
  },
  reducers: {
    selectDance: (state, action) => {
      const selectedDance = state.dances.find(
        (dance) => dance._id === action.payload.id
      );
      const index = state.dances.indexOf(selectedDance);
      state.dances[index].comments.push(action.payload.comment);
    },
  },
  extraReducers: {
    [getDances.fulfilled]: (state, { payload }) => {
      state.dances = payload;
      state.status = 'completed';
      return state;
    },
    [getDances.pending]: (state) => {
      state.status = 'loading';
    },
    [getDances.rejected]: (state) => {
      state.status = 'failed';
    },
    [createDance.fulfilled]: (state, { payload }) => {
      if (payload.errMsg) {
        state.error = payload.errMsg;
        state.status = 'completed';
      } else {
        state.dances.unshift(payload);
        if (state.userCreatedDances !== null) {
          state.userCreatedDances.unshift(payload);
        }
        state.error = null;
        state.status = 'completed';
      }

      return state;
    },
    [createDance.pending]: (state, { payload }) => {
      state.status = 'loading';
      state.error = null;
    },
    [createDance.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.errMsg;
    },
    [deleteDance.fulfilled]: (state, { payload }) => {
      const index = state.dances.findIndex((dance) => dance._id === payload.id);

      if (index !== -1) {
        state.dances.splice(index, 1);
      }
      if (state.userCreatedDances !== null) {
        const index = state.userCreatedDances.findIndex(
          (dance) => dance._id === payload.id
        );
        if (index !== -1) {
          state.userCreatedDances.splice(index, 1);
        }
      }

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
    },
    [editDance.fulfilled]: (state, { payload }) => {
      if (payload.errMsg) {
        state.error = payload.errMsg;
        state.status = 'completed';
        return state;
      }

      const danceToEdit = state.dances.find(
        (dance) => dance._id === payload._id
      );

      const index = state.dances.indexOf(danceToEdit);
      state.dances[index] = payload;
      state.error = null;
      state.status = 'completed';

      return state;
    },
    [editDance.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [editDance.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.errMsg;
    },
    [postDanceComment.fulfilled]: (state, { payload }) => {
      const danceToEdit = state.dances.find(
        (dance) => dance._id === payload._id
      );
      const index = state.dances.indexOf(danceToEdit);
      state.dances[index] = payload;
      state.dances.filter((dance) => dance._id !== payload.id);
      state.error = null;
      state.status = 'completed';

      return state;
    },
    [postDanceComment.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [postDanceComment.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [getUserCreatedDances.fulfilled]: (state, { payload }) => {
      state.userCreatedDances = payload;
      state.error = null;
      state.status = 'completed';

      return state;
    },
    [getUserCreatedDances.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [getUserCreatedDances.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [userLogout.fulfilled]: (state) => {
      state.userCreatedDances = null;
    },
  },
});

export const { selectDance } = danceSlice.actions;
