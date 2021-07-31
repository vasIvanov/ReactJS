import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userLogout } from './userSlice';
const test = '';
export const getPlans = createAsyncThunk(
  'plan/getPlans',
  async (id, limit, userId, query) => {
    try {
      const res = await fetch(
        `http://localhost:9999/api/plan${id ? `/${id}` : ''}${
          limit ? `?limit=${limit}` : ''
        }${userId ? `?userId=${userId}` : ''}${query ? `?query=${query}` : ''}`
      );

      const json = await res.json();

      return res.status === 200 ? json : Promise.reject(json);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUserCreatedPlans = createAsyncThunk(
  'plan/getUserCreatedPlans',
  async (userId) => {
    try {
      const res = await fetch(
        `http://localhost:9999/api/plan${userId ? `?userId=${userId}` : ''}`
      );

      const json = await res.json();

      return res.status === 200 ? json : Promise.reject(json);
    } catch (error) {
      console.log(error);
    }
  }
);

export const postPlanComment = createAsyncThunk(
  'plan/postPlanComment',
  async ({ planId, data }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:9999/api/plan/comment/${planId}`,
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
    } catch (error) {
      console.log(error);
    }
  }
);

export const createPlan = createAsyncThunk(
  'plan/createPlan',
  async ({ data, history }) => {
    try {
      const res = await fetch(`http://localhost:9999/api/plan/`, {
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
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletePlan = createAsyncThunk(
  'plan/deletePlan',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:9999/api/plan/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
      });

      const json = await res.json();

      return res.status === 200 ? json : rejectWithValue(json);
    } catch (error) {
      console.log(error);
    }
  }
);

export const editingPlan = createAsyncThunk(
  'plan/editPlan',
  async ({ id, data, history }) => {
    try {
      const res = await fetch(`http://localhost:9999/api/plan/${id}`, {
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
    } catch (error) {
      console.log(error);
    }
  }
);

export const planSlice = createSlice({
  initialState: {
    plans: null,
    status: null,
    error: null,
    userCreatedPlans: null,
  },
  name: 'plan',
  reducers: {},
  extraReducers: {
    [getPlans.fulfilled]: (state, { payload }) => {
      state.plans = payload;
      state.status = 'completed';
      return state;
    },
    [getPlans.pending]: (state) => {
      state.status = 'loading';
    },
    [getPlans.rejected]: (state) => {
      state.status = 'failed';
    },
    [getUserCreatedPlans.fulfilled]: (state, { payload }) => {
      state.userCreatedPlans = payload;
      state.status = 'completed';
      return state;
    },
    [getUserCreatedPlans.pending]: (state) => {
      state.status = 'loading';
    },
    [getUserCreatedPlans.rejected]: (state) => {
      state.status = 'failed';
    },
    [postPlanComment.fulfilled]: (state, { payload }) => {
      const planToEdit = state.plans.find((plan) => plan._id === payload._id);
      const index = state.plans.indexOf(planToEdit);
      state.plans[index] = payload;
      state.plans.filter((plan) => plan._id !== payload.id);
      state.error = null;
      state.status = 'completed';

      return state;
    },
    [postPlanComment.pending]: (state) => {
      state.status = 'loading';
    },
    [postPlanComment.rejected]: (state, { payload }) => {
      state.status = 'failed';
    },
    [createPlan.fulfilled]: (state, { payload }) => {
      if (payload.errMsg) {
        state.error = payload.errMsg;
        state.status = 'completed';
      } else {
        state.plans.unshift(payload);
        if (state.userCreatedPlans !== null) {
          state.userCreatedPlans.unshift(payload);
        }
        state.error = null;
        state.status = 'completed';
      }
      return state;
    },
    [createPlan.pending]: (state) => {
      state.status = 'loading';
    },
    [createPlan.rejected]: (state) => {
      state.status = 'failed';
    },
    [deletePlan.fulfilled]: (state, { payload }) => {
      const index = state.plans.findIndex((plan) => plan._id === payload.id);
      if (index !== -1) {
        state.plans.splice(index, 1);
      }
      if (state.userCreatedPlans !== null) {
        const index = state.userCreatedPlans.findIndex(
          (plan) => plan._id === payload.id
        );
        if (index !== -1) {
          state.userCreatedPlans.splice(index, 1);
        }
      }

      state.error = null;
      state.status = 'completed';
      return state;
    },
    [deletePlan.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [deletePlan.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [userLogout.fulfilled]: (state) => {
      state.userCreatedPlans = null;
    },
    [editingPlan.fulfilled]: (state, { payload }) => {
      if (payload.errMsg) {
        state.error = payload.errMsg;
        state.status = 'completed';
      } else {
        const planToEdit = state.plans.find((plan) => plan._id === payload._id);

        const index = state.plans.indexOf(planToEdit);
        state.plans[index] = payload;
        state.error = null;
        state.status = 'completed';
      }

      return state;
    },
    [editingPlan.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [editingPlan.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});
