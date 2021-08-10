import { styles, windowWidth } from '../styles.js';
import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, ImageBackground, Platform, FlatList, TextInput, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function Welcome({ navigation }) {
  return (
    <ImageBackground source={require('../assets/Bulletin_spash2.png')} style={styles.bkgd}>
      <View style={{ flex: 2 }} />

     {/* <Image source={require('../assets/Bulletin_text_white.png')} resizeMode='contain' style={styles.bulletin_image} />*/}

      <View style={{ flex: 4.5 }} />

      <View style={{ flex: 0 }}>
        <TouchableOpacity onPress={() => navigation.navigate('login')} style={styles.button}>
          <Text style={styles.button_text}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 0.2 }} />

      <View style={{ flex: 0 }}>
        <TouchableOpacity onPress={() => navigation.navigate('createAccount')} style={styles.button}>
            <Text style={styles.button_text}>Create account</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }} />

    </ImageBackground>
  );
}