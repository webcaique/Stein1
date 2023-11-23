import React, {useState, useEffect, version} from 'react';
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
  useAnimatedValue,
  TurboModuleRegistry,
  Platform
} from 'react-native';
import styles from './styles';
import TabelaCarregadores from '../componenteTabelaCarregadores.js';
import SelectList from '../selectList';
import TipoLogradouro from '../tipoLogradouro.js';
import {firestore, storage} from '../../config/configFirebase';
import {launchCamera} from 'react-native-image-picker';
import { PERMISSIONS, request, check, openSettings  } from 'react-native-permissions';

const apiKey = 'AIzaSyAdVbhYEhx50Y8TS7tulpNCkj8yMZPYiSQ';

const AddCharger = ({navigation}) => {
  const path = require('path');
  const [horario1, setHorario1] = useState('');
  const [horario2, setHorario2] = useState('');
  const [horario24h, setHorario24h] = useState(false);
  const [pagamento, setPagamento] = useState(false);

  const [mensagemErro, setMensagemErro] = useState('');

  const validarHorario = texto => {
    // Expressão regular para validar o formato esperado
    const regex = /^([01]\d|2[0-3])h([0-5]\d)$/;

    if (regex.test(texto)) {
      setMensagemErro('');
      setValidHorarios('#000');
    } else {
      setMensagemErro('Formato inválido. Use o formato "hhmm"');
      setValidHorarios('#f00');
    }
  };
  const tabelaCarregadores = firestore.collection('carregadores'); // Pega a tabela Carregadores do Firabase
  const tabelaLogra = firestore.collection('logradouro'); // Pega a tabela Logradouro do Firabase

  // Criação das varíaveis com estado variáveis para colocar os dados do formulário
  const [logra, setLogra] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cepInput, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [qtdeCarregadores, setQtdeCarregadores] = useState('');
  const [selectCarregadores, setSelectCarregadores] = useState('');
  const [selectedUf, setSelectedUf] = useState('');
  const [selectedTipoLogra, setSelectedTipoLogra] = useState('');
  const [img, setImg] = useState();
  const [imgPath, setImgPath] = useState();
  const [validcaoLogradouro, setValidacaoLogradouro] = useState(false);

  //Campos inválidos
  const [listaCamposInvalidos, setListaCamposInvalidos] = useState([]);

  // Variávies de estados para indicar campo obrigatório vazio ou inválido
  const [validLogra, setValidLogra] = useState(false);
  const [validNumero, setValidNumero] = useState(false);
  const [validCep, setValidCep] = useState(false);
  const [validBairro, setValidBairro] = useState(false);
  const [validCidade, setValidCidade] = useState(false);
  const [validQtdeCarregadores, setValidQtdeCarregadores] = useState(false);
  const [validSelectCarregadores, setValidSelectCarregadores] = useState(false);
  const [validHorarios, setValidHorarios] = useState('#000');

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

    const validarGeo = async () => {
      try {
        const address = `${selectedTipoLogra} ${logra}, ${numero} - ${bairro}, ${cidade} - ${selectedUf}, ${cepInput}`;

        console.log(address);

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address,
          )}&key=${apiKey}&components=country:BR&accuracy=high`,
        );

        if (!response.ok) {
          throw new Error('Erro ao buscar coordenadas.');
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          console.log('LATITUDE: ' + location.lat);
          console.log('LONGITUDE: ' + location.lng);

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

            await storage
              .ref(
                `Pontos/${cepInput}-${numero}/Ponto-${cepInput}-${numero}${img[1]}`,
              )
              .putFile(img[0])
              .then(data => {
                setImgPath(data.metadata.fullPath);
              })
              .catch(error => console.log(error));

            //Adiciona os dados dentro do banco de dados
            tabelaCarregadores
              .doc(`${countCarregadores}`)
              .set({
                IDLogradouro: `${countLogra}`,
                qtdeCarregadores: `${qtdeCarregadores}`,
                IDTipoCarregador: selectCarregadores,
                pagamentoNecessario: pagamento,
                horarioAberto: !horario24h
                  ? `${horario1} - ${horario2}`
                  : '24/7',
                imagem: imgPath,
              })
              .then(() => {
                console.log('ADICIONADO!');
              });
          }
        } else {
          throw new Error('Endereço não encontrado.');
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    validarGeo();
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

      if (data.erro) {
        // Construa a URL da API Geocoding do Google
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cepInput}&key=${apiKey}`;

        // Faça a solicitação à API usando o método fetch
        fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error(
                `Erro na solicitação. Status: ${response.status}`,
              );
            }
            return response.json();
          })
          .then(data => {
            // Verifique se a resposta contém dados
            if (data.results.length > 0) {
              // Extraia a rua do primeiro resultado
              const rua = obterRua(data.results[0]);
            } else {
              console.error('CEP não encontrado.');
            }
          })
          .catch(error => {
            console.error('Erro na solicitação:', error);
          });

        // Função para extrair a rua do resultado da API
        function obterRua(result) {
          // Itera pelos componentes do endereço
          for (const component of result.address_components) {
            // Verifica se o tipo do componente é 'route' (rua)
            if (component.types.includes('route')) {
              // Retorna o nome da rua
              return component.long_name;
            }
          }
          // Se não encontrar 'route', retorna null ou uma mensagem de erro, conforme necessário
          return null;
        }
      } else {
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
      }

      setValidCidade(false);
      setValidLogra(false);
      setValidNumero(false);
      setValidBairro(false);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const semCep = async () => {
    try {
      if (
        logra != '' &&
        bairro != '' &&
        cidade != '' &&
        numero != '' &&
        cepInput.length != 8
      ) {
        const address = `${selectedTipoLogra} ${logra}, ${numero} - ${bairro}, ${cidade} - ${selectedUf}`;

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

        var tipoLogra =
          data.results[0].address_components[1].long_name.split(' ')[0];
        var tipoUf = data.results[0].address_components[4].short_name;
        setSelectedUf(tipoUf);
        setSelectedTipoLogra(tipoLogra);

        var cepNormal = data.results[0].address_components[6].long_name.replace(
          '-',
          '',
        );
        setCep(cepNormal);
        setValidacaoLogradouro(true);
        setValidCidade(false);

        setValidLogra(false);

        setValidNumero(false);

        setValidBairro(false);
      }
    } catch (error) {
      const validacao = async () => {
        let camposInvalidos = [];
        setValidCidade(true);
        camposInvalidos.push('Cidade');

        setValidLogra(true);
        camposInvalidos.push('Logradouro');

        setValidNumero(true);
        camposInvalidos.push('Número');

        setValidBairro(true);
        camposInvalidos.push('Bairro');

        setListaCamposInvalidos(camposInvalidos);
      };

      validacao();

      const timer = setTimeout(() => {
        setListaCamposInvalidos([]);
      }, 5000);

      return () => clearTimeout(timer);
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
        logra != '' &&
        numero != '' &&
        cepInput != '' &&
        bairro != '' &&
        cidade != '' &&
        qtdeCarregadores != '' &&
        selectCarregadores != [] &&
        horario1 != '' &&
        horario2 != ''
      ) {
        if (cepInput.length == 8 && !validcaoLogradouro) {
          handleGeocode();
        }
        addCharger();
        navigation.navigate('Stein');
      } else {
        const validacao = async () => {
          let camposInvalidos = [];

          if (cepInput === '') {
            setValidCep(true);
            camposInvalidos.push('CEP');
          }
          if (cidade === '') {
            setValidCidade(true);
            camposInvalidos.push('Cidade');
          }
          if (logra === '') {
            setValidLogra(true);
            camposInvalidos.push('Logradouro');
          }
          if (numero === '') {
            setValidNumero(true);
            camposInvalidos.push('Número');
          }
          if (qtdeCarregadores === '') {
            setValidQtdeCarregadores(true);
            camposInvalidos.push('Quantidade de carregadores');
          }
          if (selectCarregadores.length === 0) {
            setValidSelectCarregadores(true);
            camposInvalidos.push('Nenhum carregador selecionado');
          }
          if (bairro === '') {
            setValidBairro(true);
            camposInvalidos.push('Bairro');
          }
          if (qtdeCarregadores < selectCarregadores.length) {
            setValidQtdeCarregadores(true);
            camposInvalidos.push(
              'Quantidade de carregadores',
              'Há mais carregadores selecionados do que quantidades deles',
            );
          }
          if (horario1 == '') {
            setValidHorarios('#f00');
            camposInvalidos.push('Horários nos preenchidos');
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

  const selectImage = async () => {
    if(Platform.OS === "ios"){
      try {
        const result = await request(PERMISSIONS.IOS.CAMERA);
        if (result === 'granted') {
          const status = await request(
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          );
  
          if (status === 'granted') {
            const imagem = await launchCamera();
            const extencao = path.extname(imagem.assets[0].originalPath);
            setImg([imagem.assets[0].originalPath, extencao]);
          } else {
            console.log('Permissão de escrita no armazenamento externo negada');
          }
        } else {
          console.log('Permissão da câmera negada');
        }
      } catch (error) {
        console.error('Erro ao solicitar permissão da câmera:', error);
  
        // No iOS, pode ser necessário direcionar o usuário para as configurações do aplicativo para conceder permissão
        if (error?.toString().includes('OPEN_SETTINGS')) {
          abrirConfiguracoes();
        }
      };
    } else if(Platform.OS === "android"){
      try {
        
        const result = await request(PERMISSIONS.ANDROID.CAMERA);
        if (result === 'granted') {
          const status = await request(
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          );
  
          if (status === 'granted') {
            const imagem = await launchCamera();
            const extencao = path.extname(imagem.assets[0].originalPath);
            setImg([imagem.assets[0].originalPath, extencao]);
          } else {
            console.log('Permissão de escrita no armazenamento externo negada');
          }
        } else {
          console.log('Permissão da câmera negada');
        }
      } catch (error) {
        console.log('Erro ao solicitar permissão da câmera:', error);
  
        // No Android, pode ser necessário direcionar o usuário para as configurações do aplicativo para conceder permissão
        if (error?.toString().includes('OPEN_SETTINGS')) {
          abrirConfiguracoes();
        }
      }
    }
  };

  const abrirConfiguracoes = () => {
    openSettings();
  };

  useEffect(() => {
    // Verifique se a permissão já foi concedida
    check(PERMISSIONS.IOS.CAMERA)
      .then(result => {
        switch (result) {
          case 'denied':
            console.log('A permissão da câmera foi negada');
            break;
          case 'granted':
            console.log('A permissão da câmera foi concedida');
            break;
          case 'blocked':
            console.log('A permissão da câmera está bloqueada');
            break;
        }
      })
      .catch(error => {
        console.error('Erro ao verificar permissão:', error);
      });

      check(PERMISSIONS.ANDROID.CAMERA)
      .then((result) => {
        switch (result) {
          case 'denied':
            console.log('A permissão da câmera foi negada');
            break;
          case 'granted':
            console.log('A permissão da câmera foi concedida');
            break;
          case 'blocked':
            console.log('A permissão da câmera está bloqueada');
            break;
        }
      })
      .catch((error) => {
        console.error('Erro ao verificar permissão:', error);
      });
  }, []);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        semCep();
        Keyboard.dismiss();
        if (cepInput.length == 8 && !validcaoLogradouro) {
          handleGeocode();
        }
      }}>
      <View>
        <ScrollView>
          <Text style={{fontSize: 16}}>Logradouro/Endereço:</Text>
          <TextInput
            placeholder="CEP"
            placeholderTextColor={validCep ? 'red' : '#000'}
            style={[styles.textInput, {color: validCep ? 'red' : '#000'}]}
            keyboardType="numeric"
            onChangeText={setCep}
            value={cepInput}
            maxLength={8}
            onBlur={() => {
              if (cepInput.length == 8 && !validcaoLogradouro) {
                handleGeocode();
              }
            }}
          />

          <View>
            <Text style={{color: '#f00', fontWeight: '900'}}>
              *VERIFIQUE O TIPO DO LOGRADOURO ABAIXO*
            </Text>
          </View>
          <View>
            <TipoLogradouro
              onTipoLograChange={handleTipoLograChange}
              validar={selectedTipoLogra}
            />
          </View>

          <View>
            <TextInput
              placeholder="Endereço*"
              style={[styles.textInput, {color: validLogra ? 'red' : '#000'}]}
              onChangeText={setLogra}
              value={logra}
              placeholderTextColor={validLogra ? 'red' : '#000'}
              onBlur={() => {
                semCep();
              }}
            />
          </View>
          <View>
            <SelectList onUfChange={handleUfChange} validar={selectedUf} />
          </View>

          <TextInput
            placeholder="Cidade"
            placeholderTextColor={validCidade ? 'red' : '#000'}
            style={[styles.textInput, {color: validCidade ? 'red' : '#000'}]}
            onChangeText={text => {
              setCidade(text);
            }}
            value={cidade}
            onBlur={() => {
              semCep();
            }}
          />

          <TextInput
            placeholder="Bairro*"
            placeholderTextColor={validBairro ? 'red' : '#000'}
            style={[styles.textInput, {color: validBairro ? 'red' : '#000'}]}
            onChangeText={text => {
              setBairro(text);
            }}
            value={bairro}
            onBlur={() => {
              semCep();
            }}
          />

          <TextInput
            placeholder="Número"
            keyboardType="number-pad"
            style={[styles.textInput, {color: validNumero ? 'red' : '#000'}]}
            onChangeText={setNumero}
            value={numero}
            placeholderTextColor={validNumero ? 'red' : '#000'}
            onBlur={() => {
              semCep();
            }}
          />

          <TextInput
            placeholder="Complemento"
            placeholderTextColor={'#000'}
            style={styles.textInput}
            onChange={setComplemento}
            value={complemento}
          />
          <View
            style={{width: '100%', height: 2, backgroundColor: '#000'}}></View>

          <TouchableOpacity
            onPress={() => setCarregadores(!carregadores)}
            style={styles.charger}>
            <Text
              style={[
                styles.placeholder,
                {color: validSelectCarregadores ? 'red' : '#000'},
              ]}>
              Carregadores
            </Text>
          </TouchableOpacity>
          {carregadores ? (
            <View
              style={{
                width: '100%',
                height: 'auto',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <TabelaCarregadores
                notFiltro={true}
                onSelectCarregadores={toggleCarregadorSelection}
                carr={selectCarregadores}
              />
            </View>
          ) : (
            <Text></Text>
          )}
          <TextInput
            placeholder="Quantidades de carregadores"
            keyboardType="number-pad"
            style={styles.textInput}
            onChangeText={text => {
              setQtdeCarregadores(text);
            }}
            value={qtdeCarregadores}
            placeholderTextColor={validQtdeCarregadores ? 'red' : '#000'}
          />
          <View style={styles.acceptPay}>
            <Switch
              onChange={() => {
                setPagamento(!pagamento);
              }}
              value={pagamento}
            />
            <Text>Pagamento Necessário</Text>
          </View>
          {/*          <TextInput
            placeholder="Preço(Opcional)"
            style={styles.textInput}
            placeholderTextColor={'#000'}
          />*/}

          {!horario24h ? (
            <View style={[styles.horario]}>
              <TextInput
                disabled={horario24h}
                style={[
                  styles.textInput,
                  {width: '40%', fontSize: 16, color: validHorarios},
                ]}
                placeholder="Horário inicial"
                placeholderTextColor={validHorarios}
                onChangeText={async texto => {
                  if (texto.length == 2) {
                    setHorario1(`${texto.substring(0, 3)}h`);
                  } else {
                    setHorario1(texto);
                  }
                }}
                onBlur={() => {
                  validarHorario(horario1);
                }}
                maxLength={5}
                keyboardType="number-pad"
                value={horario1}
              />
              <Text>Até</Text>
              <TextInput
                placeholderTextColor={validHorarios}
                style={[
                  styles.textInput,
                  {width: '40%', fontSize: 16, color: validHorarios},
                ]}
                placeholder="Horário final"
                onChangeText={async texto => {
                  if (texto.length == 2) {
                    setHorario2(`${texto.substring(0, 3)}h`);
                  } else {
                    setHorario2(texto);
                  }
                }}
                onBlur={() => {
                  validarHorario(horario2);
                }}
                maxLength={5}
                keyboardType="number-pad"
                value={horario2}
              />
            </View>
          ) : null}
          <View style={styles.acceptPay}>
            <Switch
              onChange={() => {
                setHorario1(!horario24h ? 'true' : false);
                setHorario2(!horario24h ? 'true' : false);
                setHorario24h(!horario24h);
              }}
              value={horario24h}
            />
            <Text>Aberto 24/7</Text>
          </View>
          <TouchableOpacity
            onPress={() => selectImage()}
            style={styles.charger}>
            <Text style={[styles.placeholder, {color: '#000'}]}>
              Selecionar imagem
            </Text>
          </TouchableOpacity>
          {mensagemErro ? (
            <Text style={{color: 'red'}}>{mensagemErro}</Text>
          ) : null}
          <View style={{width: '100%', flex: 1, alignItems: 'center'}}>
            <TouchableOpacity
              disabled={mensagemErro ? true : false}
              style={styles.button}
              onPress={() => {
                handlePress();
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
    </Pressable>
  );
};

export default AddCharger;
