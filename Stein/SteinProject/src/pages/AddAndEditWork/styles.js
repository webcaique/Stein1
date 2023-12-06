import { RFValue } from "react-native-responsive-fontsize";
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
        width:RFValue(300),
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:10,
        
    },
    textTitle:{
        fontSize:RFValue(16),
        alignItems:"center",
        justifyContent:"center",
        color:"#000"
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
        height:RFValue(50),
        fontSize:RFValue(15),
        color:"#000"


    },
    textIsInput:{
        fontSize:RFValue(16),
        fontWeight:"700",
        color:"#000"
    },
    column1:{
        width:"100%",
        justifyContent:"center",
    },
    column2:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        width:"100%"
    },
    btnCarregadores:{
        marginTop:20,
        width:"50%",
        height:RFValue(50),
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
        height:RFValue(50),
        fontSize:RFValue(15),
        color:"#000"

    },
    textInputNumber:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
        height:RFValue(50),
        fontSize:RFValue(15),
        color:"#000",
        width:"100%",

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
        width:"40%",
    },

    textInputCep:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
        height:RFValue(50),
        width:"100%",
        fontSize:RFValue(15),
        color:"#000"

    },
    textInputBairro:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
        width:RFValue(200),
        height:RFValue(50),
        fontSize:RFValue(15),
        color:"#000"

    },
    row6:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        width:"100%"

        
    },
    textInputMunicipio:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
        height:RFValue(50),
        width:"100%",
        fontSize:RFValue(15),
        color:"#000"
        

    },
    textIsInputEstado:{
        fontSize:RFValue(16),
        fontWeight:"700",
        color:"#000",
        fontSize:RFValue(15),
        color:"#000"
    },
    column5:{
        width:scale(125),
        height:RFValue(50),

        
    },
    item:{
        borderWidth:1,
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:10,
        height:RFValue(50),
        fontSize:RFValue(15),
        color:"#000"

        
    },
    editionButton:{
        width:RFValue(200),
        height:RFValue(75),
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#8429AE",
        borderRadius:15,
        borderWidth:2,
        marginTop:10,

    },
    textButton:{
        fontSize:RFValue(25),
        fontWeight:"900",
        color:"#ffffff",

    },
    column6:{
        width:RFValue(200),
    },
    logradouro:{
        width:"100%",
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center",
        color:"#000"

    },
    row7:{
        width:"100%",
    },
    modal: {
        width: RFValue(300),
        height: "auto",
        backgroundColor: 'white',
        padding:10,
        borderRadius: 10,
      },
      modalContainer:{
        height:"100%",
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"rgba(90,90,90,0.4)",
      }
})

export default styles;