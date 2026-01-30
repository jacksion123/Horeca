import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen'
import PartnerLogin from '../screens/auth/PartnerLogin';
import PartnerOtp from '../screens/auth/PartnerOtp'

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='partnerLogin' component={PartnerLogin} />
      <Stack.Screen name='partnerOtp' component={PartnerOtp} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
