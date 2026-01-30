import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../config/apiconfig'

export const updatePassword = createAsyncThunk(
  'password/updatePassword',
  async ({ old_password, new_password, confirm_password }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      const formData = new FormData();
      formData.append('current_password', old_password);
      formData.append('new_password', new_password);
      formData.append('confirm_password', confirm_password);

      const response = await fetch(
        `${BASE_URL}/horeca-gardian/app-update-staff-password`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            "Forwarded": "staff",  
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      
       
      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const editPassword = createSlice({
  name: 'password',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetUpdatePassword: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updatePassword.pending, state => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUpdatePassword } = editPassword.actions;
export default editPassword.reducer;
