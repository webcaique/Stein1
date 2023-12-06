import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  ScaledSheet,
  scale,
  moderateScale,
  verticalScale,
  moderateVerticalScale,
  moderateHorizontalScale,
} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    backgroundColor: 'rgba(27,27,27,0.15)',
  },
  confing: {
    width: '99%',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  rowText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  rowText1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '98%',
  },
  line: {
    backgroundColor: '#000000',
    height: 2,
    width: '100%',
    marginVertical: 5,
  },
  textTitle: {
    fontSize: RFValue(30),
    color:"#000"
  },
  textContent: {
    fontSize: RFValue(16),
    color:"#000",
    fontWeight: '600',
    marginVertical: 5,
  },
  icons: {
    width: RFValue(20),
    height: RFValue(20),
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: RFValue(10),
    color:"#000"
  },
  input: {
    position: 'absolute',
    right: 0,
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
  textoTermo: {
    marginTop: 20,
    textAlign: 'justify',
    fontSize: RFValue(15),
    color:"#000"
  },
  termosTitle: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: RFValue(18),
    color:"#000"
  },
});

export default styles;
