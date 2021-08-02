import { styles, windowHeight } from '../styles.js';
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


// pick image from cameral roll function



// Main board page
export default function Board({ navigation }) { //add {navigation, route} in the paranthesis to use navigation
  const { signOut } = React.useContext(AuthContext);
  const [flyers, setFlyers] = useState([]);
  const [doneDownloading, setDownloadStatus] = useState(false);
  const [modalVis, setModalVis] = useState(false);
  
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });
    // at this point, 'result' holds the uri - 'result' by itself isn't an image
  
    // if image is selected
    if (!result.cancelled) {
      console.log('image upload started')
      //setFlyers(Flyers => [...Flyers, { uri: result.uri }]); // updates flyers array with new uri
      console.log(result.uri)
      return(result.uri);
    };
  };
  
  //#region back-end
  /*
  // useEffect to upload all flyer data
  useEffect(() => {
    if (!doneDownloading) {
      console.log("not done downloading!")
      return
    }
    console.log("uploading flyer")
 
    // set number of flyers
    firebase.database().ref("numFlyers").set(flyers.length); ///// MUST BE UPDATED: uses local flyers.length, will lead to problems with concurrent users (two users each uploading image 567 from their end for example)
 
    if (flyers.length > 0) {
      const flyer = flyers[flyers.length - 1]; // most recent flyer
      (async () => {
        // upload image
        const response = await fetch(flyer.uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child(flyers.length.toString());
        ref.put(blob).then(data => {
          data.ref.getDownloadURL().then(downloadURL => {
            console.log(downloadURL + "from upload process")
            firebase.database().ref(flyers.length).set(downloadURL);
          })
        });
      })();
    }
  }, [flyers]); // runs if Flyers updates
 
  // useEffect to download all flyer data on initial render
  useEffect(() => {
    setFlyers([]);
    // get number of flyers
    (async () => {
 
      console.log("downloading flyer")
      firebase.database().ref("numFlyers").once('value').then(querySnapShot => {
 
        const numFlyersInDatabase = querySnapShot.val()
        if (numFlyersInDatabase == 0) {
          console.log("changing download status")
          setDownloadStatus(true)
        }
        else {
          for (let i = 1; i <= numFlyersInDatabase; i++) {
            firebase.database().ref(i).once('value').then(querySnapShot2 => {
              console.log(querySnapShot2.val())
              setFlyers(Flyers => [...Flyers, { uri: querySnapShot2.val() }]);
              if (i == numFlyersInDatabase) {
                setDownloadStatus(true);
              }
            });
          }
        }
 
      });
 
    })();
  }, []); // empty array dependency means it only runs on initial render
*/

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

  

  //#endregion

  //#region front-end
  return (
    <ImageBackground source={require('../assets/Bulletin_bg.png')} style={{ flex: 1, resizeMode: 'cover' }}>
      {/* Top Appbar */}
      <Appbar.Header style={[styles.appbar, { height: 55 }]}>
        <Pressable onPress={signOut}>
          {({ pressed }) => (<Icon name={pressed ? 'account-outline' : 'account'} size={30} style={styles.icon_top} />)}
        </Pressable>
        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 75 }}>
          <Image source={require('../assets/Bulletin_text_blue.png')} style={{ resizeMode: 'contain', flexShrink: 1 }} />
        </View>
        <Pressable onPress={null}>
          {({ pressed }) => (<Icon name={pressed ? 'filter-menu-outline' : 'filter-menu'} size={30} style={styles.icon_top} />)}
        </Pressable>
      </Appbar.Header>


      {/*
        <FlatList
          data={flyers} // array of image sources, not the images themselves
          numColumns={2}
          directionalLockEnabled={true}
          style={{flexDirection: 'row', marginHorizontal:10,}}
          showsHorizontalScrollIndicator={false}
          overScrollMode='never'
          renderItem={({ item }) => {
            //const [width, setWidth] = useState(200);
            //const [height, setHeight] = useState(200);
            //console.log(item.toString);
            //Image.getSize(item, (width, height) => {setWidth(width), setHeight(height)});

            return (<Image source={item} style={{ width: 200, height: 200, resizeMode: 'contain' }} />);
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        */}

      {/* placeholder */}
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
        <Appbar.Header style={[styles.appbar,{height:55}]}>
          <Button title='cancel' onPress={() => { setModalVis(false) }} />
          <View style={{ flex: 1 }} />
          
          <Text style={styles.title}>Upload a flyer</Text>
          <View style={{ flex: 1 }} />
          <Button title='submit' onPress={() => { setModalVis(false) }} />
        </Appbar.Header>
        {/* Content of the modal - upload.js */}
        <UploadModal />
      </Modal>

    </ImageBackground>






  );
  //#endregion
};
