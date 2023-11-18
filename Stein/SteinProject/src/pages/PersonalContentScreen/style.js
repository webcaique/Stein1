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
    fontSize:16,
    fontWeight:"700",
  },
  textTitleTable:{
    fontSize:25,
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
    height:60,
    paddingHorizontal:5,
  },
  dinamicView:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-end",
    width:"60%"
  },
  textFix:{
    fontSize:16,
  },
  textDinamic:{
    fontSize:10,
    textAlign:"center",
  },
  imgs:{
    width:25,
    height:25,
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
  },
  modal:{
    width:"100%",
    height:"100%",
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    padding:20,
  },
  textInput:{
    borderWidth:1,
    width:"100%",
    height:50,
    borderRadius:10,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:10,
    paddingHorizontal:10,
    
  },
  textoCampo:{
    fontWeight:"900",
  },
});

export default styles;
