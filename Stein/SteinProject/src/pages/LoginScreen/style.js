import { StyleSheet } from "react-native";
import { verticalScale, scale, ScaledSheet, moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { RFValue } from "react-native-responsive-fontsize";

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
        borderRadius: RFValue(10),
        borderWidth:RFValue(1),
        borderBottomColor:"#000000",
        width:"100%",
        fontSize: RFValue(16),
        paddingLeft: RFValue(5),
        height: RFValue(50),
    },
    linhas:{
        marginTop:RFValue(40),
        flexDirection:"row",
        alignItems:"center",
        justifyContent: "space-evenly"
        
    },
    linha1:{
        width:"45%",
        backgroundColor:"#000000",
        height:RFValue(3),
        },
    linha2:{
        width:"45%",
        backgroundColor:"#000000",
        height:RFValue(3),
        
    },
    textBetweenLines:{
      fontSize: RFValue(12),
      marginHorizontal: RFValue(10)
    },
    textInput2:{
        borderStyle: 'solid',
        borderRadius: RFValue(10),
        backgroundColor:"#ffffff",
        marginTop:30,
        borderWidth:RFValue(1),
        borderBottomColor:"#000",
        width:"100%",
        height: RFValue(50),
        paddingLeft: RFValue(5),
        fontSize: RFValue(16)
    },
    checkBox:{
        marginTop:RFValue(20),
        alignItems:"center",
        flexDirection:"row",
        alignSelf:"flex-start",
        justifyContent:"center",
    },
    textCheckbox:{
      fontSize: RFValue(18)
    },
    logos:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        width:"100%",
    },
    img1:{
        width:RFValue(100),
        resizeMode:"contain",
        height:RFValue(100),
        marginVertical:20,
        
    },
    img2:{
      width:RFValue(100),
      resizeMode:"contain",
      height:RFValue(100),
      marginVertical:20,
        
        
    },
    buttons:{
        width: RFValue(265),
        height: RFValue(60),
        backgroundColor: "purple",
        borderRadius: RFValue(25),
        justifyContent:"center",
        alignItems:"center",

      },
      textButtons:{
        fontSize: RFValue(20),
        fontWeight:"900",
        color: "white",
      },
      singinLink:{
        display:"flex",
        flexDirection:"row",
        marginTop:RFValue(25),
      },
      siginButton:{
        marginLeft:1,
        
      },
      textSiginButton:{
        fontWeight:"900",
        fontSize:RFValue(17),
      },
      textSigin:{
        fontSize:RFValue(17),
      },
})
export default style;

