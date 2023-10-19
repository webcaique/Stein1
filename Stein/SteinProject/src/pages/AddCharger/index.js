import React, {useState, useEffect, version} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
  Switch,
  Keyboard,
  Modal,
} from 'react-native';
import styles from './styles';
import TabelaCarregadores from '../componenteTabelaCarregadores.js';
import SelectList from '../selectList';
import TipoLogradouro from '../tipoLogradouro.js';
import {firestore} from '../../config/configFirebase';

const apiKey = 'AIzaSyAdVbhYEhx50Y8TS7tulpNCkj8yMZPYiSQ';

const AddCharger = ({navigation}) => {
  const tabelaCarregadores = firestore.collection('carregadores'); // Pega a tabela Carregadores do Firabase
  const tabelaLogra = firestore.collection('logradouro'); // Pega a tabela Logradouro do Firabase

  // Criação das varíaveis com estado variáveis para colocar os dados do formulário
  const [logra, setLogra] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cepInput, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [qtdeCarregadores, setQtdeCarregadores] = useState('');
  const [selectCarregadores, setSelectCarregadores] = useState('');
  const [selectedUf, setSelectedUf] = useState('');
  const [selectedTipoLogra, setSelectedTipoLogra] = useState('');
  const [validcaoLogradouro, setValidacaoLogradouro] = useState(false);

  //Campos inválidos
  const [listaCamposInvalidos, setListaCamposInvalidos] = useState([]);

  // Variávies de estados para indicar campo obrigatório vazio ou inválido
  const [validLogra, setValidLogra] = useState(false);
  const [validNumero, setValidNumero] = useState(false);
  const [validCep, setValidCep] = useState(false);
  const [validBairro, setValidBairro] = useState(false);
  const [validCidade, setValidCidade] = useState(false);
  const [validQtdeCarregadores, setValidQtdeCarregadores] = useState(false);
  const [validSelectCarregadores, setValidSelectCarregadores] = useState(false);

  // Variável para aparição da tabelas dos carregadores
  const [carregadores, setCarregadores] = useState(false);

  const toggleCarregadorSelection = carr => {
    setSelectCarregadores(carr);
  };

  const handleUfChange = uf => {
    setSelectedUf(uf);
  };

  const handleTipoLograChange = tipoLogra => {
    setSelectedTipoLogra(tipoLogra);
  };

  // Função para adicionar dados no banco de dados

  const addCharger = async () => {
    // o contador servira para colocar o id para o registro
    let countLogra = 0;

    // colocar os dados do banco de dados em uma variável (eles chegaram em formato do Firebase)
    const snapshotLogra = await tabelaLogra.get();

    // a lista que armazenara os dados formatos de um jeito que entedemos
    const listaLogra = [];

    // forEach para varrer os dados na snapshotLogra para colocar os dados na listaLogra
    snapshotLogra.forEach(doc => {
      listaLogra.push({id: doc.id, ...doc.data()});
    });

    // verificará se o countLogra é menor que o id, pois se ele for receberá o valor do id
    listaLogra.forEach(doc => {
      if (countLogra < parseInt(doc.id)) {
        countLogra = parseInt(doc.id);
      }
    });

    // aqui será incrementado um único valor, para criar um novo ID
    countLogra++;

    const validarGeo = async () => {
      try {
        const address = `${selectedTipoLogra} ${logra}, ${numero} , ${bairro}, ${cidade}, ${selectedUf}`;

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address,
          )}&key=${apiKey}`,
        );

        if (!response.ok) {
          throw new Error('Erro ao buscar coordenadas.');
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          console.log('LATITUDE: ' + location.lat);
          console.log('LONGITUDE: ' + location.lng);

          // adionará os dados ao banco de dados
          tabelaLogra
            .doc(`${countLogra}`)
            .set({
              CEP: `${cepInput}`,
              UF: `${selectedUf}`,
              bairro: `${bairro}`,
              cidade: `${cidade}`,
              complemento: `${complemento}`,
              geolocalizacao: {
                latitude: location.lat,
                longitude: location.lng,
              },
              logradouro: `${logra}`,
              numero: `${numero}`,
              tipoLogradouro: `${selectedTipoLogra}`,
            })
            .then(() => {
              console.log('ADICIONADO!'); // caso ocorra algum erro, mostrará para o DEV;
            });

          if (true) {
            // o contador servira para colocar o id para o registro
            let countCarregadores = 0;

            // colocar os dados do banco de dados em uma variável (eles chegaram em formato do Firebase)
            const snapshotCarregadores = await tabelaCarregadores.get();

            // a lista que armazenara os dados formatos de um jeito que entedemos
            const listaCarregadores = [];

            // forEach para varrer os dados na snapshotLogra para colocar os dados na listaLogra
            snapshotCarregadores.forEach(doc => {
              listaCarregadores.push({id: doc.id, ...doc.data()});
            });

            // verificará se o countLogra é menor que o id, pois se ele for receberá o valor do id
            listaCarregadores.forEach(doc => {
              if (countCarregadores < parseInt(doc.id)) {
                countCarregadores = parseInt(doc.id);
              }
            });

            // aqui será incrementado um único valor, para criar um novo ID
            countCarregadores++;

            //Adiciona os dados dentro do banco de dados
            tabelaCarregadores
              .doc(`${countCarregadores}`)
              .set({
                IDLogradouro: `${countLogra}`,
                qtdeCarregadores: `${qtdeCarregadores}`,
                IDTipoCarregador: selectCarregadores,
              })
              .then(() => {
                console.log('ADICIONADO!');
              });
          }
        } else {
          throw new Error('Endereço não encontrado.');
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    validarGeo();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setListaCamposInvalidos([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleGeocode = async () => {
    try {
      // Fazer uma solicitação para um serviço de geocodificação (por exemplo, Google Geocoding API)
      const response = await fetch(
        `https://viacep.com.br/ws/${cepInput}/json/`,
      );

      if (!response.ok) {
        setCep('CEP INVÁLIDO!');
        setValidCep(true);
        const timer = setTimeout(() => {
          setCep('');
        }, 3000);

        return () => clearTimeout(timer);
      }

      setValidCidade(false);
      setValidLogra(false);
      setValidNumero(false);
      setValidBairro(false);

      const data = await response.json();
      setBairro(data.bairro);
      setCidade(data.localidade);
      setSelectedUf(data.uf);

      const partes = data.logradouro.split(' ');

      if (partes.length >= 2) {
        const tipo = partes[0];
        const logras = partes.slice(1).join(' ');

        setSelectedTipoLogra(tipo);
        console.log(tipo);
        setLogra(logras);
      } else {
        console.error('Texto não contém espaço.');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const semCep = async () => {
    try {
      if (logra != '' && bairro != '' && cidade != '' && numero != '' && cepInput.length != 8) {
        const address = `${selectedTipoLogra} ${logra}, ${numero} , ${bairro}, ${cidade}, ${selectedUf}`;

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address,
          )}&key=${apiKey}`,
        );

        if (!response.ok) {
          setValidBairro(true);
          setValidCidade(true);
          setValidLogra(true);
          setValidNumero(true);
          throw new Error('Erro ao buscar coordenadas.');
        }

        const data = await response.json();

        console.log(data.results[0].address_components[4].short_name);
        var tipoLogra =
          data.results[0].address_components[1].long_name.split(' ')[0];
        var tipoUf = data.results[0].address_components[4].short_name;
        setSelectedUf(tipoUf);
        setSelectedTipoLogra(tipoLogra);

        var cepNormal = data.results[0].address_components[6].long_name.replace(
          '-',
          '',
        );
        console.log(cepNormal);
        setCep(cepNormal);
        setValidacaoLogradouro(true);
        setValidCidade(false);

        setValidLogra(false);

        setValidNumero(false);

        setValidBairro(false);
      }
    } catch (error) {
      console.log("ERRO: "+error);
      const validacao = async () => {
        let camposInvalidos = [];
        setValidCidade(true);
        camposInvalidos.push('Cidade');

        setValidLogra(true);
        camposInvalidos.push('Logradouro');

        setValidNumero(true);
        camposInvalidos.push('Número');

        setValidBairro(true);
        camposInvalidos.push('Bairro');

        setListaCamposInvalidos(camposInvalidos);
      };

      validacao();

      const timer = setTimeout(() => {
        setListaCamposInvalidos([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  };

  const handlePress = async () => {
    try {
      if (cepInput.length === 8 && !validcaoLogradouro) {
        await handleGeocode();
      }
      await semCep();

      // O restante do código que depende dos resultados de handleGeocode e semCep
      // Aqui você pode adicionar as verificações necessárias antes de chamar addCharger()
      // E, em seguida, chamar addCharger() se todas as verificações passarem.
      if (
        logra != '' &&
        numero != '' &&
        cepInput != '' &&
        bairro != '' &&
        cidade != '' &&
        qtdeCarregadores != '' &&
        selectCarregadores != []
      ) {
        if (cepInput.length == 8 && !validcaoLogradouro) {
          handleGeocode();
        }
        addCharger();
        navigation.navigate('Stein');
      } else {
        const validacao = async () => {
          let camposInvalidos = [];

          if (cepInput === '') {
            setValidCep(true);
            camposInvalidos.push('CEP');
          }
          if (cidade === '') {
            setValidCidade(true);
            camposInvalidos.push('Cidade');
          }
          if (logra === '') {
            setValidLogra(true);
            camposInvalidos.push('Logradouro');
          }
          if (numero === '') {
            setValidNumero(true);
            camposInvalidos.push('Número');
          }
          if (qtdeCarregadores === '') {
            setValidQtdeCarregadores(true);
            camposInvalidos.push('Quantidade de carregadores');
          }
          if (selectCarregadores.length === 0) {
            setValidSelectCarregadores(true);
            camposInvalidos.push('Nenhum carregador selecionado');
          }
          if (bairro === '') {
            setValidBairro(true);
            camposInvalidos.push('Bairro');
          }
          if (qtdeCarregadores < selectCarregadores.length) {
            setValidQtdeCarregadores(true);
            camposInvalidos.push('Quantidade de carregadores', "Há mais carregadores selecionados do que quantidades deles");
            
          }

          setListaCamposInvalidos(camposInvalidos);
        };

        validacao();

        const timer = setTimeout(() => {
          setListaCamposInvalidos([]);
        }, 5000);

        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        semCep();
        Keyboard.dismiss();
        if (cepInput.length == 8 && !validcaoLogradouro) {
          handleGeocode();
        }
      }}>
      <View>
        <ScrollView>
          <Text style={{fontSize: 16}}>Logradouro/Endereço:</Text>
          <TextInput
            placeholder="CEP"
            placeholderTextColor={validCep ? 'red' : '#000'}
            style={[styles.textInput, {color: validCep ? 'red' : '#000'}]}
            keyboardType="numeric"
            onChangeText={setCep}
            value={cepInput}
            onBlur={() => {
              if (cepInput.length == 8 && !validcaoLogradouro) {
                handleGeocode();
              }
            }}
          />

          <View>
            <TipoLogradouro
              onTipoLograChange={handleTipoLograChange}
              validar={selectedTipoLogra}
            />
          </View>

          <View>
            <TextInput
              placeholder="Endereço*"
              style={[styles.textInput, {color: validLogra ? 'red' : '#000'}]}
              onChangeText={setLogra}
              value={logra}
              placeholderTextColor={validLogra ? 'red' : '#000'}
              onBlur={() => {
                semCep();
              }}
            />
          </View>
          <View>
            <SelectList onUfChange={handleUfChange} validar={selectedUf} />
          </View>

          <TextInput
            placeholder="Cidade"
            placeholderTextColor={validCidade ? 'red' : '#000'}
            style={[styles.textInput, {color: validCidade ? 'red' : '#000'}]}
            onChangeText={text => {
              setCidade(text);
            }}
            value={cidade}
            onBlur={() => {
              console.log(cidade);
              semCep();
            }}
          />

          <TextInput
            placeholder="Bairro*"
            placeholderTextColor={validBairro ? 'red' : '#000'}
            style={[styles.textInput, {color: validBairro ? 'red' : '#000'}]}
            onChangeText={text => {
              setBairro(text);
            }}
            value={bairro}
            onBlur={() => {
              semCep();
            }}
          />

          <TextInput
            placeholder="Número"
            keyboardType="number-pad"
            style={[styles.textInput, {color: validNumero ? 'red' : '#000'}]}
            onChangeText={setNumero}
            value={numero}
            placeholderTextColor={validNumero ? 'red' : '#000'}
            onBlur={() => {
              semCep();
            }}
          />

          <TextInput
            placeholder="Complemento"
            placeholderTextColor={'#000'}
            style={styles.textInput}
            onChange={setComplemento}
            value={complemento}
          />
          <View
            style={{width: '100%', height: 2, backgroundColor: '#000'}}></View>

          <TextInput
            placeholder="Horário*"
            style={styles.textInput}
            placeholderTextColor={'#000'}
          />
          <View style={styles.acceptPay}>
            <Switch />
            <Text>Aberto 24/7</Text>
          </View>
          <TouchableOpacity
            onPress={() => setCarregadores(!carregadores)}
            style={styles.charger}>
            <Text
              style={[
                styles.placeholder,
                {color: validSelectCarregadores ? 'red' : '#000'},
              ]}>
              Carregador
            </Text>
          </TouchableOpacity>
          {carregadores ? (
            <TabelaCarregadores
              notFiltro={true}
              onSelectCarregadores={toggleCarregadorSelection}
              carr={selectCarregadores}
            />
          ) : (
            <Text></Text>
          )}
          <TextInput
            placeholder="Quantidades de carregadores"
            keyboardType="number-pad"
            style={styles.textInput}
            onChangeText={text => {
              setQtdeCarregadores(text);
            }}
            value={qtdeCarregadores}
            placeholderTextColor={validQtdeCarregadores ? 'red' : '#000'}
          />
          <View style={styles.acceptPay}>
            <Switch />
            <Text>Pagamento Necessário</Text>
          </View>
          <TextInput
            placeholder="Preço(Opcional)"
            style={styles.textInput}
            placeholderTextColor={'#000'}
          />
          <View style={{width: '100%', flex: 1, alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handlePress();
              }}>
              <Text style={styles.textButtons}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {listaCamposInvalidos.length > 0 ? (
        <Modal transparent={true}>
          <Pressable
            style={styles.modalContainer}
            onPress={() => {
              setListaCamposInvalidos([]);
            }}>
            <View style={styles.modal}>
              <Text>
                Os seguintes dos campos estão com dados inválidos ou com vazios:
              </Text>
              <View>
                {listaCamposInvalidos
                  .filter(elemento => elemento != '')
                  .map((item, index) => (
                    <Text key={index} style={{fontWeight: '700'}}>
                      {item}
                      {listaCamposInvalidos.filter(elemento => elemento != '')
                        .length != 1
                        ? index !==
                          listaCamposInvalidos.filter(
                            elemento => elemento != '',
                          ).length -
                            1
                          ? ', '
                          : '.'
                        : '.'}
                    </Text>
                  ))}
              </View>
            </View>
          </Pressable>
        </Modal>
      ) : (
        ''
      )}
    </Pressable>
  );
};

export default AddCharger;
