import React from "react";
import {StyleSheet} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
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
        height:RFValue(60),
        backgroundColor:"#ffffff",
        flexDirection:"row",
        alignItems:"center",
        marginVertical:20,
        },
    icons:{
        height:RFValue(30),
        width:RFValue(30),
        resizeMode:"contain",
    },
    circule:{
        width:RFValue(50),
        height: RFValue(50),
        borderRadius:RFValue(50/2),
        backgroundColor:"purple",
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:15,
    },
    textContent:{
        fontSize:RFValue(30),
        fontWeight:"700",
        color:"#000000"
    },
    helpUs:{
        fontSize:RFValue(35),
        fontWeight:"700",
    }
})

export default styles;