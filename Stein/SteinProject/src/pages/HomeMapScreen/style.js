import {StyleSheet} from "react-native";
import { verticalScale, scale, ScaledSheet, moderateScale, moderateVerticalScale } from "react-native-size-matters";


const estilos=ScaledSheet.create({
 
    inferior:{
      flex:1,
      position:'absolute',
      top:'90%',
     width:'100%',
     height:'10%',
      borderTopLeftRadius:5,
      borderTopRightRadius:5,
      backgroundColor:'#584086',
  
  },
  partesuperior:{
    flex:1,
    position:'absolute',
    width:'100%',
    height:'10%',
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
    backgroundColor:'#584086',
    justifyContent:"center",
    paddingLeft:20,
  },
   fundo:{
  width:'100%',
  height:'100%'
   },
    background:{
      flex:1,
      position:'absolute',
      width:'100%',
      height:'100%'
    },
  
      superior:{
        flex:1,
        position:'absolute',
        width:'100%',
        height:'100%',
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,

        
      },
     iconBoltBg:{
      height: moderateVerticalScale(100),
      width: moderateVerticalScale(100),
      resizeMode:'contain',
      position:  'absolute',
      top:'70%', 
      right:'5%',
     },
     iconBolt:{
      height: moderateVerticalScale(100), 
      width: moderateVerticalScale(100), 
      resizeMode:'contain' ,
     },
     steinLogoBg:{
      width:"100%",
      height:moderateVerticalScale(100),
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      marginBottom:20,
     },
     modal:{
      flex:1,
      width:"100%",
      height:"100%",
      justifyContent:"flex-start",
      
     },
     steinLogo:{
      width:moderateVerticalScale(80),
      height:moderateVerticalScale(80),
      resizeMode:"contain",
     },
     textLogo:{
      fontSize:moderateVerticalScale(60),
      color:"#000000"
     },
     links:{
      width:"100%",
      height:moderateVerticalScale(40),
      borderColor:"#ffffff",
      borderBottomColor:"#000000",
      borderWidth:2,
      marginVertical:10,
     },
     imagemIcon1:{
      width:moderateVerticalScale(25),
      height:moderateVerticalScale(25),
      resizeMode:"contain",
      marginHorizontal:10,
     },
     imagemIcon2:{
      width:moderateVerticalScale(25),
      height:moderateVerticalScale(25),
      resizeMode:"contain",
      marginHorizontal:10,
      transform: [{rotate:'90deg'}],
     },
     textLink:{
      fontSize:moderateScale(18),
     },
     containerLink:{
      flexDirection:"row",
      alignItems:"center",
    }

    })

export default estilos;