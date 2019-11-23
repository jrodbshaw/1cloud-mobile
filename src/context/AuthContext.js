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
  firebase.auth().onAuthStateChanged(async (user) => {
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
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password)
    await firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        // * add the stuff from the user that you want to store in firestore
        const user = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid
        };
        dispatch({ type: "signin", payload: user })
        db.collection("users")
          .doc(user.uid)
          .set(user, { merge: true });
      } else {
        dispatch({ type: "signin", payload: null })
      }
    })
  } catch (error) {
    dispatch({ type: 'add_error', payload: { error: true } })
  }
};

const signin = dispatch => async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch({ type: "signin", payload: user })
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
