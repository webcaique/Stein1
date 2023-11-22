/* eslint-disable prettier/prettier */
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
    Img:{
      height:moderateScale(200),
      width: moderateVerticalScale(500),
      resizeMode:'cover',
    },
    
    seta:{
      marginTop: moderateScale(10),
      height: moderateScale(25),
      width: moderateScale(25),
      resizeMode:'contain',
      transform:[{ rotate: '-180deg' }]
    },
    estrela:{
    height:moderateScale(100),
    width: moderateVerticalScale(372),
    backgroundColor: '#584086',
    color: 'white'
    
    
    },
    bff:{
      flexDirection:'row',
    justifyContent:'center',
    maxHeight:moderateScale(120),
    width: moderateScale(350)
    },
    iconsSpecs:{
      borderWidth:2,
      backgroundColor:'#D9D9D9',
      width: moderateVerticalScale(100)
    },
    icon:{
      width:moderateVerticalScale(65), 
      height:moderateScale(40),
     margin: moderateVerticalScale(20),
       resizeMode: 'contain',
       flexDirection:'row',
       
    
      },
    
    textIcon:{
    fontSize:moderateScale(12),
    color: 'black',
    paddingLeft:20,
    paddingRight: 20,
    textAlign:'center',
    flexDirection:'row'
    
    
    },
    
    iconsSpecs:{
      borderWidth:2,
      backgroundColor:'#D9D9D9',
      width: moderateVerticalScale(100)
    },
    
    iconsSpecs1:{
      borderWidth:2,
      backgroundColor:'#D9D9D9',
      height:verticalScale(57),
      flexDirection:'row',
      alignItems:'center',
    
    },
    
    textIcon1:{
      color: 'black',
      fontSize:moderateScale(15),
      maxWidth: moderateScale(250)
    },
    })
   
export default estilos;