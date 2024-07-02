import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BookingScreen from '../screens/BookingScreen';
import UserScreen from '../screens/UserScreen';
import ManageScreen from '../screens/ManageScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Booking">
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="Manage" component={ManageScreen} />
        <Stack.Screen name="User" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
