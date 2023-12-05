/* eslint-disable prettier/prettier */
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
  ImageBackground,
  FlatList
} from 'react-native';
import estilos from './style';
import {moderateScale} from 'react-native-size-matters';
import TabelaCarregadores from '../componenteTabelaCarregadores.js';
import {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {firestore, storage} from '../../config/configFirebase';
import {auth} from '../../config/configFirebase';
import Map from './maps';
import Rota from './calcualrRota';
import {Rating} from 'react-native-ratings';
import {verticalScale} from 'react-native-size-matters';
import {launchCamera} from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';
import Mailer from 'react-native-mail';

const Img =
  'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fmapa.jpeg?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6';

const {width, height} = Dimensions.get('screen');
export default function Stein({navigation}) {

  const sendEmail = () => {
    Mailer.mail(
      {
        subject: `${imagems[idCarregador]}`,
        recipients: ['steinsuport@gmail.com'],
        ccRecipients: ['steinsuport@gmail.com'],
        bccRecipients: ['steinsuport@gmail.com'],
        body: '',
        isHTML: true,
        attachment: {
          path: '',
          type: '',
          name: '',
        },
      },
      (error, event) => {
        if (error) {
          console.error('');
        } else {
          console.log('');
        }
      }
    );
  };

  const path = require("path");
  //Selecionar imagem
  const [dados, setDados] = useState();
  const [idCarregador, setIdCarregador] = useState(0);
  const [iconCarregadores, setIconCarregadores] = useState(); //Pega os tipos dos carregadores
  const [iconCarregadoresPonto, setIconCarregadoresPonto] = useState(); //Pega os tipos dos carregadores do ponto específico
  const [imagems, setImagems] = useState(); //Guardar todas as imagens do ponto
  const [imagemDoCarregador, setImagemDoCarregador] = useState(); //Guardar a imagem específica
  const selectImage = async () => {
    const status = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

    if (status === 'granted') {
      const imagem = await launchCamera();
      const extencao = path.extname(imagem.assets[0].originalPath);
      let texto;
      if(imagem){
        texto = `Pontos/${dados.CEP}-${dados.numero}/Ponto-${dados.CEP}-${dados.numero}${extencao}`,
        await storage
        .ref(
          `Pontos/${dados.CEP}-${dados.numero}/Ponto-${dados.CEP}-${dados.numero}${extencao}`,
        )
        .putFile(imagem.assets[0].originalPath)
        .then(()=>{
          tabelaCarregadores.doc(`${idCarregador+1}`).update({
            imagem: texto,
          })
        })
        .catch(error => console.log("AQUI:"));
      }
    } else {
      console.log('Permissão de escrita no armazenamento externo negada');
    }
  };


  // Set an initializing state whilst Firebase connects
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(userAuth => {
      setUser(userAuth)
      if(user) setUserId(userAuth.uid);
      if (initializing) setInitializing(false);
    });
    setMenorDuracao('');
    return () => subscriber; // unsubscribe on unmount
  }, []);

  //Dados para o Marker
  const [cidade, setCidade] = useState([]);
  const [endereco, setEndereco] = useState([]);
  const [visivel, setVisivel] = useState(false);
  const [end, setEnd] = useState([]);

  //Dado para o destino
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
  const [tabelaCarregador, setTabelaCarregador] = useState([{
    qtdeCarregadores: 0,
    horario:"24/7",
    pagamentoNecessario: true,

  }]);
  const [tabelaLogradouro, setTabelaLogradouro] = useState();
  const [tabelaCarro, setTabelaCarro] = useState();

  const tabelaLogra = firestore.collection('logradouro');
  const tabelaCarregadores = firestore.collection('carregadores');
  const tabelaCarros = firestore.collection('carro');

  resetSearch = srcVal => {
    setSearchLoading(srcVal);
  };

  getInfo = (dist, durc) => {
    setDistancia(dist);
    setDuracao(durc);
  };

  const fetchMarkersFromFirestore = async () => {
    setDurac("");
    setDuracao("");
    setMenorDuracao("");
    setDistancia("");
    try {
      const listaLogra = [];
      const listCarr = [];
      const listUsuario = [];
      const listaCarro = [];
      tabelaCarregadores.onSnapshot(datas => {
        datas._docs.forEach(data => {
          listCarr.push({id: data._ref._documentPath._parts[1], ...data._data});
        });

        tabelaCarros.onSnapshot(carros => {
          carros.forEach(sobre => {
            listaCarro.push({
              id: sobre._ref._documentPath._parts[1],
              ...sobre._data,
            });
          });
          setTabelaCarro(listaCarro);

          tabelaLogra.onSnapshot(dados => {
            dados._docs.forEach(data => {
              listaLogra.push({
                id: data._ref._documentPath._parts[1],
                ...data._data,
              });
            });

            datas._docs.forEach(dado => {
              listUsuario.push({
                id: dado._ref._documentPath._parts[1],
                ...dado._data,
              });

              const newMarkers = [];
              const nearCarr = [];
              const listaEnd = [];
              const listaImg = []; //Armazenará as imagens dos pontos
              const listIconCarregadores = [];

              listCarr.forEach(datas => {
                listaLogra.forEach(docs => {
                  if (datas.IDLogradouro === docs.id) {
                    let nome = `${docs.bairro}, \n${docs.cidade}`;
                    let endereco = `${docs.logradouro}, ${docs.numero} \n ${docs.bairro},  ${docs.cidade} `;
                    let novoPonto = {...docs.geolocalizacao, nome};
                    newMarkers.push(novoPonto);
                    setCidade(docs.cidade);
                    listaEnd.push(endereco);
                    listIconCarregadores.push(datas.IDTipoCarregador);
                    listaImg.push(datas.imagem); //Coloca as imagens

                    listaCarro.forEach(carro => {
                      if (carro.IDUsuario == auth.currentUser.uid) {
                        for (const idCarregador of datas.IDTipoCarregador) {
                          if (carro.IDTipoCarregador == idCarregador) {
                            nome = `${docs.bairro}, \n${docs.cidade}`;
                            endereco = `${docs.logradouro}, ${docs.numero} \n ${docs.bairro},  ${docs.cidade} `;
                            novoPonto = {...docs.geolocalizacao, nome};
                            nearCarr.push(novoPonto);
                          }
                        }
                      }
                    });
                  }
                });
                setTabelaCarregador(listCarr);
                setTabelaLogradouro(listaLogra);
              });
              setTabCarr(nearCarr);
              setMarkers(newMarkers);
              setEndereco(listaEnd);
              setImagems(listaImg);
              setIconCarregadores(listIconCarregadores);
            });
          });
        });
      });
      setLoading(false);
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
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  }, []);

  useEffect(() => {
    setDistancia('');
    setDuracao('');
    tabelaCarregadores.onSnapshot(()=>{
      tabelaCarros.onSnapshot(()=>{
        fetchMarkersFromFirestore();
      });
    });
    // Coloque aqui o código que deseja executar quando a tela receber foco.
  }, []);

  // Estado para controlar a rotação

  const rotateIcon = () => {
    // Ao ser clicado, altera o ângulo de rotação em 180 graus
    setRotation(rotation + 180);
  };

  const [selectedCarregadores, setSelectedCarregadores] = useState([]);
  const toggleCarregadorSelection = carr => {
    setSelectedCarregadores(carr);
  };
  const [logra, setLogra] = useState();
  const [nome, setNome]= useState([])
  useEffect(() => {
    const fetchBd = async () => {
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
            let nome = datas.nome;
            setNome(datas.nome);
            const novoPonto = {...docs.geolocalizacao, nome};
            setMarkers(prevMarkers => [...prevMarkers, novoPonto]);
          }
        });
      });
    };

    fetchBd();
    getLocation();
  }, []);

  function getLocation() {
    Geolocation.getCurrentPosition(
      info => {
        setRegion({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          longitudeDelta: 0.0922,
          latitudeDelta: 0.0421,
        });
      },
      error => {
        console.log("");
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
      },
    );
  }

  const [time, setTime] = useState(false);

 
  if (loading) {
    return <Text>Carregando</Text>;
  } else {
    return (
      <View style={estilos.superior}>
        <Modal transparent visible={time}>
          <Pressable
            style={{...estilos.time}}
            onPress={() => {
              setTime(false);
            }}>
            <Text style={{...estilos.timeText}}>
              Nenhum ponto encontrado com o Tipo do Carregador de seu carro{' '}
            </Text>
          </Pressable>
        </Modal>
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

                    <TouchableOpacity
                      style={estilos.links}
                      onPress={() => {
                        setModal(!modal);
                        auth.signOut().then(() => {
                          console.log('BONITO!');
                        });
                        navigation.navigate('InitScreen');
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
                              uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fsair.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                            }}
                          />
                          <Text style={estilos.textLink}>Logout</Text>
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
        
        <Modal visible={visivel} >
        <ScrollView>
          <View>
            <View style={estilos.Img1}>
            <ImageBackground
                    style={estilos.Img}
                    source={{
                      uri: !imagemDoCarregador
                        ? 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2FeehBOMBA.png?alt=media&token=fc0da4ee-422f-4bd3-b4a1-225c44e3fb11'
                        : imagemDoCarregador,
                    }}>
                    <FlatList
                    horizontal
                      style={estilos.markerCarregadores}
                      data={iconCarregadoresPonto}
                      key={item => item.id}
                      renderItem={dados => {
                        return (
                          <Image
                            source={{
                              uri: `https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador${dados.item}.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177`,
                            }}
                            style={[estilos.iconPontoCarregador]}
                          />
                        );
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setVisivel(false);
                      }}>
                      <Image
                        style={estilos.seta}
                        source={{
                          uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=4ae62381-8bc8-450d-ad26-b1d525a3045c&_gl=1*3xj51w*_ga*MTYyODY1ODMzMy4xNjk0NTY0MTMz*_ga_CW55HF8NVT*MTY5NzA2Mzg5OS4xMi4xLjE2OTcwNjQ2MTguNDQuMC4w',
                        }}></Image>
                    </TouchableOpacity>
                  </ImageBackground>
            </View>

            



           
<View style={estilos.estrela}>

<Text style={{ fontSize: verticalScale(20), color: 'white', marginLeft: moderateScale(200)}}>{cidade}</Text>
</View>

            <View style={estilos.bff}>
              <TouchableOpacity style={estilos.iconsSpecs}>
                <Image
                  //Favoritos
                  style={estilos.icon}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Festrela.png?alt=media&token=55c04446-3b9b-4666-bf4b-f8baf15913c5',
                  }}
                />
                <Text style={estilos.textIcon}>Favorito</Text>
              </TouchableOpacity>

              <TouchableOpacity style={estilos.iconsSpecs}
              onPressIn={selectImage}
              >
                <Image
                  //Galeria
                  style={estilos.icon}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fgaleria.png?alt=media&token=2116fe7a-d830-4a5e-a028-be0940600f00',
                  }}
                />
                <Text style={estilos.textIcon}>Adicionar Foto</Text>
              </TouchableOpacity>

              <TouchableOpacity style={estilos.iconsSpecs}
              onPressIn={()=>{
                let teste = {...dados.geolocalizacao};
                setMenorDuracao(teste);
                setVisivel(!visivel)
              }}
              >
                <Image
                  //ROTAS
                  style={estilos.icon}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fset2.png?alt=media&token=b9379978-0c83-4758-a591-4619509b3e09',
                  }}
                />
                <Text style={estilos.textIcon}>Direção</Text>
              </TouchableOpacity>

              <TouchableOpacity style={estilos.iconsSpecs}
              onPress={()=>{
                sendEmail();
              }}
              >
                <Image
                  //Reportar
                  style={estilos.icon}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fperigo.png?alt=media&token=884eace5-04b9-450c-b168-bea02542e4ba',
                  }}
                />
                <Text style={estilos.textIcon}>Reportar</Text>
              </TouchableOpacity>
            </View>

          
              {/* DIVIDINDO PARA NÃO FICAR CONFUSO */}


