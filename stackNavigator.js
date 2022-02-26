import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScannerScreen from './Screens/ScannerScreen';
import Home from './Screens/Home';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Scanner' component={ScannerScreen} />
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
