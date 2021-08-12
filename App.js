import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import 'react-native-gesture-handler';
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
import Settings from './pages/settings';
import ForgotPassword from './pages/forgotpassword';
import Filters from './pages/filters';
import { LogBox } from 'react-native';



/* 
 Alright dipshit here's your guide to the code

 App.js : 
  •  const [authState, dispatch] = React.useReducer ... 
      This is basically useState except its not.
      authState is a dictionary of values that keeps track of if user is authorized, 
      needs email verified, entered wrong password, or is logging in or out (entering).
      authState.auth is what determines if you get to see board page, see the navigator
      .verify, .wrong and .entering are all for error messages and rendering (entering switches animation direction)
      The CustContext Provider provides this authState to all the pages in the app so they can use it, basically like making it global var
      Think of dispatch() as setAuthState() just for a dictionary not a value

  • const authContext = React.useMemo ...
      The AuthProvider provides the authContext to the rest of the app just like CustContext
      except this time the authContext is a set of functions in useMemo, which is just like a dictionary of functions
      These functions are signIn, signUp, signOut, and deleteAccount (coming soon)
      The content of those functions are what you wrote already, self explanatory, I only added dispatches for error handling (unfinished)
      Basically, you can call those functions anywhere you want, so do that I guess, idk why you would need to 

  • If you want to add a page which you shouldn't need to probably, it goes in navigator

  • Nothing in App.js needs to change except for the authContext functions if necessary 

General Structure
  Every page is its own file, stored in ./pages
  • auth.js - just some dumb shit so it wouldnt get mad about circular imports, ignore that
  • upload.js - isn't actualy a page its a Modal, look it up if you care but its basically a pop up so theres no navigation or anything
  • Use navigation for anything WITHIN the same auth structure. So you can nav in auth: false pages and in auth: true pages,
    i.e. board/upload/settings/etc or welcome/login/createAccount 

  There's some notes about each page in their respective files
  Have fun with imports and versions lmfao i literally make a new expo project good luck, theoretically ur fine but lmao

  I know that its going to the unauth pages then to the auth pages once it loads, ill fix later, you'll see flash of welcome before board
*/



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

export default function App({ navigation }) {
  LogBox.ignoreLogs(['Warning: Failed prop type: Invalid prop `fontSize` of type `string` supplied to `Text`, expected `number`.']);

  //#region auth stuff - auth states, login/logout/signup, remember me firebase
  // sets up different auth states for transitioning through app
  const [authState, dispatch] = React.useReducer(
    (prevState, action) => {
      return {
        // email needs verification, wrong password, email already in use, 
        auth: action.auth,
        verify: action.verify,
        wrong: action.wrong,
        email_in_use: action.email_in_use,
        entering: action.entering
      }
    },
    {
      // default values
      auth: false,
      verify: false,
      wrong: false,
      email_in_use: false,
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
              dispatch({ auth: false, verify: true })
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
          dispatch({ auth: false, entering: false })
        })
          .catch((e) => { console.log('error signing out') });
      },

      signUp: async (email, password, emailError, passwordError) => {
        if (emailError || passwordError) {
          console.log('email or password bad')
          return;
        } else {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {   // Signed in 
              var user = userCredential.user;
              firebase.auth().currentUser.sendEmailVerification().then(() => { console.log("email sent") })
                .catch((e) => { console.log('error ' + e.code + ' ' + e.message) });
              console.log(user) // contains a bunch of information that will probably be relevant, particularly UID
            })
            .then(() => { //log out
              firebase.auth().signOut().then(() => {
                navigation.navigate("login")
                dispatch({ auth: false, entering: false })
              })
                .catch((e) => { console.log('sign out error ' + e.code + ' ' + e.message); });
            })
            .catch((e) => { console.log('error ' + e.code + ' ' + e.message) });
        }
      },

      deleteAccount: async () => {
        console.log('account deletion here')
        //fill code in here to delete your account

        // below code will kick them back to welcome screen
        //dispatch({auth:false, entering:false})
      },
      changePassword: async () => {
        console.log('change my password here')

        // below code will kick them back to welcome screen
        //dispatch({auth:false, entering:false})
      },

      // view MyFLyers
      viewMyFlyers: () => {
        console.log('view my flyers')

      },

      camera: () => {
        console.log('camera')
      },

      // Filters
      filter1: () => {
        console.log('filter 1')
      },
      filter2: () => {
        console.log('filter 2')
      },
      filter3: () => {
        console.log('filter 3')
      },
      filter4: () => {
        console.log('filter 4')
      },


    }),
    []
  );

  // Allows access to authState as basically a global variable - needed for telling user wrong password or verify email
  const custContext = [authState, dispatch];

  // Remember me functionality - this has some issue with unmounted component
  useEffect(() => { firebase.auth().onAuthStateChanged((user) => { dispatch({ auth: user ? true : false }) }); }, []);
  //#endregion

  //#region Navigation
  return (
    <CustContext.Provider value={custContext} >
      <AuthContext.Provider value={authContext} >
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {authState.auth ? (     // User is signed in - can only access below screens
              <>
                <Stack.Screen name='board' component={Board} />
                <Stack.Screen name='settings' component={Settings} options={{ presentation: 'transparentModal', backgroundColor: 'transparent', animationTypeForReplace: 'push', animationEnabled: true }} />
                <Stack.Screen name='filters' component={Filters} options={{ backgroundColor: 'transparent', animationTypeForReplace: 'pop', animationEnabled: true }} />
              </>
            ) : (                   // User is signed out - can only access below screens
              <>
                <Stack.Screen name="welcome" component={Welcome} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="createAccount" component={CreateAccount} />
                <Stack.Screen name="forgotPassword" component={ForgotPassword} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </CustContext.Provider>


  );
  //#endregion
}
