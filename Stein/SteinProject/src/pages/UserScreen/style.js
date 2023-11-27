import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        width:"100%",
        height:"100%",
        alignItems:"center",
        backgroundColor:"rgba(0,0,0,0.2)",
        color:"#000000",        
    },
    userImageBgBackgroudn:{
        width:"100%",
        height:"36.7%",
        resizeMode:"contain",

    },
    userImageBg:{
        width:"100%",
        height:"100%",

    },
    userImageBackGround:{
        position:"absolute",
        width:"48%",
        height:"53%",
        alignItems:"center",
        marginTop:"25%",
        resizeMode:"contain",

    },
    circule:{
        width:250,
        height:250,
        backgroundColor:"#470A51",
        borderRadius:250/2,
        alignItems:"center",
        alignContent:"center",
        justifyContent:"center",
        resizeMode:"contain",

    },
    useruserImage:{
        width:220,
        height:220,
        resizeMode:"contain",
        borderRadius:110,
        overflow:"hidden",
        
    },
    userName:{
        fontSize:16,
        fontWeight:"bold",
    },
    userPowerSupplyUnit:{
        width:"100%",
        height:"10%",
        resizeMode:"contain",
        flexDirection:"row",
        marginTop:10,
        justifyContent:"center"    
    },
    powerSupplyUnit:{
        width:50,
        resizeMode:"contain",

        height:"auto",
        resizeMode:"contain",
    },
    lineList:{
        width:"100%",
        height:"30%",
        resizeMode:"contain",
        marginTop:"60%",
        


    },
    lineLisText:{
        width:"100%",
        resizeMode:"contain",
        justifyContent:"space-between",
        flexDirection:"row",
        paddingHorizontal:20,
        
        
    },
    listText:{
        width:"100%",
        flexDirection:"row",
        paddingLeft:15,
        marginTop:15,
        alignContent:"center",
        justifyContent:"space-between",
    },
    textFromList1:{
        width:"50%",
    },
    texts:{
        textAlign:"left",
        fontSize:12,
    },
    textFromList2:{
        width:"50%",
        alignItems:"center",
        justifyContent:"center",
    },
    iconArrowToRight:{
      height:25,
      width:25,
      resizeMode:"contain"
    },
    lines:{
        width:"100%",
        height:2,
        backgroundColor:"#000000",
        marginTop:10,
    },
    locaisSalvos:{
        fontSize:20,
        fontWeight:"900",
    },
    recente:{
        fontSize:20,
        fontWeight:"900",
        color:"purple",
        textDecorationLine:"underline",
    },
    button:{
        width:75,
        alignItems:"center",
    },
    rodinhaCarregamento:{
        width:"100%",
        height:"100%",
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    }
})

export default styles;