import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/PropertyScreen/Home';
import RoomStatus from '../screens/PropertyScreen/RoomStatus'
import CreateBooking from '../screens/PropertyScreen/CreateBooking'
import Expense from '../screens/PropertyScreen/Expense'
import ItemInventory from '../screens/PropertyScreen/ItemInventory'
import Staff from '../screens/PropertyScreen/Staff'
import TravelAgent from '../screens/PropertyScreen/TravelAgent'
import AccountSummary from '../screens/PropertyScreen/AccountSummary'
import Reports from '../screens/PropertyScreen/Reports';
import Appearance from '../screens/PropertyScreen/Appearance'
import GuestDetails from '../screens/PropertyScreen/GuestDetails'
import ActivityLogs from '../screens/PropertyScreen/ActivityLogs'

const Stack = createNativeStackNavigator();

const PropertyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PropertyHome" component={Home} />
      <Stack.Screen name='RoomStatus' component={RoomStatus} />
      <Stack.Screen name='CreateBooking' component={CreateBooking} />
      <Stack.Screen name='Expense' component={Expense} />
      <Stack.Screen name='Iteminventory' component={ItemInventory}/>
      <Stack.Screen name='staff' component={Staff}/>
      <Stack.Screen name='TravelAgent' component={TravelAgent}/>
      <Stack.Screen name='AccountSummary' component={AccountSummary} />
      <Stack.Screen name='reports' component={Reports} />
      <Stack.Screen name='appearance' component={Appearance} />
      <Stack.Screen name='GuestDetail' component={GuestDetails} />
      <Stack.Screen name='activityLogs' component={ActivityLogs} />
    </Stack.Navigator>
  );
};

export default PropertyStack;
