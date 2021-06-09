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
  async ({ data, history }, { rejectWithValue }) => {
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
  async ({ id, data, history }, { rejectWithValue }) => {
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
    [getDances.pending]: (state, { payload }) => {
      state.status = 'loading';
    },
    [getDances.rejected]: (state, { payload }) => {
      state.status = 'failed';
    },
    [createDance.fulfilled]: (state, { payload }) => {
      if (payload.errMsg) {
        state.error = payload.errMsg;
        state.status = 'completed';
      } else {
        state.dances.push(payload);
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
    },
    [editDance.fulfilled]: (state, { payload }) => {
      if (payload.errMsg) {
        state.error = payload.errMsg;
        state.status = 'completed';
      } else {
        const danceToEdit = state.dances.find(
          (dance) => dance._id === payload._id
        );

        const index = state.dances.indexOf(danceToEdit);
        state.dances[index] = payload;
        state.dances.filter((dance) => dance._id !== payload.id);
        state.error = null;
        state.status = 'completed';
      }

      return state;
    },
    [editDance.pending]: (state, { payload }) => {
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
    [postDanceComment.pending]: (state, { payload }) => {
      state.status = 'loading';
      state.error = null;
    },
    [postDanceComment.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { selectDance } = danceSlice.actions;
