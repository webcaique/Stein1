import {StyleSheet} from 'react-native';
import {
  verticalScale,
  scale,
  ScaledSheet,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 20,
    paddingTop: 100,
    justifyContent: 'center',
  },
  textInput1: {
    backgroundColor: '#ffff',
    borderRadius: moderateVerticalScale(10),
    borderWidth: scale(1),
    borderBottomColor: '#000000',
    width: scale(309),
    fontSize: moderateVerticalScale(16),
    paddingLeft: scale(5),
    height: verticalScale(50),
  },
  textInputAll: {
    marginTop: 30,
    backgroundColor: '#ffff',
    borderRadius: moderateVerticalScale(10),
    borderWidth: scale(1),
    borderBottomColor: '#000000',
    width: scale(309),
    fontSize: moderateVerticalScale(16),
    paddingLeft: scale(5),
    height: verticalScale(50),
  },
  buttons: {
    marginTop: 40,
    width: scale(265),
    height: verticalScale(60),
    backgroundColor: 'purple',
    borderRadius: moderateVerticalScale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtons: {
    fontSize: moderateScale(20),
    fontWeight: '900',
    color: 'white',
  },
  loginLink: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: moderateVerticalScale(25),
    alignSelf: 'center',
  },
  loginButton: {
    marginLeft: 1,
  },
  textLoginButton: {
    fontWeight: '900',
    fontSize: moderateScale(17),
  },
  textLogin: {
    fontSize: moderateScale(17),
  },

  modal: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  view: {
    display: 'flex',
    justifyContent:'center',
    alignItems:"center",
  },
  textCad1: {
    width: '90%',
    height: 50,
    margin: 10,
    backgroundColor: 'rgba(0,0,0,0.1))',
    borderRadius: 10,
    paddingLeft: 5,
    textAlign: 'center',
  },
  textCor: {
    width: '50%',
    height: 50,
    margin: 10,
    backgroundColor: 'rgba(0,0,0,0.1))',
    borderRadius: 10,
    paddingLeft: 5,
    textAlign: 'center',
  },
  row:{
    flexDirection:"row",
    justifyContent:'center',
  },
  textCad2: {
    width: '45%',
    height: 50,
    margin: 10,
    backgroundColor: 'rgba(0,0,0,0.1))',
    borderRadius: 10,
    paddingLeft: 5,
    textAlign: 'center',
  },
  titleView:{
    justifyContent:"center",
    alignItems:"center",
    borderBottomWidth:1,
    elevation:1,
    borderColor:"black",
    marginBottom:10,
  },
  titleText:{
    fontSize:30,
    fontWeight:"bold",
    color:"#000",
  },
  titleImg:{
    marginTop:5,
    width:30,
    height:30,
    resizeMode:"contain",
    transform: [{rotate: "180deg"}]
  },
  touchImg:{
    position:"absolute",
    width:30,
    height:30,
    resizeMode:"contain",
    top:"0%",
    left:"0%",
  },
  tableCarr:{
    width:"90%",
    alignItems:"center",
    backgroundColor:"rgba(0,0,0,0.1))",
    borderRadius:10,
    padding:5,
  },
  textTab:{
    fontSize:20,
    marginBottom:5,
    fontWeight:"700",
  },
  imgSeta:{
    width:30,
    height:30,
    resizeMode:"contain",
  },
  container:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
  },
  aviso:{
    width:300,
    height:"auto",
    padding:20,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"white",
    borderRadius:10,
  }
});

export default styles;
