import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Calendar from "./src/screens/Calendar/Calendar";
import ToDo from "./src/screens/ToDo/ToDo";
import ChatScreen from "./src/screens/Forum/ChatScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import ProfileScreen from "./src/screens/Profile/ProfileScreen";
import BrowseGroupsScreen from "./src/screens/Groups/BrowseGroupsScreen";
import AddChatScreen from "./src/screens/Forum/AddChatScreen";
import ViewPosts from "./src/screens/Forum/ViewPosts";
import ViewGroupForum from "./src/screens/Forum/ViewGroupForum";
import AddPostScreen from "./src/screens/Forum/AddPostScreen";
import GroupParticipants from "./src/screens/Groups/GroupParticipants";
import { List } from "./src/screens/List/List";
const Stack = createStackNavigator();

export default function App() {
  return (
   // <Provider />
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Groups" component={BrowseGroupsScreen} />
        <Stack.Screen name="Group Participants" component={GroupParticipants} />
        <Stack.Screen name="Start Post" component={AddChatScreen} />
        <Stack.Screen name="View Posts" component={ViewPosts} />
        <Stack.Screen name="View Forum" component={ViewGroupForum} />
        <Stack.Screen name="Add Post" component={AddPostScreen} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="ToDo" component={ToDo} />
        <Stack.Screen name="Course Work" component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
