import { styles } from '../styles.js';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Appbar, IconButton } from 'react-native-paper';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, ImageBackground, Pressable, Platform, FlatList, TextInput, Dimensions, SafeAreaView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { AuthContext } from './auth.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UploadModal } from './upload';
import { PopupScreen } from './popup.js';
import GallerySwiper from "react-native-gallery-swiper";
import { IconAndButton } from './settings.js';
import { BlurView } from 'expo-blur';

/*
   function foo() {} is same as const foo = () => {} just fyi 
   also //#region and //#endregion is a way of code folding, pls dont delete its pretty nice
    
    • Pressable is all the icons in the Appbar, check that shit out the icons change when you click on them big flex
      the onPress is where it'll route to, rn only upload is linked to uploadModal, and the account one signs you out
      If you implement a delete account, feel free to make it the onPress method of one of the icons since they're all dead rn
    • Theres a top and bottom appbar, those are self explanatory
    • The Modal is the upload pop-up, since its a pop-up it doesnt matter where its located in the JSX tree cuz its invisible
    • Since Pinned will just be a filter so I'm not doing anything with it
    • I will add a settings page, one that half pops out like Reddit, but later
    • Filter will have a dropdown kind of thing for you to enter filters, I'll add that eventually 
    • Back end we need metadata so we can do the filtering and shit
    • pickImage has to be accessible from upload.js, which would just be an import statement except a call to setFlyers in it
      that you need means I can't use it elsewhere. Not sure how to resolve this yet. I think that I will have to port the org,
      contact info, and date over to this file, so then I can probably port the uri as well, that's likely the solution.
*/

