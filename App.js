import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import ChatScreen from "./src/screens/Forum/ChatScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import { Provider } from "react-native-paper";
import ProfileScreen from "./src/screens/Profile/ProfileScreen";
import BrowseGroupsScreen from "./src/screens/Groups/BrowseGroupsScreen";
import AddChatScreen from "./src/screens/Forum/AddChatScreen";
import ViewPosts from "./src/screens/Forum/ViewPosts";

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
        <Stack.Screen name="Add Chat" component={AddChatScreen} />
        <Stack.Screen name="View Posts" component={ViewPosts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
