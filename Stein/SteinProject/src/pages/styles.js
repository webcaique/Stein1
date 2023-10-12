import { ScaledSheet, scale, moderateScale, verticalScale, moderateVerticalScale, moderateHorizontalScale } from "react-native-size-matters";

const styles = ScaledSheet.create({
    list:{
        backgroundColor:"#fff",
        borderWidth:1,
        marginVertical:10,
        borderRadius:10,
        height:moderateVerticalScale(50),

        
    },
    fontList:{
        fontSize:moderateScale(16),
    },
    list:{
        width:"100%",
        borderRadius:5,
        borderWidth:1,
        backgroundColor:"#fff",
        justifyContent:"center",
        height:50,
        marginTop:10,
    },
})

export default styles;