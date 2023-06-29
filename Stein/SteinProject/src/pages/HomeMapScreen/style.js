import {StyleSheet} from "react-native";


const estilos=StyleSheet.create({
 
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
      height: 100,
      width: 100,
      resizeMode:'contain',
      position:  'absolute',
      top:'70%', 
      left:'70%'
     },
     iconBolt:{
      height: 100, 
      width: 100, 
      resizeMode:'contain' ,
     },
     steinLogoBg:{
      width:"100%",
      height:100,
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      marginBottom:20,
     },
     modal:{
      flex:1,
      width:"100%",
      height:"100%",
      alignItems:"center",
      justifyContent:"flex-start",
     },
     steinLogo:{
      width:80,
      height:80,
      resizeMode:"contain",
     },
     textLogo:{
      fontSize:60,
      color:"#000000"
     },
     links:{
      width:"100%",
      height:40,
      borderColor:"#ffffff",
      borderBottomColor:"#000000",
      borderWidth:2,
      marginVertical:10,
     },
     imagemIcon1:{
      width:25,
      height:25,
      resizeMode:"contain",
      marginHorizontal:10,
     },
     imagemIcon2:{
      width:25,
      height:25,
      resizeMode:"contain",
      marginHorizontal:10,
      transform: [{rotate:'90deg'}],
     },
     textLink:{
      fontSize:18,
     },
     containerLink:{
      flexDirection:"row",
      alignItems:"center",
    }

    })

export default estilos;