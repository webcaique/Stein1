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
        width:"100%",
    },
    textInputCep:{
        basicInput
    }
})

export default styles;