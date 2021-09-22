import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

function AddPostScreen({ route, navigation }) {
  const { docID } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{docID}</Text>
      <Text style={styles.captionText}>
        There are currently no questions on the forum. Click to add a post.
      </Text>
      <Button
        style={styles.addButton}
        title="Add Forum Post"
        onPress={() => navigation.navigate("Start Post", {docID : docID})}
      />
    </View>
  );
}

export default AddPostScreen;

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
    marginTop: 100,
    padding: 50,
    fontSize: 18,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
});
