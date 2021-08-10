import { StyleSheet, Text, View, Button, Dimensions, TouchableWithoutFeedback, StatusBar, Pressable, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer, TabRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles, iconSize } from '../styles';
import { AuthContext, CustContext } from './auth.js';


export default function Settings({ navigation }) {
  const { signOut, deleteAccount, changePassword, viewMyFlyers } = React.useContext(AuthContext);

  function IconAndButton(props) {
    return(
    <TouchableOpacity onPress={props.onPress} >
      <View style={styles.settings_button} >
        <Icon name={props.icon} size={30} color={props.color}/>
        <Text style={[styles.settings_text,{color:props.color}]}> {props.text} </Text>
      </View>
    </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }} >
      <View style={styles.settings_modal} >
        <View style={{ flex: 1, flexDirection: 'column' }} >
          <Appbar.Header style={[styles.appbar, { height: 55 }]}>
            <View style={{ flex: 1 }} />
            <Text style={styles.title}>Profile</Text>
            <View style={{ flex: 1 }} />
          </Appbar.Header>

          <View style={{flex:0.5}}/>
          <Icon name='account' size={200} style={{alignSelf:'center'}}/>
          <Text style={{alignSelf:'center'}}>my name jeff</Text>

          <View style={{flex:1}}/>
          <IconAndButton icon='file-star' text='My flyers' onPress={viewMyFlyers}/>
          
          <IconAndButton icon='lock-reset' text='Change Password' onPress={changePassword}/>
          <IconAndButton icon='account-remove' text='Delete Account' onPress={deleteAccount}/>
          <IconAndButton icon='book-open-variant' text='Terms of Service' onPress={null}/>
          <IconAndButton icon='information-outline' text='About' onPress={null}/>
          <IconAndButton icon='phone' text='Contact' onPress={null}/>
          <IconAndButton icon='exit-to-app' text='Sign out' color='red' onPress={signOut}/>
          <View style={{flex:1}}/>

        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('board')}>
        <View style={styles.settings_transparent} />
      </TouchableWithoutFeedback>
    </View>
  );
}