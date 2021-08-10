import { Dimensions, StyleSheet, StatusBar } from "react-native";
import { DefaultTheme } from "react-native-paper";
import EStyleSheet from 'react-native-extended-stylesheet';
//import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// constants for use in other files
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const iconSize = 30;

// This is some cancer for the InputText, it sorta works but its annoying, just let me change the colors at this point prolly
export const theme = {
    ...DefaultTheme,
    backgroundColor: 'transparent',
    fontSize: 60,
    colors: {
        primary: 'grey',
        secondary: 'red',
    }
}


EStyleSheet.build({

    $rem: Math.round(windowWidth / 38),
    $width: windowWidth,
    $height: windowHeight,

    $appbar_c: 'rgba(240,240,240, 1)',
    $title_c: 'rgba(60,60,60,1)',
    $button_border_c: 'rgba(255,255,255,0.8)',

});



export const styles = EStyleSheet.create({ // getting a delay in background showing which isn't ideal

    //#region Welcome
    bkgd: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    bulletin_image: {
        width: '60%',
        resizeMode: 'contain',
        flexShrink: 1,
    },
    button: {
        elevation: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: '2.5rem',
        borderColor: '$button_border_c',
        borderWidth: '0.1rem',
        paddingVertical: '1.2rem',
        alignSelf: 'center',
        width: windowWidth * 0.65,
        backgroundColor: 'rgba(255,255,255,0.2)'
    },

    button_text: {
        color: 'white',
        fontSize: '2.4rem',
        alignSelf: 'center',
    },
    //#endregion



    appbar: {
        width: '100%',
        backgroundColor: '$appbar_c',
        shadowColor: 'black',
        paddingBottom: '1.5rem',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight,
    },
    appbar2: {
        width: windowWidth * 0.7,
        backgroundColor: "$appbar_c",
        shadowColor: 'black',
        paddingBottom: '1.5rem',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight,
    },

    input: {
        width: '85%',
        alignSelf: 'center',
        fontSize: '1.8rem',
        color: 'red',
    },
    input_text: {
        color: 'white',
        marginLeft: '3rem',
    },



    icon_top: {
        paddingTop: '1rem',
        paddingHorizontal: '1rem',
    },
    icon_bottom: {
        alignSelf: 'center'
    },


    flatlist_img: {
        width: '40%',
        height: '20%',
        borderWidth: '0.2rem',
        borderColor: 'white',
        resizeMode: 'contain',
        margin: '0.4rem',
    },

    title: {
        color: 'rgba(0,0,0,0.8)',
        fontSize: '2rem',
        alignSelf: 'center',
    },

    settings_text: {
        alignSelf: 'center',
        fontSize: '1.6rem',
        paddingHorizontal: '0.5rem',
        flex:1,
        flexDirection:'row',
    },
    settings_button: {
        flexDirection: 'row',
        paddingVertical: '1.5rem',
        paddingHorizontal: '0.5rem',
        borderColor: 'rgba(150,150,150,0.8)',
        borderTopWidth: 1,
    },
    settings_modal: {
        backgroundColor: 'white', 
        justifyContent: 'flex-start', 
        width: '70%', 
        shadowOffset: { width: 5, height: 0 }, 
        shadowColor: "#000000", 
        shadowOpacity: 0.3, 
        shadowRadius: 2,
    },
    settings_transparent: {
        height: '100%', 
        width: '30%', 
        backgroundColor: 'rgba(0,0,0,0.3)',
    }

});