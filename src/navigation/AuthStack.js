import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';


import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BrowseGroupsScreen from '../screens/BrowseGroupsScreen';
import AddChatScreen from '../screens/AddChatScreen';
import ViewPosts from '../screens/ViewPosts';


const Stack = createStackNavigator();

export default function AuthStack() {
  return (
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Groups" component={BrowseGroupsScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="ViewPosts" component={ViewPosts} />
      </Stack.Navigator>
  );
}