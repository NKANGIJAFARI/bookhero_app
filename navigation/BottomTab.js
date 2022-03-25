import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import { Colors } from '../constant/styles';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screenr
        component={HomeScreen}
        options={{
          tabBarIcon: ({ tintColor, focused }) =>
            focused ? (
              <TouchableOpacity style={styles.circleStyle}>
                <Entypo name='home' size={32} color='white' />
              </TouchableOpacity>
            ) : (
              <Entypo name='home' size={30} color={tintColor} />
            ),
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name='Schedule'
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ tintColor, focused }) =>
            focused ? (
              <TouchableOpacity style={styles.circleStyle}>
                <FontAwesome5 name='calendar-alt' size={24} color={tintColor} />
              </TouchableOpacity>
            ) : (
              <FontAwesome5 name='calendar-alt' size={24} color={tintColor} />
            ),
          headerShown: false,
        }}
      /> 
      <Tab.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          tabBarIcon: ({ tintColor, focused }) =>
            focused ? (
              <TouchableOpacity style={styles.circleStyle}>
                <MaterialIcons name='chat' size={24} color={tintColor} />
              </TouchableOpacity>
            ) : (
              <MaterialIcons name='chat' size={24} color={tintColor} />
            ),
          headerShown: false,
        }}
      />*/}
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ tintColor, focused }) =>
            focused ? (
              <TouchableOpacity style={styles.circleStyle}>
                <Ionicons name='person' size={24} color={tintColor} />
              </TouchableOpacity>
            ) : (
              <Ionicons name='person' size={24} color={tintColor} />
            ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  circleStyle: {
    height: 40.0,
    width: 50.0,
    backgroundColor: '#F5F5F5',
    backgroundColor: Colors.primary,

    borderRadius: 25.0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
