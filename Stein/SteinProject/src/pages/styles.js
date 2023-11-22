import { ScaledSheet, scale, moderateScale, verticalScale, moderateVerticalScale, moderateHorizontalScale } from "react-native-size-matters";

const styles = ScaledSheet.create({
    fontList:{
        fontSize:moderateScale(16),
    },
    list:{
        width:"100%",
        borderRadius:5,
        backgroundColor:"rgba(0,0,0,0.1))",
        justifyContent:"center",
        height:50,
        marginTop:10,
    },
})

export default styles;