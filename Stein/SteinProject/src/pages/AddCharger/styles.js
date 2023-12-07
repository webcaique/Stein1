import { RFValue } from 'react-native-responsive-fontsize';
import {
  verticalScale,
  scale,
  ScaledSheet,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';


const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 24,
    backgroundColor: '#ffffff',
  },
  acceptPay: {
    flexDirection: 'row',
  },
  textInput: {
    width: '100%',
    height: RFValue(60),
    backgroundColor: 'rgba(0,0,0,0.10)',
    borderRadius: 10,
    padding: 10,
    marginVertical: 15,
    fontSize: RFValue(16),
    fontWeight: '400',
    color: '#000000',
  },
  button: {
    flex: 1,
    width: RFValue(200),
    height: RFValue(50),
    backgroundColor: 'rgba(0,0,0,0.10)',
    marginVertical: 15,
    padding: RFValue(10),
    backgroundColor: 'purple',
    borderRadius: RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  charger: {
    width: '100%',
    height: RFValue(60),
    backgroundColor: 'rgba(0,0,0,0.10)',
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    justifyContent: 'center',
    alignItems:"center"
  },
  placeholder: {
    fontSize: RFValue(16),
    fontWeight: '400',
    color: 'rgba(0,0,0,0.4)',
  },
  textButtons: {
    fontSize: RFValue(20),
    fontWeight: '900',
    color: 'white',
  },
  list: {
    backgroundColor: 'rgba(0,0,0,0.10)',
    marginVertical: 10,
    borderRadius: 10,
    height: RFValue(50),
  },
  modal: {
    width: RFValue(300),
    height: "auto",
    backgroundColor: 'white',
    padding:10,
    borderRadius: 10,
  },
  modalContainer:{
    height:"100%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"rgba(90,90,90,0.4)",
  },
  horario:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
  },
  verifTipoLogra:{
    color: '#f00',
    fontWeight: '900',
    fontSize:RFValue(15),
  },
  pagamento:{
    fontSize:RFValue(15),
    color:"#000",
  },
  switch:{
    transform: [{ scaleX: RFValue(1) }, { scaleY: RFValue(1) }],
  },
  horarioTXT:{
    fontSize:RFValue(15),
    color:"#000"
  }

});
export default styles;
