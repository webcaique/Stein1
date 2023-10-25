import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  Keyboard,
} from 'react-native';
import styles from './styles';
import SelectList from '../selectList';
import TipoLogradouro from '../tipoLogradouro.js';
import {firestore} from '../../config/configFirebase';
import TabelaCarregadores from '../componenteTabelaCarregadores.js';

const apiKey = 'AIzaSyAdVbhYEhx50Y8TS7tulpNCkj8yMZPYiSQ';

export default function AddHome({navigation}) {
  const tabelaLogra = firestore.collection('logradouro'); // Pega a tabela Logradouro do Firabase
  const tabelaLocal = firestore.collection('local');

  // Criação das varíaveis com estado variáveis para colocar os dados do formulário
  const [carregador, setCarregador] = useState("");

  // Variável para a aparição da tabelas dos carregadores
  const [ligarTabelaCarregadores, setligarTabelaCarregadores] = useState(false);
  //
  const [name, setName] = useState('');
  const [logra, setLogra] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cepInput, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [selectedUf, setSelectedUf] = useState('');
  const [selectedTipoLogra, setSelectedTipoLogra] = useState('');

  //Campos inválidos
  const [listaCamposInvalidos, setListaCamposInvalidos] = useState([]);

  // Variávies de estados para indicar campo obrigatório vazio ou inválido
  const [validLogra, setValidLogra] = useState();
  const [validNumero, setValidNumero] = useState();
  const [validCep, setValidCep] = useState();
  const [validBairro, setValidBairro] = useState();
  const [validCidade, setValidCidade] = useState();
  const [validName, setValidName] = useState();
  const [validSelectCarregadores, setValidSelectCarregadores] = useState();
  const [validcaoLogradouro, setValidacaoLogradouro] = useState(false);

  

  const handleUfChange = uf => {
    // pegará do selectList o campo selecionado dos estados
    setSelectedUf(uf);
  };

  const handleTipoLograChange = tipoLogra => {
    // pegará do tipoLogradouro o campo selecionado do Tipo do Logradouro
    setSelectedTipoLogra(tipoLogra);
  };

  const toggleCarregadorSelection = carr => {
    // pegará os carregadores selecionados
    setCarregador(carr);
  };

  // Função para adicionar dados no banco de dados
  const addDataLogradouro = async () => {
    if (
      name != undefined &&
      logra != undefined &&
      numero != undefined &&
      cepInput != undefined &&
      bairro != undefined &&
      cidade != undefined &&
      carregador != []
    ) {
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

      // colocar os dados do banco de dados em uma variável (eles chegaram em formato do Firebase)
      const snapshotLocal = await tabelaLocal.get();

      // a lista que armazenara os dados formatos de um jeito que entedemos
      const listaLocal = [];

      // forEach para varrer os dados na snapshotLogra para colocar os dados na listaLogra
      snapshotLocal.forEach(data => {
        listaLocal.push({id: data.id, ...data.data()});
      });

      // o contador servira para colocar o id para o registro
      let countLocal = 0;

      // verificará se o countLogra é menor que o id, pois se ele for receberá o valor do id
      listaLocal.forEach(doc => {
        if (countLocal < parseInt(doc.id)) {
          countLocal = parseInt(doc.id);
        }
      });

      // aqui será incrementado um único valor, para criar um novo ID
      countLocal++;

      //organiza a array de carregadores em ordem crescente
      carregador.sort((a,b)=> a-b)
      // aqui serão colocados os dados coletados no formulário
      let testeLocal = {
        IDLogradouro: `${countLogra}`,
        IDTipoCarregador: carregador,
        nomeLocal: `${name}`,
        tipoLocal: `Trabalho`,
      };

      // adionará os dados ao banco de dados
      tabelaLocal
        .doc(`${countLocal}`)
        .set(testeLocal)
        .then(() => {
          console.log('ADICIONADO!');
        })
        .catch(error => {
          console.log(error);
        });
        

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
            } else {
              throw new Error('Endereço não encontrado.');
            }
          } catch (error) {
            console.error('Erro:', error);
          }
        };
        validarGeo()
    }

    
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

      const data = await response.json();
      setBairro(data.bairro);
      setCidade(data.localidade);
      setSelectedUf(data.uf);

      const partes = data.logradouro.split(' ');

      if (partes.length >= 2) {
        const tipo = partes[0];
        const logras = partes.slice(1).join(' ');

        setSelectedTipoLogra(tipo);
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
      if (logra != '' && bairro != '' && cidade != '' && numero != '') {
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

        var tipoLogra = data.results[0].address_components[1].long_name.split(" ")[0]
        var tipoUf = data.results[0].address_components[4].short_name
        setSelectedUf(tipoUf)
        setSelectedTipoLogra(tipoLogra);

        var cepNormal = data.results[0].address_components[6].long_name.replace(
          '-',
          '',
        );
        setCep(cepNormal);
        setValidacaoLogradouro(true);

      }
    } catch (error) {
      setValidLogra(true)
      setValidCidade(true)
      setValidNumero(true)
      setValidCep(true);
      setValidBairro(true)
      throw new Error('NÃO ENCONTRADO O ENDEREÇO: '+error);
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
        name != '' &&
        logra != '' &&
        numero != '' &&
        cepInput != '' &&
        bairro != '' &&
        cidade != '' &&
        carregador != []
      ) {
        addDataLogradouro();
        navigation.navigate('HouseAndWork');
      } else {
        const validacao = async () => {
          let camposInvalidos = [];
          if (name == '') {
            setValidName(true);
            camposInvalidos.push('Nome');
          }

          if (cepInput === '') {
            setValidCep(true);
            camposInvalidos.push('CEP');
          }
          if (cidade === '') {
            setValidCidade(true);
            camposInvalidos.push('Município');
          }
          if (logra === '') {
            setValidLogra(true);
            camposInvalidos.push('Logradouro');
          }
          if (numero === '') {
            setValidNumero(true);
            camposInvalidos.push('Número');
          }
          if (carregador == [] || carregador == undefined) {
            setValidSelectCarregadores(true);
            camposInvalidos.push('Nenhum carregador selecionado');
          }
          if (bairro === '') {
            setValidBairro(true);
            camposInvalidos.push('Bairro');
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setListaCamposInvalidos([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View>
      <ScrollView
      // Para deixar a tela rolavel
      >
        <Pressable
          style={styles.container}
          onPress={() => {
            semCep();
            Keyboard.dismiss();
            if (cepInput.length == 8 && !validcaoLogradouro) {
              handleGeocode();
            }
          }}
          // Container principal
        >
          <View
            style={styles.row1}
            // Linha para informar o que os usuários precisam saber
          >
            <Text style={styles.textTitle}>
              Insira os dados, para que possamos recomendar pontos mais
              próximos.
            </Text>
          </View>
          <View
            style={[styles.row2]}
            // Campo para pegar o apelido
          >
            <Text
              style={[styles.textIsInput, {color: validName ? 'red' : '#000'}]}
              // Campo para pegar o apelido
            >
              Nome da empresa:
            </Text>
            <TextInput
              style={[styles.textInput, {}]}
              onChangeText={setName}
              value={name}
            />
          </View>

          <View style={styles.row3}>
            <Text
              style={[styles.textIsInput, {color: validLogra ? 'red' : '#000'}]}>
              Logradouro:
            </Text>
            <View
              style={styles.column1}
              // Campo para pegar o logradouro
            >
              <View style={styles.logradouro}>
                <TipoLogradouro
                  onTipoLograChange={handleTipoLograChange}
                  validar={selectedTipoLogra}
                />
                <TextInput
                  style={styles.textInputLogradouro}
                  placeholderTextColor={validLogra ? 'red' : '#000'}
                  onChangeText={setLogra}
                  value={logra}
                  onBlur={() => {
                    semCep();
                  }}
                />
              </View>
            </View>
          </View>

          <View style={styles.row7}>
            <View
              style={styles.column2}
              // Campo para pegar o número
            >
              <View>
                <Text
                  style={[
                    styles.textIsInput,
                    ,
                    {color: validNumero ? 'red' : '#000'},
                  ]}>
                  Número:
                </Text>
                <TextInput
                  style={styles.textInputNumber}
                  placeholderTextColor={validNumero ? 'red' : '#000'}
                  onChangeText={setNumero}
                  value={numero}
                  keyboardType="number-pad"
                  onBlur={() => {
                    semCep();
                  }}
                />
              </View>
              <TouchableOpacity
                style={styles.btnCarregadores}
                onPress={() => {
                  setligarTabelaCarregadores(!ligarTabelaCarregadores);
                }}>
                <Text
                  style={[
                    styles.textIsInput,
                    {color: validSelectCarregadores ? 'red' : '#000'},
                  ]}>
                  Carregadores
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '100%', alignItems: 'center'}}>
              {ligarTabelaCarregadores ? (
                <TabelaCarregadores
                notFiltro={true}
                onSelectCarregadores={toggleCarregadorSelection}
                carr={carregador}
              />
              ) : (
                <View />
              )}
            </View>
          </View>

          <View
            style={styles.row4}
            // Campo para pegar o complemento
          >
            <Text style={styles.textIsInput}>Complemento:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setComplemento}
              value={complemento}
              onBlur={() => {
                semCep();
              }}
            />
          </View>

          <View style={styles.row5}>
            <View
              style={
                styles.column3
                // Campo para pegar o CEP
              }>
              <Text
                style={[styles.textIsInput, {color: validCep ? 'red' : '#000'}]}>
                CEP:
              </Text>
              <TextInput
                style={styles.textInputCep}
                onChangeText={setCep}
                value={cepInput}
                keyboardType="number-pad"
                placeholderTextColor={validCep ? 'red' : '#000'}
                onBlur={() => {
                  if (cepInput.length == 8 && !validcaoLogradouro) {
                    handleGeocode();
                  }
                }}
              />
            </View>
            <View
              style={styles.column4}
              // Campo para pegar o bairro
            >
              <Text
                style={[styles.textIsInput, {color: validBairro ? 'red' : '#000'}]}>
                Bairro:
              </Text>
              <TextInput
                style={styles.textInputBairro}
                onChangeText={setBairro}
                value={bairro}
                placeholderTextColor={validBairro ? 'red' : '#000'}
                onBlur={() => {
                  semCep();
                }}
              />
            </View>
          </View>

          <View style={styles.row6}>
            <View
              style={styles.column6}
              // Campo para pegar o município
            >
              <Text
                style={[styles.textIsInput, {color: validCidade ? 'red' : '#000'}]}>
                Município:
              </Text>
              <TextInput
                style={styles.textInputMunicipio}
                onChangeText={setCidade}
                value={cidade}
                placeholderTextColor={validCidade ? 'red' : '#000'}
                onBlur={() => {
                  semCep();
                }}
              />
            </View>
            <View
              style={styles.column5}
              // Campo para pegar o estado
            >
              <Text style={styles.textIsInputEstado}>Estado:</Text>
              <SelectList onUfChange={handleUfChange} validar={selectedUf} />
            </View>
          </View>
          <TouchableOpacity
            style={styles.editionButton}
            onPressIn={handlePress}
            // Direcionar para página de Casa e Trabalho
          >
            <Text style={styles.textButton}>Adicionar</Text>
          </TouchableOpacity>
        </Pressable>
      </ScrollView>

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
    </View>
  );
}
