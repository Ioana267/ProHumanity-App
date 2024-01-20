// MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Home from './screens/Home';
import Planet from './screens/Planet';
import ArticlesStack from './screens/ArticlesStack';
import Settings from './screens/Settings';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 100,
          backgroundColor: '#ADDFAD',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="home" size={24} color={focused ? '#4f6f52' : '#111'} />
          ),
        }}
      />
      <Tab.Screen
        name="Planet"
        component={Planet}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="globe" size={24} color={focused ? '#4f6f52' : '#111'} />
          ),
        }}
      />
      <Tab.Screen
        name="Articles"
        component={ArticlesStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="book" size={24} color={focused ? '#4f6f52' : '#111'} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="settings" size={24} color={focused ? '#4f6f52' : '#111'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;