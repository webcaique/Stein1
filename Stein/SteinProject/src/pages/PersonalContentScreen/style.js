import { RFValue } from 'react-native-responsive-fontsize';
import {
  ScaledSheet,
  scale,
  moderateScale,
  verticalScale,
  moderateVerticalScale,
  moderateHorizontalScale,
} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  mainContainer: {
    margin:10,
    height: "auto",
    flex:1,
  },
  textTitlePage:{
    fontSize:RFValue(16),
    fontWeight:"700",
    marginVertical:10,
    marginBottom:20,
  },
  textTitleTable:{
    fontSize:RFValue(25),
    fontWeight:"900",
  },
  table:{
    width:"100%",
    height:"auto",
    borderWidth:1,
    alignItems:"center",
    justifyContent:"center",

  },
  row:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    height:RFValue(60),
    paddingHorizontal:5,
  },
  dinamicView:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-end",
    width:"60%"
  },
  textFix:{
    fontSize:RFValue(16),
  },
  textDinamic:{
    fontSize:RFValue(10),
    textAlign:"center",
  },
  imgs:{
    width:RFValue(25),
    height:RFValue(25),
    resizeMode:"contain",
    marginLeft:5,
  },
  flatList:{
    alignItems:"flex-end"
  },
  modalView:{
    width: "100%",
    height:"auto",
    backgroundColor:"white",
    justifyContent:"center",
    alignItems:"center",
    padding:10,
    borderRadius:10,
    elevation:5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modal:{
    width:"100%",
    height:"100%",
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    padding:20,
    fontSize:RFValue(15)
  },
  textInput:{
    borderWidth:1,
    width:"100%",
    height:RFValue(50),
    borderRadius:10,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:10,
    paddingHorizontal:10,
    
  },
  textoCampo:{
    fontWeight:"900",
    fontSize:RFValue(15)
  },
});

export default styles;
