import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Property from '../tabs/Property';
// import Reviews from '../screens/propertyscreens/Reviews'
import ProfileScreen from '../screens/Profile/ProfileScreen'
// import HelpCentre from '../screens/profile/HelpCentre'
import EditPassword from '../screens/Profile/EditPassword'

const Stack = createNativeStackNavigator();

const PropertyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='Editpassword' component={EditPassword}/>
      {/* <Stack.Screen name='Reviews' component={Reviews} />
      <Stack.Screen name='HelpCentre' component={HelpCentre} /> */}
    </Stack.Navigator>
  );
};

export default PropertyStack;
