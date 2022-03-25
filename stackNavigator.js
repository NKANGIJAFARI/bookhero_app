import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScannerScreen from './Screens/ScannerScreen';
import Home from './Screens/Home';
import ForgotPasswordScreen from './Screens/Auth/ForgotPasswordScreen';
import WelcomeScreen from './Screens/Auth/WelcomeScreen';
import RegisterScreen from './Screens/Auth/RegisterScreen';
import SplashScreen from './Screens/SplashScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen
        name='Splash'
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name='Scanner' component={ScannerScreen} />
      <Stack.Screen name='Home' component={Home} />

      <Stack.Screen
        name='Welcome'
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='Register'
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='ForgotPasswordScreen'
        component={ForgotPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
