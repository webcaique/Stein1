import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from 'react-native';
import styles from './style';
import {firestore, auth} from '../../config/configFirebase';
import Table from './table';
import { RFValue } from 'react-native-responsive-fontsize';

const apiKey = 'AIzaSyAdVbhYEhx50Y8TS7tulpNCkj8yMZPYiSQ';

const PersonalContentScreen = () => {
  const [carregador, setCarregador] = useState([]);
  const [nomeUser, setNomeUser] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [senha, setSenha] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [cep, setCep] = useState('');
  const [carro, setCarro] = useState('');
  const [numeroResidencia, setNumeroResidencia] = useState("");
  const [numero, setNumero] = useState();
  const user = auth.currentUser;

  const [errorEmail, setErrorEmail] = useState('');

  const tabelaUsuario = firestore.collection('usuario');
  const tabelaCarro = firestore.collection('carro');

  useEffect(() => {
    tabelaUsuario.onSnapshot(info => {
      info._docs.forEach(inf => {
        const userId = inf._ref._documentPath._parts[1];
        if (userId == auth.currentUser.uid) {
          tabelaCarro.onSnapshot(dados => {
            dados._docs.forEach(datas => {
              const carroIdUsuario = datas._data.IDUsuario;
              if (carroIdUsuario == userId) {
                setCarro(datas._ref._documentPath._parts[1]);
                setNomeUser(inf._data.nomeUsuario);
                setEmailUser(inf._data.email);
                setNumeroResidencia(inf._data.numeroResidencia);
                setSenha(inf._data.senha);
                setCep(inf._data.CEP);
                setCarregador(
                  typeof datas._data.IDTipoCarregador == 'object'
                    ? datas._data.IDTipoCarregador
                    : [datas._data.IDTipoCarregador],
                );
                handleGeocode(inf._data.CEP, inf._data.numeroResidencia);
              }
            });
          });
        }
      });
    });
  }, []);


  const [verifData, setVerifData] = useState(false);
  const [nomeCampo, setNomeCampo] = useState('');
  const [dado, setDado] = useState('');

  const changeData = dado => {
    let palavra1 = `${dado}`.charAt(0);
    let palavra2 = `${dado}`.substring(1);
    palavra1 = palavra1.toUpperCase();
    let palavra = `${palavra1}${palavra2}`;
    setNomeCampo(palavra);
    setVerifData(true);
    setDado('');
    setNumero("");
  };

  const update = () => {
    if (nomeCampo.toUpperCase() == 'CEP') {
      handleGeocode(dado);
      tabelaUsuario.doc(`${auth.currentUser.uid}`).update({
        CEP: dado,
        numeroResidencia: numero,
      });
    } else if (nomeCampo.toUpperCase() == 'EMAIL') {
      user
        .updateEmail(`${dado}`)
        .then(() => {
          tabelaUsuario.doc(`${auth.currentUser.uid}`).update({
            email: dado,
          });
        })
        .catch(error => {
          Alert.alert('EMAIL INVÁLIDO', 'O email digitado é inválido.', [], {
            cancelable: true,
          });
        });
    } else if (nomeCampo.toUpperCase() == 'NOME DO USUÁRIO') {
      tabelaUsuario.doc(`${auth.currentUser.uid}`).update({
        nomeUsuario: dado,
      });
    }
    setVerifData(false);
  };

  const handleGeocode = async (cep, num) => {
    tabelaUsuario.doc(`${auth.currentUser.uid}`);
    try {
      // Fazer uma solicitação para um serviço de geocodificação (por exemplo, Google Geocoding API)
      let response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      const data = await response.json();

      if (data.erro) {
        Alert.alert(
          'CEP Inválido ou número não encontrado!',
          'CEP ou o número digitado não encontrado.',
          [],
          {
            cancelable: true,
          },
        );
      } else {
        setLocalizacao(
          `${data.logradouro}, ${num}, ${data.bairro}, ${data.localidade}, ${data.uf}`,
        );
      }
    } catch (error) {
      Alert.alert(
        'CEP Inválido ou número não encontrado!',
        'CEP ou o número digitado não encontrado.',
        [],
        {
          cancelable: true,
        },
      );
    }
  };

  return (
    <KeyboardAvoidingView style={styles.mainContainer} /* VIEW PRINCIPAL */>
      {verifData ? (
        <Modal transparent>
          <Pressable
            style={styles.modal}
            onPress={() => {
              setNumero("");
              setVerifData(false);
            }}>
            <KeyboardAvoidingView style={styles.modalView}>
              <KeyboardAvoidingView style={{width: 'auto'}}>
                <Text style={styles.textoCampo}>{nomeCampo}</Text>
              </KeyboardAvoidingView>
              <KeyboardAvoidingView
                style={
                  nomeCampo.toUpperCase() == 'CARREGADORES'
                    ? {width: 'auto'}
                    : nomeCampo.toUpperCase() == 'CEP'
                    ? [styles.textInput, {width: RFValue(200)}]
                    : [styles.textInput]
                }>
                {nomeCampo.toUpperCase() != 'CARREGADORES' ? (
                  <TextInput
                  style={{fontSize:RFValue(15)}}
                    autoFocus
                    keyboardType={
                      nomeCampo.toUpperCase() == 'CEP'
                        ? 'number-pad'
                        : nomeCampo.toUpperCase() == 'EMAIL'
                        ? 'email-address'
                        : 'default'
                    }
                    placeholder={nomeCampo}
                    onChangeText={text => {
                      setDado(
                        nomeCampo.toUpperCase() == 'EMAIL'
                          ? text.toLowerCase()
                          : text
                      );
                    }}
                    value={dado}
                    maxLength={nomeCampo.toUpperCase() == 'CEP' ? 8 : 100}
                    onBlur={() => {
                      if (nomeCampo != 'CEP') {
                        update();
                      }
                    }}
                  />
                ) : (
                  <Table
                    getInfo={info => {
                      tabelaCarro.doc(`${carro}`).update({
                        IDTipoCarregador: info,
                      });
                      setVerifData(false);
                    }}
                  />
                )}
                {nomeCampo.toUpperCase() == 'CEP' ? (
                  <TextInput
                    style={{
                      width: RFValue(50),
                      borderLeftColor: '#000',
                      borderLeftWidth: 1,
                      paddingLeft:10,
                      fontSize:RFValue(15)
                    }}
                    onChangeText={setNumero}
                    value={numero}
                    keyboardType="number-pad"
                    placeholder='Número'
                  />
                ) : null}
                <TouchableOpacity
                  onPress={() => {
                    update();
                  }}>
                  {nomeCampo.toUpperCase() != 'CARREGADORES'?
                  <Image
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fenviar.png?alt=media&token=3c7facb9-59cc-4c3b-b61c-7aafdf70a59f',
                  }}
                  width={25}
                  height={25}
                  resizeMode="contain"
                  style={{
                    transform: [{rotate: '45deg'}],
                  }}
                />
                : null
              }
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </KeyboardAvoidingView>
          </Pressable>
        </Modal>
      ) : null}
      <KeyboardAvoidingView /* VIEW PARA TÍTULO DE CIMA */>
        <Text style={styles.textTitlePage}>
          Edite as informações da sua conta pessoal.
        </Text>
      </KeyboardAvoidingView>
      <KeyboardAvoidingView style={styles.table} /* VIEW PARA TABELA  */>
        <KeyboardAvoidingView /* VIEW TÍTULO TABELA */>
          <Text style={styles.textTitleTable}>Suas informações pessoais</Text>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView
          style={
            styles.row
          } /* KeyboardAvoidingView para exibir a localização */
        >
          <KeyboardAvoidingView /* Texto fixo */>
            <Text style={styles.textFix}>Estado</Text>
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={styles.dinamicView} /* Texto dinâmico e imagem */
            onPress={() => {
              changeData('CEP');
            }}>
            <Text style={styles.textDinamic}>{localizacao}</Text>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fpin-de-localizacao.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
              }}
              style={styles.imgs}
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView
          style={styles.row} /* KeyboardAvoidingView para exibir carregadores */
        >
          <KeyboardAvoidingView /* Texto Fixo*/>
            <Text style={styles.textFix}>Carregadores</Text>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            style={styles.dinamicView} /* Texto dinâmico e imagem */
          >
            <FlatList
              data={carregador}
              key={item => item.id}
              horizontal
              inverted
              renderItem={dados => {
                return (
                  <Image
                    source={{
                      uri: `https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador${dados.item}.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177`,
                    }}
                    style={[styles.imgs]}
                  />
                );
              }}
            />
            <TouchableOpacity
              onPress={() => {
                changeData('Carregadores');
              }}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={styles.imgs}
              />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView
          style={styles.row} /* KeyboardAvoidingView para exibir email */
        >
          <KeyboardAvoidingView /* Texto Fixo*/>
            <Text style={styles.textFix}>Email</Text>
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={styles.dinamicView} /* Texto dinâmico e imagem */
            onPress={() => {
              changeData('Email');
            }}>
            <Text style={styles.textDinamic}>{emailUser}</Text>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
              }}
              style={styles.imgs}
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView
          style={styles.row} /* KeyboardAvoidingView para exibir senha */
        >
          <KeyboardAvoidingView /* Texto Fixo*/>
            <Text style={styles.textFix}>Senha</Text>
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={styles.dinamicView} /* Texto dinâmico e imagem */
            onPress={() => {
              changeData('Senha');
            }}>
            <Text style={styles.textDinamic}>{'*'.repeat(senha.length)}</Text>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
              }}
              style={styles.imgs}
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView
          style={styles.row} /* KeyboardAvoidingView para o nome do usuário */
        >
          <KeyboardAvoidingView /* Texto Fixo*/>
            <Text style={styles.textFix}>Nome do usuário</Text>
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={styles.dinamicView} /* Texto dinâmico e imagem */
            onPress={() => {
              changeData('Nome do Usuário');
            }}>
            <Text style={styles.textDinamic}>{nomeUser}</Text>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
              }}
              style={styles.imgs}
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
};

export default PersonalContentScreen;
