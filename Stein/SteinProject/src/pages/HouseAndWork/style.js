import { RFValue } from "react-native-responsive-fontsize";
import { verticalScale, scale, ScaledSheet, moderateScale, moderateVerticalScale } from "react-native-size-matters";

const styles = ScaledSheet.create({
    container:{
        flex:1,
        width:"100%",
        height:"100%",
        padding:10,
    },
    titleContainer:{
        fontSize:RFValue(16),
        marginBottom:44,
        color:"black",
    },
    box:{
        borderWidth:1,
        padding:18,
        marginBottom:25,
    },
    titleBox:{
        fontSize:RFValue(25),
        marginBottom:30,
        color:"black",
        fontWeight:"800",
    },
    line:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:RFValue(30),
        marginBottom:11,
    },
    titleLine:{
        fontSize:RFValue(20),
        color:"black",
        fontWeight:"600",
    },
    link:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },
    textLink:{
        fontSize:RFValue(10),
        color:"black",
    },
    iconLinkView:{
        width:RFValue(22),
        height:RFValue(22),
    },
    iconLink:{
        width:RFValue(22),
        height:RFValue(22),
        resizeMode:"contain",
        marginLeft:5,
    },
    iconLinkView:{
        display:"flex",
        flexDirection:"row",
    },
    editionButton:{
        width:RFValue(200),
        height:RFValue(75),
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#8429AE",
        borderRadius:15,
        borderWidth:2,
    },
    textButton:{
        fontSize:RFValue(25),
        fontWeight:"900",
        color:"#ffffff",
    },
    buttonBox:{
        width:"100%",
        alignItems:"center",
        marginBottom:25,
    },
    textLink:{
        fontSize: RFValue(12),
        color:"#000"
    },
    topBottom:{
        flexDirection:"row-reverse",
        justifyContent:"space-between",
        marginBottom:10,
    },
    btnEditar:{
        flexDirection:"row",
        alignItems:"center",
    }, 
    txtEditar:{
        marginLeft:5,
        fontWeight:"900",
        color:"#000",
        fontSize:RFValue(15)
    },
    btnExcluir:{
        flexDirection:"row",
        alignItems:"center",
        
    },
    txtExcluir:{
        marginRight:10,
        fontWeight:"900",
        color:"#f00",
        fontSize:RFValue(16)
    },
    /*textLinkView:{
        width:100,
        flexDirection:"row",
        justifyContent:"flex-end",
    }*/
    modal:{
        width:"100%",
        height:"100%",
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
})

export default styles;