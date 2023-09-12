import { verticalScale, scale, ScaledSheet, moderateScale, moderateVerticalScale } from "react-native-size-matters";
const styles = ScaledSheet.create({
    container:{
        flex:1,
        width:"100%",
        height:"100%",
        padding:24,
        backgroundColor:"#ffffff",
    },
    acceptPay:{
        flexDirection:"row",
    },
    textInput:{
        width:"100%",
        height: verticalScale(60),
        backgroundColor:"rgba(0,0,0,0.10)",
        borderRadius:10,
        padding:10,
        marginVertical:15,
        fontSize:moderateVerticalScale(16),
        fontWeight:"400",
        color:"#000000"
    },
    button:{
        flex:1,
        width:moderateScale(100),
        height:verticalScale(50),
        backgroundColor:"rgba(0,0,0,0.10)",
        marginVertical:15,
        padding:moderateScale(10),
        backgroundColor: "purple",
        borderRadius: moderateVerticalScale(10),
        justifyContent:"center",
        alignItems:"center",
    },
    charger:{
        width:"100%",
        height:verticalScale(60),
        backgroundColor:"rgba(0,0,0,0.10)",
        borderRadius:10,
        padding:10,
        marginTop:15,
        justifyContent:"center",
    },
    placeholder:{
        fontSize:moderateVerticalScale(16),
        fontWeight:"400",
        color:"rgba(0,0,0,0.4)"
    },
    textButtons:{
        fontSize: moderateScale(20),
        fontWeight:"900",
        color: "white",
      },
      list:{
        backgroundColor:"rgba(0,0,0,0.10)",
        marginVertical:10,
        borderRadius:10,
        height:moderateVerticalScale(50),
      }

})
export default styles;