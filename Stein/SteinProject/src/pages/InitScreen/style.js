import { ScaledSheet } from 'react-native-size-matters';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const styles = ScaledSheet.create({
    conteiner:{
      flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 55,
          marginTop:scale(13),
    },
    backgroundLogo:{
      width: 250,
      height: 250,
      alignItems:"center",
      justifyContent:"center",
    },
    logoStein:{
      flex:1,
      width: "100%",
      resizeMode: "contain",
      marginTop:scale(30),
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
          fontSize: scale(17),
          color:"#000000",
        },
        textAbove:{
          marginTop:(9),
          fontWeight:"600",
          fontSize: moderateScale(17),
          color:"#000000",
        },
        buttons:{
          width: scale(265),
          height: verticalScale(60),
          backgroundColor: "purple",
          borderRadius:moderateScale(25),
          justifyContent:"center",
          alignItems:"center",
          margin: (30),
        },
        textButtons:{
          fontSize: moderateScale(20),
          fontWeight:"900",
          color: "white",
        },
        textSingle1:{
          fontSize:moderateScale(17),
          fontWeight:"700",
          textDecorationLine:"underline",
          color:"#000000",
        }
     })
  
     export default styles;