import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import SelectList from '../selectList';
import TipoLogradouro from '../tipoLogradouro';
import {firestore} from '../../config/configFirebase';
import TabelaCarregadores from '../componenteTabelaCarregadores.js';

export default function AddHome({navigation}) {
  const tabelaLogra = firestore.collection('logradouro'); // Pega a tabela Logradouro do Firabase
  const tabelaLocal = firestore.collection('local'); // Pega a tabela Local do Firabase

  // Criação das varíaveis com estado variáveis para colocar os dados do formulário
  const [carregadores, setCarregadores] = useState();
  // Variável para aparição da tabelas dos carregadores
  const [ligarTabelaCarregadores, setligarTabelaCarregadores] = useState(true);
  //
  const [name, setName] = useState();
  const [logra, setLogra] = useState();
  const [numero, setNumero] = useState();
  const [complemento, setComplemento] = useState();
  const [cepInput, setCep] = useState();
  const [bairro, setBairro] = useState();
  const [cidade, setCidade] = useState();
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

  //Teste para ver ser os dados estão sendo colocados no campo
  console.log(selectedUf);
  console.log(selectedTipoLogra);
  console.log(name);
  console.log(logra);
  console.log(numero);
  console.log(complemento);
  console.log(cepInput);
  console.log(bairro);
  console.log(cidade);

  // Função para adicionar dados no banco de dados
  const addDataLogradouro = async () => {
    if (true) {
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
          console.log(countLogra);
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
          console.log('ADICIONADO!');
        })
        .catch(error => console.log(error)); // caso ocorra algum erro, mostrará para o DEV

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
      let listLocal = {
        IDLogradouro: `${countLogra}`,
        IDTipoCarregador: carregadores,
        nomeLocal: `${name}`,
        tipoLocal: `Casa`,
      };

      // adionará os dados ao banco de dados
      tabelaLocal
        .doc(`${countLocal}`)
        .set(listLocal)
        .then(() => {
          console.log('ADICIONADO!');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
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
                value={cepInput}
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
            onPressIn={() => {
              if (
                name != undefined &&
                numero != undefined &&
                cepInput != undefined &&
                bairro != undefined &&
                cidade != undefined &&
                carregadores != [] &&
                logra != undefined
              ) {
                navigation.navigate('HouseAndWork', {refresh: true});
                addDataLogradouro();
              } else {
                setValidCep(cepInput == '' ? false : true);
                setValidCidade(cidade == '' ? false : true);
                setValidLogra(logra == '' ? false : true);
                setValidNumero(numero == '' ? false : true);
                setValidName(name == '' ? false : true);
                setValidSelectCarregadores(carregadores == [] ? false : true);
                setValidBairro(bairro == '' ? false : true);

                var lista = [
                  validBairro ? 'Bairro' : '',
                  validCidade ? 'Cidade' : '',
                  validCep ? 'CEP' : '',
                  validNumero ? 'Número' : '',
                  validName ? 'Nome' : '',
                  validSelectCarregadores
                    ? 'Nenhum carregador selecionado'
                    : '',
                  validLogra ? 'Logradouro' : '',
                ];

                setListaCamposInvalidos(lista);
              }
            }}
            // Direcionar para página de Casa e Trabalho
          >
            <Text style={styles.textButton}>Adicionar</Text>
          </TouchableOpacity>
        </View>
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
