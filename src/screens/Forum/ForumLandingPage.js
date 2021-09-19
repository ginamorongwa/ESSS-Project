import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";

import { getJoinedGroups, submitSubject} from "../../API/FirebaseAPI";
import { auth } from "../../firebase/index";
import AddPostScreen from "./AddPostScreen";

function ForumLandingPage({navigation}) {
  const [groupsList, setGroupsList] = useState();

  var user = auth.currentUser;

  useEffect(() => {
    getData();
  });

  function getData() {
    getJoinedGroups(user.email, groupsRetrieved);
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
      {name.map((r) => (
        <TouchableOpacity
          item={r}
          onPress={() =>
           // submitSubject()
            navigation.navigate("View Posts" /*"Groups", {group : item}*/)
          }
        >
          <Text style={styles.itemName}>{r}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Group Forums</Text>
      <Text style={styles.captionText}>
        Click on a group to view their forum
      </Text>
      <FlatList
        style={styles.flatList}
        // ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
        data={groupsList}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={({ item }) => (
          //.log({item}
          <Item name={item} />
        )}
        /* keyExtractor={(item) => item.id}
                          renderItem={({item}) => 
                           }*/
      />
    </View>
  );
}

export default ForumLandingPage;

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
