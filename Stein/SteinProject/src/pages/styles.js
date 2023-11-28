import { ScaledSheet, scale, moderateScale, verticalScale, moderateVerticalScale, moderateHorizontalScale } from "react-native-size-matters";
import { RFValue } from "react-native-responsive-fontsize";

const styles = ScaledSheet.create({
    fontList:{
        fontSize:RFValue(16),
    },
    list:{
        width:"100%",
        borderRadius:RFValue(5),
        backgroundColor:"#fff",
        justifyContent:"center",
        height:RFValue(50),
        marginTop:RFValue(10),
        borderWidth:1,
    },
})

export default styles;