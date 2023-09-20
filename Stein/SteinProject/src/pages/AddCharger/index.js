import React, {useState, useEffect} from 'react';
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

const AddCharger = ({navigation}) => {
  const tabelaCarregadores = firestore.collection('carregadores'); // Pega a tabela Carregadores do Firabase
  const tabelaLogra = firestore.collection('logradouro'); // Pega a tabela Logradouro do Firabase

  // Criação das varíaveis com estado variáveis para colocar os dados do formulário
  const [logra, setLogra] = useState();
  const [numero, setNumero] = useState();
  const [complemento, setComplemento] = useState();
  const [cepInput, setCep] = useState();
  const [bairro, setBairro] = useState();
  const [cidade, setCidade] = useState();
  const [qtdeCarregadores, setQtdeCarregadores] = useState();
  const [selectCarregadores, setSelectCarregadores] = useState();
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
  const [validQtdeCarregadores, setValidQtdeCarregadores] = useState();
  const [validSelectCarregadores, setValidSelectCarregadores] = useState();

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

    // aqui será colocados os dados coletados no formulário
    let listLogra = {
      CEP: `${cepInput}`,
      UF: `${selectedUf}`,
      bairro: `${bairro}`,
      cidade: `${cidade}`,
      complemento: `${complemento}`,
      geolocalizacao: {
        Latitude: 'TESTE',
        Longitude: 'TESTE',
      },
      logradouro: `${logra}`,
      numero: `${numero}`,
      tipoLogradouro: `${selectedTipoLogra}`,
    };

    // adionará os dados ao banco de dados
    tabelaLogra
      .doc(`${countLogra}`)
      .set(listLogra)
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
  };

  useEffect(()=>{
    const timer = setTimeout(() => {
      setListaCamposInvalidos([]);
    }, 5000);

    return () => clearTimeout(timer);
  },[])

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View>
        <ScrollView>
          <Text style={{fontSize: 16}}>Logradouro/Endereço:</Text>
          <TextInput
            placeholder="CEP"
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={setCep}
            value={cepInput}
          />

          <View>
            <TipoLogradouro onTipoLograChange={handleTipoLograChange} />
          </View>

          <View>
            <TextInput
              placeholder="Endereço*"
              style={[styles.textInput]}
              onChangeText={setLogra}
              value={logra}
              placeholderTextColor={validLogra ? 'red' : ''}
            />
          </View>
          <View>
            <SelectList onUfChange={handleUfChange} />
          </View>
          <TextInput
            placeholder="Cidade"
            style={styles.textInput}
            onChange={setCidade}
            value={cidade}
            placeholderTextColor={validCidade ? 'red' : ''}
          />
          <TextInput
            placeholder="Complemento"
            style={styles.textInput}
            onChange={setComplemento}
            value={complemento}
          />
          <TextInput
            placeholder="Bairro"
            style={styles.textInput}
            onChange={setBairro}
            value={bairro}
            placeholderTextColor={validBairro ? 'red' : ''}
          />
          <TextInput
            placeholder="Número"
            style={styles.textInput}
            keyboardType="numeric"
            onChange={setNumero}
            value={numero}
            placeholderTextColor={validNumero ? 'red' : ''}
          />
          <View
            style={{width: '100%', height: 2, backgroundColor: '#000'}}></View>

          <TextInput placeholder="Horário*" style={styles.textInput} />
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
                {color: validSelectCarregadores ? 'red' : ''},
              ]}>
              Carregador
            </Text>
          </TouchableOpacity>
          {carregadores ? (
            <TabelaCarregadores
              notFiltro={true}
              onSelectCarregadores={toggleCarregadorSelection}
            />
          ) : (
            <Text></Text>
          )}
          <TextInput
            placeholder="Quantidades de carregadores"
            keyboardType="number-pad"
            style={styles.textInput}
            onChangeText={setQtdeCarregadores}
            value={qtdeCarregadores}
            placeholderTextColor={validQtdeCarregadores ? 'red' : ''}
          />
          <View style={styles.acceptPay}>
            <Switch />
            <Text>Pagamento Necessário</Text>
          </View>
          <TextInput placeholder="Preço(Opcional)" style={styles.textInput} />
          <View style={{width: '100%', flex: 1, alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (
                  logra != undefined &&
                  numero != undefined &&
                  cepInput != undefined &&
                  bairro != undefined &&
                  cidade != undefined &&
                  qtdeCarregadores != undefined &&
                  selectCarregadores != []
                ) {
                  addCharger();
                  navigation.navigate('Stein');
                } else {
                  setValidCep(cepInput == '' ? false : true);
                  setValidCidade(cidade == '' ? false : true);
                  setValidLogra(logra == '' ? false : true);
                  setValidNumero(numero == '' ? false : true);
                  setValidQtdeCarregadores(
                    qtdeCarregadores == '' ? false : true,
                  );
                  setValidSelectCarregadores(
                    selectCarregadores == [] ? false : true,
                  );
                  setValidBairro(bairro == '' ? false : true);

                  var lista = [
                    validBairro == undefined || validBairro ? 'Bairro' : '',
                    validCidade == undefined || validCidade ? 'Cidade' : '',
                    validCep == undefined || validCep ? 'CEP' : '',
                    validNumero == undefined || validNumero ? 'Número' : '',
                    validQtdeCarregadores == undefined || validQtdeCarregadores ? 'Quantidade de carregadores' : '',
                    validSelectCarregadores == undefined || validSelectCarregadores
                      ? 'Nenhum carregador selecionado'
                      : '',
                    validLogra == undefined || validLogra ? 'Logradouro' : '',
                  ];

                  setListaCamposInvalidos(lista);

                  const timer = setTimeout(() => {
                    setListaCamposInvalidos([]);
                  }, 5000);
              
                  return () => clearTimeout(timer);
                }
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
                        ? index !== listaCamposInvalidos
                        .filter(elemento => elemento != '').length - 1
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
