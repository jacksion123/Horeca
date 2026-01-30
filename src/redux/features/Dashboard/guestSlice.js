// redux/features/Dashboard/guestSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// First API (Normal search)
export const fetchGuests = createAsyncThunk(
  'guests/fetchGuests',
  async (query, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      const response = await fetch(
        `http://192.168.1.37/horeca-gardian/app-search-staff-guest-detail?q=${query}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Forwarded: 'staff',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData || 'Error fetching guests');
      }

      const data = await response.json();
      
      return data.data;   
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Second API (Pagination)
export const fetchGuestsPagination = createAsyncThunk(
  'guests/fetchGuestsPagination',
  async ({ query, page }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      const response = await fetch(
        `http://192.168.1.37/horeca-gardian/app-search-staff-guest-detail-pagination?q=${query}&page=${page}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Forwarded: 'staff',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData || 'Error fetching pagination');
      }

      const data = await response.json();
      console.log(data);
      
      return { data: data.data, page }; // {list: [...]}
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const guestSlice = createSlice({
  name: 'guests',
  initialState: {
    loading: false,
    paginationLoading: false,
    data: null,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {
    resetGuests: state => {
      state.data = null;
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: builder => {
    builder
      // First API
      .addCase(fetchGuests.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;  // overwrite
        state.page = 1;
        state.hasMore = action.payload?.list?.length > 0;
      })
      .addCase(fetchGuests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Pagination API
      .addCase(fetchGuestsPagination.pending, state => {
        state.paginationLoading = true;
      })
      .addCase(fetchGuestsPagination.fulfilled, (state, action) => {
        state.paginationLoading = false;

        const newList = action.payload.data?.list || [];

        if (newList.length === 0) {
          state.hasMore = false;
          return;
        }

        state.data.list = [...state.data.list, ...newList]; 
        state.page = action.payload.page;
      })
      .addCase(fetchGuestsPagination.rejected, (state, action) => {
        state.paginationLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetGuests } = guestSlice.actions;
export default guestSlice.reducer;
