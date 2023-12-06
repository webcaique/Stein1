/* eslint-disable prettier/prettier */
import { verticalScale, scale, ScaledSheet, moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { RFValue } from "react-native-responsive-fontsize";

const estilos=ScaledSheet.create({
  gps:{
    marginHorizontal:5,
  },
  info:{
    fontSize:RFValue(12),
    color:"#fff"
  },  
  horarioDeChegada:{
    fontSize: RFValue(16),
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
      height: RFValue(100),
      width: RFValue(100),
      resizeMode:'contain',
      position:  'absolute',
      top:'70%', 
      right:'5%',
     },
     iconBolt:{
      height: RFValue(100), 
      width: RFValue(100), 
      resizeMode:'contain' ,
     },
     steinLogoBg:{
      width:"100%",
      height:RFValue(100),
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
      width:RFValue(80),
      height:RFValue(80),
      resizeMode:"contain",
     },
     textLogo:{
      fontSize:RFValue(60),
      color:"#000000"
     },
     links:{
      width:"100%",
      height:RFValue(40),
      marginVertical:10,
      borderBottomWidth:1,      
     },
     imagemIcon1:{
      width:RFValue(25),
      height:RFValue(25),
      resizeMode:"contain",
      marginHorizontal:10,
     },
     imagemIcon2:{
      width:RFValue(25),
      height:RFValue(25),
      resizeMode:"contain",
      marginHorizontal:10,
     },
     textLink:{
      fontSize:RFValue(18),
      color:"#000"
     },
     containerLink:{
      flexDirection:"row",
      alignItems:"center",
      
    },
    imgs:{
      width: RFValue(50),
      height:RFValue(50),
      resizeMode:"contain",
    },
    Strahd:{
      flex:1,
      display:'flex',
      height:"100%",
    },
    nomesCarregadores:{
      fontSize:8,
      maxWidth:RFValue(50),
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
      width: '100%',
      resizeMode:'cover',
    },
    
    seta:{
      marginTop: RFValue(10),
      height: RFValue(25),
      width: RFValue(25),
      resizeMode:'contain',
      transform:[{ rotate: '-180deg' }]
    },
    estrela:{
    height:moderateScale(100),
    width: '100%',
    backgroundColor: '#584086',
    color: 'white'
    
    
    },
    bff:{
      flexDirection:'row',
    justifyContent:'center',
    maxHeight:moderateScale(120),
    width: '100%'
    },
    iconsSpecs:{
      borderWidth:2,
      backgroundColor:'#D9D9D9',
      width: RFValue(100)
    },
    icon:{
      width:RFValue(65), 
      height:RFValue(40),
     margin: RFValue(20),
       resizeMode: 'contain',
       flexDirection:'row',
       alignSelf:'center'
    
      },
    
    textIcon:{
    fontSize:RFValue(12),
    color: 'black',

    textAlign:'center',
    flexDirection:'row',
    },
    responsividade:{
   height:'100%',
    },
    iconsSpecs:{
      borderWidth:2,
      backgroundColor:'#D9D9D9',
      width: '25%',
      height: moderateScale(100),
      alignSelf:'center'
    },
    
    iconsSpecs1:{
      borderWidth:2,
      backgroundColor:'#D9D9D9',
      height: '25%',
      flexDirection:'row',
      alignItems:'center',

      
    },
    
    textIcon1:{
      color: 'black',
      fontSize:RFValue(15),
      maxWidth: RFValue(250)
    },

    time:{
      position:"absolute",
      width:"100%",
      height:"100%",
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      padding:20,
    },
    timeText:{
      paddingHorizontal:20,
      paddingVertical:10,
      fontSize: RFValue(18),
      backgroundColor:"#FFF",
      fontWeight:"900",
      textAlign:"center",
      borderRadius:10,
    },
    markerCarregadores:{
      position:"absolute",
      right:"25%",
      marginTop:10,
      marginRight:10,
    },
    iconPontoCarregador:{
      width:50,
      height:50,
      resizeMode:"contain",
    }


    })
   
export default estilos;