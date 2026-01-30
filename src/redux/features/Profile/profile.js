import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../../config/apiconfig'

export const fetchProfileData = createAsyncThunk(
  'profile/fetchProfileData',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      // console.log("TOKEN:", token);

      const response = await fetch(`${BASE_URL}/horeca-gardian/app-staff-profile`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Forwarded": "staff",  
        },
      });

    //   console.log("STATUS:", response.status);

      if (!response.ok) {
        const errText = await response.text();
        console.log("ERROR BODY:", errText);
        return rejectWithValue(errText);
      }
      const data = await response.json();
       console.log(data);
       
      return data.data;

    } catch (error) {
      console.log("FETCH ERROR:", error);
      return rejectWithValue(error.message);
    }
  }
);


const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfileData.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default profileSlice.reducer;
