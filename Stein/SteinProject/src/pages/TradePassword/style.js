import {StyleSheet} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { verticalScale, scale, ScaledSheet, moderateScale, moderateVerticalScale } from "react-native-size-matters";


const styles = ScaledSheet.create({
    texto1:{
   color: 'black',
   fontSize:RFValue(15),
   textAlign:'center',
   marginTop: RFValue(20)
        

    },
    caixa:{
        marginTop: RFValue(70),
        alignItems:'center',
          height: RFValue(600),
       

    },
    caixa2:{
        marginTop: RFValue(70),
        alignItems:'center',
        backgroundColor: '#fff',
        height: RFValue(170),
        width: '80%',
        borderTopWidth:0,
        borderRadius: RFValue(5),
        marginVertical:10,

    },
    TextInput:{
        color:'black',
        borderBottomWidth:1,
        width: '90%',
        fontSize:RFValue(16)
      
    },
    TextInput1:{
        color:'black',
        borderBottomWidth:1,
        width: '90%',
        fontSize:RFValue(16)
       
    },
    buttons:{
        width: RFValue(132),
        height: RFValue(60),
        backgroundColor: "purple",
        borderRadius: RFValue(25),
        justifyContent:"center",
        alignItems:"center",
        marginTop: RFValue(30),
      },
      textButtons:{
        fontSize: RFValue(20),
        fontWeight:"900",
        color: "white",
      },
})
export default styles;