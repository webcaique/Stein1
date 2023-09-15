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
        width:scale(300),
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:10,
        
    },
    textTitle:{
        fontSize:scale(16),
        alignItems:"center",
        justifyContent:"center",
    },
    row2:{
        width:"100%",

    },
    row3:{
        width:"100%",
        justifyContent:"space-between"

    },
    textInput:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
        height:moderateVerticalScale(50),

    },
    textIsInput:{
        fontSize:scale(16),
        fontWeight:"700",
    },
    column1:{
        width:"100%",
        justifyContent:"center",
    },
    column2:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    btnCarregadores:{
        marginTop:20,
        width:200,
        height:moderateVerticalScale(50),
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fff",
        borderWidth:1,
        borderRadius:10,

    },
    textInputLogradouro:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
        width:"100%",
        height:moderateVerticalScale(50),

    },
    textInputNumber:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
        width:scale(100),
        height:moderateVerticalScale(50),
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
        width:scale(125),
    },

    textInputCep:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
        height:moderateVerticalScale(50),

    },
    textInputBairro:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
        width:scale(200),
        height:moderateVerticalScale(50),

    },
    row6:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        
    },
    textInputMunicipio:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
        height:moderateVerticalScale(50),
        

    },
    textIsInputEstado:{
        fontSize:scale(16),
        fontWeight:"700",
    },
    column5:{
        width:scale(125),
        height:moderateVerticalScale(50),

        
    },
    item:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
        height:moderateVerticalScale(50),

        
    },
    editionButton:{
        width:moderateScale(200),
        height:moderateVerticalScale(75),
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#8429AE",
        borderRadius:15,
        borderWidth:2,
    },
    textButton:{
        fontSize:moderateVerticalScale(25),
        fontWeight:"900",
        color:"#ffffff",
        
    },
    column6:{
        width:moderateScale(200),
    },
    logradouro:{
        width:"100%",
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center",
    },
    row7:{
        width:"100%",
    }
})

export default styles;