// Main board page
export default function Board({ navigation }) { //add {navigation, route} in the paranthesis to use navigation
  const { camera } = React.useContext(AuthContext);
  
  const [flyers, setFlyers] = useState([]);
  const [org, setOrg] = useState([]);
  const [date, setDate] = useState([]);
  const [contact, setContact] = useState([]);

  const [modalVis, setModalVis] = useState(false);
  const [popupVis, setPopupVis] = useState(false);
  const [uploadUri, setUploadUri] = useState('init_uri');
  const [currentIndex, setCurrentIndex] = useState(null);

  const [doneDownloading, setDownloadStatus] = useState(false);
  const [urls, addToURLs] = useState([])
  const [uids, addToUIDs] = useState([])
  const [realNumbers, setRealNumbers] = useState([]) // IMPORTANT
  // In Flyers, we only have the not deleted flyers, which throws off the index compared to its
  // actual image # in the database. This array will keep the actual image # of each flyer



  //#region back-end

  // useEffect to download all flyer data on initial render
  useEffect(() => {
    //downloadFlyers()
    setFlyers([])
  }, []); // empty array dependency means it only runs on initial render

  function downloadFlyers() {
    setFlyers([]);
    addToUIDs([]);
    addToURLs([]);
    setRealNumbers([]);

    firebase.database().ref("numFlyers").once('value').then(querySnapShot => {

      const numFlyersInDatabase = Number(querySnapShot.val())

      for (let i = 1; i <= numFlyersInDatabase; i++) {
ß
        firebase.database().ref(i).child('status').once('value').then(status => {
          firebase.database().ref(i).child('url').once('value').then(url => {
            firebase.database().ref(i).child('uid').once('value').then(uid => {


              if (status.val() == "active") {
                // and user hasn't deleted account, and any other filters
                // might need a slightly different function that we call for each filter
                setFlyers(flyers => [...flyers, { uri: url.val() }]);
                addToUIDs(uids => [...uids, uid.val()]);
                addToURLs(urls => [...urls, url.val()])
                setRealNumbers(realNumbers => [...realNumbers, i]);
                /////// starts at 1!!! local index may not match
              }


              if (i == numFlyersInDatabase) { // we're done
                //console.log(uids)
                //console.log(urls)
                //console.log(flyers)

                setDownloadStatus(true)
              }
            });
          });
        });

      }

    });

  }

  function beginUpload() {
    // start to upload the flyer based on the uri and metadata
    // you have org, contact, date, and uploadUri variables

    // upload image
    setFlyers(flyers => [...flyers, { uri: uploadUri }]);

    /*
    if (doneDownloading == false) {
      console.log("not done downloading")
      return
    }

    firebase.database().ref("numFlyers").once('value').then(querySnapShot => {

      const numFlyers = Number(querySnapShot.val())
      const newNumFlyers = numFlyers + 1;
      var ref = firebase.storage().ref().child(newNumFlyers.toString());

      setFlyers(flyers => [...flyers, { uri: uploadUri }]);
      addToUIDs(uids => [...uids, firebase.auth().currentUser.uid]);
      setRealNumbers(realNumbers => [...realNumbers, newNumFlyers]);

      fetch(uploadUri).then(response => {
        response.blob().then(blob => {
          ref.put(blob).then(data => {
            data.ref.getDownloadURL().then(downloadURL => {
              firebase.database().ref(newNumFlyers).set({
                status: 'active',
                url: downloadURL,
                uid: firebase.auth().currentUser.uid
              }).then(() => {
                firebase.database().ref("numFlyers").set(newNumFlyers.toString()).then(() => {

                  addToURLs(urls => [...urls, downloadURL])

                  // done doing stuff, maybe have to do a doneUploading -> true here idk
                });
              });
            });
          });
        });
      });
    });
    */

  }

  function deleteFlyer(indexOfFlyer) { // this code is actually much harder than i thought it would be
    // given: index in Flyers

    // part 1 - remove from Flyers
    setFlyers(Flyers => [...Flyers.slice(0, indexOfFlyer), ...Flyers.slice(indexOfFlyer + 1)])

    // part 2 - set status to deleted
    const realIndex = realNumbers(indexOfFlyer)
    firebase.database().ref(realIndex).set({ status: 'deleted' })

  }



  function deleteAccount(userUID) {

    firebase.database().ref("numFlyers").once('value').then(querySnapShot => {

      const numFlyersInDatabase = Number(querySnapShot.val())

      for (let i = 1; i <= numFlyersInDatabase; i++) {

        firebase.database().ref(i).child('uid').once('value').then(uid => {

          if (uid.val() == userUID) {
            firebase.database().ref(newNumFlyers).set({
              status: 'deleted',
            })
          }
        });
      }
    });
  }




  // request camera roll permissions on initial render
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);


  function renderItem ({ item, index }) {
    setCurrentIndex(index)
    return (
      <TouchableOpacity onPress={() => setPopupVis(true)}>
        <View style={{ flexDirection: 'row' }} >
          <Image source={item} style={{ flex: 1, width: 200, height: 200 }} />
        </View>
      </TouchableOpacity>
    );
  }


  //#endregion

  //#region front-end
  return (
    <ImageBackground source={require('../assets/Bulletin_bg.png')} style={{ flex: 1, resizeMode: 'cover' }}>
      {/* Top Appbar */}
      <Appbar.Header style={[styles.appbar, { height: 55 }]}>
        <Pressable onPress={() => navigation.navigate("settings")}>
          {({ pressed }) => (<Icon name={pressed ? 'account-outline' : 'account'} size={30} style={styles.icon_top} />)}
        </Pressable>
        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 75, paddingTop: 10 }}>
          <Image source={require('../assets/Bulletin_text_blue.png')} style={{ resizeMode: 'contain', flexShrink: 1 }} />
        </View>
        <Pressable onPress={camera}>
          {({ pressed }) => (<Icon name={pressed ? 'camera-outline' : 'camera'} size={30} color='black' style={styles.icon_top} />)}
        </Pressable>
      </Appbar.Header>



      <FlatList
        data={flyers} // array of image sources, not the images themselves
        numColumns={2}
        directionalLockEnabled={true}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10, }}
        bounces={false}
        overScrollMode='never'
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />



      {/* placeholder - this makes the bottom appbar stay at bottom, you can probably leave it here even with flatlist, idk */}
      <View style={{ flex: 1 }} />


      {/* Bottom Appbar */}
      <Appbar style={[styles.appbar, { height: 70 }]}>
        <View style={{ flex: 1 }} />
        <Pressable onPress={null} style={{ flex: 1 }}>
          {({ pressed }) => (<Icon name={pressed ? 'home-outline' : 'home'} size={30} style={styles.icon_bottom} />)}
        </Pressable>
        <View style={{ flex: 1 }} />
        <Pressable onPress={null} style={{ flex: 1 }}>
          {({ pressed }) => (<Icon name={pressed ? 'pin-outline' : 'pin'} size={30} style={styles.icon_bottom} />)}
        </Pressable>
        <View style={{ flex: 1 }} />
        <Pressable onPress={() => { setModalVis(true) }} style={{ flex: 1 }}>
          {({ pressed }) => (<Icon name={pressed ? 'file-upload-outline' : 'file-upload'} size={30} style={styles.icon_bottom} />)}
        </Pressable>
        <View style={{ flex: 1 }} />
      </Appbar>

      {/* Pop up for upload image - location doesnt matter*/}
      <Modal visible={modalVis} presentationStyle='fullScreen' animationType='slide'>
        {/* Modal header */}
        <Appbar.Header style={[styles.appbar, { height: 50 }]}>
          <View style={{ width: 70 }} >
            <Button title='Cancel' onPress={() => { setModalVis(false); setOrg(null); setContact(null); setDate(null); setuploadUri(null); }} />
          </View>
          <View style={{ flex: 1 }} />

          <Text style={styles.title}>Upload</Text>
          <View style={{ flex: 1 }} />
          <View style={{ width: 70 }} >
            <Button title='Done' onPress={() => { setModalVis(false); beginUpload(); }} />
          </View>
        </Appbar.Header>

        {/* Content of the modal - upload.js */}
        <UploadModal setOrg={setOrg} setDate={setDate} setContact={setContact} setUploadUri={setUploadUri} />

      </Modal>


      {/* click on picture modal */}
      <Modal visible={popupVis} animationType='fade' transparent={true}>
        <BlurView intensity={100} tint='default' style={{flex: 1, paddingHorizontal: 10}}>
        
          <Appbar.Header style={styles.appbar_gallery}>
            <View style={{ flex: 0.2 }} />
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.popup_text}>Posted by:</Text>
              <Text style={styles.popup_text}>{org[currentIndex]}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.popup_text}>Occuring on:</Text>
              <Text style={styles.popup_text}>{date[1].toDateString()}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <IconButton icon='close-circle-outline' color='black' onPress={() => { setPopupVis(false); }} />
          </Appbar.Header>

          <GallerySwiper images={flyers} onSwipeDownReleased={() => setPopupVis(false)} style={{backgroundColor:'transparent'}}/>

          <Appbar.Header style={styles.appbar_gallery}>
            <View style={{ flex: 0.05 }} />
            <IconAndButton text='' icon='pin' size={25} color='black' buttonStyle={{ borderTopWidth: 0 }} textStyle={[styles.popup_text]} onPress={null} />
            <View style={{ flex: 0.05 }} />
            <IconAndButton text='' icon='delete' size={25} buttonStyle={{ borderTopWidth: 0 }} textStyle={[styles.popup_text]} color='black' onPress={null} />
            <View style={{ flex: 1 }} />
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.popup_text}>Contact at: {contact[currentIndex]}</Text>
            </View>
            <View style={{ flex: 0.1 }} />
          </Appbar.Header>
       
        </BlurView>
      </Modal>
    </ImageBackground>
  );
  //#endregion
};