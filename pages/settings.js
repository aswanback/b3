import { styles, background, windowWidth, windowHeight, theme } from '../styles.js';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons'
import { HelperText, IconButton, TextInput,Appbar } from 'react-native-paper';
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

export default function Settings({ navigation }) {
    const [pressed, onChangePressed] = useState(false);
    return (
      <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }} >
        <View style={{ backgroundColor: 'white', justifyContent: 'flex-start', width: Dimensions.get('window').width * 0.7 }} >
          <View style={{ flex: 1, flexDirection: 'column' }} >
            <Appbar.Header style={[styles.appbar, { height: 50 }]}>
              <View style={{ flex: 1 }} />
              <Text style={styles.title}>Profile</Text>
              <View style={{ flex: 1 }} />
            </Appbar.Header>
  
            <TouchableOpacity onPressIn={() => onChangePressed(true)} onPressOut={() => onChangePressed(false)}>
              <View style={{flexDirection: 'row' }} >
                <Icon name={pressed ? 'filter-menu-outline' : 'filter-menu'} size={30} />
                <Text>hi</Text>
              </View>
            </TouchableOpacity>
  
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('home')} style={{ backgroundColor: 'transparent', flex: 1 }}>
          <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width * 0.3, backgroundColor: 'transparent' }} />
        </TouchableWithoutFeedback>
      </View>
    );
  }