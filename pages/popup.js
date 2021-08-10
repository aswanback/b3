import { styles, windowHeight, windowWidth, theme } from '../styles.js';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Appbar, IconButton, TextInput } from 'react-native-paper';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, ImageView, ImageBackground, Pressable, Platform, FlatList, Dimensions, SafeAreaView, TouchableOpacity, Modal, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from './auth.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* 
    Modal is just a pop-up, this uploadModal is the content of the Modal in board.js
    It has its own Modal which is the DatePicker scroll wheel
    You aren't allowed to change the text in the datepicker input-text, its a cheese to make them look the same
    Not sure how to export the contact, date, and org info but i imagine its more provider shit that i'll work on

    If my strat with porting all the variables here back to board works, you shouldnt need anything from this file and pickImage
    will end up here, but that's up in the air as of now.

*/




export function PopupScreen(props, deleteFlyer) {

    const index = props.popupItem;

    function pinFlyer () {
        console.log('pin')
        //pin here using index
    }

    function DeleteButton () {
        const [avail,setAvail] = useState(false); //use this to set whether button is usable, ill make it pretty later

        return(
            <Button disabled={!avail} title='delete flyer' onPress={()=>deleteFlyer(index)}/>
        );
    }

    

    // get the other info here i guess

    return (
        <View style={{ flex: 1, }} >
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} extraHeight={30} extraScrollHeight={100} style={{ flex: 1, width: windowWidth, alignContent: 'center' }} resetScrollToCoords={{ x: 0, y: 0 }} enableAutomaticScroll={true} scrollEnabled={false}>
                
                <View style={{ height: windowHeight * 0.02 }} />

                <View style={{ height: windowHeight * 0.03 }} />

                <View style={{ flex: 0 }}>
                    <Text>yee{index}</Text>
                </View>

                <Button title='pin flyer' onPress={pinFlyer}/>

                <DeleteButton flyer={index}/>

                <View style={{ height: windowHeight * 0.01 }} />

            </KeyboardAwareScrollView>

        </View>
    );
}
