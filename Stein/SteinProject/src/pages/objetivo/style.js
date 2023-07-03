import {StyleSheet} from "react-native";
import { verticalScale, scale, ScaledSheet, moderateScale, moderateVerticalScale } from "react-native-size-matters";


const styles = ScaledSheet.create({
    background:{
        backgroundColor:'#ffffff',
        flex:1,
        height:'100%',
        width:'100%',
        justifyContent:"space-around",
        paddingBottom:15,
    },
    titulo:{
        fontWeight:'bold',
        color:'#000000',
        fontSize:moderateScale(25),
        paddingVertical:35,
        paddingLeft:moderateScale(30),
    },
    paragrafo:{
        fontWeight:'500',
        color:'#000000',
        fontSize:moderateScale(17),
        paddingLeft:moderateScale(30),
        paddingBottom:30,
    },
    navigation:{
        fontWeight:'bold',
        color:'#000000',
        fontSize:moderateScale(20),
        marginRight:175,
    },
    alinhar1:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        marginVertical:32,
    },
    alinhar2:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-around',
        marginHorizontal:moderateVerticalScale(90),
    },
    spot1:{
        backgroundColor:'#000000',
        width:moderateVerticalScale(10),
        height:moderateVerticalScale(10),
        borderRadius:moderateScale(10/2),
        marginRight:12,
    },
    spot2:{
        backgroundColor:'#563595',
        width:moderateVerticalScale(10),
        height:moderateVerticalScale(10),
        borderRadius:moderateScale(10/2),
        marginRight:12,
    },
    spot3:{
        backgroundColor:'#751BAE',
        width:moderateVerticalScale(354),
        height:moderateVerticalScale(354),
        borderRadius:scale(354/2),
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
    },
    imagem:{
        width:scale(225),
        height:moderateVerticalScale(255),
        resizeMode:'contain',
    },
    centralizar:{
        width:'100%',
        alignItems:'center',
    },
})
export default styles