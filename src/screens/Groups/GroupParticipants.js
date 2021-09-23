import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { getParticipants } from "../../API/FirebaseAPI";

function GroupParticipants({ route, navigation }) {
  const [pList, setGroupsList] = useState();
  const [data, setDataList] = useState();
  const [index, setIndex] = useState(0);
  const { groupName } = route.params;

  useEffect(() => {
    getData();
  });

  function getData() {
    getParticipants(groupName, participantsRetrieved);
  }

  function participantsRetrieved(pList) {
    setGroupsList(pList);
  }

  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View style={{ height: 1, width: "100%", backgroundColor: "#C8C8C8" }} />
    );
  };

  
  const Item = ({ name }) => (
    <View style={styles.item}>
    {name["1"].map((r) => (
        <Text style={styles.itemName}>{r}</Text>
   
   ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{groupName} Participants</Text>
      <Text style={styles.captionText}>Here's a list of participants</Text>
      <FlatList
        style={styles.flatList}
        data={pList}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={({ item }) => <Item name={item} />}
      />
    </View>
  );
}

export default GroupParticipants;

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
});
