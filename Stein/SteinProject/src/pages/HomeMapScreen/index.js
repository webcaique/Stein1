import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
  ScrollView,
  Platform,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import estilos from './style';
import {
  verticalScale,
  scale,
  ScaledSheet,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import TabelaCarregadores from '../componenteTabelaCarregadores.js';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {firestore} from '../../config/configFirebase';
import { useFocusEffect } from '@react-navigation/native'; // Importe useFocusEffect


const Img =
  'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fmapa.jpeg?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6';

const {width, height} = Dimensions.get('screen');
export default function Stein({navigation}) {

  const [rotation, setRotation] = useState(90); // Estado para controlar a rotação

  const rotateIcon = () => {
    // Ao ser clicado, altera o ângulo de rotação em 180 graus
    setRotation(rotation + 180);
  };

  const [selectedCarregadores, setSelectedCarregadores] = useState([]);
  const toggleCarregadorSelection = carr => {
    setSelectedCarregadores(carr);
  };

  const tabelaLogra = firestore.collection('logradouro');
  const tabelaCarregadores = firestore.collection('carregadores');

  const [modal, setModal] = useState(false);
  const [filtros, setFiltros] = useState(false);

  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [logra, setLogra] = useState();
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchBd = async () => {
      try {
        const aparecerMap = async () => {
          const snapshotCarr = await tabelaCarregadores.get();
          const listCarr = [];
          snapshotCarr.forEach(data => {
            listCarr.push({id: data.id, ...data.data()});
          });

          const snapshotLogra = await tabelaLogra.get();
          const listaLogra = [];
          snapshotLogra.forEach(doc => {
            listaLogra.push({id: doc.id, ...doc.data()});
          });

          listCarr.forEach(datas => {
            listaLogra.forEach(docs => {
              if (datas.id == docs.id) {
                console.log('DATAS');
                console.log(datas.nome);
                let nome = datas.nome;
                console.log('DOCS');
                console.log(docs.geolocalizacao);
                console.log(nome);
                const novoPonto = {...docs.geolocalizacao, nome};
                console.log('Novo ponto');
                console.log(novoPonto);
                setMarkers(prevMarkers => [...prevMarkers, novoPonto]);
              }
            });
          });
          setLoading(false);
        };
        aparecerMap();

      } catch (error) {
        setLoading(false);
      }
    };
    getLocation();
    fetchBd();
  }, [loading]);

  const render = () => (
    <View style={estilos.superior}>
      <View style={{width: '100%'}}>
        <Modal
          transparent={true}
          visible={modal} //Menu lateral
        >
          <ScrollView>
            <View
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
              }}>
              <View
                style={{
                  width: '90%',
                  height: '100%',
                  backgroundColor: '#ffffff',
                  borderBottomEndRadius: 5,
                  borderTopEndRadius: 5,
                  padding: 10,
                  height: filtros ? 'auto' : moderateScale(645),
                }}>
                <View style={estilos.modal}>
                  <View style={estilos.steinLogoBg}>
                    <Text style={estilos.textLogo}>STEIN</Text>
                    <Image
                      style={estilos.steinLogo}
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2FlogoStein.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6',
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    style={estilos.links}
                    onPress={() => {
                      setFiltros(!filtros);
                      rotateIcon();
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={estilos.containerLink}>
                        <Image
                          style={{...estilos.imagemIcon1}}
                          source={{
                            uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Ffilter.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6',
                          }}
                        />
                        <Text style={estilos.textLink}>Filtros</Text>
                      </View>
                      <Image
                        style={{
                          ...estilos.imagemIcon2,
                          transform: [{rotate: `${rotation}deg`}],
                        }}
                        source={{
                          uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6',
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                  {filtros ? (
                    <View style={estilos.centerTabela}>
                      <TabelaCarregadores
                        onSelectCarregadores={toggleCarregadorSelection}
                      />
                    </View>
                  ) : (
                    <View></View>
                  )}

                  <TouchableOpacity
                    style={{...estilos.links}}
                    onPress={() => {
                      setLoading(true);
                      setModal(!modal);
                      navigation.navigate('AddCharger');
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={estilos.containerLink}>
                        <Image
                          style={estilos.imagemIcon1}
                          source={{
                            uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fcharger.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6',
                          }}
                        />
                        <Text style={estilos.textLink}>
                          Adicionar carregador
                        </Text>
                      </View>
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
                          source={{
                            uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fhistoria.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6',
                          }}
                        />
                        <Text style={estilos.textLink}>Atividade recente</Text>
                      </View>
                      <Image
                        style={estilos.imagemIcon2}
                        source={{
                          uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fwhite.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6',
                        }}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={estilos.links}
                    onPress={() => {
                      setModal(!modal);
                      navigation.navigate('ConfingScreen');
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={estilos.containerLink}>
                        <Image
                          style={estilos.imagemIcon1}
                          source={{
                            uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fconfig.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6',
                          }}
                        />
                        <Text style={estilos.textLink}>Configurações</Text>
                      </View>
                      <Image
                        style={estilos.imagemIcon2}
                        source={{
                          uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fwhite.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6',
                        }}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={estilos.links}
                    onPress={() => {
                      setModal(!modal);
                      navigation.navigate('FaqScreen');
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={estilos.containerLink}>
                        <Image
                          style={estilos.imagemIcon1}
                          source={{
                            uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Ffaq.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6',
                          }}
                        />
                        <Text style={estilos.textLink}>FaQ</Text>
                      </View>
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
        <MapView
          onMapReady={() => {
            Platform.OS === 'android'
              ? PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                ).then(() => {
                  console.log('Ganhomos familia');
                })
              : null;
          }}
          provider={PROVIDER_GOOGLE}
          style={{width: width, height: height}}
          region={region}
          showsUserLocation={true}
          loadingEnabled={true}>
          {markers.map((coordenada, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: coordenada.latitude,
                longitude: coordenada.longitude,
              }}
              title={coordenada.nome}
            />
          ))}
        </MapView>

        <TouchableOpacity style={estilos.iconBoltBg}>
          <Image
            //Localizador de pontos pertos
            style={estilos.iconBolt}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2FIconBolt.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6',
            }}
          />
        </TouchableOpacity>

        <View
          style={estilos.partesuperior}
          //Parte superior da tela
        >
          <TouchableOpacity onPress={() => setModal(!modal)}>
            <Image
              // Imagem para entrar no menu lateral
              style={{width: 40, height: 40, resizeMode: 'contain'}}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2FmenuBranco.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={estilos.inferior}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserScreen')}
          // Ir para a tela usuário
        >
          <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fuser.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6',
            }}
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
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Flupa.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6',
            }}
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

  function getLocation() {
    Geolocation.getCurrentPosition(
      info => {
        console.log('LAT', info.coords.latitude);
        console.log('LON', info.coords.longitude);
        setRegion({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          longitudeDelta: 0.0922,
          latitudeDelta: 0.0421,
        });
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
      },
    );
  }
  if (loading) {
    return <Text>Carregando</Text>;
  } else {
    return (render());
  }
}

/*

<Image
                        style={estilos.imagemIcon2}
                        source={{
                          uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6',
                        }}
                      />

<Image
                        style={estilos.imagemIcon2}
                        source={{
                          uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6',
                        }}
                      />
*/
