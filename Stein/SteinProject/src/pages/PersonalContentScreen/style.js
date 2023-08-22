import { ScaledSheet, scale, moderateScale, verticalScale, moderateVerticalScale, moderateHorizontalScale } from "react-native-size-matters";

const styles = ScaledSheet.create({
    mainContainer:{
        padding:10,
        width:"100%",
        height:"100%",
        flex:1,

    },
    textTop:{
        fontSize: 16,
        marginBottom:10,
    },
    containerTextTop:{
        width:"100%",
    },
    box:{
        width:"100%",
        height:"auto",
        padding:10,
        alignItems:"center",
        borderWidth:1,
    },
    containerMainText:{
        marginBottom:10,
    },
    mainText:{
        fontSize:20,
        fontWeight:"700",
    },
    line:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical:10,

    },
    iconsLine:{
        flexDirection:"row",
        alignItems:"center",
    },
    imageSet:{
        alignItems:"flex-end",
        width:125,
        height:25,
    },
    imgs:{
        marginLeft:5,
        width:25,
        resizeMode:"contain",
        height:25,
    },
    textLine:{
        fontSize:18,
    },
    containerTextLine:{
        width:"auto",
}

})

export default styles;