{/* DIVIDINDO PARA NÃO FICAR CONFUSO */}


<View style={estilos.Strahd}>
{/* DIVIDINDO PARA NÃO FICAR CONFUSO */}

  <View style={estilos.iconsSpecs1}>
    <Image
      //Localizar
      style={estilos.icon}
      source={{
        uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fendereco.png?alt=media&token=073a9f5b-f866-4583-bec7-5a4615b11fbf',
      }}
    />
    <Text style={estilos.textIcon1}>{end}</Text>
  </View>

  <View style={estilos.iconsSpecs1}>
    <Image
      //Dinheiro
      style={estilos.icon}
      source={{
        uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fbufunfa.png?alt=media&token=e608fc97-e108-4180-ab19-97d66bfc1fcc',
      }}
    />
    <Text style={estilos.textIcon1}>{(tabelaCarregador)?((tabelaCarregador[idCarregador].pagamentoNecessario)?"Pagamento Necessário":"Grátis"):""}</Text>
  </View>

  <View style={estilos.iconsSpecs1}>
    <Image
      //Estacionamento
      style={estilos.icon}
      source={{
        uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Festacionamento.png?alt=media&token=a827952e-b37d-4383-8144-2c7c38ffe54d',
      }}
    />
    <Text style={estilos.textIcon1}>Quantidade de bombas: {(tabelaCarregador)?((tabelaCarregador[idCarregador].qtdeCarregadores)?(tabelaCarregador[idCarregador].qtdeCarregadores):""):""}</Text>
  </View>

  <View style={estilos.iconsSpecs1}>
    <Image
      //Tipo
      style={estilos.icon}
      source={{
        uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Ftipo.png?alt=media&token=34abcf01-a2ac-4b54-92de-20a74a835ef6',
      }}
    />
    <Text style={estilos.textIcon1}>Horário Aberto: {`${tabelaCarregador[idCarregador].horarioAberto}`}</Text>
  </View>

