import createDataContext from "./CreateDataContext";
// * firebase
import { firebase, db } from '../firebase'
// * navigation helper
import { navigate } from "../helpers/navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: "", user: action.payload };
    case "signin":
      return { errorMessage: "", user: action.payload };
    case "signout":
      return { errorMessage: "", user: null };
    default:
      return state;
  }
};

const useAuth = dispatch => async () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch({ type: "signin", payload: user });
      navigate("mainFlow");
    } else {
      navigate("Signin");
    }
  })
};

const signup = dispatch => async (email, password) => {
  try {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
    db.collection('users').doc(user.uid).set(user, { merge: true })
    dispatch({ type: 'signup', payload: response.user })
    navigate("mainFlow");
    console.log(response.user)
  } catch (error) {
    dispatch({ type: 'add_error', payload: { error: true } })
  }
};

const signin = dispatch => async ({ email, password }) => {
  try {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch({ type: 'signin', payload: response.user })
    navigate("mainFlow");
  } catch (error) {
    dispatch({ type: 'add_error', payload: { error: true } })
  }
};

const signout = dispatch => async () => {
  try {
    await firebase.auth().signOut();
    dispatch({ type: "signout" });
    navigate("Signin");
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: { error: true }
    });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, useAuth },
  { user: null, errorMessage: "" }
);
