import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    conteiner:{
        flex:1,
        backgroundColor:"#ffffff",
        width:"100%",
        height:"100%",
        alignItems:"center",
        paddingLeft:45,
        paddingRight:45,

    },
    textInput1:{
        backgroundColor:"#ffffff",
        marginTop:100,
        borderWidth:1,
        borderBottomColor:"#000000",
        width:309,
        borderColor:"#ffffff",
        paddingBottom:5,
    },
    linhas:{
        marginTop:40,
        flexDirection:"row",
        alignItems:"center",
        
    },
    linha1:{
        width:"40%",
        backgroundColor:"#000000",
        height:3,
        },
    linha2:{
        width:"40%",
        backgroundColor:"#000000",
        height:3,
        
    },
    textInput2:{
        backgroundColor:"#ffffff",
        marginTop:30,
        borderWidth:1,
        borderBottomColor:"#000000",
        width:309,
        borderColor:"#ffffff",
        paddingBottom:5,
    },
    checkbox:{
        marginTop:20,
        alignItems:"center",
        flexDirection:"row",
        alignSelf:"flex-start",
        
    },
    logos:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },
    img1:{
        width:75,
        resizeMode:"contain",
        marginRight:20,
        
        
    },
    img2:{
        width:75,
        resizeMode:"contain",
        marginLeft:20
        
        
    },
    buttons:{
        width: 265,
        height: 60,
        backgroundColor: "purple",
        borderRadius:25,
        justifyContent:"center",
        alignItems:"center",
      },
      textButtons:{
        fontSize: 20,
        fontWeight:"900",
        color: "white",
      },
      singinLink:{
        display:"flex",
        flexDirection:"row",
        marginTop:25,
      },
      siginButton:{
        marginLeft:1,
        
      },
      textSiginButton:{
        fontWeight:"900",
        fontSize:17,
      },
      textSigin:{
        fontSize:17,
      },
})
export default style;