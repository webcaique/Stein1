import {StyleSheet} from "react-native"

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        width:"100%",
        height:"100%",
        paddingHorizontal:10,
        paddingTop: 10,
    },
    box1:{
        width:"80%",
        height:"auto",
        marginHorizontal:10,
        marginTop:20,
    },
    inBox1:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:"80%",
        marginTop:20,
        marginBottom:10,

    },
    lines:{
        height:5,
        width:"100%",
        backgroundColor:"#000000",
        marginVertical:10,
    },
    inBox2:{
        flexDirection:"row",
        width:"70%",
        marginTop:20,
        
        alignItems:"center",
    },
    textsInBoxStyles:{
        fontSize:12,
    },
    image2:{
        marginRight:10
    },
    linkImage:{
        width:30,
        height:30,
        resizeMode:"contain",
        marginLeft:10,
        
    },
    plusImage:{
        width:50,
        height:50,
        resizeMode:"contain",
        borderRadius:50/2,
    },
    leaveImage:{
        width:40,
        height:40,
        resizeMode:"contain",
    },
    plusButton:{
        width:"100%",
        height:75,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        marginVertical:10,
    },
    circuleButton:{
        width:50,
        height:50,
        backgroundColor:"rgba(78,18,194,0.75)",
        borderRadius:50/2,
        borderWidth:1,
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:10,
        
    },
    site:{
        marginLeft:10,
    },
    textInBox:{
        width:200,
    }
})

export default styles;
/*
const estilos= StyleSheet.create({
    usuario:{
  flex:1,
  position:'absolute',
  top:'15%',
  left:'10%'
    },
    tela:{
      flex:1,
      height:'100%',
      width:'100%',
      backgroundColor:'#E2E2E2'
    },
    textos:{
      flex:1,
      position:'absolute',
      left:125,
      top:40
    },
    textos1:{
      flex:1,
      position:'absolute',
      left:125,
      top:40
    },
    usuario1:{
      flex:1,
      position:'absolute',
      top:'40%',
      left:'10%',
}
  })

  export default estilos
*/