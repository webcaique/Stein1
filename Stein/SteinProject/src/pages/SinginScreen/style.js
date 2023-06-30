import {StyleSheet} from "react-native";
import { verticalScale, scale, ScaledSheet, moderateScale, moderateVerticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
    conteiner:{
        flex:1,
        backgroundColor:"#ffffff",
        width:"100%",
        height:"100%",
        alignItems:"center",
        padding: "5.5%",
        justifyContent: "space-around"

    },
    textInput1:{
      marginTop:100,
      backgroundColor:"#ffff",
      borderRadius: moderateVerticalScale(10),
      borderWidth:scale(1),
      borderBottomColor:"#000000",
      width:scale(309),
      fontSize: moderateVerticalScale(16),
      paddingLeft: scale(5),
      height: verticalScale(50),
    },
    textInputAll:{
        marginTop:30,
        backgroundColor:"#ffff",
        borderRadius: moderateVerticalScale(10),
        borderWidth:scale(1),
        borderBottomColor:"#000000",
        width:scale(309),
        fontSize: moderateVerticalScale(16),
        paddingLeft: scale(5),
        height: verticalScale(50),
    },
    buttons:{
        marginTop:40,
        width: scale(265),
        height: verticalScale(60),
        backgroundColor: "purple",
        borderRadius: moderateVerticalScale(25),
        justifyContent:"center",
        alignItems:"center",

        
      },
    textButtons:{
      fontSize: moderateScale(20),
      fontWeight:"900",
      color: "white",
      },
      loginLink:{
        display:"flex",
        flexDirection:"row",
        marginTop:moderateVerticalScale(25),
        alignSelf:"center"
      },
      loginButton:{
        marginLeft:1,
        
      },
      textLoginButton:{
        fontWeight:"900",
        fontSize:moderateScale(17),
      },
      textLogin:{
        fontSize:moderateScale(17),
      },
})

export default styles