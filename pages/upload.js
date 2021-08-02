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




export function UploadModal(props) {

    const [date, setDate] = useState(new Date());
    const [org, setOrg] = useState(null);
    const [uri, setUri] = useState(null);
    const [contact, setContact] = useState(null);
    const [dateVis, setDateVis] = useState(false);

    //change date, org, contact and update them globally   https://github.com/react-native-datetimepicker/datetimepicker#mode-optional
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        props.setDate(currentDate);
    };

    const onChangeOrg = (org) => {
        props.setOrg(org);
        setOrg(org);
    }
    const onChangeContact = (contact) => {
        props.setContact(contact);
        setContact(contact);
    }

    async function pickImage() {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            const { newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (newStatus !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            //allowsEditing: true, //aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            props.setFlyerUri(result.uri);
            setUri(result.uri);
            //setFlyers(Flyers => [...Flyers, { uri: result.uri }]); // updates flyers array with new uri
            return (result.uri);
        };
    };

    function ImageDisp() {
        if (uri) {
            return (
                <Image source={{ uri: uri }} resizeMode='contain' style={{ flex: 1, flexShrink: 1, borderRadius: 15 }} />
            );
        } else {
            return (
                <View>
                    <Icon name='plus-box' size='60' style={{ paddingHorizontal: 10, alignSelf: 'center' }} />
                    <Text style={{ color: 'rgba(60,60,60,1)', fontSize: 18, alignSelf: 'center' }}>Pick a photo</Text>
                </View>
            );
        }
    }

    return (
        <View style={{ flex: 1, }} >
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} extraHeight={30} extraScrollHeight={100} style={{ flex: 1, width: windowWidth, alignContent: 'center' }} resetScrollToCoords={{ x: 0, y: 0 }} enableAutomaticScroll={true} scrollEnabled={false}>
                
                <View style={{ height: windowHeight * 0.02 }} />

                <View style={{ alignSelf: 'center', justifyContent: 'center', width: windowWidth * 0.8, aspectRatio: 3 / 4, borderColor: 'rgba(60,60,60,1)', borderRadius: 15, borderWidth: 1 }} >
                    <TouchableOpacity onPress={pickImage} style={{ flex: 1, padding: 10 }}>
                        <LinearGradient
                            start={[1, 1]}
                            end={[0, 0]}
                            colors={['rgba(255,255,255,0.0)', 'rgba(255,255,255, 0.0)']}
                            style={{ flex: 1, justifyContent: 'center' }}>
                            <ImageDisp />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={{ height: windowHeight * 0.03 }} />

                <View style={{ flex: 0 }}>
                    <TouchableOpacity onPress={() => { setDateVis(true) }}>
                        <View pointerEvents='box-only'>
                            <TextInput
                                label='Date of event'
                                mode='outlined'
                                style={styles.input}
                                onChangeText={onChangeOrg}
                                value={date.toDateString()}
                                theme={theme}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ height: windowHeight * 0.01 }} />

                <TextInput
                    label='Organization (optional)'
                    mode='outlined'
                    theme={theme}
                    style={styles.input}
                    onChangeText={onChangeOrg}
                    value={org}
                />
                
                <View style={{ height: windowHeight * 0.01 }} />

                <TextInput
                    label='Contact email or phone (optional)'
                    mode='outlined'
                    style={styles.input}
                    onChangeText={onChangeContact}
                    value={contact}
                    theme={theme}
                />

            </KeyboardAwareScrollView>


            <Modal animationType='slide' transparent={true} visible={dateVis} >
                <TouchableWithoutFeedback onPress={() => { setDateVis(false) }}>
                    <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>
                <View style={{ backgroundColor: 'white' }} >
                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row', paddingRight: 15, paddingTop: 10 }} >
                        <Button title='Done' onPress={() => { setDateVis(false) }} />
                    </View>
                    <DateTimePicker value={date} mode='date' onChange={onChangeDate} display='spinner' />
                </View>
            </Modal>
        </View>
    );
}
