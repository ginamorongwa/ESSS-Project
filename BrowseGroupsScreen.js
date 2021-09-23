import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Button } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { getGroups, joinGroup } from "../../API/FirebaseAPI";
import ListItem from "../../ListItem";
import { auth, db } from "../../firebase";

//import {getGroups} from '../API/FirebaseAPI'

// when you initially open the screen, list groups - have a join option

// when you click on a group, view participants

function BrowseGroupsScreen() {
  const [groupsList, setGroupsList] = useState();

  var user = auth.currentUser;

  useEffect(() => {
    getData();
  });

  function getData() {
    getGroups(groupsRetrieved);
  }

  function groupsRetrieved(groupsList) {
    setGroupsList(groupsList);
  }

  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View style={{ height: 1, width: "100%", backgroundColor: "#C8C8C8" }} />
    );
  };

  const Item = ({ name }) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{name}</Text>
      <View>
        <Button style={styles.joinButton} title = "Join" onPress = {() => {joinGroup(user.displayName, user.email, name)}}/>
      </View>
    </View>
  );

  /*onGroupsReceived = (foodList) => {
        this.setState(prevState => ({
          foodList: prevState.foodList = foodList
        }));
      }
    
    componentDidMount() {
        getFoods(this.onGroupsReceived);
    }*/

  //console.log(getGroups());

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Groups</Text>
      <Text style={styles.captionText}>
        Join a group that is of interest or click to view participants
      </Text>
      <FlatList
        style={styles.flatList}
        // ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
        data={groupsList}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={({ item }) => <Item name={item} />}
        /*keyExtractor={(item) => item.id}
                        renderItem={({item}) => 
                        <ListItem item={item}
                        onPress={()=> navigation.navigate("Groups", {group : item})}/> }*/
      />
    </View>
  );
}

export default BrowseGroupsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    padding: 30,
    fontSize: 45,
    fontWeight: "bold",
  },
  captionText: {
    padding: 20,
    fontSize: 18,
  },
  item: {
    height: 75,
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  itemName: {
    fontSize: 20,
  },
  flatList: {
    width: 700,
    height: 100,
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  joinButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
});
