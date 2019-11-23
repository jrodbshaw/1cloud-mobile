import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Title, TextInput, Button } from 'react-native-paper';
// * Context
import { Context as AuthContext } from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
  const { state, signup } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.containerStyle}>
      <Title style={styles.titleStyle} >Sign Up</Title>
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
        onPress={() => signup(email, password)}>
        Press me
  </Button>
      <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
        <Title style={styles.linkStyle} >
          Already have an account? Sign in Here
        </Title>
      </TouchableOpacity>
    </View>
  );
};

SignupScreen.navigationOptions = () => {
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

export default SignupScreen;
