import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../../config/apiconfig'
/* 1. Fetch Bills List */
export const fetchHotelBills = createAsyncThunk(
  'bills/fetchHotelBills',
  async ({ from_date, to_date }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken')

      const res = await axios.get(
        `http://192.168.1.37/horeca-gardian/app-get-staff-hotel-bills`,
        {
          params: { from_date, to_date },
          headers: {
            Authorization: `Bearer ${token}`,
            Forwarded: 'staff',
          },
        }
      )
      console.log(res.data);
      return res.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong')
    }
  }
)

export const fetchInvoiceByLink = createAsyncThunk(
  'bills/fetchInvoiceByLink',
  async ({ bill_link }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken')
      console.log("TOKEN:", token)

      // Replace localhost with your IP
      const finalUrl = bill_link.replace(
        'http://localhost',
        'http://192.168.1.37'
      )

      
      console.log("FINAL URL:", finalUrl)

      const res = await axios.get(finalUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Forwarded: 'staff',
        },
      })

      console.log("INVOICE RESPONSE:", res.data)

      return res.data
    } catch (error) {
      console.log("INVOICE ERROR:", error.response?.data || error.message)
      return rejectWithValue(error.response?.data || 'Unable to load invoice')
    }
  }
)


const BillSlice = createSlice({
  name: 'bills',
  initialState: {
    data: [],
    invoiceData: null,
    invoiceLoading: false,
    loading: false,
    error: null,
    invoiceError: null,
    success: false,
  },
  reducers: {
    clearInvoice: state => {
      state.invoiceData = null
      state.invoiceError = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHotelBills.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchHotelBills.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchHotelBills.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchInvoiceByLink.pending, state => {
        state.invoiceLoading = true
        state.invoiceError = null
      })
      .addCase(fetchInvoiceByLink.fulfilled, (state, action) => {
        state.invoiceLoading = false
        state.invoiceData = action.payload
      })
      .addCase(fetchInvoiceByLink.rejected, (state, action) => {
        state.invoiceLoading = false
        state.invoiceError = action.payload
      })
    
  },
})

export const { clearInvoice } = BillSlice.actions
export default BillSlice.reducer
