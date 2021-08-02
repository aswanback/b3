import { Dimensions, StyleSheet, StatusBar } from "react-native";
import { DefaultTheme } from "react-native-paper";

// constants for use in other files
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const appbarColor = 'rgba(240,240,240, 1)';
export const buttonBorderColor = 'rgba(255,255,255,0.8)';
export const buttonColor = 'rgba(255,255,255,0.2)';

// This is some cancer for the InputText, it sorta works but its annoying, just let me change the colors at this point prolly
export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'black',
        secondary: 'red',
    }
}


export const styles = StyleSheet.create({ // getting a delay in background showing which isn't ideal
    bkgd: {
        width: windowWidth,
        height: windowHeight,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    },
    
    bulletin_image: {
        height: 90,
        resizeMode: 'contain',
        aspectRatio: 762 / 250,
        flexShrink: 1,
    },
    appbar: {
        width: windowWidth,
        backgroundColor: appbarColor,
        shadowColor: 'black',
        paddingBottom:15,
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight,
    },

    input: {
        width: "85%",
        alignSelf: 'center',
        fontSize: 18,
    },
    input_text: {
        color: 'white',
        marginLeft: 30,
    },

    button: {
        elevation: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 25,
        borderColor: buttonBorderColor,
        borderWidth: 1,
        paddingHorizontal: 35,
        paddingVertical: 15,
        width: windowWidth / 1.5,
        alignSelf: 'center'
    },
    button_text: {
        color: 'white',
        fontSize: 24,
        alignSelf: 'center',
    },

    icon_top: {
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    icon_bottom: {
        alignSelf: 'center'
    },


    flatlist_img: {
        width: windowWidth/2.5,
        height: 200,
        borderWidth: 2,
        borderColor: 'white',
        resizeMode: 'contain',
        margin: 4
    },

    title: {
        color: 'rgba(60,60,60,1)',
        fontSize: 24,
        alignSelf: 'center',
    },

});