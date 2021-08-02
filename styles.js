import { Dimensions, StyleSheet, StatusBar } from "react-native";
import { DefaultTheme } from "react-native-paper";

//styling
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const appbarColor = 'rgba(240,240,240, 1)';
export const buttonBorderColor = 'rgba(255,255,255,0.8)';
export const buttonColor = 'rgba(255,255,255,0.2)';

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
        alignItems: 'center'
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
        color: 'black',
        fontSize: 24,
        alignSelf: 'center',
    },
    upload_text: {
        color: 'black',
        paddingLeft: 30,
    }



});