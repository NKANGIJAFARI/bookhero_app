import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Scanner' component={scanScreen} />
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
