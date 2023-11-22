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
  }
});

export default styles;
