import { styles, background, windowHeight, windowWidth, theme } from '../styles.js';
import 'react-native-gesture-handler';
import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Button, Image, ImageBackground, Platform, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HelperText, TextInput } from 'react-native-paper';
import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext, CustContext } from './auth.js';





// create account page
export default function CreateAccount({ navigation }) {
  const [emailText, onChangeEmail] = useState(null);
  const [passwordText, onChangePassword] = useState(null);
  const [confirmPasswordText, onChangeConfirmPassword] = useState(null);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);

  const [authState, dispatch] = useContext(CustContext);
  const { signUp } = React.useContext(AuthContext);

  //#region back-end
  /*function PasswordMatchMessage() {
    const [isMatch, setMatch] = useState(true);
    const [isValid, setValid] = useState(true);
    useEffect(() => {
      if ((passwordText || confirmPasswordText) == '') {
        setMatch(true);
        setValid(true);
      }
      if (passwordText == confirmPasswordText) {
        setMatch(true)
      } else if (authState.match == true) { // means password rejected by auth
        dispatch({ auth: false })
        setValid(false)
      }
    }, [authState]);
    return <View style={{ height: 25 }}><Text style={{ color: isMatch ? 'transparent' : 'red', alignSelf: 'center' }}>Passwords don't match. Please try again.</Text></View>;
  }*/

  const [errorMsg,setErrorMsg] = useState(null);

  function emailError() {
    return (emailText !== null && emailText.trim() !== null && !emailText.trim().includes('@purdue.edu'));
  }
  
  function passwordError() {
    const [status,setStatus] = useState(false);
    useEffect(()=>{
    if (passwordText!==null && !(passwordText.length >= 8)){
      setErrorMsg('Password must be at least 8 characters.');
      setStatus(true);
    } else if (passwordText !== null && confirmPasswordText !== null && passwordText !== confirmPasswordText) {
      setErrorMsg("Passwords don't match.");
      setStatus(true);
    } else {
      setStatus(false);
    }
  },[passwordText,confirmPasswordText]);
  return status;
  }

  

  //#endregion


  //#region front-end
  return (
    <ImageBackground source={require('../assets/Bulletin_bg.png')} resizeMode='cover' style={styles.bkgd}>
      <KeyboardAwareScrollView style={{ flex: 0, width: windowWidth, alignContent: 'center' }} resetScrollToCoords={{ x: 0, y: 0 }} enableAutomaticScroll={true} scrollEnabled={false}>
        <View style={{ height: windowHeight * 0.12 }} />

        <View style={{ height: 200, alignSelf: 'center', }}>
          <Image style={{ flex: 1, flexShrink: 1, resizeMode: 'contain' }} source={require('../assets/B_icon.png')} />
        </View>

        <View style={{ height: windowHeight * 0.10 }} />

        <TextInput
          style={styles.input}
          mode='outlined'
          onChangeText={onChangeEmail}
          value={emailText}
          label='Email'
          autoCompleteType='email'
          theme={theme}
        />
        <HelperText style={{width:'85%', alignSelf:'center'}} type='error' visible={emailError()}>Email address invalid. Only accepting @purdue.edu addresses</HelperText>

        <TextInput
          mode='outlined'
          style={styles.input}
          onChangeText={onChangePassword}
          value={passwordText}
          secureTextEntry
          label='Password'
          autoCompleteType='password'
          theme={theme}
        />

        <View style={{ height: 10 }} />

        <TextInput
          mode='outlined'
          style={styles.input}
          onChangeText={onChangeConfirmPassword}
          value={confirmPasswordText}
          secureTextEntry
          autoCompleteType='password'
          label='Confirm password'
          theme={theme}
        />
        <HelperText style={{width:'85%', alignSelf:'center'}} type='error' visible={passwordError()}> {errorMsg}</HelperText>




      </KeyboardAwareScrollView>

      <View style={{ flex: 0 }}>
        <TouchableOpacity onPress={() => signUp(emailText.trim(), passwordText,emailError,passwordError)}>
          <LinearGradient
            start={[0.1, 0.1]}
            end={[0.9, 0.9]}
            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255, 0.2)']}  //'rgba(56, 222, 255, 1)','rgba(153, 177, 255, 1)'
            style={styles.button}>
            <Text style={styles.button_text}>Create account</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={{ height: windowHeight * 0.06 }} />

    </ImageBackground>
  );
  //#endregion
}