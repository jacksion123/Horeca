import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../../config/apiconfig';

export const fetchLogsData = createAsyncThunk(
  'activity/fetchLogsData',
  async ({ activityType = 'all', reference = '', page = 1 }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log("TOKEN =>", token);

      let url = '';

      // If reference is entered → pagination API
      if (reference && reference.trim() !== '') {
        url = `${BASE_URL}/horeca-gardian/app-search-staff-activity-log-history-pagination?activity_type=${activityType}&page=${page}&reference_number=${reference}`;
      } 
      // Else → normal API
      else {
        url = `${BASE_URL}/horeca-gardian/app-search-staff-activity-log-history?activity_type=${activityType}&reference_number=`;
      }

      console.log("API URL =>", url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          Forwarded: 'staff',
        },
      });

      if (!response.ok) {
        const err = await response.text();
        console.log("API ERROR =>", err);
        return rejectWithValue(err);
      }

      const data = await response.json();
      console.log("API SUCCESS =>", data);

      // Both APIs return same structure: { status, data: { row, list } }
      return data.data;

    } catch (error) {
      console.log("FETCH ERROR =>", error);
      return rejectWithValue(error.message);
    }
  }
);

const ActivityLogsSlice = createSlice({
  name: 'activity',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLogsData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLogsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ActivityLogsSlice.reducer;
