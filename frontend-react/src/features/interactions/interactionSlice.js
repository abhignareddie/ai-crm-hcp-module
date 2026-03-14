 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000';

// Async thunks
export const logInteraction = createAsyncThunk(
  'interactions/log',
  async (interactionData) => {
    const response = await axios.get(`${API_BASE}/agent?query=log ${interactionData.hcpName} meeting about ${interactionData.topic}. Follow up: ${interactionData.followUp}`);
    return response.data;
  }
);

export const getInteractions = createAsyncThunk(
  'interactions/getAll',
  async () => {
    const response = await axios.get(`${API_BASE}/agent?query=show interactions`);
    return response.data;
  }
);

export const editInteraction = createAsyncThunk(
  'interactions/edit',
  async (data) => {
    const response = await axios.get(`${API_BASE}/agent?query=edit ${data.id} ${data.newNotes}`);
    return response.data;
  }
);

export const generateEmail = createAsyncThunk(
  'interactions/email',
  async (data) => {
    const response = await axios.get(`${API_BASE}/agent?query=email ${data.name} about ${data.product}`);
    return response.data;
  }
);

export const summarizeNotes = createAsyncThunk(
  'interactions/summarize',
  async (notes) => {
    const response = await axios.get(`${API_BASE}/agent?query=summarize ${notes}`);
    return response.data;
  }
);

const initialState = {
  interactions: [],
  currentResponse: '',
  email: '',
  summary: '',
  loading: false,
  error: null,
};

export const interactionSlice = createSlice({
  name: 'interactions',
  initialState,
  reducers: {
    clearResponses: (state) => {
      state.currentResponse = '';
      state.email = '';
      state.summary = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Log Interaction
      .addCase(logInteraction.pending, (state) => {
        state.loading = true;
      })
      .addCase(logInteraction.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResponse = action.payload.response;
      })
      .addCase(logInteraction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Get Interactions
      .addCase(getInteractions.fulfilled, (state, action) => {
        state.interactions = action.payload.response;
      })
      // Generate Email
      .addCase(generateEmail.fulfilled, (state, action) => {
        state.email = action.payload.response;
      })
      // Summarize Notes
      .addCase(summarizeNotes.fulfilled, (state, action) => {
        state.summary = action.payload.response;
      });
  },
});

export const { clearResponses } = interactionSlice.actions;
export default interactionSlice.reducer;