{/* DIVIDINDO PARA NÃO FICAR CONFUSO */}
</View>


           


          </View>
          </ScrollView>
        </Modal>    
          <Map
            tabelaCarregador={tabelaCarregador}
            tabelaLogradouro={tabelaLogradouro}
            onFiltros={selectedCarregadores}
            dest={menorDuracao}
            resetSrc={resetSearch}
            searchVer={search} // Passando o valor atual de searchVer
            userMapRegion={region}
            chargerMarkes={markers.map((coordenada, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: coordenada.latitude,
                    longitude: coordenada.longitude,
                  }}
                  title={coordenada.nome}
                  icon={{
                    uri: `https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2FpingCarregadores1.png?alt=media&token=769d4cfd-0682-4d23-99d5-4e51947f3196&_gl=1*1l5agxv*_ga*MTMzMzEzMzc2OS4xNjg1MDI3MDY4*_ga_CW55HF8NVT*MTY5ODQ0OTM1Ny4xNDIuMS4xNjk4NDUwMTM5LjU1LjAuMA..`,
                  }}
                  onPress={async () => {
                    setVisivel(true);
                    setEnd(endereco[index]);
                    setCidade(markers[index].nome);
                    const enviarDado = ()=>{
                      tabelaLogradouro.forEach(inf =>{
                        if(inf.geolocalizacao.latitude == markers[index].latitude){
                          if(inf.geolocalizacao.longitude == markers[index].longitude){
                            setDados(inf);
                          }
                        }
                      })
                    }
                    enviarDado();
                    setIdCarregador(index);
                    setIconCarregadoresPonto(iconCarregadores[index]);
                      const getImg = async () => {
                        if (imagems[index] == 'semImage') {
                          //Caso a imagem não exista, puxa uma padrão
                          return 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2FeehBOMBA.png?alt=media&token=fc0da4ee-422f-4bd3-b4a1-225c44e3fb11';
                        } else {
                          //puxa a imagem do banco de dados
                          const url = await storage
                            .ref(`${imagems[index]}`)
                            .getDownloadURL();
                          return url;
                        }
                      };
                      const url = await getImg();
                      setImagemDoCarregador(url);

                  }}
                  
                />
              );
            })}
            inf={getInfo}
          />

          <TouchableOpacity
            style={estilos.iconBoltBg}
            onPressIn={() => {
              
              if (tabCarr.length>0) {
                const origin = region; // Substitua pelas coordenadas da localização atual do usuário.
                const apiKey = 'AIzaSyAdVbhYEhx50Y8TS7tulpNCkj8yMZPYiSQ'; // Substitua pela sua chave de API do Google Maps.
                let minDuration = Infinity;
                markers.forEach(location => {
                  tabCarr.forEach(inf => {
                    if (location.latitude == inf.latitude) {
                      if (location.longitude == inf.longitude) {
                        if (location.nome == inf.nome) {
                          const destination = {
                            latitude: location.latitude,
                            longitude: location.longitude,
                          };

                          console.log(origin);

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
                                    //compara qual é a menor
                                    minDuration = duration;
                                    if (minDuration/60 <= 30) {
                                      setDurac(minDuration);
                                      setMenorDuracao(destination);
                                    } else {
                                      setTime(true);
                                      const timeOut = setTimeout(() => {
                                        setTime(false);
                                      }, 5000);
                                      clearTimeout(timeOut)
                                    }
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
                      }
                    }
                  });
                });
                setMenorDuracao(locMenorDuracao);
                setVerificacaoDestination(!verificacaoDestination);
                setSeach(false);
              } else {
                setTime(true);
                const timeOut = setTimeout(() => {
                  setTime(false);
                }, 5000);


                return () => {
                  clearTimeout(timeOut);
                };
              }
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
