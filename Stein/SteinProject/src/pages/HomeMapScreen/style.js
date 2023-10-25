import { verticalScale, scale, ScaledSheet, moderateScale, moderateVerticalScale } from "react-native-size-matters";


const estilos=ScaledSheet.create({
  gps:{
    marginHorizontal:5,
  },
  info:{
    fontSize:12,
    color:"#fff"
  },  
  horarioDeChegada:{
    fontSize: 16,
    color:"#fff",
    fontWeight:"700",
  },
  cotainerInformacoes:{
    width:"50%",
    alignItems:"center",
  },
  informacoes:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
  },
  rotaContainer:{
    position:"absolute",
    bottom:0,
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    height:"10%"
  },
    barraDeBusca:{
      height:1000,
      width:1000,
      flex:5
    },
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
      marginVertical:10,
      borderBottomWidth:1,      
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
     },
     textLink:{
      fontSize:moderateScale(18),
     },
     containerLink:{
      flexDirection:"row",
      alignItems:"center",
      
    },
    imgs:{
      width: moderateVerticalScale(50),
      height:moderateVerticalScale(50),
      resizeMode:"contain",
    },
    nomesCarregadores:{
      fontSize:8,
      maxWidth:50,
      textAlign: "center"    
    },
    carregadores:{
      padding:10,
      alignItems:"center",
      justifyContent:"center",
      borderWidth:3,
    },
    carregador:{
      padding:10,
      alignItems:"center",
      justifyContent:"center",
      
    },
    centerTabela:{
      width:"100%",
      alignItems:"center"
    },


    })

export default estilos;