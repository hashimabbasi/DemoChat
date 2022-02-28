import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import Signup from '../Screens/signup';
import LoginScreen from '../Screens/login';
import Chat from '../Screens/Chat';
import Inbox from '../Screens/inbox';
const ScreenNavigation = ({navigation}) => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer  >
      <Stack.Navigator screenOptions={{
         headerStyle: {
          backgroundColor: '#03045E',
        },
        headerTintColor: '#fff',
      }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen}   
        options={{
          headerShown: false
      }}
        />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ChatScreen" component={Chat} 
        options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen name="InboxScreen" component={Inbox} 
        options={{ title: 'Inbox',
      }}
        
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#03045E',
    color: 'white',
    borderRadius: 5,
  },
});
export default ScreenNavigation