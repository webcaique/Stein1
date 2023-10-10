import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import styles from './styles';
import SelectList from '../selectList';
import TipoLogradouro from '../tipoLogradouro.js';
import {firestore} from '../../config/configFirebase';
import {useNavigation, useRoute} from '@react-navigation/native';
import TabelaCarregadores from '../componenteTabelaCarregadores';

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

  // Variávies de estados para indicar campo obrigatório vazio ou inválido
  const [validLogra, setValidLogra] = useState();
  const [validNumero, setValidNumero] = useState();
  const [validCep, setValidCep] = useState();
  const [validBairro, setValidBairro] = useState();
  const [validCidade, setValidCidade] = useState();
  const [validName, setValidName] = useState();
  const [validSelectCarregadores, setValidSelectCarregadores] = useState();

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

    console.log(route.params.idLocal);
    const edit = async () => {
      //vai tentar pegar os dados da tabela local
      try {
        const snapashotLocal = await tabelaLocal.get();
        let listaLc = [];

        snapashotLocal.forEach(dados => {
          listaLc.push({id: dados.id, ...dados.data()});
        });

        let end;

        listaLc.forEach(datas => {
          if (datas.IDLogradouro == idFromOtherScreen) {
            end = datas;
          }
        });
        setIdLocal(end);

        const snapshotLogra = await tabelaLogra.get();
        let listaLg = [];

        snapshotLogra.forEach(dados => {
          listaLg.push({id: dados.id, ...dados.data()});
        });

        let lg;

        listaLg.forEach(datas => {
          if (datas.id == idFromOtherScreen) {
            lg = datas;
          }
        });
        setLograEdit(lg);

        console.log('END');
        console.log(end);
        console.log('Logra');
        console.log(lg);

        setBairro(lg.bairro);
        setCarregadores(end.IDTipoCarregador);
        setCep(lg.CEP);
        setCidade(lg.cidade);
        setComplemento(lg.complemento);
        setLogra(lg.logradouro);
        setSelectedUf(lg.UF);
        setNumero(lg.numero);
        setSelectedTipoLogra(lg.tipoLogradouro);
        setName(end.nomeLocal);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw new Error(error);
      }
    };
    edit();
    return () => clearTimeout(timer);
  }, []);

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

        // os dados serão atualizados na tabela Logradouro
        tabelaLogra
          .doc(idLocal.IDLogradouro)
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
            console.log('ADICIONADO!');
          });
      } else {
        throw new Error('Endereço não encontrado.');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

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

      validarGeo();

      // organiza a array em ordem crescente
      carregadores.sort((a, b) => a - b);

      // os dados serão atualizados na tabela Local
      tabelaLocal.doc(idLocal.id).update({
        nomeLocal: `${name}`,
        IDTipoCarregador: carregadores,
        IDLogradouro: `${idLocal.IDLogradouro}`,
        tipoLocal: `Trabalho`,
      });
    }
  };

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
      console.log(data);

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

        console.log(data.results[0].address_components[4].short_name);
        var tipoLogra = data.results[0].address_components[1].long_name.split(" ")[0]
        var tipoUf = data.results[0].address_components[4].short_name
        setSelectedUf(tipoUf)
        setSelectedTipoLogra(tipoLogra);

        var cepNormal = data.results[0].address_components[6].long_name.replace(
          '-',
          '',
        );
        console.log(cepNormal);
        setCep(cepNormal);
        setValidacaoLogradouro(true);
      }
    } catch (error) {
      throw new Error('NÃO ENCONTRADO O ENDEREÇO');
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
        carregadores != []
      ) {
        addDataLogradouro();
        navigation.navigate('HomeAndWork');
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
          console.log('Teste');
          if (carregadores == []) {
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

  const res = (
    <View>
      <ScrollView
      // Para deixar a tela rolavel
      >
        <Pressable
          style={styles.container}
          onPress={() => {
            semCep();
            console.log(cidade)
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
                  validar={carregadores}
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
              />
            </View>
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

      {listaCamposInvalidos.filter(elemento => elemento != '').length > 0 ? (
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
    console.log(listaCamposInvalidos);
    return res;
  }
}
