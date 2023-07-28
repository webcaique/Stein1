import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%",
        height:"100%",
        padding:10,
    },
    titleContainer:{
        fontSize:16,
        marginBottom:44,
        color:"black",
    },
    box:{
        borderWidth:1,
        padding:18,
        marginBottom:25,
    },
    titleBox:{
        fontSize:25,
        marginBottom:30,
        color:"black",
        fontWeight:"800",
    },
    line:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:30,
        marginBottom:11,
    },
    titleLine:{
        fontSize:20,
        color:"black",
        fontWeight:"600",
    },
    link:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },
    textLink:{
        fontSize:10,
        color:"black",
    },
    iconLinkView:{
        width:22,
        height:22,
    },
    iconLink:{
        width:22,
        height:22,
        resizeMode:"contain",
        marginLeft:5,
    },
    iconLinkView:{
        display:"flex",
        flexDirection:"row",
    },
    editionButton:{
        width:200,
        height:75,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#8429AE",
        borderRadius:15,
        borderWidth:2,
    },
    textButton:{
        fontSize:25,
        fontWeight:"900",
        color:"#ffffff",
    },
    buttonBox:{
        width:"100%",
        alignItems:"center",
        marginBottom:25,
    }
})

export default styles;