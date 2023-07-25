import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
  Modal

} from 'react-native';
import estilos from "./style"

const Img = "../../../assets/mapa.jpeg";

export default function Stein({navigation}){
  const [modal, setModal] = useState(false);


    return(
        <View style={estilos.superior}>
          <View style={{width:"100%"}}>
            <Modal 
            transparent={true}
            visible={modal}
            >
                <View style={{flex:1,display:"flex",flexDirection:"row",width:"100%",height:"100%",}}>
                  <View style={{width:"90%",
                  height:"100%", 
                  backgroundColor:"#ffffff", 
                  borderBottomEndRadius:5, 
                  borderTopEndRadius:5,
                  padding:10,}}>
                    <View style={estilos.modal}>
                      <View style={estilos.steinLogoBg}>
                          <Text style={estilos.textLogo}>STEIN</Text>
                          <Image style={estilos.steinLogo} source={require("../../../assets/Icons/logoStein.png")}/>
                      </View>
                      <TouchableOpacity style={estilos.links}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                          <View style={estilos.containerLink}>
                            <Image style={estilos.imagemIcon1} source={require("../../../assets/Icons/filter.png")}/>
                            <Text style={estilos.textLink}>Filtros</Text>
                          </View>
                          <Image style={estilos.imagemIcon2} source={require("../../../assets/Icons/seta-direita.png")}/>
                        </View>
                      </TouchableOpacity>


                      <TouchableOpacity style={estilos.links}
                       onPress={()=> navigation.navigate("AddCharger")}
                      >
                        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                          <View style={estilos.containerLink}>
                            <Image style={estilos.imagemIcon1} source={require("../../../assets/Icons/charger.png")}/>
                            <Text style={estilos.textLink}>Adicionar carregador</Text>
                          </View>
                          <Image style={estilos.imagemIcon2} source={require("../../../assets/Icons/seta-direita.png")}/>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity style={estilos.links}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                          <View style={estilos.containerLink}>
                            <Image style={estilos.imagemIcon1} source={require("../../../assets/Icons/historia.png")}/>
                            <Text style={estilos.textLink}>Atividade recente</Text>
                          </View>
                          <Image style={estilos.imagemIcon2} source={require("../../../assets/Icons/white.png")}/>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity style={estilos.links}
                      onPress={()=> navigation.navigate("ConfingScreen")}
                      >
                        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                          <View style={estilos.containerLink}>
                            <Image style={estilos.imagemIcon1} source={require("../../../assets/Icons/config.png")}/>
                            <Text style={estilos.textLink}>Configurações</Text>
                          </View>
                          <Image style={estilos.imagemIcon2} source={require("../../../assets/Icons/white.png")}/>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity style={estilos.links}
                      onPress={()=> navigation.navigate("FaqScreen")}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                          <View style={estilos.containerLink}>
                            <Image style={estilos.imagemIcon1} source={require("../../../assets/Icons/faq.png")}/>
                            <Text style={estilos.textLink}>FaQ</Text>
                          </View>
                          <Image style={estilos.imagemIcon2} source={require("../../../assets/Icons/seta-direita.png")}/>
                        </View>
                      </TouchableOpacity>
                      
                    </View>
                  </View>
                  <Pressable style={{width:"10%",height:"100%",}}
                onPress={()=>{setModal(false)}}/>
                </View>
            </Modal>
          </View>
<View style={estilos.fundo}>
<ImageBackground 
    source={require(Img)} resizeMode='repeat' style={estilos.background}
    />

      <TouchableOpacity style={estilos.iconBoltBg}>
        <Image style={estilos.iconBolt} source={require("../../../assets/Icons/IconBolt.png")}/>
      </TouchableOpacity>
   
<View style={estilos.partesuperior}>
  <TouchableOpacity
  onPress={()=> setModal(!modal)}
  >
      <Image style={{width:40, height:40, resizeMode:"contain"}} source={require("../../../assets/Icons/menuBranco.png")}/>
    </TouchableOpacity>
</View>
  </View>

      

  <View style={estilos.inferior}>
<TouchableOpacity
onPress={()=> navigation.navigate("UserScreen")}
>
<Image source={require('../../../assets/Icons/user.png')} style={{resizeMode:'contain',
height:'92%', width:'92%',position:'relative',right:'36%',top:'10%'}}/>
</TouchableOpacity>
<TouchableOpacity>

 <Image source={require('../../../assets/Icons/lupa.png')} style={{resizeMode:'contain',
height:'92%', width:'92%',position:'relative',left:'40%',bottom:'90%'}}/>
</TouchableOpacity>

  </View>
  </View>
)}
