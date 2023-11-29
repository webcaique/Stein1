import {StyleSheet} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { verticalScale, scale, ScaledSheet, moderateScale, moderateVerticalScale } from "react-native-size-matters";

const boxTexto = {
    width:"100%",
    padding:20,
    backgroundColor:"rgba(255,0,183, 0.1)",
    marginTop:10,
    borderRadius: 10,
}

const texto = {
    fontSize: RFValue(18),
    textAlign:"justify",
    color:"#000"
}

const spot = {
    width:RFValue(10),
    height:RFValue(10),
    borderRadius:10,
    backgroundColor:"#000",
    marginTop:6,
    marginRight:10,
}

const textos ={...texto, fontSize:RFValue(15)}

const styles = ScaledSheet.create({
    container:{
        flex:1,
        width:"100%",
        height:"100%",
        padding:20,
        paddingTop:50,
    },
    faqText:{
        width:"100%",
        alignItems:"center",
        marginBottom:20,
    },
    imagem:{
        width:RFValue(25),
        height:RFValue(25),
        resizeMode:"contain",
    },
    boxes:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
    },
    lines:{
        width:"100%",
        height:RFValue(2),
        backgroundColor:"#000000",
        marginTop:5,
    },
    spaceBetweenBoxes:{
        marginVertical:20,
    },
    txt:{
        ...texto,
        fontWeight:"700",
        
    },
    boxTexto1:{
        ...boxTexto,
    },
    boxTexto2:{
        ...boxTexto,
        flexDirection:"row",
        alignItems:"flex-start",
        backgroundColor:"rgba(0,0,0,0.0)",
        padding:0,
    },
    texto1:{
        ...textos,
    },
    texto2:{
        ...textos,
    },
    spot:{
        ...spot,
    },
    fontBold:{
        fontWeight:"600",
        fontSize:RFValue(16),
    },
    
})

export default styles;