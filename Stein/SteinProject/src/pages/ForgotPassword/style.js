import { ScaledSheet, scale, moderateScale, verticalScale, moderateVerticalScale, moderateHorizontalScale } from "react-native-size-matters";
import {StyleSheet} from "react-native"

const styles = ScaledSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor: '#E3DEDE' 
    },
    texto:{
       fontSize: moderateScale(18),
       margin: moderateScale(15),
       padding: moderateScale(10),
       color: 'black',
       marginTop: moderateScale(50)
   
    },
    senha:{
        
         padding: moderateVerticalScale(20),
         marginLeft: moderateVerticalScale(10),
         width: moderateScale(301),
         fontSize: moderateScale(20)
         
         
         
    },
    coop:{
     
        marginBottom:10,
        width: moderateScale(335),
        height: moderateScale(70),
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(10),
        backgroundColor: "white",
    },
    textButtons:{
        fontSize: moderateScale(25),
        fontWeight:"900",
        color: "white",
      },
      buttons:{
        position: 'relative',
        top: moderateScale(50),
        width: scale(150),
        height: verticalScale(43),
        backgroundColor: "purple",
        borderRadius: moderateVerticalScale(20),
        justifyContent:"center",
        alignItems:"center",

      },
})


export default styles;