import { styles, background, windowWidth } from '../styles.js';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, ImageBackground, Platform, FlatList, TextInput, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

export default function Welcome({ navigation }) {
  return (
    <ImageBackground source={require('../assets/Bulletin_bg.png')} style={styles.bkgd}>
      <View style={{ flex: 2 }} />

      <Image source={require('../assets/Bulletin_text_white.png')} resizeMode='contain' style={styles.bulletin_image} />

      <View style={{ flex: 3.5 }} />

      <View style={{ flex: 0 }}>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <LinearGradient
            start={[1, 1]}
            end={[0, 0]}
            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255, 0.2)']}
            style={styles.button}>
            <Text style={styles.button_text}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }} />

      <View style={{ flex: 0 }}>
        <TouchableOpacity onPress={() => navigation.navigate('createAccount')}>
          <LinearGradient
            start={[0, 0]}
            end={[1, 1]}
            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255, 0.2)']}
            style={styles.button}>
            <Text style={styles.button_text}>Create account</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 0.5 }} />

    </ImageBackground>
  );
}