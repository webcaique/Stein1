import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import estilos from './style';
import {moderateScale} from 'react-native-size-matters';
import TabelaCarregadores from '../componenteTabelaCarregadores.js';
import {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {firestore} from '../../config/configFirebase';
import Map from './maps';
import Rota from './calcualrRota';
import Table from "./filtros"

const Img =
  'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fmapa.jpeg?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6';

const {width, height} = Dimensions.get('screen');
export default function Stein({navigation}) {
  const [distancia, setDistancia] = useState('');
  const [duracao, setDuracao] = useState('');
  const [search, setSeach] = useState('');
  const [searchLoading, setSearchLoading] = useState('');
  const [rotation, setRotation] = useState(90);
  const [modal, setModal] = useState(false);
  const [filtros, setFiltros] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menorDuracao, setMenorDuracao] = useState(null);
  const [locMenorDuracao, setLocMenorDuracao] = useState();
  const [verificacaoDestination, setVerificacaoDestination] = useState(false);
  const [durac, setDurac] = useState(null);
  const [tabCarr, setTabCarr] = useState();
  const [tabelaCarregador, setTabelaCarregador] = useState();
  const [tabelaLogradouro, setTabelaLogradouro] = useState();

  const tabelaLogra = firestore.collection('logradouro');
  const tabelaCarregadores = firestore.collection('carregadores');
  const tabelaUsuario = firestore.collection('usuario');

  resetSearch = srcVal => {
    setSearchLoading(srcVal);
  };

  getInfo = (dist, durc) => {
    setDistancia(dist);
    setDuracao(durc);
  };

  const fetchMarkersFromFirestore = async () => {
    try {
      const listaLogra = [];
      const listCarr = [];
      const listUsuario = [];
      tabelaCarregadores.onSnapshot(datas => {
        datas._docs.forEach(data => {
          listCarr.push({id: data._ref._documentPath._parts[1], ...data._data});
        });

        tabelaLogra.onSnapshot(dados => {
          dados._docs.forEach(data => {
            listaLogra.push({
              id: data._ref._documentPath._parts[1],
              ...data._data,
            });
          });

          tabelaUsuario.onSnapshot(datas => {
            datas._docs.forEach(dado => {
              listUsuario.push({
                id: dado._ref._documentPath._parts[1],
                ...dado._data,
              });

              const newMarkers = [];

              listCarr.forEach(datas => {
                listaLogra.forEach(docs => {
                  if (datas.IDLogradouro === docs.id) {
                    let nome = datas.nome;
                    const novoPonto = {...docs.geolocalizacao, nome};
                    newMarkers.push(novoPonto);
                  }
                });

                setTabelaCarregador(listCarr);
                setTabelaLogradouro(listaLogra);
                listUsuario.forEach(dados => {
                  for (const numero1 of dados.IDTipoCarregador) {
                    for (const numero2 of datas.IDTipoCarregador) {
                      if (numero1 == numero2) {
                        setTabCarr(newMarkers);
                      }
                    }
                  }
                });
              });
              setMarkers(newMarkers);
              setLoading(false);
            });
          });
        });
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const [region, setRegion] = useState();
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        let location;
        location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setRegion(location);
      },
      erro => console.error(erro),
      {
        enableHighAccuracy: false,
        timeout: 3000,
      },
    );
  }, []);

  useEffect(() => {
    setDistancia('');
    setDuracao('');
    fetchMarkersFromFirestore();
    // Coloque aqui o código que deseja executar quando a tela receber foco.
  }, []);

  // Estado para controlar a rotação

  const rotateIcon = () => {
    // Ao ser clicado, altera o ângulo de rotação em 180 graus
    setRotation(rotation + 180);
  };

  const [selectedCarregadores, setSelectedCarregadores] = useState([]);
  const toggleCarregadorSelection = (carr) => {
    setSelectedCarregadores(carr);
  };

  if (loading) {
    return <Text>Carregando</Text>;
  } else {
    return (
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
                            carr={selectedCarregadores}
                            filtros={true}
                          />
                      </View>
                    ) : (
                      <View></View>
                    )}

                    <TouchableOpacity
                      style={{...estilos.links}}
                      onPress={() => {
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
                          <Text style={estilos.textLink}>
                            Atividade recente
                          </Text>
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
          <Map
          tabelaCarregador={tabelaCarregador}
          tabelaLogradouro={tabelaLogradouro}
          onFiltros={selectedCarregadores}
            dest={menorDuracao}
            resetSrc={resetSearch}
            searchVer={search} // Passando o valor atual de searchVer
            userMapRegion={region}
            chargerMarkes={markers.map((coordenada, index) => {
              return(
              <Marker
                key={index}
                coordinate={{
                  latitude: coordenada.latitude,
                  longitude: coordenada.longitude,
                }}
                title={coordenada.nome}
              />
            )})}
            inf={getInfo}
          />

          <TouchableOpacity
            style={estilos.iconBoltBg}
            onPressIn={() => {
              const origin = region; // Substitua pelas coordenadas da localização atual do usuário.
              const apiKey = 'AIzaSyAdVbhYEhx50Y8TS7tulpNCkj8yMZPYiSQ'; // Substitua pela sua chave de API do Google Maps.
              let minDuration = Infinity;
              markers.forEach(location => {
                tabCarr.forEach(inf => {
                  if (inf == location) {
                    const destination = {
                      latitude: location.latitude,
                      longitude: location.longitude,
                    };

                    // Solicitar as direções do Google Maps
                    fetch(
                      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${apiKey}`,
                    )
                      .then(response => response.json())
                      .then(data => {
                        if (data.routes && data.routes.length > 0) {
                          const duration =
                            data.routes[0].legs[0].duration.value;
                          if (duration < minDuration) {
                            minDuration = duration;
                            setDurac(minDuration);
                            setLocMenorDuracao(destination);
                          }
                        }
                      })
                      .catch(error => {
                        console.error(
                          'Erro ao calcular a duração da viagem:',
                          error,
                        );
                      });
                  }
                });
              });
              setMenorDuracao(locMenorDuracao);
              setVerificacaoDestination(!verificacaoDestination);
              setSeach(false);
            }}>
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
          <TouchableOpacity
            onPress={() => {
              setSeach(true);
              setLocMenorDuracao(null);
              setMenorDuracao('');
              setDurac(null);
            }}>
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
                left: '45%',
                bottom: '90%',
              }}
            />
          </TouchableOpacity>
        </View>
        {searchLoading ? (
          <Rota distancia={distancia} duracao={duracao} durac={durac} />
        ) : (
          ''
        )}
      </View>
    );
  }
}
