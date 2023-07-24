import React from "react";
import {StyleSheet} from "react-native";
import { ScaledSheet, scale, moderateScale, verticalScale, moderateVerticalScale, moderateHorizontalScale } from "react-native-size-matters";

const styles = ScaledSheet.create({
    container:{
        flex:1,
        width:"100%",
        height:"100%",
        paddingRight:10,
        paddingLeft:10,
        paddingTop:10,
        backgroundColor:"rgba(27,27,27,0.15)"
    },
    box:{
        width:"100%",
        height:scale(60),
        backgroundColor:"#ffffff",
        flexDirection:"row",
        alignItems:"center",
        marginVertical:20,
        },
    icons:{
        height:scale(30),
        width:scale(30),
        resizeMode:"contain",
    },
    circule:{
        width:scale(50),
        height: scale(50),
        borderRadius:scale(50/2),
        backgroundColor:"purple",
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:15,
    },
    textContent:{
        fontSize:moderateVerticalScale(30),
        fontWeight:"700",
        color:"#000000"
    },
    helpUs:{
        fontSize:35,
        fontWeight:"700",
    }
})

export default styles;