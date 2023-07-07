import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = '/api/';

// Create Prediction
export const createPrediction = createAsyncThunk(
  'prediction/createPrediction',
  async (predictionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user["access"];
      const response = await axios.post(`${apiUrl}create/`, predictionData,{
        headers:{
            Authorization: `Bearer ${token}`,
          }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Fetch All Predictions
export const fetchPredictions = createAsyncThunk(
  'prediction/fetchPredictions',
  async (_, thunkAPI) => {
    try {
    const token = thunkAPI.getState().auth.user["access"];
      const response = await axios.get(`${apiUrl}results/`,{
        headers:{
            Authorization: `Bearer ${token}`,
          }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Fetch Single Prediction
export const fetchSinglePrediction = createAsyncThunk(
  'prediction/fetchSinglePrediction',
  async (predictionId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user["access"];
      const response = await axios.get(`${apiUrl}result/${predictionId}/`,{
        headers:{
            Authorization: `Bearer ${token}`,
          }
      });
      return response.data;
      console.log(predictionId)
      console.log(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Print Prediction as PDF
export const printPrediction = createAsyncThunk(
  'prediction/printPrediction',
  async (predictionId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user["access"];
      const response = await axios.get(`${apiUrl}result/${predictionId}/print/`, {
        responseType: 'blob',
        headers:{
            Authorization: `Bearer ${token}`,
          }
      });
      const fileURL = URL.createObjectURL(response.data);
      window.open(fileURL, '_blank');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const predictionSlice = createSlice({
  name: 'prediction',
  initialState: {
    predictions: [],
    singlePrediction: null,
    loading: false,
    error: null,
    isSuccess:false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPrediction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPrediction.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true
        // Handle success action
      })
      .addCase(createPrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      })
      .addCase(fetchPredictions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPredictions.fulfilled, (state, action) => {
        state.loading = false;
        state.predictions = action.payload;
        state.isSuccess = true
      })
      .addCase(fetchPredictions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      })
      .addCase(fetchSinglePrediction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSinglePrediction.fulfilled, (state, action) => {
        state.loading = false;
        state.singlePrediction = action.payload;
        state.isSuccess = true
      })
      .addCase(fetchSinglePrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      });
  },
});

export default predictionSlice.reducer;
