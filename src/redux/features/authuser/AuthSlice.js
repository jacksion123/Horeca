import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../../../config/apiconfig";

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const res = await fetch(
        `${BASE_URL}/horeca-gardian/app-staff-signin`,
        {
          method: 'POST',
          headers: {
            Forwarded: 'staff',  
          },
          body: formData,
        }
      );

      const data = await res.json();
      console.log('Login Response:', data);

      if (res.ok && data.status) {
        await AsyncStorage.setItem('authToken', data.auth_token);

        return data.auth_token
      } else {
        return rejectWithValue(data.message || 'Invalid credentials');
      }
    } catch (error) {
      return rejectWithValue('Server error');
    }
  }
);

export const checkAuthToken = createAsyncThunk(
  'auth/checkAuthToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      // const user_type = await AsyncStorage.getItem('user_type');

      if (token) {
        return { token };
      } else {
        return rejectWithValue('No token found');
      }
    } catch (error) {
      return rejectWithValue('Failed to check token');
    }
  }
);

/* =======================
   GENERATE OTP
======================= */
export const generateLoginOtp = createAsyncThunk(
  'auth/generateLoginOtp',
  async ({ phone }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('mobile_no', phone);

      const res = await fetch(
        'https://stayinbraj.com/channel_manager/generate_otp_for_channel_partner_login',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();
      // console.log('Generate OTP:', data);

      if (res.ok && data.status) {
        return true;
      } else {
        return rejectWithValue(data.message || 'Failed to send OTP');
      }
    } catch (e) {
      return rejectWithValue('Server error');
    }
  }
);

/* =======================
   LOGIN WITH OTP
======================= */
export const loginWithOtp = createAsyncThunk(
  'auth/loginWithOtp',
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('mobile_no', phone);
      formData.append('for', 'OTP');
      formData.append('otp', otp);

      const res = await fetch(
        'https://stayinbraj.com/channel_manager/is_valid_user',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();
      // console.log('OTP Login:', data);

      if (res.ok && data.status) {
        await AsyncStorage.setItem('authToken', data.auth_token);
        await AsyncStorage.setItem('user_type', data.user_type);

        return {
          token: data.auth_token,
          user_type: data.user_type,
        };
      } else {
        return rejectWithValue(data.message || 'Invalid OTP');
      }
    } catch (e) {
      return rejectWithValue('Server error');
    }
  }
);


/* =======================
   LOGOUT
======================= */
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    await AsyncStorage.removeItem('authToken');
    return true;
  }
);

/* =======================
   SLICE
======================= */
const initialState = {
  loading: false,
  checkingToken: true,
  error: null,
  token: null,
  user_type: null,
  isLoggedIn: false,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* LOGIN */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user_type = action.payload.user_type;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })

      /* CHECK TOKEN */
      .addCase(checkAuthToken.pending, (state) => {
        state.checkingToken = true;
        state.error = null;
      })
      .addCase(checkAuthToken.fulfilled, (state, action) => {
        state.checkingToken = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user_type = action.payload.user_type;
      })
      .addCase(checkAuthToken.rejected, (state) => {
        state.checkingToken = false;
        state.isLoggedIn = false;
        state.token = null;
        state.user_type = null;
      })
.addCase(generateLoginOtp.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(generateLoginOtp.fulfilled, (state) => {
  state.loading = false;
})
.addCase(generateLoginOtp.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

/* LOGIN WITH OTP */
.addCase(loginWithOtp.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(loginWithOtp.fulfilled, (state, action) => {
  state.loading = false;
  state.isLoggedIn = true;
  state.token = action.payload.token;
  state.user_type = action.payload.user_type;
})
.addCase(loginWithOtp.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.isLoggedIn = false;
})
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.user_type = null;
      });
  },
});

export default AuthSlice.reducer;
