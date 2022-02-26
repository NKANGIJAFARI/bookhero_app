import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  <Stack.Navigator>
    <Stack.Screen name='Home' component={Home} />
    <Stack.Screen name='Scanner' component={scanScreen} />
  </Stack.Navigator>;
};
