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
        const aparecer = tabelaLocal.onSnapshot(async snapashotLocal => {
          // a array será usado para locar os dados do Firabase
          const listaLocal = [];

          // será colocado os dados na lista
          snapashotLocal.forEach(datas => {
            listaLocal.push({id: datas.id, ...datas.data()});
          });

          // guarda o idLocal, para fazer o update da tabela
          listaLocal.forEach(datas => {
            if (datas.IDLogradouro == idFromOtherScreen) {
              setIdLocal(datas);
            }
          });

          // vai pegar os dados na tabela logradouros
          const snapshotLogra = await tabelaLogra.get();

          // array que receberá os dados da tabela do Firebase
          const listaLogra = [];

          // guardará os dados da tabela para ser atualizada
          snapshotLogra.forEach(doc => {
            listaLogra.push({id: doc.id, ...doc.data()});
          });
          listaLogra.forEach(datas => {
            if (datas.id == idFromOtherScreen) {
              setLograEdit(datas);
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
            latitude: 24.000,
            longitude: 48.000,
          },
          logradouro: `${logra}`,
          numero: `${numero}`,
          tipoLogradouro: `${selectedTipoLogra}`,
        })
        .then(() => {
          console.log('ADICIONADO!');
        });

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

  const res = (
    <View>
      <ScrollView
      // Para deixar a tela rolavel
      >
        <View
          style={styles.container}
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
                <TipoLogradouro onTipoLograChange={handleTipoLograChange} />
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
              <SelectList onUfChange={handleUfChange} />
            </View>
          </View>
          <TouchableOpacity
            style={styles.editionButton}
            onPressIn={async () => {
              if (
                name != undefined &&
                numero != undefined &&
                cep != undefined &&
                bairro != undefined &&
                cidade != undefined &&
                carregadores != [] &&
                logra != undefined
              ) {
                navigation.navigate('HouseAndWork', {refresh: true});
                update();
              } else {
                setValidCep(cep == '' ? true : false);
                setValidCidade(cidade == '' ? true : false);
                setValidLogra(logra == '' ? true : false);
                setValidNumero(numero == '' ? true : false);
                setValidName(name == '' ? true : false);
                setValidSelectCarregadores(carregadores == [] ? true : false);
                setValidBairro(bairro == '' ? true : false);

                console.log("Validação: "+validBairro);
                console.log("Validação: "+validCep);
                console.log("Validação: "+validCidade);
                console.log("Validação: "+validLogra);
                console.log("Validação: "+validName);
                console.log("Validação: "+validNumero);
                console.log("Validação: "+validSelectCarregadores);
                


                var lista = [
                  validBairro == undefined || validBairro ? 'Bairro' : '',
                  validCidade == undefined || validCidade ? 'Cidade' : '',
                  validCep == undefined || validCep? 'CEP' : '',
                  validNumero == undefined || validNumero? 'Número' : '',
                  validName == undefined || validName? 'Nome' : '',
                  validSelectCarregadores == undefined || validSelectCarregadores
                    ? 'Nenhum carregador selecionado'
                    : '',
                  validLogra == undefined  || validLogra? 'Logradouro' : '',
                ];

                setListaCamposInvalidos(lista);

                const timer = setTimeout(() => {
                  setListaCamposInvalidos([]);
                }, 5000);
            
                return () => clearTimeout(timer);
              }
            }}
            // Direcionar para página de Casa e Trabalho
          >
            <Text style={styles.textButton}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {listaCamposInvalidos.filter(elemento => elemento != "").length > 0 ? (
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
