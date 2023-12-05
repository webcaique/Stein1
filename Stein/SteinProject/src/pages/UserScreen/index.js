import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import styles from './style';
import {auth, firestore, storage} from '../../config/configFirebase';
import {request, PERMISSIONS} from 'react-native-permissions';
import {launchImageLibrary} from 'react-native-image-picker';
import Table from './table';

const UserScreen = ({navigation}) => {
  //Biblioteca para pegar o caminho do arquivo do usuário
  const path = require('path');

  //Variável que serão usados no sistema
  const userId = auth.currentUser.uid;
  const [userData, setUserData] = useState();
  const [carroData, setCarroData] = useState({});
  const [nomeUser, setNomeUser] = useState('');
  const [prog, setProg] = useState();
  const [imgFundo, setImgFundo] = useState();
  const [imgPerfil, setImgPerfil] = useState();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [carregador, setCarregador] = useState([]);

  const tabelaUsuario = firestore.collection('usuario'); // Puxa a tabela do usuário
  const tabelaCarro = firestore.collection('carro'); // Puxa a tabelo do Carro

  const getUserData = async () => {
    //Variávis que pegaram os dados do usuário
    let usuario;
    let carro;

    //Varre os dados da tabela
    tabelaUsuario.onSnapshot(async datas => {
      await datas._docs.forEach(dados => {
        if (userId == dados._ref._documentPath._parts[1]) {
          usuario = {id: dados._ref._documentPath._parts[1], ...dados._data};
        }
      });

      setUserData(usuario);
      setNomeUser(usuario.nomeUsuario);

      // Pega a imagem de do banco de dados do fundo
      if (usuario.imagemFundo) {
        const imagemFundo = await storage
          .ref(`${usuario.imagemFundo}`)
          .getDownloadURL();
        setImgFundo(imagemFundo);
      }

      // Pega a imagem de do banco de dados do perfil do usuário
      if (usuario.imagemPerfil) {
        const imagemPerfil = await storage
          .ref(`${usuario.imagemPerfil}`)
          .getDownloadURL();
        setImgPerfil(imagemPerfil);
      }
    });

    // Varre os dados da tabela do Carro
    await tabelaCarro.onSnapshot(async data => {
      await data._docs.forEach(async dados => {
        if (userId == dados._data.IDUsuario) {
          carro = await {
            id: dados._ref._documentPath._parts[1],
            ...dados._data,
          };
          setCarroData(carro);
        }
      });
    });
    setLoading(false);
    console.log(carroData);
    console.log(loading);
  };

  //Função para pegar o caminho da imagem
  const selectImage = async tipo => {
    // Para verificar se o usuário permite acessar os arquivos
    const status = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

    // Caso permite ele vai mandar a imagem para o banco de dados
    if (status === 'granted') {
      //Puxa o caminho da imagem selecionada
      const imagem = await launchImageLibrary();
      setLoading(true);
      if (!imagem.didCancel) {
        const extencao = path.extname(imagem.assets[0].originalPath);

        //Mandará a imagem para o BUKET do firebase
        await storage
          .ref(`UserDir/${userId}/${tipo}${extencao}`)
          .putFile(imagem.assets[0].originalPath)
          .then(data => {
            if (tipo == 'fundo') {
              tabelaUsuario.doc(userId).update({
                imagemFundo: data.metadata.fullPath,
              });
            } else {
              tabelaUsuario.doc(userId).update({
                imagemPerfil: data.metadata.fullPath,
              });
            }

            getUserData();
          })
          .catch(error => console.log(""));
      } else {
        setLoading(false);
      }
      setLoading(false);
    } else {
      console.log('Permissão de escrita no armazenamento externo negada');
      setLoading(false);
    }
  };

  useEffect(() => {
    tabelaCarro.onSnapshot(()=>{
      tabelaUsuario.onSnapshot(()=>{
        getUserData();
      });
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      {loading && carroData ? (
        <View style={styles.rodinhaCarregamento}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <TouchableOpacity
            style={styles.userImageBgBackgroudn}
            onPress={async () => {
              selectImage('fundo');
            }}>
            <Image
              style={styles.userImageBg}
              source={
                !imgFundo
                  ? require('../../../assets/UserAsset/TestUser/BgImage.png')
                  : {
                      uri: imgFundo,
                    }
              }
            />
          </TouchableOpacity>
          <View style={styles.userImageBackGround}>
            <TouchableOpacity
              style={styles.circule}
              onPress={async () => {
                selectImage('perfil');
              }}>
              <Image
                style={styles.useruserImage}
                source={
                  !imgPerfil
                    ? require('../../../assets/UserAsset/TestUser/userImage.png')
                    : {
                        uri: imgPerfil,
                      }
                }
              />
            </TouchableOpacity>
            <Text style={styles.userName}>{nomeUser}</Text>
            <Modal visible={modal} transparent>
              <Pressable
                onPress={() => {
                  setModal(false);
                }}
                style={styles.modal}>
                <View style={{backgroundColor: '#fff'}}>
                  <Table
                    getInfo={(select, nome) => {
                      setCarregador(select);
                      Alert.alert(
                        'CARREGADOR SELECIONADO',
                        `Tem certeza que quer mudar para o carregador ${nome}`,
                        [
                          {
                            text: 'Sim',
                            onPress: () => {
                              tabelaCarro.doc(`${carroData.id}`).update({
                                IDTipoCarregador: select,
                              });
                              setModal(false);
                              setLoading(true);
                            },
                          },
                          {
                            text: 'Não',
                            onPress: () => {},
                            style: 'cancel',
                          },
                        ],
                      );
                    }}
                    info={carregador}
                  />
                </View>
              </Pressable>
            </Modal>
            <TouchableOpacity
              style={styles.userPowerSupplyUnit}
              onPress={() => {
                setModal(true);
              }}>
              <Image
                style={styles.powerSupplyUnit}
                source={
                  carroData
                    ? {
                        uri: `https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador${carroData.IDTipoCarregador}.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177`,
                      }
                    : {
                        uri: `https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador1.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177`,
                      }
                }
              />
            </TouchableOpacity>
          </View>
          <View style={styles.lineList}>
            <ScrollView>
            <View style={{...styles.linha, borderRightWidth:0, borderLeftWidth:0}}>
              <Text style={styles.titleAutomovel}>Automóvel</Text>
            </View>
            <View style={styles.lines} />
            <View style={styles.linha}>
              <Text style={styles.desc}>{carroData.desc}</Text>
            </View>
            <View style={styles.lines} />
            <View style={styles.linha}>
              <View style={styles.coluna}>
                <Text style={styles.titles}>Modelo</Text>
                <Text style={styles.txt}>{carroData.modelo}</Text>
              </View>
              <View style={styles.coluna}>
                <Text style={styles.titles}>Ano do modelo</Text>
                <Text style={styles.txt}>{carroData.ano}</Text>
              </View>
              <View style={styles.coluna}>
                <Text style={styles.titles}>Cor</Text>
                <Text style={styles.txt}>{carroData.cor}</Text>
              </View>
            </View>
            <View style={styles.lines} />
            <View style={styles.linha}>
              <View style={styles.coluna}>
                <Text style={styles.titles}>Placa</Text>
                <Text style={styles.txt}>{carroData.placa}</Text>
              </View>
              <View style={styles.coluna}>
                <Text style={styles.titles}>Cidade/país</Text>
                <Text style={styles.txt}>{carroData.uf}</Text>
              </View>
            </View>
            <View style={styles.lines} />
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};
export default UserScreen;
