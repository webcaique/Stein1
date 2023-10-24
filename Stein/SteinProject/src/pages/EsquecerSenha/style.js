import {StyleSheet} from "react-native";
import { verticalScale, scale, ScaledSheet, moderateScale, moderateVerticalScale } from "react-native-size-matters";

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
        width:moderateScale(25),
        height:moderateScale(25),
        resizeMode:"contain",
        transform: [{rotate:'90deg'}],
    },
    boxes:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
    },
    lines:{
        width:"100%",
        height:2,
        backgroundColor:"#000000",
        marginTop:5,
    },
    spaceBetweenBoxes:{
        marginVertical:20,
    },
    txt:{
        fontSize:moderateScale(16),
    }
    
})

export default styles;