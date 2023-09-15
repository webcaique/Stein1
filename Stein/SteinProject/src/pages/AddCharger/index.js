import React, {useState} from 'react';
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
} from 'react-native';
import styles from './styles';
import TabelaCarregadores from '../componenteTabelaCarregadores.js';
import SelectList from '../selectList';
import TipoLogradouro from '../tipoLogradouro.js';
import {firestore} from "../../config/configFirebase";

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
          IDTipoCarregador: selectCarregadores
        })
        .then(() => {
          console.log('ADICIONADO!');
        });
    }
  };

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
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
          />
          <TextInput
            placeholder="Número"
            style={styles.textInput}
            keyboardType="numeric"
            onChange={setNumero}
            value={bairro}
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
            <Text style={styles.placeholder}>Carregador</Text>
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
                addCharger();
                navigation.navigate('Stein');
              }}>
              <Text style={styles.textButtons}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Pressable>
  );
};

export default AddCharger;
