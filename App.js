import "./src/fixtimerbug"

import React, { useEffect } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
// * Context
import { Provider as AuthProvider } from "./src/context/AuthContext";
// * helpers
import { setNavigator } from "./src/helpers/navigationRef";
// * Screens
import SignupScreen from './src/screens/SignupScreen'
import SigninScreen from './src/screens/SigninScreen'
import HomeScreen from './src/screens/HomeScreen'
import AccountScreen from './src/screens/AccountScreen'
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

const AppNavigator = createSwitchNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    Signin: SigninScreen,
    Signup: SignupScreen,
    mainFlow: createBottomTabNavigator({
      Home: HomeScreen,
      Account: AccountScreen
    })
  },
  { initialRouteName: "ResolveAuth" });

const App = createAppContainer(AppNavigator);

export default () => (
  <AuthProvider>
    <App
      ref={navigator => {
        setNavigator(navigator);
      }}
    />
  </AuthProvider>
);
