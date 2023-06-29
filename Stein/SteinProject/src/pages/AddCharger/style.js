import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%",
        height:"100%",
        padding:24,
        backgroundColor:"#ffffff",
    },
    acceptPay:{
        flexDirection:"row",
    },
    textInput:{
        width:"100%",
        height:60,
        backgroundColor:"rgba(0,0,0,0.10)",
        borderRadius:10,
        padding:10,
        marginVertical:15,
        fontSize:16,
        fontWeight:"400",
        color:"#000000"
    },
    button:{
        flex:1,
        alignItems:'center',
        width:"20%",
        height:40,
        backgroundColor:"rgba(0,0,0,0.10)",
        borderRadius:10,
        padding:10,
        marginVertical:15,
    },
    charger:{
        width:"100%",
        height:60,
        backgroundColor:"rgba(0,0,0,0.10)",
        borderRadius:10,
        padding:10,
        marginTop:15,
        justifyContent:"center",
    },
    placeholder:{
        fontSize:16,
        fontWeight:"400",
        color:"rgba(0,0,0,0.4)"
    }

})
export default styles;