import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext, CustContext } from './pages/auth';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import Login from './pages/login';
import Welcome from './pages/welcome';
import CreateAccount from './pages/createAccount';
import Board from './pages/board';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './styles';

//#region Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyB96P24f4eO8ibFRORLopeZGzyMeatzZKI",
  authDomain: "bulletin2021-5470f.firebaseapp.com",
  databaseURL: "https://bulletin2021-5470f-default-rtdb.firebaseio.com",
  projectId: "bulletin2021-5470f",
  storageBucket: "bulletin2021-5470f.appspot.com",
  messagingSenderId: "708570031030",
  appId: "1:708570031030:web:c53046938487acc8985717",
  measurementId: "G-BMS2L00117"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
//#endregion

const Stack = createStackNavigator();

export default function App({navigation}) {

  // validate that the password meets our requirements - right now just >8 characters
  function validatePassword(password) {
    const [valid, setValid] = useState(false);
    if (password.length > 8) {
      setValid(true);
    } else {
      setValid(false);
    }
    return valid;
  }

  //#region auth stuff - auth states, login/logout/signup, remember me firebase
  // sets up different auth states for transitioning through app
  const [authState, dispatch] = React.useReducer(
    (prevState, action) => {
      return {
        auth: action.auth,
        verify: action.verify,
        wrong: action.wrong,
        entering: action.entering
      }},
      {
        // default values
        auth: false,
        verify: false,
        wrong: false,
        entering: true, 
      }
  );

  // This is the backend auth functions - signIn, signUp, logout, delete account (coming soon)
  const authContext = React.useMemo(
    () => ({
      signIn: async (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            if (user.emailVerified) {
              dispatch({ auth: true })
              console.log('logged in')
            } else {
              dispatch({ auth:false, verify: true })
              console.log("credentials good but verify email")
            }
          })
          .catch((error) => {
            dispatch({ auth: false, wrong: true })
            console.log("wrong password or email");
          });
      },

      signOut: () => {
        firebase.auth().signOut().then(() => {
          console.log('sign out successful')
          dispatch({ auth:false, entering: false })
        })
        .catch((e) => {console.log('error signing out')});
      },

      signUp: async (email, password, emailError, passwordError) => {
        if(emailError || passwordError){
          console.log('email or password bad')
          return;
        } else {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {   // Signed in 
              var user = userCredential.user;
              firebase.auth().currentUser.sendEmailVerification().then(() => {console.log("email sent")})
                .catch((e) => { console.log('error ' + e.code + ' ' + e.message) });
              console.log(user) // contains a bunch of information that will probably be relevant, particularly UID
            })
            .then(() => { //log out
              firebase.auth().signOut().then(() => { 
                navigation.navigate("login")
                dispatch({auth:false,entering:false})
              })
                .catch((e) => { console.log('sign out error ' + e.code + ' ' + e.message); });
            })
            .catch((e) => { console.log('error ' + e.code + ' ' + e.message) });
        }
      },

      deleteAccount: async () => {
        //fill code in here to delete your account
        dispatch({auth:false, entering:false})
      }
    }),
    []
  );

  // Allows access to authState as basically a global variable - needed for telling user wrong password or verify email
  const custContext = [authState, dispatch];

  // Remember me functionality
  useEffect(() => { firebase.auth().onAuthStateChanged(function (user) { dispatch({ auth: user ? true : false }) }); }, []);
  //#endregion

  //#region Navigation
  return (
  
    <CustContext.Provider value={custContext}>
      <AuthContext.Provider value={authContext} >
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator headerMode='none'>
            {authState.auth ? (     // User is signed in - can only access below screens
              <>
                <Stack.Screen name="board" component={Board} headerMode='none' options={{animationTypeForReplace: authState.entering ? 'pop' : 'push'}}/>
              </>
            ) : (                   // User is signed out - can only access below screens
              <>
                <Stack.Screen name="welcome" component={Welcome} headerMode='none' />
                <Stack.Screen name="login" component={Login} headerMode='none' />
                <Stack.Screen name="createAccount" component={CreateAccount} headerMode='none' />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
        </PaperProvider>
      </AuthContext.Provider>
    </CustContext.Provider>
    

  );
  //#endregion
}
