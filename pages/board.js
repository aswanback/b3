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
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react/cjs/react.production.min';

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
  const { signOut } = React.useContext(AuthContext);
  const [flyers, setFlyers] = useState([]);
  const [doneDownloading, setDownloadStatus] = useState(false);
  const [modalVis, setModalVis] = useState(false);

  const [org, setOrg] = useState('init_org');
  const [date, setDate] = useState(new Date());
  const [contact, setContact] = useState('init_contact');
  const [flyerUri, setFlyerUri] = useState('init_uri');
  

  
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




function beginUpload(){
  // start to upload the flyer based on the uri and metadata
  // you have org, contact, date, and flyerUri variables

  // upload image

  firebase.database().ref("numFlyers").once('value').then(querySnapShot => {
    
    const numFlyers = Number(querySnapShot.val())
    const newNumFlyers = numFlyers + 1;
    var ref = firebase.storage().ref().child(newNumFlyers.toString());

    fetch(flyerUri).then(response => {
      response.blob().then(blob => {
        ref.put(blob).then(data => {
          data.ref.getDownloadURL().then(downloadURL => {
            firebase.database().ref(newNumFlyers).set({
              status: 'active',
              url: downloadURL,
              uid: firebase.auth().currentUser.uid
            });
            firebase.database().ref("numFlyers").set(newNumFlyers.toString());
          });
        });
      });
    });
  
    
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

  

  //#endregion

  //#region front-end
  return (
    <ImageBackground source={require('../assets/Bulletin_bg.png')} style={{ flex: 1, resizeMode: 'cover' }}>
      {/* Top Appbar */}
      <Appbar.Header style={[styles.appbar, { height: 55 }]}>
        <Pressable onPress={__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED}>
          {({ pressed }) => (<Icon name={pressed ? 'account-outline' : 'account'} size={30} style={styles.icon_top} />)}
        </Pressable>
        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 75 }}>
          <Image source={require('../assets/Bulletin_text_blue.png')} style={{ resizeMode: 'contain', flexShrink: 1 }} />
        </View>
        <Pressable onPress={signOut}>
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
        <Appbar.Header style={[styles.appbar,{height:50}]}>
          <View style={{width:70}} >
          <Button title='Cancel' onPress={() => { setModalVis(false); setOrg(null); setContact(null); setDate(null); setFlyerUri(null); }} />
          </View>
          <View style={{ flex: 1 }} />
          
          <Text style={styles.title}>Upload</Text>
          <View style={{ flex: 1 }} />
          <View style={{width:70}} >
          <Button title='Done' onPress={() => { setModalVis(false); beginUpload(); }} />
          </View>
        </Appbar.Header>

        {/* Content of the modal - upload.js */}
        <UploadModal setOrg={setOrg} setDate={setDate} setContact={setContact} setFlyerUri={setFlyerUri} />
        
      </Modal>

    </ImageBackground>
  );
  //#endregion
};
