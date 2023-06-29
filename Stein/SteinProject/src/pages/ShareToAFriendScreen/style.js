import React from "react";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
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
        height:60,
        backgroundColor:"#ffffff",
        flexDirection:"row",
        alignItems:"center",
        marginVertical:20,
        },
    icons:{
        height:30,
        width:30,
        resizeMode:"contain",
    },
    circule:{
        width:50,
        height:50,
        borderRadius:50/2,
        backgroundColor:"purple",
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:15,
        padding:20,
    },
    textContent:{
        fontSize:30,
        fontWeight:"700",
        color:"#000000"
    },
    helpUs:{
        fontSize:35,
        fontWeight:"700",
    }
})

export default styles;