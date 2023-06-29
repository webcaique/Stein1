import {StyleSheet} from "react-native"

const styles = StyleSheet.create({
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
        marginTop:149,
        borderWidth:1,
        borderBottomColor:"#000000",
        width:309,
        borderColor:"#ffffff",
        paddingBottom:5,
    },
    textInputAll:{
        backgroundColor:"#ffffff",
        marginTop:30,
        borderWidth:1,
        borderBottomColor:"#000000",
        width:309,
        borderColor:"#ffffff",
        paddingBottom:5,
    },
    buttons:{
        marginTop:40,
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
        alignSelf:"center"
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

export default styles