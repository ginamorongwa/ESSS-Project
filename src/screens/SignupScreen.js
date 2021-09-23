import React, { useState, useContext } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import { IconButton, Title, TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";

import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import { auth, db } from "../firebase/index";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { AuthContext } from "../navigation/AuthProvider";

const { width, height } = Dimensions.get("screen");

function SignupScreen({ navigation }) {
  const [displayName, setDisplayName] = useState();
  const [fname, setFirstName] = useState();
  const [sname, setSurname] = useState();
  const [degree, setDegree] = useState();
  const [year, setYear] = useState("0");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  //const [imageUrl, setImageUrl] = useState("");

  const { register } = useContext(AuthContext);

  const signup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user
          .updateProfile({
            displayName: displayName,
            /*photoURL: imageUrl
            ? imageUrl
            : "https://www.trackergps.com/canvas/images/icons/avatar.jpg",*/
          })
          .catch(function (error) {});
        navigation.popToTop();
        // ...
      })

      .catch((error) => {
        console.log(error);
        alert(error.message);
        // ..
      });

    if (password != confirmPassword) {
      alert("Password does not match");
    }

    db.collection("users").doc(email).set({
      name: fname,
      surname: sname,
      displayName: displayName,
      degree: degree,
      year: year,
      groups: {},
    });
  };

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Let's get started!</Title>
      <View style={styles.inputView}>
        <TextInput
          style={{ marginBottom: 5, width: width / 3, marginEnd: 10 }}
          label="First Name"
          value={fname}
          autoCapitalize="none"
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={{ marginBottom: 5, width: width / 3.06, marginEnd: 10 }}
          label="Surname"
          value={sname}
          autoCapitalize="none"
          onChangeText={(text) => setSurname(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={{ marginBottom: 5, width: width / 3, marginEnd: 10 }}
          label="Display Name"
          value={displayName}
          autoCapitalize="none"
          onChangeText={(text) => setDisplayName(text)}
        />
        <TextInput
          style={{ marginBottom: 5, width: width / 3.06, marginEnd: 10 }}
          label="Email"
          value={email}
          iconType="user"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={{ marginBottom: 5, width: width / 3, marginEnd: 10 }}
          label="Degree Registered For"
          value={degree}
          autoCapitalize="none"
          onChangeText={(text) => setDegree(text)}
        />

        {/* <Picker
          style={{
            marginTop: 10,
            marginBottom: 10,
            width: width / 3.06,
            height: 50,
            marginEnd: 10,
          }}
          selectedValue={year}
          onValueChange={(item) => setYear(item)}
        > */}
          {/* <Picker.Item
            label="Please select your current academic year..."
            value="0"
          />
          <Picker.Item label="First Year" value="1" />
          <Picker.Item label="Second Year" value="2" />
          <Picker.Item label="Third Year" value="3" />
          <Picker.Item label="Forth Year" value="4" />
          <Picker.Item label="Fifth Year" value="5" />
          <Picker.Item label="Sixth+ Year" value="6+" />
        </Picker> */}
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={{ marginBottom: 5, width: width / 3, marginEnd: 10 }}
          label="Password"
          secureTextEntry={true}
          iconType="lock"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={{ marginBottom: 5, width: width / 3.06, marginEnd: 10 }}
          label="Confirm Password"
          value={confirmPassword}
          secureTextEntry={true}
          iconType="lock"
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>

      {/* <FormInput
        placeholder='Enter your image url'
        label='Profile Picture'
        leftIcon={{ type: 'material', name: 'face' }}
      onChangeText={text => setImageUrl(text)} 
    />*/}

      <FormButton
        title="Sign Up"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
        onPress={signup}
      />
      <IconButton
        icon="keyboard-backspace"
        size={30}
        style={styles.navButton}
        color="#5b3a70"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputView: {
    height: 75,
    flexDirection: "row",
    alignItems: "center",
  },

  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 18,
  },
  navButton: {
    marginTop: 10,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});

/*import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Title } from 'react-native-paper';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';

export default function SignupScreen({ navigation }) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
      <View style={styles.container}>
        <Title style={styles.titleText}>Let's get started!</Title>
        <FormInput
            labelName="Display Name"
            value={displayName}
            autoCapitalize="none"
            onChangeText={(userDisplayName) => setDisplayName(userDisplayName)}
            />
        <FormInput
            labelName="Email"
            value={email}
            autoCapitalize="none"
            onChangeText={(userEmail) => setEmail(userEmail)}
        />
        <FormInput
            labelName="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(userPassword) => setPassword(userPassword)}
        />
        <FormButton
            title="Signup"
            modeValue="contained"
            labelStyle={styles.loginButtonLabel}
            onPress={() => register(displayName, email, password)}
        />
        <IconButton
            icon="keyboard-backspace"
            size={30}
            style={styles.navButton}
            color="#5b3a70"
            onPress={() => navigation.goBack()}
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
    titleText: {
      fontSize: 24,
      marginBottom: 10,
    },
    loginButtonLabel: {
      fontSize: 22,
    },
    navButtonText: {
      fontSize: 18,
    },
    navButton: {
      marginTop: 10,
    },
  });*/
