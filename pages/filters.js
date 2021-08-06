import { styles, background, windowWidth, windowHeight, theme } from '../styles.js';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { HelperText, IconButton, TextInput,Appbar } from 'react-native-paper';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Button, Image, ImageBackground, Platform, FlatList, Dimensions, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { AuthContext, CustContext } from './auth.js';

function Filters({ navigation }) {
    const { filter1, filter2, filter3, filter4 } = React.useContext(AuthContext);
    const [pressed1, onChangePressed1] = useState(false);
    const [pressed2, onChangePressed2] = useState(false);
    const [pressed3, onChangePressed3] = useState(false);
    const [pressed4, onChangePressed4] = useState(false);

    return (
      <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }} >
        <View style={{ backgroundColor: 'white', justifyContent: 'flex-start', width: Dimensions.get('window').width * 0.7 }} >
          <View style={{ flex: 1, flexDirection: 'column' }} >
            <Appbar.Header style={[styles.appbar, { height: 50 }]}>
              <View style={{ flex: 1 }} />
              <Text style={styles.title}>Filters</Text>
              <View style={{ flex: 1 }} />
            </Appbar.Header>
  
            <TouchableOpacity onPress={filter1} onPressIn={() => onChangePressed1(true)} onPressOut={() => onChangePressed1(false)}>
              <View style={{flexDirection: 'row' }} >
                <Icon name={pressed1 ? 'filter-menu-outline' : 'filter-menu'} size={30} />
                <Text> Filter 1 </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={filter2} onPressIn={() => onChangePressed2(true)} onPressOut={() => onChangePressed2(false)}>
              <View style={{flexDirection: 'row' }} >
                <Icon name={pressed2 ? 'filter-menu-outline' : 'filter-menu'} size={30} />
                <Text> Filter 2 </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={filter3} onPressIn={() => onChangePressed3(true)} onPressOut={() => onChangePressed3(false)}>
              <View style={{flexDirection: 'row' }} >
                <Icon name={pressed3 ? 'filter-menu-outline' : 'filter-menu'} size={30} />
                <Text> Filter 3 </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={filter4} onPressIn={() => onChangePressed4(true)} onPressOut={() => onChangePressed4(false)}>
              <View style={{flexDirection: 'row' }} >
                <Icon name={pressed4 ? 'filter-menu-outline' : 'filter-menu'} size={30} />
                <Text> Filter 4 </Text>
              </View>
            </TouchableOpacity>



  
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('board')} style={{ backgroundColor: 'transparent', flex: 1 }}>
          <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width * 0.3, backgroundColor: 'transparent' }} />
        </TouchableWithoutFeedback>
      </View>
    );
  }

  export default Filters;