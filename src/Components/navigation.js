import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from '../Screens/signup';
import LoginScreen from '../Screens/login';
// import Chat from '../Chat';
const ScreenNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        {/* <Stack.Screen name="ChatScreen" component={Chat} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigation;
