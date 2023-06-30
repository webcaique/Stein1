import { StyleSheet } from "react-native";
import { verticalScale, scale, ScaledSheet, moderateScale, moderateVerticalScale } from "react-native-size-matters";

const style = ScaledSheet.create({
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
        backgroundColor:"#ffff",
        marginTop:100,
        borderRadius: moderateVerticalScale(10),
        borderWidth:scale(1),
        borderBottomColor:"#000000",
        width:scale(309),
        fontSize: moderateVerticalScale(16),
        paddingLeft: scale(5),
        height: verticalScale(50),
    },
    linhas:{
        marginTop:scale(40),
        flexDirection:"row",
        alignItems:"center",
        justifyContent: "space-evenly"
        
    },
    linha1:{
        width:"40%",
        backgroundColor:"#000000",
        height:verticalScale(3),
        },
    linha2:{
        width:"40%",
        backgroundColor:"#000000",
        height:verticalScale(3),
        
    },
    textBetweenLines:{
      fontSize: moderateScale(12),
      marginHorizontal: moderateScale(10)
    },
    textInput2:{
        borderStyle: 'solid',
        borderRadius: moderateVerticalScale(10),
        backgroundColor:"#ffffff",
        marginTop:30,
        borderWidth:scale(1),
        borderBottomColor:"#000",
        width:scale(309),
        height: verticalScale(50),
        paddingLeft: scale(5),
        fontSize: moderateVerticalScale(16)
    },
    checkBox:{
        marginTop:scale(20),
        alignItems:"center",
        flexDirection:"row",
        alignSelf:"flex-start",
        justifyContent:"center",
    },
    textCheckbox:{
      fontSize: moderateVerticalScale(18)
    },
    logos:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },
    img1:{
        width:moderateScale(75),
        resizeMode:"contain",
        marginRight:20,
        
        
    },
    img2:{
        width:moderateScale(75),
        resizeMode:"contain",
        marginLeft:20
        
        
    },
    buttons:{
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
      singinLink:{
        display:"flex",
        flexDirection:"row",
        marginTop:moderateVerticalScale(25),
      },
      siginButton:{
        marginLeft:1,
        
      },
      textSiginButton:{
        fontWeight:"900",
        fontSize:moderateScale(17),
      },
      textSigin:{
        fontSize:moderateScale(17),
      },
})
export default style;