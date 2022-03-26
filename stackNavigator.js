import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPasswordScreen from './Screens/Auth/ForgotPasswordScreen';
import WelcomeScreen from './Screens/Auth/WelcomeScreen';
import RegisterScreen from './Screens/Auth/RegisterScreen';
import SplashScreen from './Screens/SplashScreen';
import BottomTabScreen from './navigation/BottomTab';

import { useSelector, useDispatch } from 'react-redux';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useSelector((state) => state.UserState);
  console.log('user', user);

  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen
        name='Splash'
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />

      {user.authenticated ? (
        <>
          <Stack.Screen
            name='BottomTabScreen'
            component={BottomTabScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
