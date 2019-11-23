import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Title, TextInput, Button } from 'react-native-paper';
// * Context
import { Context as AuthContext } from "../context/AuthContext";

const SigninScreen = ({ navigation }) => {
  const { state, signin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.containerStyle}>
      <Title style={styles.titleStyle} >Sign In</Title>
      <TextInput
        mode="outlined"
        label='Email'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        mode="outlined"
        label='Password'
        value={password}
        onChangeText={setPassword}
      />
      <Button mode="contained"
        onPress={() => signin({ email, password })}>
        Sign In
  </Button>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Title style={styles.linkStyle} >
          Don't have an account? Create one Here
        </Title>
      </TouchableOpacity>
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return { header: null };
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 122
  },
  linkStyle: {
    color: "blue",
    fontSize: 16,
    textAlign: "center"
  },
  titleStyle: {
    textAlign: "center"
  }
});

export default SigninScreen;
