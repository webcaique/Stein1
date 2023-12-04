import { verticalScale, scale, ScaledSheet, moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { RFValue } from "react-native-responsive-fontsize";


const estilos=ScaledSheet.create({
    imgs:{
      width: RFValue(50),
      height:RFValue(50),
      resizeMode:"contain",
    },
    nomesCarregadores:{
      fontSize:RFValue(8),
      maxWidth:RFValue(50),
      maxHeight:RFValue(20),
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
      maxHeight: RFValue(70),
      
    },
    bgPreto:{
      backgroundColor:"#aaa",
    },
    bgBranco:{
      backgroundColor:"white",
    },
    tituloFiltros:{
      fontSize: RFValue(16),
      fontWeight: "600",
    },
    textParaFiltos:{
      marginBottom:10,
      fontSize:RFValue(14),
    },



    })

export default estilos;