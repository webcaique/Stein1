import {StyleSheet} from 'react-native';
import {
  verticalScale,
  scale,
  ScaledSheet,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = ScaledSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
    height: "100%",
    alignItems: 'center',
    padding: RFValue(10),
    paddingTop: RFValue(40),
    justifyContent: 'center',
  },
  textInputAll: {
    marginTop: 30,
    backgroundColor: '#ffff',
    borderRadius: RFValue(10),
    borderWidth: RFValue(1),
    borderBottomColor: '#000000',
    width: "100%",
    fontSize: RFValue(16),
    paddingLeft: RFValue(5),
    height: RFValue(50),
    color: '#000',
  },
  buttons: {
    marginTop: 10,
    width: RFValue(265),
    height: RFValue(60),
    backgroundColor: 'purple',
    borderRadius: RFValue(25),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:"center"
  },
  textButtons: {
    fontSize: RFValue(20),
    fontWeight: '900',
    color: 'white',
  },
  loginLink: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: RFValue(25),
    alignSelf: 'center',
  },
  loginButton: {
    marginLeft: 1,
  },
  textLoginButton: {
    fontWeight: '900',
    fontSize: RFValue(17),
  },
  textLogin: {
    fontSize: RFValue(17),
  },

  modal: {
    flex: 1,
    width: '100%',
    height: '100%',
    margin: 10,
  },
  view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCad1: {
    width: '90%',
    height: RFValue(50),
    margin: 10,
    backgroundColor: 'rgba(0,0,0,0.1))',
    borderRadius: 10,
    paddingLeft: 5,
    textAlign: 'center',
    fontSize:RFValue(16),
  },
  textUf: {
    width: '60%',
    height: RFValue(50),
    margin: 10,
    backgroundColor: 'rgba(0,0,0,0.1))',
    borderRadius: 10,
    textAlign: 'center',
    fontSize:RFValue(14),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textCad2: {
    width: '45%',
    height: RFValue(50),
    margin: 10,
    backgroundColor: 'rgba(0,0,0,0.1))',
    borderRadius: 10,
    paddingLeft: 5,
    textAlign: 'center',
    fontSize:RFValue(14),
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    elevation: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  titleText: {
    fontSize: RFValue(30),
    fontWeight: 'bold',
    color: '#000',
  },
  titleImg: {
    marginTop: 5,
    width: RFValue(30),
    height: RFValue(30),
    resizeMode: 'contain',
    transform: [{rotate: '180deg'}],
  },
  touchImg: {
    position: 'absolute',
    width: RFValue(30),
    height: RFValue(30),
    resizeMode: 'contain',
    top: '0%',
    left: '0%',
  },
  tableCarr: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1))',
    borderRadius: 10,
    padding: 5,
  },
  textTab: {
    fontSize: RFValue(20),
    marginBottom: 5,
    fontWeight: '700',
  },
  imgSeta: {
    width: RFValue(30),
    height: RFValue(30),
    resizeMode: 'contain',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  aviso: {
    width: RFValue(300),
    height: 'auto',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  error: {
    fontSize: RFValue(16),
    paddingLeft: RFValue(5),
    paddingTop: RFValue(25),
    height: RFValue(50),
  },
  errorText: {
    color: 'red',
    alignSelf:"center",
    fontSize:RFValue(15),
  },
  termosDeUso: {
    color: '#00a',
    textDecorationLine: 'underline',
  },
  containerTermoDeUso: {
    marginTop: 10,
    textAlign: 'justify',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imgSaidaTermoDeUso: {
    position: 'absolute',
    right: '5%',
    top: '0%',
    width: RFValue(25),
    height: RFValue(25),
    resizeMode: 'contain',
  },
  termosContainerTexto: {
    width: '100%',
    padding: 20,
  },
  termosTitle: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: RFValue(18),
  },
  textoTermo: {
    marginTop: 20,
    textAlign: 'justify',
    fontSize: RFValue(15)
  },
  verifEmail: {
    fontSize: RFValue(60),
    borderWidth: 1,
    fontWeight: '700',
    width: '20%',
    height: RFValue(100),
    borderRadius: 5,
    textAlign: 'center',
  },
  verifEmailTextInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerVerifEmail: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    height: 'auto',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  mainContainerVerifEmail: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
  },
  TitleVerifEmail: {
    fontSize: RFValue(20),
    fontWeight: '700',
  },
  textInfo: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
  imgSaidaVerifEmail: {
    position: 'absolute',
    right: '5%',
    marginTop: 10,
  },
  checkboxStyle: {
    width: '100%',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    height: RFValue(50),
  },
  txtTermos:{
    fontSize:RFValue(14),
    color:"#000"
  },
  tipoLogradouroVerif:{
    color: '#f00',
    fontWeight: '900',
    fontSize:RFValue(14),
    marginTop:20
  },
  switch:{
    transform: [{ scaleX: RFValue(1) }, { scaleY: RFValue(1) }],
  },
  txtPlaca:{
    fontSize:RFValue(14),
    color:"#000"
  },
  uf:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"center"
  }
});

export default styles;
