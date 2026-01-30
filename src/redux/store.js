import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../redux/features/authuser/AuthSlice'
import homeReducer from '../redux/features/Dashboard/HomeSlice'
import ProfileReducer from '../redux/features/Profile/profile'
import editPasswordReducer from '../redux/features/Profile/editPassword'
import ActivityLogsReducer from './features/ActivityLogs/ActivityLogs'
import guestReducer from './features/Dashboard/guestSlice' 
import BillReducer from '../redux/features/Dashboard/BillSlice'
import expenseReducer from '../redux/features/Dashboard/ExpenseSlice'

export const store = configureStore({
  reducer: {
    // Authentication
    auth: AuthReducer,
    home: homeReducer,
    profile: ProfileReducer,
    editPassword:editPasswordReducer,
    activity: ActivityLogsReducer,
    guests:guestReducer,
    bills:BillReducer,
    expense:expenseReducer
  },
});

export default store;
