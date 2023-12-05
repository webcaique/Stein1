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
import {auth} from '../../config/configFirebase';

const apiKey = 'AIzaSyAdVbhYEhx50Y8TS7tulpNCkj8yMZPYiSQ';

export default function AddHome({navigation}) {
  const tabelaLogra = firestore.collection('logradouro'); // Puxa a tabela Logradouro do Firabase
  const tabelaLocal = firestore.collection('local'); // Puxa a tabela Local do Firebase

  // Criação das varíaveis com estado variáveis para colocar os dados do formulário
  const [carregadores, setCarregadores] = useState([]); // Guardará os dados relacionados aos carregadores selecionados

  // Variável para a aparição da tabelas dos carregadores
  const [ligarTabelaCarregadores, setligarTabelaCarregadores] = useState(false);
  //
  const [name, setName] = useState(''); // Guardará os dados relacionados ao nome do local
  const [logra, setLogra] = useState(''); // Guardará os dados relacionados ao logradouro do local
  const [numero, setNumero] = useState(''); // Guardará os dados relacionados ao número do local
  const [complemento, setComplemento] = useState(''); // Guardará os dados relacionados ao complemento do local
  const [cepInput, setCep] = useState(''); // Guardará os dados relacionados ao CEP do local
  const [bairro, setBairro] = useState(''); // Guardará os dados relacionados ao bairro do local
  const [cidade, setCidade] = useState(''); // Guardará os dados relacionados à cidade do local
  const [selectedUf, setSelectedUf] = useState(''); // Guardará os dados relacionados à UF selecionado do local
  const [selectedTipoLogra, setSelectedTipoLogra] = useState(''); // Guardará os dados relacionados ao tipo do logradouro selecionado do local

  //Campos inválidos: os nomes dos campos inválidos serão colocados dentro do array para mostrar para o usuário caso dê algum erro
  const [listaCamposInvalidos, setListaCamposInvalidos] = useState([]);

  // Variávies de estados para indicar campo obrigatório vazio ou inválido, receberam valores que validarão se eles possuem dados e se os dados dos campos são válidos
  //Quando forem TRUE, os campos mudarão sua cor, mostrando que o campo está inválido
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
    setCarregadores(carr);
  };

  // Função para adicionar dados no banco de dados
  const addDataLogradouro = async () => {
    //Verifica se os campos estão inválidos e vazios
    if (
      name != undefined &&
      logra != undefined &&
      numero != undefined &&
      cepInput != undefined &&
      bairro != undefined &&
      cidade != undefined &&
      carregadores != []
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
      carregadores.sort((a, b) => a - b);
      // aqui serão colocados os dados coletados no formulário
      let testeLocal = {
        IDLogradouro: `${countLogra}`,
        IDTipoCarregador: carregadores,
        nomeLocal: `${name}`,
        tipoLocal: `Casa`,
        IDUsuario: auth.currentUser.uid,
      };

      // adionará os dados ao banco de dados
      tabelaLocal
        .doc(`${countLocal}`)
        .set(testeLocal)
        .then(() => {
          console.log('ADICIONADO!');
        })
        .catch(error => {
          console.log("error");
        });

      //Código abaixo pegará a longitude e a latitude do local cadastrado
      const validarGeo = async () => {
        try {
          //Variável para colocar o endereço
          const address = `${selectedTipoLogra} ${logra}, ${numero} , ${bairro}, ${cidade}, ${selectedUf}`;

          //Ele pegar os dados através da API do Google Maps, com o "encodeURIComponent" sendo usado para formatar o endereço para ser um link válido, alé ter a chave da API
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              address,
            )}&key=${apiKey}`,
          );

          //Caso a resposta der algum erro.
          if (!response.ok) {
            throw new Error('Erro ao buscar coordenadas.');
          }

          const data = await response.json(); // Transformará os dados em formato JSON

          //Verifica se o resultado está com algum dado
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
          console.error('Erro: 123', error);
        }
      };

      validarGeo();
    }
  };

  useEffect(() => {
    //Comando para ser executado para apagar os avisos de campos inválidos quando o tempo acabar
    const timer = setTimeout(() => {
      setListaCamposInvalidos([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // VERIFICARÁ SE O CEP É VÁLIDO //
  const handleGeocode = async () => {
    try {
      // Solicitação do serviço do ViaCep, para mostrar se o CEP é inválido e se ele existe
      const response = await fetch(
        `https://viacep.com.br/ws/${cepInput}/json/`,
      );

      //Caso o CEP seja inválido e caso ele não exista, será avisado ao usuário
      if (!response.ok || response.erro) {
        setCep('CEP INVÁLIDO!'); // dados para mostrar o campo inválido
        setValidCep(true); // Usado para verificação
        const timer = setTimeout(() => {
          setCep('');
        }, 3000);

        return () => clearTimeout(timer);
      }

      //Os dados serão convertidos em JSON
      const data = await response.json();
      // SERÁ COLOCADO OS DADOS NOS CAMPOS
      setBairro(data.bairro);
      setCidade(data.localidade);
      setSelectedUf(data.uf);

      const partes = data.logradouro.split(' '); // SERÁ USADO PARA SEPARAR O TIPO DO LOGRADOURO DO LOGRADOURO EM SI

      // Será colocado os dados nos devidos lugares.
      if (partes.length >= 2) {
        const tipo = partes[0];
        const logras = partes.slice(1).join(' ');

        setSelectedTipoLogra(tipo);
        setLogra(logras);
      } else {
        console.error('Texto não contém espaço.');
      }
    } catch (error) {
      console.error('Erro: 321', error);
    }
  };

  // CASO NÃO TENHA DIGITADO O CEP, ELE PROCURARÁ O CEP COM O ENDEREÇO DIGITADO PELO USUÁRIO //
  const semCep = async () => {
    try {
      // Apenas executará se os campos possuirem os dados necessário
      if (logra != '' && bairro != '' && cidade != '' && numero != '') {
        //Será colocado o endereço que será usado para a pesquisa na API
        const address = `${selectedTipoLogra} ${logra}, ${numero} , ${bairro}, ${cidade}, ${selectedUf}`;

        //Ele pegar os dados através da API do Google Maps, com o "encodeURIComponent" sendo usado para formatar o endereço para ser um link válido, alé ter a chave da API
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address,
          )}&key=${apiKey}`,
        );

        //Caso não haja o endereço, mandará a mensagem de erro.
        if (!response.ok) {
          setValidBairro(true);
          setValidCidade(true);
          setValidLogra(true);
          setValidNumero(true);
          throw new Error('Erro ao buscar coordenadas.');
        }

        const data = await response.json(); // Os dados formatados em JSON

        var tipoLogra =
          data.results[0].address_components[1].long_name.split(' ')[0]; //Pega o Tipo de Logradouro
        var tipoUf = data.results[0].address_components[4].short_name; // Puxa a UF
        setSelectedUf(tipoUf);
        setSelectedTipoLogra(tipoLogra);

        var cepNormal = data.results[0].address_components[6].long_name.replace(
          '-',
          '',
        ); // Formatará o CEP par ser Exibido para o usuário
        setCep(cepNormal);
        setValidacaoLogradouro(true);
      }
    } catch (error) {
      setValidLogra(true);
      setValidCidade(true);
      setValidNumero(true);
      setValidCep(true);
      setValidBairro(true);
      throw new Error('NÃO ENCONTRADO O ENDEREÇO: ' + error);
    }
  };

  //Apenas execultara o código acima, fazendo verificações se o CEp está correto
  const handlePress = async () => {
    try {
      if (cepInput.length === 8 && !validcaoLogradouro) {
        await handleGeocode();
      }
      if (cepInput.length < 8) {
        await semCep();
      }

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
        carregadores != []
      ) {
        addDataLogradouro(); // Chama a função para adicionar os dados no banco de dados
        navigation.navigate('HouseAndWork'); // Navegará para a próxima página
      } else {
        //Caso algum campo estja inválido, eles mudaram de cor e será exibido uma lista dos campos sem dados ou inválidos.
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
          if (carregadores == [] || carregadores == undefined) {
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
      console.error('Erro: 444', error);
    }
  };

  useEffect(() => {
    //Reiniciara a lista
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
              style={[styles.textIsInput, {color: validName ? 'red' : ''}]}
              // Campo para pegar o apelido
            >
              Nome da casa:
            </Text>
            <TextInput
              style={[styles.textInput, {}]}
              onChangeText={setName}
              value={name}
            />
          </View>

          <View style={styles.row5}>
            <View
              style={
                styles.column3
                // Campo para pegar o CEP
              }>
              <Text
                style={[styles.textIsInput, {color: validCep ? 'red' : ''}]}>
                CEP:
              </Text>
              <TextInput
                style={styles.textInputCep}
                onChangeText={setCep}
                value={cepInput}
                keyboardType="number-pad"
                placeholderTextColor={validCep ? 'red' : ''}
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
                style={[styles.textIsInput, {color: validBairro ? 'red' : ''}]}>
                Bairro:
              </Text>
              <TextInput
                style={styles.textInputBairro}
                onChangeText={setBairro}
                value={bairro}
                placeholderTextColor={validBairro ? 'red' : ''}
                onBlur={() => {
                  semCep();
                }}
              />
            </View>
          </View>

          <View style={styles.row3}>
            <Text
              style={[styles.textIsInput, {color: validLogra ? 'red' : ''}]}>
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
                  placeholderTextColor={validLogra ? 'red' : ''}
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
              <View style={{width: '40%'}}>
                <Text
                  style={[
                    styles.textIsInput,
                    ,
                    {color: validNumero ? 'red' : ''},
                  ]}>
                  Número:
                </Text>
                <TextInput
                  style={styles.textInputNumber}
                  placeholderTextColor={validNumero ? 'red' : ''}
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
                    {color: validSelectCarregadores ? 'red' : ''},
                  ]}>
                  Carregadores
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '100%', alignItems: 'center'}}>
              {ligarTabelaCarregadores ? (
                <TabelaCarregadores
                  carr={carregadores}
                  onSelectCarregadores={toggleCarregadorSelection}
                  notFiltro={true}
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

          <View style={styles.row6}>
            <View
              style={styles.column6}
              // Campo para pegar o município
            >
              <Text
                style={[styles.textIsInput, {color: validCidade ? 'red' : ''}]}>
                Município:
              </Text>
              <TextInput
                style={styles.textInputMunicipio}
                onChangeText={setCidade}
                value={cidade}
                placeholderTextColor={validCidade ? 'red' : ''}
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
