import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Title } from 'react-native-paper';

import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChatScreen from './Forum/ChatScreen';
import ProfileScreen from './Profile/ProfileScreen';
import BrowseGroupsScreen from './Groups/BrowseGroupsScreen';
import HomeStack from '../navigation/HomeStack';
import AddChatScreen from './Forum/AddChatScreen';
import ViewPosts from './Forum/ViewPosts';

import Home from './Home'

import ForumLandingPage from './Forum/ForumLandingPage';

import Calendar from './Calendar/Calendar';
import ToDo from './ToDo/ToDo';
import { List } from './List/List';

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
    return (
       /* <View>
            
            <Text> This is the home screen!</Text>
        </View>*/
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Groups" component={BrowseGroupsScreen} />
          <Tab.Screen name="Forums" component={ForumLandingPage} />
          <Tab.Screen name="Calendar" component={Calendar} />
          <Tab.Screen name="ToDo" component={ToDo} />
          <Tab.Screen name="Course Work" component={List} />
        </Tab.Navigator>
      );
}
  /*const { user, logout } = useContext(AuthContext);

  return (
      <View style={styles.container}>
        <Title>Hello, {user.displayName}!</Title>
        <FormButton
            modeValue="contained"
            title="Logout"
            onPress={() => logout()}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});*/