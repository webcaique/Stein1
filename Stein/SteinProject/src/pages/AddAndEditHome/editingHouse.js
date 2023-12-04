import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import styles from './styles';
import SelectList from '../selectList';
import TipoLogradouro from '../tipoLogradouro.js';
import {firestore} from '../../config/configFirebase';
import {useNavigation, useRoute} from '@react-navigation/native';
import TabelaCarregadores from '../componenteTabelaCarregadores';
import {auth} from '../../config/configFirebase';

const apiKey = 'AIzaSyAdVbhYEhx50Y8TS7tulpNCkj8yMZPYiSQ';

export default function AddHome() {
  // Futuras atualizações do app para usuabilidade de facilidar a edição do cadastro, para colocar os dados nos campos e apenas editar o que quer
  const [loading, setLoading] = useState(true);

  // importar o navigation, para navegação, e route, para pegar os dados da outra página;
  const navigation = useNavigation();
  const route = useRoute();

  // pregará o id da página anterior para editar o dados que quer
  const idFromOtherScreen = route.params.idLocal;

  // Variável para aparição da tabelas dos carregadores
  const [ligarTabelaCarregadores, setligarTabelaCarregadores] = useState(false);

  const tabelaLogra = firestore.collection('logradouro'); // Pega a tabela Logradouro do Firabase
  const tabelaLocal = firestore.collection('local'); // Pega a tabela Local do Firabase

  // Criação das varíaveis com estado variáveis para colocar os dados do formulário
  const [carregadores, setCarregadores] = useState('');
  const [name, setName] = useState('');
  const [logra, setLogra] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [selectedUf, setSelectedUf] = useState('');
  const [selectedTipoLogra, setSelectedTipoLogra] = useState('');
  const [idLocal, setIdLocal] = useState('');
  const [lograEdit, setLograEdit] = useState('');

  //Campos inválidos
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setListaCamposInvalidos([]);
    }, 5000);

    const edit = async () => {
      //vai tentar pegar os dados da tabela local
      try {
        const aparecer = tabelaLocal.onSnapshot(async snapashotLocal => {
          // a array será usado para locar os dados do Firabase
          const listaLocal = [];
          // será colocado os dados na lista
          snapashotLocal.forEach(datas => {
            listaLocal.push({id: datas.id, ...datas.data()});
          });

          // guarda o idLocal, para fazer o update da tabela
          listaLocal.forEach(async datas => {
            if (datas.IDUsuario == auth.currentUser.uid) {
              if (datas.IDLogradouro == idFromOtherScreen) {
                setIdLocal(datas);
                setName(datas.nomeLocal);
                setCarregadores(datas.IDTipoCarregador);
              }

              // vai pegar os dados na tabela logradouros
              const snapshotLogra = await tabelaLogra.get();

              // array que receberá os dados da tabela do Firebase
              const listaLogra = [];

              // coloca os dados do firebase na lsita
              snapshotLogra.forEach(doc => {
                listaLogra.push({id: doc.id, ...doc.data()});
              });

              // guardará os dados da tabela para ser atualizada
              listaLogra.forEach(dados => {
                if (datas.IDUsuario == auth.currentUser.uid) {
                  if (dados.id == idFromOtherScreen) {
                    setLograEdit(dados);
                    setBairro(dados.bairro);
                    setCep(dados.CEP);
                    setCidade(dados.cidade);
                    setComplemento(dados.complemento);
                    setLogra(dados.logradouro);
                    setNumero(dados.numero);
                    setSelectedTipoLogra(dados.tipoLogradouro);
                    setSelectedUf(dados.UF);
                  }
                }
              });
            }
          });

          // aqui fazerá a página carregar
          setLoading(false);
        });

        // chamará a função
        return () => aparecer();
      } catch (error) {
        // Caso de erro
        setLoading(false);
      }
    };
    edit();
    return () => clearTimeout(timer);
  }, []);

  const update = async () => {
    // quando o botão for apertado, chamará essa função
    if (
      selectedTipoLogra != undefined &&
      selectedUf != undefined &&
      name != undefined &&
      logra != undefined &&
      numero != undefined &&
      cep != undefined &&
      bairro != undefined &&
      cidade != undefined
    ) {
      // os dados serão colocados nas variáveis
      setBairro(bairro);
      setCep(cep);
      setName(name);
      setCidade(cidade);
      setLogra(logra);
      setComplemento(complemento);
      setNumero(numero);
      setSelectedTipoLogra(selectedTipoLogra);
      setSelectedUf(selectedUf);

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

            // os dados serão atualizados na tabela Logradouro
            tabelaLogra
              .doc(`${idLocal.IDLogradouro}`)
              .update({
                CEP: `${cep}`,
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
                console.log('EDITADO!'); // caso ocorra algum erro, mostrará para o DEV;
              });
          } else {
            throw new Error('Endereço não encontrado.');
          }
        } catch (error) {
          console.error('Erro:', error);
        }
      };

      validarGeo();

      // organiza a array em ordem crescente
      carregadores.sort((a, b) => a - b);

      // os dados serão atualizados na tabela Local
      tabelaLocal.doc(idLocal.id).update({
        nomeLocal: `${name}`,
        IDTipoCarregador: carregadores,
        IDLogradouro: `${idLocal.IDLogradouro}`,
        tipoLocal: `Casa`,
        IDUsuario: auth.currentUser.uid,
      });
    }
  };

  // VERIFICARÁ SE O CEP É VÁLIDO //
  const handleGeocode = async () => {
    try {
      // Solicitação do serviço do ViaCep, para mostrar se o CEP é inválido e se ele existe
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

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
      console.error('Erro:', error);
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
      throw new Error('NÃO ENCONTRADO O ENDEREÇO: ' + error);
    }
  };

  //Apenas execultara o código acima, fazendo verificações se o CEp está correto
  const handlePress = async () => {
    try {
      if (cep.length === 8 && !validcaoLogradouro) {
        await handleGeocode();
      }
      await semCep();

      // O restante do código que depende dos resultados de handleGeocode e semCep
      // Aqui você pode adicionar as verificações necessárias antes de chamar update()
      // E, em seguida, chamar update() se todas as verificações passarem.
      if (
        name != '' &&
        logra != '' &&
        numero != '' &&
        cep != '' &&
        bairro != '' &&
        cidade != '' &&
        carregadores != []
      ) {
        update(); // Chama a função para adicionar os dados no banco de dados
        navigation.navigate('HouseAndWork'); // Navegará para a próxima página
      } else {
        //Caso algum campo estja inválido, eles mudaram de cor e será exibido uma lista dos campos sem dados ou inválidos.
        const validacao = async () => {
          let camposInvalidos = [];
          //Será feito a verificação dos campos, e os inválidos serão colocados na lista "camposInvalidos"
          if (name == '') {
            setValidName(true);
            camposInvalidos.push('Nome');
          }

          if (cep === '') {
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
      console.error('Erro:', error);
    }
  };

  useEffect(() => {
    //Reiniciara a lista
    const timer = setTimeout(() => {
      setListaCamposInvalidos([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const res = (
    <View>
      <ScrollView
      // Para deixar a tela rolavel
      >
        <Pressable
          style={styles.container}
          onPress={() => {
            semCep();
            Keyboard.dismiss();
            if (cep.length == 8 && !c) {
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
              Nome da residência:
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
                value={cep}
                keyboardType="number-pad"
                placeholderTextColor={validCep ? 'red' : ''}
                onBlur={() => {
                  if (cep.length == 8 && !validcaoLogradouro) {
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
              <View>
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
                  onSelectCarregadores={toggleCarregadorSelection}
                  notFiltro={true}
                  carr={carregadores}
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
              <SelectList
                onUfChange={dado => {
                  handleUfChange(dado);
                }}
                validar={selectedUf}
                onBlur={() => {
                  semCep();
                }}
              />
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

  if (loading) {
    return <Text>Carregando...</Text>;
  } else {
    return res;
  }
}
