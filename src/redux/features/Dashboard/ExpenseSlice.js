// redux/features/Expense/expenseSlice.js
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../../config/apiconfig'

/* ================================
   1. First API (Normal Search)
================================ */
export const fetchExpenseData = createAsyncThunk(
  'expense/fetchExpenseData',
  async ({ from_date, to_date }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken')

      const res = await axios.get(
        `${BASE_URL}/horeca-gardian/app-search-hotel-expense`,
        {
          params: { from_date, to_date },
          headers: {
            Authorization: `Bearer ${token}`,
            Forwarded: 'staff',
          },
        }
      )

      console.log('Expense First API:', res.data)
      return res.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong')
    }
  }
)

/* ================================
   2. Second API (Pagination)
================================ */
export const fetchExpensePagination = createAsyncThunk(
  'expense/fetchExpensePagination',
  async ({ from_date, to_date, page }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken')

      const res = await axios.get(
        `${BASE_URL}/horeca-gardian/app-search-hotel-expense-pagination`,
        {
          params: { from_date, to_date, page },
          headers: {
            Authorization: `Bearer ${token}`,
            Forwarded: 'staff',
          },
        }
      )

      console.log('Expense Pagination API:', res.data)
      return { data: res.data.data, page }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong')
    }
  }
)
export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (formData, { rejectWithValue }) => {
    try {
         const token = await AsyncStorage.getItem('authToken')

      
      const response = await fetch(
        `${BASE_URL}/horeca-gardian/app-hotel-staff-add-expense`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            'Forwarded': 'staff'
          },
          body: formData,
        }
      );

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        return rejectWithValue(result);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    loading: false,
    paginationLoading: false,
    data: null,          // same like guestSlice (object with list)
    error: null,
    page: 1,
    hasMore: true,
    success: false,

    // extra fields you already had
    invoiceData: null,
    invoiceLoading: false,
    invoiceError: null,
  },

  reducers: {
    resetExpense: state => {
      state.data = null
      state.page = 1
      state.hasMore = true
    },
    clearInvoice: state => {
      state.invoiceData = null
      state.invoiceError = null
    },
     resetExpenseStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder
      /* -------- First API -------- */
      .addCase(fetchExpenseData.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchExpenseData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload       // overwrite
        state.page = 1
        state.hasMore = action.payload?.list?.length > 0
      })
      .addCase(fetchExpenseData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      /* -------- Pagination API -------- */
      .addCase(fetchExpensePagination.pending, state => {
        state.paginationLoading = true
      })
      .addCase(fetchExpensePagination.fulfilled, (state, action) => {
        state.paginationLoading = false

        const newList = action.payload.data?.list || []

        if (newList.length === 0) {
          state.hasMore = false
          return
        }

        // Append new data
        state.data.list = [...state.data.list, ...newList]
        state.page = action.payload.page
      })
      .addCase(fetchExpensePagination.rejected, (state, action) => {
        state.paginationLoading = false
        state.error = action.payload
      })
        .addCase(addExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
})

export const { resetExpense, clearInvoice,resetExpenseStatus } = expenseSlice.actions
export default expenseSlice.reducer
