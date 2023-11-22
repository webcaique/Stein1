import {StyleSheet} from "react-native";
import { verticalScale, scale, ScaledSheet, moderateScale, moderateVerticalScale } from "react-native-size-matters";


const styles = ScaledSheet.create({
    texto1:{
   color: 'black',
   fontSize:scale(15),
   textAlign:'center',
   marginTop: scale(20)
        

    },
    caixa:{
        marginTop: moderateVerticalScale(70),
        alignItems:'center',
        backgroundColor: '#E2E2E2',
        height: moderateVerticalScale(600),
        borderTopWidth:1,

    },
    caixa2:{
        marginTop: moderateVerticalScale(70),
        alignItems:'center',
        backgroundColor: '#fff',
        height: moderateVerticalScale(170),
        width: '80%',
        borderTopWidth:0,
        borderRadius: moderateScale(5),

    },
    TextInput:{
        color:'black',
        borderBottomWidth:1,
        width: '90%',
      
    },
    TextInput1:{
        color:'black',
        borderBottomWidth:1,
        width: '90%',
       
    },
    buttons:{
        width: scale(132),
        height: verticalScale(60),
        backgroundColor: "purple",
        borderRadius: moderateVerticalScale(25),
        justifyContent:"center",
        alignItems:"center",
        marginTop: moderateVerticalScale(30),
      },
      textButtons:{
        fontSize: moderateScale(20),
        fontWeight:"900",
        color: "white",
      },
})
export default styles;