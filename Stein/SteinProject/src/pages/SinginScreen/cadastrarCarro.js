import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import styles from './style';
import Table from './table';
import {firestore} from '../../config/configFirebase';

export default function CadastrarCarro({onModal, getInfo, register}) {
  const [rotation, setRotation] = useState(90);
  const [table, setTable] = useState(false);
  const [carregador, setCarregador] = useState(false);
  const [placa, setPlaca] = useState(false);
  const [desc, setDesc] = useState(false);
  const [cor, setCor] = useState(false);
  const [modelo, setModelo] = useState(false);
  const [uf, setUf] = useState(false);
  const [ano, setAno] = useState(false);
  const [info, setInfo] = useState(getInfo);

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

  const add = async () => {
    let contUser = 0;

    const getTabUser = await tabelaUsuario.get();

    const listaUser = [];

    getTabUser.forEach(doc => {
      listaUser.push({id: doc.id, ...doc.data()});
    });

    listaUser.forEach(data => {
      if (parseInt(data.id) > contUser) {
        contUser = parseInt(data.id);
      }
    });

    contUser++;

    let dados = {
      nomeUsuario: info.nome,
      email: info.email,
      senha: info.senha,
      imagemFundo: null,
      imagemPerfil: null,
    };

    tabelaUsuario
      .doc(`${contUser}`)
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
      IDUsuario: contUser,
    };

    tabelaCarro
      .doc(`${countCarro}`)
      .set(dados)
      .catch(error => console.error(error));
    if (placa && desc && ano && modelo && uf && cor && info.length > 0) {
      console.log();
    }
  };

  return (
    <Modal style={styles.modal}>
      <ScrollView>
        <View style={styles.titleView}>
          <TouchableOpacity
            style={styles.touchImg}
            onPress={() => {
              onModal(false);
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
              setDesc(text)
              setValidDesc("#000")
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
                  setPlaca(text)
                  setValidPlaca("#000")
                }}
                value={placa}
                placeholderTextColor={validPlaca}

              />
              <TextInput
                style={[styles.textCad2, {color: validUf}]}
                placeholder="UF"
                onChangeText={text => {
                  setUf(text)
                  setValidUf("#000")
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
                  setModelo(text)
                  setValidModelo("#000")
                }}
            value={modelo}
            placeholderTextColor={validModelo}

              />
              <TextInput
                style={[styles.textCad2, {color: validAno}]}
                placeholder="Ano do Modelo"
                onChangeText={text => {
                  setAno(text)
                  setValidAno("#000")
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
                  setCor(text)
                  setValidCor("#000")

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
              if (desc && placa && uf && modelo && ano && cor && carregador) {
                register();
                add();
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
                <Text style={{fontSize: 20, fontWeight: '900', color: '#f00'}}>
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
        ) : (
null        )}
      </ScrollView>
    </Modal>
  );
}
