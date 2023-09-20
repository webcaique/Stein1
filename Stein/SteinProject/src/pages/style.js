import { verticalScale, scale, ScaledSheet, moderateScale, moderateVerticalScale } from "react-native-size-matters";


const estilos=ScaledSheet.create({
    imgs:{
      width: moderateVerticalScale(50),
      height:moderateVerticalScale(50),
      resizeMode:"contain",
    },
    nomesCarregadores:{
      fontSize:moderateVerticalScale(8),
      maxWidth:moderateVerticalScale(50),
      maxHeight:moderateVerticalScale(20),
      textAlign:"center",
      

          
    },
    carregadores:{
      padding:10,
      alignItems:"center",
      justifyContent:"center",
      borderWidth:3,
    },
    carregador:{
      padding:10,
      alignItems:"center",
      justifyContent:"center",
      maxHeight: moderateVerticalScale(70),
      
    },
    bgPreto:{
      backgroundColor:"#aaa",
    },
    bgBranco:{
      backgroundColor:"white",
    },
    tituloFiltros:{
      fontSize: 16,
      fontWeight: "600",
    },
    textParaFiltos:{
      marginBottom:10,
      fontSize:14,
    },



    })

export default estilos;