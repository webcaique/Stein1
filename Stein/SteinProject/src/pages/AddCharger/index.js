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
import SelectList from './selectList';
import TipoLogradouro from './tipoLogradouro.js';
import {firestore} from "../../config/configFirebase";

const AddCharger = ({navigation}) => {

  const tabelaCarregadores = firestore.collection('carregadores');
  const tabelaLogra = firestore.collection('logradouro');

  const [logra, setLogra] = useState();
  const [numero, setNumero] = useState();
  const [complemento, setComplemento] = useState();
  const [cepInput, setCep] = useState();
  const [bairro, setBairro] = useState();
  const [cidade, setCidade] = useState();
  const [qtdeCarregadores, setQtdeCarregadores] = useState();

  const [carregadores, setCarregadores] = useState(false);
  const [selectCarregadores, setSelectCarregadores] = useState();
  const toggleCarregadorSelection = carr => {
    setSelectCarregadores(carr);
  };

  const [selectedUf, setSelectedUf] = useState('');
  const handleUfChange = uf => {
    setSelectedUf(uf);
  };

  const [selectedTipoLogra, setSelectedTipoLogra] = useState('');
  const handleTipoLograChange = tipoLogra => {
    setSelectedTipoLogra(tipoLogra);
  };

  const addCharger = async () => {
    let countLogra = 0;
    const snapshotLogra = await tabelaLogra.get();
    const listaLogra = [];
    snapshotLogra.forEach(doc => {
      listaLogra.push({id: doc.id, ...doc.data()});
    });
    listaLogra.forEach(doc => {
      if (countLogra < parseInt(doc.id)) {
        countLogra = parseInt(doc.id);
      }
    });
    console.log("TESTE")
    countLogra++;
    let testeLogra = {
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

    tabelaLogra
      .doc(`${countLogra}`)
      .set(testeLogra)
      .then(() => {
        console.log('ADICIONADO!');
      });

    if (true) {
      let countCarregadores = 0;
      const snapshotCarregadores = await tabelaCarregadores.get();
      const listaCarregadores = [];
      snapshotCarregadores.forEach(doc => {
        listaCarregadores.push({id: doc.id, ...doc.data()});
      });
      console.log("TESTE");
      console.log(listaCarregadores);
      listaCarregadores.forEach(doc => {
        if (countCarregadores < parseInt(doc.id)) {
          countCarregadores = parseInt(doc.id);
        }
      });
      countCarregadores++;

      tabelaCarregadores
        .doc(`${countCarregadores}`)
        .set({
          IDLogradouro: countLogra,
          qtdeCarregadores: qtdeCarregadores,
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
