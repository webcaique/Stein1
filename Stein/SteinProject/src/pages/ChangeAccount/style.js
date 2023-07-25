import {StyleSheet} from "react-native"
import { ScaledSheet, scale, moderateScale, verticalScale, moderateVerticalScale, moderateHorizontalScale } from "react-native-size-matters";

const styles = ScaledSheet.create({
    mainContainer:{
        flex:1,
        width:"100%",
        height:"100%",
        paddingHorizontal:10,
        paddingTop: 10,
    },
    box1:{
        width:"80%",
        height:"auto",
        marginHorizontal:10,
        marginTop:20,
    },
    inBox1:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        width:"80%",
        marginTop:20,
        marginBottom:10,

    },
    lines:{
        height:moderateVerticalScale(5),
        width:"100%",
        backgroundColor:"#000000",
        marginVertical:10,
    },
    inBox2:{
        flexDirection:"row",
        width:"70%",
        marginTop:20,
        
        alignItems:"center",
    },
    textsInBoxStyles:{
        fontSize:scale(12),
    },
    image2:{
        marginRight:scale(10),
        width:scale(60),
        resizeMode:"contain",
        height:scale(60)
    },
    linkImage:{
        width:scale(30),
        height:scale(30),
        resizeMode:"contain",
        marginLeft:(10),
        
    },
    plusImage:{
        width:moderateVerticalScale(50),
        height:moderateVerticalScale(50),
        resizeMode:"contain",
        borderRadius:50/2,
    },
    leaveImage:{
        width:moderateVerticalScale(40),
        height:moderateVerticalScale(40),
        resizeMode:"contain",
    },
    plusButton:{
        width:"100%",
        height:75,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        marginVertical:scale(10),
    },
    circuleButton:{
        width:moderateScale(50),
        height:moderateScale(50),
        backgroundColor:"rgba(78,18,194,0.75)",
        borderRadius:moderateScale(50/2),
        borderWidth:1,
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:10,
        
    },
    site:{
        marginLeft:moderateScale(10),
    },
    textInBox:{
        width:scale(200),
    },
    texts:{
        fontSize:moderateScale(16),
    },
    account:{
        fontSize:moderateScale(20)
    },
    titleText:{
        fontSize:scale(18)
    }
})

export default styles;
/*
const estilos= StyleSheet.create({
    usuario:{
  flex:1,
  position:'absolute',
  top:'15%',
  left:'10%'
    },
    tela:{
      flex:1,
      height:'100%',
      width:'100%',
      backgroundColor:'#E2E2E2'
    },
    textos:{
      flex:1,
      position:'absolute',
      left:125,
      top:40
    },
    textos1:{
      flex:1,
      position:'absolute',
      left:125,
      top:40
    },
    usuario1:{
      flex:1,
      position:'absolute',
      top:'40%',
      left:'10%',
}
  })

  export default estilos
*/