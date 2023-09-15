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
            style={styles.row2}
            // Campo para pegar o apelido
          >
            <Text
              style={styles.textIsInput}
              // Campo para pegar o apelido
            >
              Nome da residência:
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setName}
              value={name}
            />
          </View>

          <View style={styles.row3}>
            <Text style={styles.textIsInput}>Logradouro:</Text>
            <View
              style={styles.column1}
              // Campo para pegar o logradouro
            >
              <View style={styles.logradouro}>
                <TipoLogradouro onTipoLograChange={handleTipoLograChange} />
                <TextInput
                  style={styles.textInputLogradouro}
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
                <Text style={styles.textIsInput}>Número:</Text>
                <TextInput
                  style={styles.textInputNumber}
                  onChangeText={setNumero}
                  value={numero}
                  keyboardType="number-pad"
                />
              </View>
              <TouchableOpacity
                style={styles.btnCarregadores}
                onPress={() => {
                  //botão que mostrará a tabela carregadores
                  setligarTabelaCarregadores(!ligarTabelaCarregadores);
                }}>
                <Text style={styles.textIsInput}>Carregadores</Text>
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
              <Text style={styles.textIsInput}>CEP:</Text>
              <TextInput
                style={styles.textInputCep}
                onChangeText={setCep}
                value={cepInput}
                keyboardType="number-pad"
              />
            </View>
            <View
              style={styles.column4}
              // Campo para pegar o bairro
            >
              <Text style={styles.textIsInput}>Bairro:</Text>
              <TextInput
                style={styles.textInputBairro}
                onChangeText={setBairro}
                value={bairro}
              />
            </View>
          </View>

          <View style={styles.row6}>
            <View
              style={styles.column6}
              // Campo para pegar o município
            >
              <Text style={styles.textIsInput}>Município:</Text>
              <TextInput
                style={styles.textInputMunicipio}
                onChangeText={setCidade}
                value={cidade}
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
              navigation.navigate('HouseAndWork', {refresh: true});
              addDataLogradouro();
            }}
            // Direcionar para página de Casa e Trabalho
          >
            <Text style={styles.textButton}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
