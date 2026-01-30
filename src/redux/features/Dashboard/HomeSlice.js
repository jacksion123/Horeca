import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {BASE_URL} from '../../../config/apiconfig'

// Async thunk to fetch review data
export const fetchHomeData = createAsyncThunk(
  'home/fetchHomeData',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log("TOKEN:", token);

      const response = await fetch(
        `${BASE_URL}/horeca-gardian/app-staff-hotel-dashboard`,
        {
          method: 'GET',
          headers: {
            // 'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Forwarded': 'staff',
          },
        }
        
      );

      // Check if API failed
      if (!response.ok) {
        const errorData = await response.text();
        console.log("SERVER ERROR:", errorData);
        return rejectWithValue(errorData || "Something went wrong");
      }

      const json = await response.json();
      console.log(json);

      return json;

    } catch (error) {
      console.log("FETCH ERROR:", error);
      return rejectWithValue(error.message);
    }
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
   extraReducers: (builder) => {
  builder
    // 🔹 FETCH HOME DATA
    .addCase(fetchHomeData.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchHomeData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchHomeData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

}

});

export default homeSlice.reducer;
