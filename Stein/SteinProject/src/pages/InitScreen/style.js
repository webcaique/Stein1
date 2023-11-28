import { ScaledSheet } from 'react-native-size-matters';
import { verticalScale, scale, moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { RFValue } from "react-native-responsive-fontsize";

const styles = ScaledSheet.create({
    conteiner:{
      flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          //padding: 25,
          //marginTop:RFValue(24),
          backgroundColor:"#fff"
    },
    backgroundLogo:{
      width: "100%",
      height: "50%",
      alignItems:"center",
      justifyContent:"center",
    },
    logoStein:{
      flex:1,
      width: "100%",
      resizeMode: "contain",
      marginTop:30,
      },
      circle:{
        flex:1,
        width: "100%",
        height:"100%",
        resizeMode: "contain",
        position:"absolute",
        },
        textLogo:{
          marginBottom: (13),
          fontWeight:"600",
          fontSize: RFValue(17),
          color:"#000000",
        },
        textAbove:{
          marginTop:(9),
          fontWeight:"600",
          fontSize: RFValue(17),
          color:"#000000",
        },
        buttons:{
          width: RFValue(265),
          height: RFValue(60),
          backgroundColor: "purple",
          borderRadius:RFValue(25),
          justifyContent:"center",
          alignItems:"center",
          margin: (30),
        },
        textButtons:{
          fontSize: RFValue(20),
          fontWeight:"900",
          color: "white",
        },
        textSingle1:{
          fontSize:RFValue(17),
          fontWeight:"700",
          textDecorationLine:"underline",
          color:"#000000",
        }
     })
  
     export default styles;