import React, { useState, useEffect } from "react";
import { Input, Button } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";

import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import { auth } from "../firebase/index";
import Loading from "../components/Loading";
import { useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const {login} = useContext(AuthContext)
  const login = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      //var errorMessage = error.message;
      alert("Error logging in. Please try again.");
      console.log(error)
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        navigation.replace("Home");
      } else {
        // No user is signed in.
        navigation.canGoBack() && navigation.popToTop();
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Welcome to UCT Connect!</Title>
      <FormInput
        placeholder="Enter your email"
        label="Email"
        leftIcon={{ type: "material", name: "email" }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <FormInput
        placeholder="Enter your password"
        label="Password"
        leftIcon={{ type: "material", name: "lock" }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <FormButton
        title="Login"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
        onPress={login}//{login}
      />

      <FormButton
        title="Sign up here"
        modeValue="text"
        uppercase={false}
        labelStyle={styles.navButtonText}
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },

  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },
});

/*import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
      <View style={styles.container}>
        <Title style={styles.titleText}>Welcome!</Title>
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
            title="Login"
            modeValue="contained"
            labelStyle={styles.loginButtonLabel}
            onPress={() => login(email, password)}
        />
        <FormButton
            title="Sign up here"
            modeValue="text"
            uppercase={false}
            labelStyle={styles.navButtonText}
            onPress={() => navigation.navigate('Signup')}
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
    fontSize: 16,
  },
});*/
