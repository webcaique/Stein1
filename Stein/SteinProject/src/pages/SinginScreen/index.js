import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Image,
  FlatList,
} from 'react-native';
import styles from './style';
import {auth} from '../../config/configFirebase.js';
import {firestore} from '../../config/configFirebase.js';
import Table from './table';

const SinginScreen = ({navigation}) => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [errorRegister, setErrorRegister] = useState('');
  const [validNome, setValidNome] = useState();

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        let user = userCredential.user;
        add(user.uid);
      })
      .catch(error => {
        setErrorRegister(true);
        let errorCode = error.code;
        let errorMessage = error.message;
        console.error(error.message);
      });
  };

  useEffect(() => {
    setAno("");
    setCarregador("");
    setConfirmPassword("");
    setCor("");
    setDesc("");
    setEmail("");
    setErrorRegister("");
    setModal(false);
    setModelo("");
    setNome("");
    setPassword("");
    setPlaca("");
    setUf("");
  }, []);

  //Cadastrar o carro//

  const [rotation, setRotation] = useState(90);
  const [table, setTable] = useState(false);
  const [carregador, setCarregador] = useState(false);
  const [placa, setPlaca] = useState(false);
  const [desc, setDesc] = useState(false);
  const [cor, setCor] = useState(false);
  const [modelo, setModelo] = useState(false);
  const [uf, setUf] = useState(false);
  const [ano, setAno] = useState(false);

  //validacao
  const [validCarregador, setValidCarregador] = useState('#000');
  const [validPlaca, setValidPlaca] = useState('#000');
  const [validDesc, setValidDesc] = useState('#000');
  const [validCor, setValidCor] = useState('#000');
  const [validModelo, setValidModelo] = useState('#000');
  const [validAno, setValidAno] = useState('#000');
  const [validUf, setValidUf] = useState('#000');
  const [validLista, setValidLista] = useState([]);

  const tabelaCarro = firestore.collection('carro');
  const tabelaUsuario = firestore.collection('usuario');

  const verifNome = async () => {
    const listaUsuario = [];

    const snapshot = await tabelaUsuario.get();
    snapshot.forEach(dados => {
      listaUsuario.push({id: dados.id, ...dados.data()});
    });

    for (const datas of listaUsuario) {
      if (datas.nomeUsuario == nome) {
        setValidNome(true);
        break;
      } else {
        setValidNome(false);
      }
    }
  };

  const add = async ID => {
    const getTabUser = await tabelaUsuario.get();

    const listaUser = [];

    getTabUser.forEach(doc => {
      listaUser.push({id: doc.id, ...doc.data()});
    });

    let dados = {
      nomeUsuario: nome,
      email: email,
      senha: password,
      imagemFundo: null,
      imagemPerfil: null,
    };

    tabelaUsuario
      .doc(`${ID}`)
      .set(dados)
      .catch(error => console.error(error));

    let countCarro = 0;

    const getTabCarro = await tabelaCarro.get();

    const listaCarro = [];

    getTabCarro.forEach(doc => {
      listaCarro.push({id: doc.id, ...doc.data()});
    });

    listaCarro.forEach(data => {
      if (countCarro < parseInt(data.id)) {
        countCarro = parseInt(data.id);
      }
    });

    countCarro++;

    dados = {
      desc: desc,
      ano: ano,
      uf: uf,
      cor: cor,
      placa: placa,
      IDTipoCarregador: carregador,
      IDUsuario: `${ID}`,
    };

    tabelaCarro
      .doc(`${countCarro}`)
      .set(dados)
      .catch(error => console.error(error));

    navigation.navigate('LoginScreen');
  };

  //

  return (
    <View
      style={styles.conteiner}
      //Container principal
    >
      <KeyboardAvoidingView>
        <Pressable // Deixa a página clicável para desativar o teclado do usuário
          onPress={Keyboard.dismiss}>
          <View
            style={styles.conteiner}
            //Container para retirar bugs do Pressable
          >
            <TextInput //campo para escrever seu apelido no aplicativo
              placeholder="Nome"
              placeholderTextColor={'#000000'}
              style={styles.textInput1}
              keyboardType="email-address"
              returnKeyLabel="email"
              autoCapitalize="sentences"
              onChangeText={text => setNome(text)}
              value={nome}
            />
            <TextInput // campo para colocar o email
              placeholder="Email"
              placeholderTextColor={'#000000'}
              style={styles.textInputAll}
              keyboardType="email-address"
              returnKeyLabel="email"
              autoCapitalize="none"
              onChangeText={text => setEmail(text)}
              value={email}
            />
            <TextInput // campo para colocar o senha
              style={styles.textInputAll}
              placeholder="Senha"
              placeholderTextColor={'#000000'}
              returnKeyLabel="Senha"
              autoCapitalize="none"
              secureTextEntry={true}
              password={true}
              autoCorrect={false}
              textContentType={'password'}
              onChangeText={text => setPassword(text)}
              value={password}
            />

            <TextInput // campo para confirmar sua senha
              style={styles.textInputAll}
              placeholder="Confirmar senha"
              placeholderTextColor={'#000000'}
              returnKeyLabel="Senha"
              autoCapitalize="none"
              secureTextEntry={true}
              password={true}
              autoCorrect={false}
              textContentType={'password'}
              onChangeText={text => setConfirmPassword(text)}
              value={confirmPassword}
            />

            {email === '' ||
            password === '' ||
            confirmPassword === '' ||
            nome === '' ||
            email === undefined ||
            password === undefined ||
            confirmPassword === undefined ||
            nome === undefined
             ? (
              <TouchableOpacity
                style={styles.buttons}
                disabled={true}
                //Botão para fativar a função de cadastrar e a função de navegação, caso os dados sejam preenchidos corretamente
              >
                <Text
                  style={styles.textButtons}
                  //Texto do botão
                >
                  Cadastrar
                </Text>
              </TouchableOpacity>
            ) : confirmPassword != password? (
              <>
                <View style={styles.error}>
                  <Text style={styles.errorText}>Verificar senha</Text>
                </View>
                <TouchableOpacity
                  style={styles.buttons}
                  disabled={true}
                  //Botão para fativar a função de cadastrar e a função de navegação, caso os dados sejam preenchidos corretamente
                >
                  <Text
                    style={styles.textButtons}
                    //Texto do botão
                  >
                    Cadastrar
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.buttons}
                onPress={async () => {
                  await verifNome();
                  console.log(password);
                  if (validNome) {
                    return (
                      <View style={styles.error}>
                        <Text style={styles.errorText}>
                          Nome de usuário já usado
                        </Text>
                      </View>
                    );
                  } else {
                    setModal(true);
                  }
                }}
                //Botão para fativar a função de cadastrar e a função de navegação, caso os dados sejam preenchidos corretamente
              >
                <Text
                  style={styles.textButtons}
                  //Texto do botão
                >
                  Cadastrar
                </Text>
              </TouchableOpacity>
            )}
            <View>
              {errorRegister === true ? (
                <View style={styles.error}>
                  <Text style={styles.errorText}>
                    Email ou/e senha inválido(s)
                  </Text>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View
              style={styles.loginLink}
              //Link para entrar na tela de login
            >
              <Text
                style={styles.textLogin}
                //Texto de explicação caso já possio cadastro
              >
                {' '}
                Já possui cadastro?{' '}
              </Text>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('LoginScreen')}
                //Link para ir para tela de login
              >
                <Text
                  style={styles.textLoginButton}
                  //Text do link
                >
                  Entrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {modal ? (
            <Modal style={styles.modal}>
              <ScrollView>
                <View style={styles.titleView}>
                  <TouchableOpacity
                    style={styles.touchImg}
                    onPress={() => {
                      setModal(false);
                    }}>
                    <Image
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=4ae62381-8bc8-450d-ad26-b1d525a3045c&_gl=1*36gn8l*_ga*MTMzMzEzMzc2OS4xNjg1MDI3MDY4*_ga_CW55HF8NVT*MTY5ODc1ODMwOC4xNDQuMC4xNjk4NzU4MzA4LjYwLjAuMA..',
                      }}
                      style={[styles.titleImg]}
                    />
                  </TouchableOpacity>
                  <Text style={styles.titleText}>Cadastrar Carros</Text>
                </View>
                <View style={styles.view}>
                  <TextInput
                    style={[styles.textCad1, {color: validDesc}]}
                    placeholder="Descrição do Veículo"
                    onChangeText={text => {
                      setDesc(text);
                      setValidDesc('#000');
                    }}
                    value={desc}
                    placeholderTextColor={validDesc}
                  />
                  <View>
                    <View style={styles.row}>
                      <TextInput
                        style={[styles.textCad2, {color: validPlaca}]}
                        placeholder="Placa"
                        onChangeText={text => {
                          setPlaca(text);
                          setValidPlaca('#000');
                        }}
                        value={placa}
                        placeholderTextColor={validPlaca}
                      />
                      <TextInput
                        style={[styles.textCad2, {color: validUf}]}
                        placeholder="UF"
                        onChangeText={text => {
                          setUf(text);
                          setValidUf('#000');
                        }}
                        value={uf}
                        placeholderTextColor={validUf}
                      />
                    </View>
                    <View style={styles.row}>
                      <TextInput
                        style={[styles.textCad2, {color: validModelo}]}
                        placeholder="Modelo"
                        onChangeText={text => {
                          setModelo(text);
                          setValidModelo('#000');
                        }}
                        value={modelo}
                        placeholderTextColor={validModelo}
                      />
                      <TextInput
                        style={[styles.textCad2, {color: validAno}]}
                        placeholder="Ano do Modelo"
                        onChangeText={text => {
                          setAno(text);
                          setValidAno('#000');
                        }}
                        value={ano}
                        placeholderTextColor={validAno}
                      />
                    </View>
                    <View style={styles.row}>
                      <TextInput
                        style={[styles.textCor, {color: validCor}]}
                        placeholder="Cor"
                        onChangeText={text => {
                          setCor(text);
                          setValidCor('#000');
                        }}
                        value={cor}
                        placeholderTextColor={validCor}
                      />
                    </View>
                  </View>
                  <View style={styles.tableCarr}>
                    <View style={styles.container}>
                      <Text style={[styles.textTab, {color: validCarregador}]}>
                        Tipo de conector
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setRotation(rotation + 180);
                          setTable(!table);
                        }}>
                        <Image
                          source={{
                            uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=4ae62381-8bc8-450d-ad26-b1d525a3045c&_gl=1*36gn8l*_ga*MTMzMzEzMzc2OS4xNjg1MDI3MDY4*_ga_CW55HF8NVT*MTY5ODc1ODMwOC4xNDQuMC4xNjk4NzU4MzA4LjYwLjAuMA..',
                          }}
                          style={[
                            styles.imgSeta,
                            {transform: [{rotate: `${rotation}deg`}]},
                          ]}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      {table ? (
                        <Table
                          getInfo={select => {
                            setCarregador(select);
                          }}
                          info={carregador}
                        />
                      ) : null}
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.buttons}
                    onPress={() => {
                      if (
                        desc &&
                        placa &&
                        uf &&
                        modelo &&
                        ano &&
                        cor &&
                        carregador
                      ) {
                        register();
                      } else {
                        let lista = [];
                        setValidAno(ano ? '#000' : '#f00');
                        setValidCarregador(carregador ? '#000' : '#f00');
                        setValidCor(cor ? '#000' : '#f00');
                        setValidDesc(desc ? '#000' : '#f00');
                        setValidModelo(modelo ? '#000' : '#f00');
                        setValidPlaca(placa ? '#000' : '#f00');
                        setValidUf(uf ? '#000' : '#f00');

                        if (!ano) {
                          lista.push('Ano do Modelo');
                        }
                        if (!carregador) {
                          lista.push('Carregador');
                        }
                        if (!cor) {
                          lista.push('Cor');
                        }
                        if (!desc) {
                          lista.push('Descrição');
                        }
                        if (!modelo) {
                          lista.push('Modelo');
                        }
                        if (!placa) {
                          lista.push('Placa');
                        }
                        if (!uf) {
                          lista.push('UF');
                        }

                        setValidLista(lista);
                      }
                    }}>
                    <Text style={styles.textButtons}>Cadastrar Carro</Text>
                  </TouchableOpacity>
                </View>
                {validLista.length > 0 ? (
                  <Modal transparent>
                    <Pressable
                      style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        setValidLista([]);
                      }}>
                      <View style={styles.aviso}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: '900',
                            color: '#f00',
                          }}>
                          Campos não preenchidos!
                        </Text>
                        <FlatList
                          data={validLista}
                          keyExtractor={item => item.id}
                          renderItem={({item, index}) => {
                            if (index + 1 != validLista.length) {
                              return (
                                <Text
                                  style={{
                                    fontSize: 20,
                                  }}>
                                  {item},
                                </Text>
                              );
                            } else {
                              return (
                                <Text
                                  style={{
                                    fontSize: 20,
                                  }}>
                                  {item}.
                                </Text>
                              );
                            }
                          }}
                        />
                      </View>
                    </Pressable>
                  </Modal>
                ) : null}
              </ScrollView>
            </Modal>
          ) : null}
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};
export default SinginScreen;
