import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import BrowseGroupsScreen from "../screens/Groups/BrowseGroupsScreen";
import ChatScreen from "../screens/Forum/ChatScreen";
import AddChatScreen from "../screens/Forum/AddChatScreen";


const Tab = createMaterialTopTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator initialRouteName = "Home" component= {HomeScreen}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Groups" component={BrowseGroupsScreen} />
      <Tab.Screen name="Forums" component={ChatScreen} />
      <Tab.Screen name="AddChat" component={AddChatScreen} />
    </Tab.Navigator>
  );
}
