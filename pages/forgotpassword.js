import { styles, background, windowWidth, windowHeight, theme } from '../styles.js';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { HelperText, IconButton, TextInput } from 'react-native-paper';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Button, Image, ImageBackground, Platform, FlatList, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { AuthContext, CustContext } from './auth.js';

/*
 Pretty basic shit, all the heavy lifting is done in App.js with signIn in authContext
 KeyboardAwareScrollView just gets shit outta the way for the keyboard
I'll have to do some of the same provider shit here to connect the authStates to the wrong password message, shouldnt be horrible

I dont think you have anything to change in this file

*/

// login page
export default function ForgotPassword({ navigation }) {
  const [authState, dispatch] = useContext(CustContext);
  const { forgotPassword } = React.useContext(AuthContext);
  const [emailText, onChangeEmail] = useState(null);
  const [passwordText, onChangePassword] = useState(null);
  const [isWrongPassword, setWrongPassword] = useState(false)


  // shows the wrong email/password message - logic yet to be implemented
  function loginError(){
    return false;
  }


  //#region front-end
  return (
    <ImageBackground source={require('../assets/Bulletin_bg.png')} resizeMode='cover' style={styles.bkgd}>

      <KeyboardAwareScrollView style={{ flex: 0, width: windowWidth, alignContent: 'center' }} resetScrollToCoords={{ x: 0, y: 0 }} enableAutomaticScroll={true} scrollEnabled={false}>
        <View style={{ height: windowHeight * 0.05 }} />

        <IconButton icon='arrow-left' size={35} color='white' onPress={() => { navigation.pop() }} />

        <View style={{ height: windowHeight * 0.05 }} />

        <View style={{ height: windowHeight * 0.2, alignSelf: 'center', }}>
          <Image style={{ flex: 1, flexShrink: 1, resizeMode: 'contain' }} source={require('../assets/B_icon.png')} />
        </View>

        <View style={{ height: windowHeight * 0.16 }} />

        <TextInput
          style={styles.input}
          label='Email'
          mode='outlined'
          onChangeText={onChangeEmail}
          autoCapitalize='none'
          value={emailText}
          autoCompleteType='email'
          theme={theme}
        />

        <View style={{ height: 10 }} />

        <TextInput
          style={styles.input}
          error={isWrongPassword}
          label='Password'
          mode='outlined'
          theme={theme}
          autoCapitalize='none'
          onChangeText={onChangePassword}
          value={passwordText}
          secureTextEntry={true}
          autoCompleteType='password'
        />

        <HelperText style={{ width: '85%', alignSelf: 'center' }} type='error' visible={loginError()}> Invalid email or password. Please try again </HelperText>

      </KeyboardAwareScrollView>

      <View style={{ height: windowHeight * 0.07 }} />

      <View style={{ flex: 0 }}>
        <TouchableOpacity onPress={() => forgotPassword(emailText, passwordText)}>
          <LinearGradient
            start={[0.1, 0.1]}
            end={[0.9, 0.9]}
            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255, 0.2)']}  //'rgba(56, 222, 255, 1)','rgba(153, 177, 255, 1)'
            style={styles.button}>
            <Text style={styles.button_text}>Reset password?</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={{ height: windowHeight * 0.06 }} />

    </ImageBackground>
  );
  //#endregion

}