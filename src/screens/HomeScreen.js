import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { Title, TextInput, Button } from 'react-native-paper';
// * Context
import { Context as AuthContext } from "../context/AuthContext";

const HomeScreen = () => {
    const { state, signout } = useContext(AuthContext);
    return (
        <View style={styles.container} >
            <Text>One Cloud</Text>
            <Button mode="contained"
                onPress={() => signout()}>
                Sign out
  </Button>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;