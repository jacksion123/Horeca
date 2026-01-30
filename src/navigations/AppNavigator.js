// navigation/AppNavigator.js
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import { checkAuthToken } from '../redux/features/authuser/AuthSlice';
import AuthNavigator from '../navigations/AuthNavigator'
import TabNavigator from '../navigations/TabNavigator';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, checkingToken } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuthToken());
  }, [dispatch]);

  // Loader while checking token
  if (checkingToken) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#9b0d0dff" />
      </View>
    );
  }
return (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!isLoggedIn && (
      <Stack.Screen name="LoginScreen" component={AuthNavigator} />
    )}

    {isLoggedIn && (
      <Stack.Screen name="HotelApp" component={TabNavigator} />
    )}
  </Stack.Navigator>
);

};

export default AppNavigator;
