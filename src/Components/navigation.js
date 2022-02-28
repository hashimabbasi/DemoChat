import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from '../Screens/signup';
import LoginScreen from '../Screens/login';
import Chat from '../Screens/Chat';
import Inbox from '../Screens/inbox';
const ScreenNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen}   
        options={{
          headerShown: false
      }}
        />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ChatScreen" component={Chat} />
        <Stack.Screen name="InboxScreen" component={Inbox} 
        
        options={{ title: 'Inbox' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigation