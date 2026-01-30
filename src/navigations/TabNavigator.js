import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropertyStack from './PropertyStack';
import ProfileStack from '../navigations/ProfileStack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RoomStatus from '../screens/PropertyScreen/RoomStatus';
import CreateBooking from '../screens/PropertyScreen/CreateBooking';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      
      <Tab.Screen 
        name="Home" 
        component={PropertyStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen 
        name="Booking" 
        component={CreateBooking}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event-available" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen 
        name="Room Status" 
        component={RoomStatus}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="hotel" size={size} color={color} />
          )
        }}
      />
      
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" size={size} color={color} />
          )
        }}
      />

    </Tab.Navigator>
  );
};

export default TabNavigator;
