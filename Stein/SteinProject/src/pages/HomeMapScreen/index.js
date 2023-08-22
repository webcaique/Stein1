import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
  ScrollView
} from 'react-native';
import estilos from './style';
import { verticalScale, scale, ScaledSheet, moderateScale, moderateVerticalScale } from "react-native-size-matters";


const nomeCarregadores = [
  "Wall",
  "Nema 14-50",
  "Tesla",
  "CCS/SAE",
  "J-1772",
  "Tesla (Roadster)",
  "Type 2",
  "Type 3",
  "Three Phase",
  "Caravan Mains Socket",
  "Commando",
  "GB/T",
  "GB/T 2",
  "CHAdeMO",
  "Tesla (Fast)",
];

const Img = 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fmapa.jpeg?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6';

export default function Stein({navigation}) {
  const [modal, setModal] = useState(false);
  const [filtros, setFiltros]= useState(false);
  function line1(){
    const lista = []
    for(var i = 1; i <= 3; i++){
      lista.push(<TouchableOpacity style={estilos.carregadores}>
        <View style={estilos.carregador}>
        <Image
        source={
          {uri:`https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador${i}.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177`}
        }
        style={estilos.imgs}
        /> 
        <Text style={estilos.nomesCarregadores}>{nomeCarregadores[i-1]}</Text>
        </View>
      </TouchableOpacity>);
    }
    return lista;
  }
  function line2(){
    const lista = []
    for(var i = 4; i <= 6; i++){
      lista.push(<TouchableOpacity style={estilos.carregadores}>
        <View style={estilos.carregador}>
        <Image
        source={
          {uri:`https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador${i}.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177`}
        }
        style={estilos.imgs}
        /> 
        <Text style={estilos.nomesCarregadores}>{nomeCarregadores[i-1]}</Text>
        </View>
      </TouchableOpacity>);
    }
    return lista;
  }

  function line3(){
    const lista = []
    for(var i = 7; i <= 9; i++){
      lista.push(<TouchableOpacity style={estilos.carregadores}>
        <View style={estilos.carregador}>
        <Image
        source={
          {uri:`https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador${i}.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177`}
        }
        style={estilos.imgs}
        /> 
        <Text style={estilos.nomesCarregadores}>{nomeCarregadores[i-1]}</Text>
        </View>
      </TouchableOpacity>);
    }
    return lista;
  }

  function line4(){
    const lista = []
    for(var i = 10; i <= 12; i++){
      lista.push(<TouchableOpacity style={estilos.carregadores}>
        <View style={estilos.carregador}>
        <Image
        source={
          {uri:`https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador${i}.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177`}
        }
        style={estilos.imgs}
        /> 
        <Text style={estilos.nomesCarregadores}>{nomeCarregadores[i-1]}</Text>
        </View>
      </TouchableOpacity>);
    }
    return lista;
  }

  function line5(){
    const lista = []
    for(var i = 13; i <= 15; i++){
      lista.push(<TouchableOpacity style={estilos.carregadores}>
        <View style={estilos.carregador}>
        <Image
        source={
          {uri:`https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador${i}.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177`}
        }
        style={estilos.imgs}
        /> 
        <Text style={estilos.nomesCarregadores}>{nomeCarregadores[i-1]}</Text>
        </View>
      </TouchableOpacity>);
    }
    return lista;
  }

  return (
    <View style={estilos.superior}>
      <View style={{width: '100%',}}>
        <Modal transparent={true} visible={modal} //Menu lateral
        
        >
          <ScrollView>
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: moderateScale(645),
            }}>
            <View
             
              style={{
                width: '90%',
                height: '100%',
                backgroundColor: '#ffffff',
                borderBottomEndRadius: 5,
                borderTopEndRadius: 5,
                padding: 10,
              }}>
              <View style={estilos.modal}>
                <View style={estilos.steinLogoBg}>
                  <Text style={estilos.textLogo}>STEIN</Text>
                  <Image
                    style={estilos.steinLogo}
                    source={
                      {
                        uri: "https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2FlogoStein.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
                      }
                      }
                  />
                </View>
                <TouchableOpacity style={estilos.links}
                onPress={()=>{setFiltros(!filtros)}}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={estilos.containerLink}>
                      <Image
                        style={estilos.imagemIcon1}
                        source={
                          {
                            uri: "https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Ffilter.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
                          }
                          }
                      />
                      <Text style={estilos.textLink}>Filtros</Text>
                    </View>
                    <Image
                      style={estilos.imagemIcon2}
                      source={
                        {
                          uri: "https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
                        }
                        }
                    />
                  </View>
                </TouchableOpacity>
                {
                  filtros?
                  <View>
                   <View>
                    
                    <Text>Mostrando filtros para</Text>
                   </View>
                   <View>
                    <Text>conectores</Text>
                    <View style={{flexDirection:"row",}}>
                    {line1()}
                    </View>
                    <View style={{flexDirection:"row"}}>
                    {line2()}
                    </View>
                    <View style={{flexDirection:"row"}}>
                    {line3()}
                    </View>
                    <View style={{flexDirection:"row"}}>
                    {line4()}
                    </View>
                    <View style={{flexDirection:"row"}}>
                    {line5()}
                    </View>
                      
                   </View>
                  </View>:
                  <View></View>
                }

                <TouchableOpacity
                  style={estilos.links}
                  onPress={() => navigation.navigate('AddCharger')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={estilos.containerLink}>
                      <Image
                        style={estilos.imagemIcon1}
                        source={
                          {
                            uri: "https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fcharger.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
                          }
                          }
                      />
                      <Text style={estilos.textLink}>Adicionar carregador</Text>
                    </View>
                    <Image
                      style={estilos.imagemIcon2}
                      source={
                        {
                          uri: "https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
                        }
                        }
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={estilos.links}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={estilos.containerLink}>
                      <Image
                        style={estilos.imagemIcon1}
                        source={
                          {
                            uri: "https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fhistoria.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
                          }
                          }
                      />
                      <Text style={estilos.textLink}>Atividade recente</Text>
                    </View>
                    <Image
                      style={estilos.imagemIcon2}
                      source={
                        {
                          uri: "https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fwhite.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
                        }
                        }
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={estilos.links}
                  onPress={() => navigation.navigate('ConfingScreen')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={estilos.containerLink}>
                      <Image
                        style={estilos.imagemIcon1}
                        source={
                          {
                            uri: "https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fconfig.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
                          }
                          }
                      />
                      <Text style={estilos.textLink}>Configurações</Text>
                    </View>
                    <Image
                      style={estilos.imagemIcon2}
                      source={
                        {
                          uri: "https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fwhite.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
                        }
                        }
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={estilos.links}
                  onPress={() => navigation.navigate('FaqScreen')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={estilos.containerLink}>
                      <Image
                        style={estilos.imagemIcon1}
                        source={
                          {
                            uri: "https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Ffaq.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
                          }
                          }
                      />
                      <Text style={estilos.textLink}>FaQ</Text>
                    </View>
                    <Image
                      style={estilos.imagemIcon2}
                      source={
                        {
                          uri: "https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
                        }
                        }
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <Pressable
              style={{width: '10%', height: '100%'}}
              onPress={() => {
                setModal(false);
              }}
            />
          </View>
          </ScrollView>
        </Modal>
      </View>
      <View style={estilos.fundo}>
        <ImageBackground
        //IMAGEM DE FUNDO
          source={{
            uri: Img,
          }}
          resizeMode="repeat"
          style={estilos.background}
        />

        <TouchableOpacity style={estilos.iconBoltBg}>
          <Image
          //Localizador de pontos pertos
            style={estilos.iconBolt}
            source={
              {
                uri: "https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2FIconBolt.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
              }
              }
          />
        </TouchableOpacity>

        <View style={estilos.partesuperior}
        //Parte superior da tela
        >
          <TouchableOpacity onPress={() => setModal(!modal)}>
            <Image
            // Imagem para entrar no menu lateral
              style={{width: 40, height: 40, resizeMode: 'contain'}}
              source={
                {
                  uri: "https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2FmenuBranco.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
                }
                }
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={estilos.inferior}>
        <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}
        // Ir para a tela usuário 
        >
          <Image
            source={
              {uri: "https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fuser.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"}
              }
            style={{
              resizeMode: 'contain',
              height: '92%',
              width: '92%',
              position: 'relative',
              right: '36%',
              top: '10%',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
          // Botão para pesquisar a localização
            source={
              {
                uri: "https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Flupa.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
              }
              }
            style={{
              resizeMode: 'contain',
              height: '92%',
              width: '92%',
              position: 'relative',
              left: '40%',
              bottom: '90%',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
