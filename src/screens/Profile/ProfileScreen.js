import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Button,
} from "react-native";
import { getUserInfo } from "../../API/FirebaseAPI";

import { auth, db } from "../../firebase";

function ProfileScreen({navigation}) {
  var user = auth.currentUser;
  var userEmail = user.email.toString();

  const [dataList, setDataList] = useState();

  useEffect(() => {
    getData();
  });

  function getData() {
    getUserInfo(userEmail, dataRetrieved);
  }

  function dataRetrieved(dataList) {
    setDataList(dataList);
  }

  const Personal = ({ name }) => (
    <View>
      <Text style={styles.userInfoSubTitle}> Name: {name["name"]}</Text>
      <Text style={styles.userInfoSubTitle}> Surname: {name["surname"]}</Text>
      <Text style={styles.userInfoSubTitle}> Hometown: {name["hometown"]}</Text>
    </View>
  );

  const Academics = ({ name }) => (
    <View>
      <Text style={styles.userInfoSubTitle}> Degree: {name["degree"]}</Text>
      <Text style={styles.userInfoSubTitle}> Year: {name["year"]}</Text>
    </View>
  );

  const Groups = ({ name }) => (
    <View>
      {name["groups"].map((r) => (
        <Text style={styles.userInfoSubTitle}>{r}</Text>
      ))}
    </View>
  );

  const Likes = ({ name }) => (
    <View>
      <Text style={styles.userInfoSubTitle}> Degree: {name["degree"]}</Text>
      <Text style={styles.userInfoSubTitle}> Year: {name["year"]}</Text>
    </View>
  );

  async function logout (){
    try{
      await auth.signOut();
      navigation.navigate("Login")
    }catch(e){
      console.log("Could not logout");
    }
}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={styles.userImg}
          source={require("../../assets/user1.jpeg")}
        />
        <Text style={styles.userName}>{user.displayName}</Text>
        <Text style={styles.emailText}>{user.email}</Text>

        <View style={styles.contactBtnWrapper}>
          <Button
            style={styles.contactBtn}
            title="Edit"
            onPress={() => navigation.navigate("Edit Profile") }
                //Linking.openURL("mailto:" + userEmail)}
          />
          <Button
          style={styles.logoutBtn}
          title="Log Out"
          onPress={() => logout() }/>
        </View>

        <View style={styles.userInfoWrapper}>
          <View styles={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>Personal Details</Text>
            <FlatList
              style={styles.flatList}
              data={dataList}
              renderItem={({ item }) => <Personal name={item} />}
            />
            <Text style={styles.userInfoTitle}>Academics</Text>
            <FlatList
              style={styles.flatList}
              data={dataList}
              renderItem={({ item }) => <Academics name={item} />}
            />

            <Text style={styles.userInfoTitle}>Groups Joined</Text>
            <FlatList
              style={styles.flatList}
              data={dataList}
              renderItem={({ item }) => <Groups name={item} />}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 28,
  },

  userImg: {
    height: 158,
    width: 158,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  emailText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  contactBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  contactBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  contactBtnTxt: {
    color: "#2e64e5",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  flatList: {
    width: 700,
    height: 100,
  },
});
