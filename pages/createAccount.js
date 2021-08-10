import { styles, windowHeight, windowWidth, theme } from '../styles.js';
import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Button, Image, ImageBackground, Platform, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HelperText, TextInput, IconButton } from 'react-native-paper';
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

  const [errorMsg, setErrorMsg] = useState(null);


  function emailErrorMsg() {
    const [txt, setTxt] = useState(null)
    if (emailText !== null && emailText.trim() !== null) {
      if (authState.email_in_use) {
        setTxt('That email is already being used in an account')
      }
      if (!emailText.trim().includes('@purdue.edu')) {
        setTxt('Invalid email. Only accepting @purdue.edu emails at this time')
      }
    }
    return txt;
  }

  // password match confirmPassword, password length requirement, we can add others if really needed
  function passwordError() {
    const [status, setStatus] = useState(false);
    useEffect(() => {
      if (passwordText !== null && !(passwordText.length >= 8)) {
        setErrorMsg('Password must be at least 8 characters.');
        setStatus(true);
      } else if (passwordText !== null && confirmPasswordText !== null && passwordText !== confirmPasswordText) {
        setErrorMsg("Passwords don't match.");
        setStatus(true);
      } else {
        setStatus(false);
      }
    }, [passwordText, confirmPasswordText]);
    return status;
  }

  //#endregion


  //#region front-end
  return (
    <ImageBackground source={require('../assets/Bulletin_bg.png')} resizeMode='cover' style={styles.bkgd}>
      <KeyboardAwareScrollView style={{ flex: 0, width: windowWidth, alignContent: 'center' }} resetScrollToCoords={{ x: 0, y: 0 }} enableAutomaticScroll={true} scrollEnabled={false}>

        <View style={{ height: windowHeight * 0.05 }} />

        <IconButton icon='arrow-left' size={35} color='white' onPress={() => { navigation.pop() }} />

        <View style={{ height: windowHeight * 0.05 }} />

        <View style={{ width: '60%', alignSelf: 'center', flexDirection: 'row' }}>
          <Image style={{ flex: 1, flexShrink: 1, resizeMode: 'contain' }} source={require('../assets/Bulletin_text_white.png')} />
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
        <HelperText style={{ width: '85%', alignSelf: 'center' }} type='error' visible={emailError()}>Email address invalid. Only accepting @purdue.edu addresses</HelperText>

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
        <HelperText style={{ width: '85%', alignSelf: 'center' }} type='error' visible={passwordError()}> {errorMsg}</HelperText>




      </KeyboardAwareScrollView>

      <TouchableOpacity onPress={() => signUp(emailText.trim(), passwordText, emailError, passwordError)} style={styles.button}>
        <Text style={styles.button_text}>Create account</Text>
      </TouchableOpacity>

      <View style={{ height: windowHeight * 0.06 }} />

    </ImageBackground>
  );
  //#endregion
}