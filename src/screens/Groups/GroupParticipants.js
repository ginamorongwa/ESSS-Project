import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Button,
    TouchableOpacity,
  } from "react-native";

function GroupParticipants({route, navigation}) {

    const { groupName } = route.params;

    return (
        <View style={styles.container}>
          <Text style={styles.titleText}>{groupName} Participants</Text>
          <Text style={styles.captionText}>
            Here's a list of participants 
          </Text>
          <FlatList
            style={styles.flatList}
            data={groupsList}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={({ item }) => <Item name={item} />}
          />
        </View>
      );
}

export default GroupParticipants

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

})