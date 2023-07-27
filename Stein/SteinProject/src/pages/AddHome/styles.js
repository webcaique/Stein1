import { ScaledSheet, scale, moderateScale, verticalScale, moderateVerticalScale, moderateHorizontalScale } from "react-native-size-matters";

const styles = ScaledSheet.create({
    container:{
        flex:1,
        width:"100%",
        height:"100%",
        padding:10,
        alignItems:"center"
    },

    row1:{
        width:"80%",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:10,
        
    },
    row2:{
        width:"100%",

    },
    row3:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between"

    },
    textInput:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,

    },
    textIsInput:{
        fontSize:16,
        fontWeight:"700",
    },
    column1:{
        width:"65%",
    },
    textInputLogradouro:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
        width:"100%"
    },
    textInputNumber:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
        width:100
    },

    row4:{
        width:"100%",

    },

    row5:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    column3:{
        width:125,
    },

    textInputCep:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
    },
    textInputBairro:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
        width:200,
    },
    row6:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    textInputMunicipio:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
        width:200,
    },
    textIsInputEstado:{
        fontSize:16,
        fontWeight:"700",
    },
    column5:{
        width:125,
    },
    list:{
        backgroundColor:"#fff",
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
    },
    item:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
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
    btnSwitch:{
        width:200,
        height:75,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#8429AE",
        borderRadius:15,
        borderWidth:2,
    },
    textBtnSwicth:{
        fontSize:25,
        fontWeight:"900",
        color:"#ffffff",
    }
    
})

export default styles;