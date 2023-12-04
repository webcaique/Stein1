import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const texto = {
    fontSize:RFValue(16),
    color:"#000",
}

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
        width:RFValue(250),
        height:RFValue(250),
        backgroundColor:"#470A51",
        borderRadius:RFValue(250/2),
        alignItems:"center",
        alignContent:"center",
        justifyContent:"center",
        resizeMode:"contain",

    },
    useruserImage:{
        width:RFValue(220),
        height:RFValue(220),
        resizeMode:"contain",
        borderRadius:RFValue(220/2),
        overflow:"hidden",
        
    },
    userName:{
        fontSize:RFValue(16),
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
        width:RFValue(50),
        resizeMode:"contain",

        height:"auto",
        resizeMode:"contain",
    },
    lineList:{
        width:"100%",
        resizeMode:"contain",
        position:"absolute",
        bottom:0,
        padding:10
        


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
        fontSize:RFValue(12),
    },
    textFromList2:{
        width:"50%",
        alignItems:"center",
        justifyContent:"center",
    },
    iconArrowToRight:{
      height:RFValue(25),
      width:RFValue(25),
      resizeMode:"contain"
    },
    lines:{
        width:"100%",
        height:1,
        backgroundColor:"#000000",
    },
    locaisSalvos:{
        fontSize:RFValue(20),
        fontWeight:"900",
    },
    recente:{
        fontSize:RFValue(20),
        fontWeight:"900",
        color:"purple",
        textDecorationLine:"underline",
    },
    button:{
        width:RFValue(75),
        alignItems:"center",
    },
    rodinhaCarregamento:{
        width:"100%",
        height:"100%",
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    modal:{
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems:"center"
    },

    // Atualiazção
    linha:{
        flexDirection:"row",
        width:"100%",
        justifyContent:"space-evenly",
        paddingVertical:10,
        borderLeftWidth:1,
        borderRightWidth:1,
    },
    titleAutomovel:{
        fontSize:RFValue(20),
        fontWeight:"900",
        textDecorationLine:"underline",
        color:"purple",
    },
    desc:{
        ...texto,
        fontSize:RFValue(18),
    },
    titles:{
        fontSize:RFValue(18),
        fontWeight:"700",
        color:"purple"

    },
    coluna:{
        alignItems:"center",
    },
    txt:{
        ...texto,
        fontSize:RFValue(15),
    }

})

export default styles;