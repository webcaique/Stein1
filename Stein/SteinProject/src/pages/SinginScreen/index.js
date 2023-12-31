import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Image,
  FlatList,
  Switch,
  Alert,
  Button,
} from 'react-native';
import styles from './style';
import SelectList from '../selectList';
import {auth} from '../../config/configFirebase.js';
import {firestore} from '../../config/configFirebase.js';
import Table from './table';
import colorName from 'color-name';
import CheckBox from '@react-native-community/checkbox';
import TabelaLogradouro from '../tipoLogradouro';

const cores = {
  Branco: 'White',
  Preto: 'Black',
  Vermelho: 'Red',
  Azul: 'Blue',
  Verde: 'Green',
  Amarelo: 'Yellow',
  Laranja: 'Orange',
  Roxo: 'Purple',
  Rosa: 'Pink',
  Marrom: 'Brown',
  Cinza: 'Gray',
  Prata: 'Silver',
  Dourado: 'Gold',
};

const apiKey = 'AIzaSyAdVbhYEhx50Y8TS7tulpNCkj8yMZPYiSQ';

const SinginScreen = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false); // para verificar se leu os termos de uso
  const [tipoLogradouro, setTipoLogradouro] = useState(''); // pegar o logradouro do tipo do logradouro

  //Seta o dado do tipo do logradouro
  const getTipoLogradouro = texto => {
    setTipoLogradouro(texto);
  };

  const [modal, setModal] = useState(false); // seta o modal para cadastrar o carro
  const [email, setEmail] = useState(''); // guardar o email
  const [password, setPassword] = useState(''); // guardar o email
  const [confirmPassword, setConfirmPassword] = useState(''); // Guardar a confirmação da senha
  const [nome, setNome] = useState(''); // Guardar o nome do usuário
  const [errorRegister, setErrorRegister] = useState(''); // Guardar o erro do register
  const [validNome, setValidNome] = useState(); // Guardar o erro do nome do usuário
  const [selectedUf, setSelectedUf] = useState(); // Guardar o uf selecionado
  const [tipoPlaca, setTipoPlaca] = useState(true); // Guardar o tipo da placa
  const [cep, setCep] = useState(''); // Guardar o cep
  const [keyboardTipo, setKeyboardTipo] = useState('default'); // Guardar keyboardTipo
  const [errorEmail, setErrorEmail] = useState(''); // Guardar o erro do email do usuário
  const [validNumero, setValidNumero] = useState('#000'); // Validar o número
  const [numero, setNumero] = useState(''); // Guardar setar o número
  const [termos, setTermos] = useState(''); // Ativar e desativar o modal dos termos

  const [mostrarSenha, setMostrarSenha] = useState(false); // Ativar para mostrar a senha

  //VERIFICA OS DADOS DIGITADOS
  //SERÁ COLOCADO NO LISTA ERRO TRUE, PARA OS DADOS VALIDOS, E FALSA, PARA OS INVÁLIDOS
  //SERÁ COLOCADO NA LISTVALID OS NOMES DOS CAMPOS INVÁLIDOS

  const verificacaoDados = () => {
    //verifica os dados
    const listaErros = []; // Lista de erros
    const listValid = []; //lista para validar, e entrar os nomes dos campos inváidos

    function isColorValid(color) {
      // verificar a cor digitado
      let ingColor = cores[color];
      // Verifique se a cor é um nome de cor CSS válido
      if (colorName[ingColor.toLowerCase()]) {
        return true;
      }
    }

    //Verifica se é apenas letras
    let regex = /^[A-Za-z]+/;
    if (isColorValid(cor)) {
      listaErros.push(true);
    } else {
      listaErros.push(false);
      setValidCor('#f00');
      setValidLista(['Cor']);
      setCor('');
    }

    //Verifica a placa se é válida
    if (tipoPlaca) {
      // verifica o tipo da placa, sendo a autal ou a antiga
      const firstPart = placa.substr(0, 2); //Separar em duas partes
      const firstPartTest = regex.test(firstPart); // Verifica sa a primeira parte está de acordo

      if (firstPartTest) {
        regex = /^[0-9][A-Za-z]/;
        const secondPart = placa.substr(3, 6);
        const secondPartTest = regex.test(secondPart);
        listaErros.push(secondPartTest);
        if (!secondPartTest) {
          // Verifica sa a segunda parte está de acordo
          listValid.push('Placa');
          setValidPlaca('#f00');
          setPlaca('');
        }
      }
    } else {
      //Verifica se a placa se está adequada
      const firstPart = placa.substr(0, 2);
      const firstPartTest = regex.test(firstPart);
      if (firstPartTest) {
        regex = /^[0-9]/;
        const secondPart = placa.substr(4, 7);
        const secondPartTest = regex.test(secondPart);
        listaErros.push(secondPartTest);
        if (!secondPartTest) {
          listValid.push('Placa');
          setValidPlaca('#f00');
          setPlaca('');
        }
      }
    }

    //Pega a data do sitema
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();

    //Verifica se o ano digitado é válido
    if (ano < 2020 || ano > anoAtual) {
      listaErros.push(false);
      setAno('');
      setValidAno('#f00');
      listValid.push('Ano');
    }

    //Veirifica se o país existe
    const verifyCountryExists = async countryName => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${countryName}&key=${apiKey}`,
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        // Um ou mais resultados foram encontrados para o país
        listaErros.push(true);
      } else {
        // Nenhum resultado foi encontrado para o país
        listaErros.push(false);
        setUf('');
        setValidUf('#f00');
        listValid.push('UF');
      }
    };

    //Veririca se a cidade e o estado existe
    const verifyLocationExists = async (stateName, cityName) => {
      const address = `${cityName}, ${stateName}`;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`,
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        // Um ou mais resultados foram encontrados para a localização
        listaErros.push(true);
        setUf(`${cityName} - ${stateName}`);
      } else {
        // Nenhum resultado foi encontrado para a localização
        listaErros.push(false);
        setUf('');
        setValidUf('#f00');
        listValid.push('UF');
      }
    };

    if (tipoPlaca) {
      verifyCountryExists(uf);
    } else {
      verifyLocationExists(selectedUf, uf);
    }

    //Verifica se o modelo do carro existe
    const verificarModelo = async modelo => {
      //Deixar a primeira letra em maiuscula
      const firstLetter = modelo.charAt(0);
      const firstLetterCap = firstLetter.toUpperCase();
      const remainingLetters = modelo.slice(1);
      const capitalizedWord = firstLetterCap + remainingLetters;
      try {
        // Faz uma solicitação à API da NHTSA para obter informações sobre o modelo
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${encodeURI(capitalizedWord)}?format=json`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.ok) {
          const data = await response.json();

          // Verifica se a resposta da API contém modelos de carros
          if (data.Results && data.Results.length > 0) {
            listaErros.push(true);
          } else {
            listaErros.push(false);
            setModelo('');
            setValidModelo('#f00');
            listValid.push('Modelo');
          }
        } else {
          console.error('Erro na solicitação à API da NHTSA:', response.status);
        }
      } catch (error) {
        console.error('Erro ao verificar o modelo do carro:', error);
      }
    };

    verificarModelo(modelo);

    //Caso algum campo seja inválido, ele mostra as mensagem de erros
    let teste = true;
    for (const dado of listaErros) {
      if (!dado) {
        teste = false;
        setValidLista(listValid);
      }
    }

    return teste;
  };

  const handleUfChange = uf => {
    //SETA O UF SELECIONADO
    setSelectedUf(uf);
  };

  //verifica se a senha tem carecteres especiais
  const verificarCaracteresEspeciais = () => {
    const regex = /[!@#$%^&*(),.?":{}|<>_-°ºª=+~¬¨§]/;
    return regex.test(password);
  };

  const handleVerificarCaracteresEspeciais = () => {
    const contemEspeciais = verificarCaracteresEspeciais();
  };

  //verifica se a senha tem números
  const verificarNumeros = () => {
    const regex = /\d/;
    return regex.test(password);
  };

  const handleVerificarNumeros = () => {
    const contemNumeros = verificarNumeros();
  };

  //verifica se a senha tem letras maiusculas
  const verificarLetrasMaiusculas = () => {
    for (let i = 0; i < password.length; i++) {
      if (
        password[i] === password[i].toUpperCase() &&
        password[i] !== password[i].toLowerCase()
      ) {
        // Se o caractere atual for uma letra maiúscula
        return true;
      }
    }

    // Se nenhum caractere maiúsculo for encontrado
    return false;
  };

  //verifica se a senha tem letras minusculas
  const verificarLetrasMinusculas = () => {
    for (let i = 0; i < password.length; i++) {
      if (
        password[i] === password[i].toLowerCase() &&
        password[i] !== password[i].toUpperCase()
      ) {
        // Se o caractere atual for uma letra minúscula
        return true;
      }
    }

    // Se nenhum caractere minúsculo for encontrado
    return false;
  };

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        let user = userCredential.user;
        setErrorEmail('');
        auth.currentUser.sendEmailVerification();
        add(user.uid, true);
      })
      .catch(error => {
        add(0, false);
        setModal(false);
        setErrorRegister(true);
        let errorCode = error.code;
        let errorMessage = error.message;
        setErrorEmail(
          errorCode == 'auth/email-already-in-use' ||
            errorCode == 'auth/invalid-email'
            ? true
            : false,
        );

        console.error(errorMessage);
      });
  };

  //Cadastrar o carro//
  const [rotation, setRotation] = useState(90);
  const [table, setTable] = useState(false);
  const [carregador, setCarregador] = useState(false);
  const [placa, setPlaca] = useState(false);
  const [desc, setDesc] = useState(false);
  const [cor, setCor] = useState(false);
  const [modelo, setModelo] = useState(false);
  const [uf, setUf] = useState(false);
  const [ano, setAno] = useState(false);

  //validacao
  const [validCarregador, setValidCarregador] = useState('#000');
  const [validPlaca, setValidPlaca] = useState('#000');
  const [validDesc, setValidDesc] = useState('#000');
  const [validCor, setValidCor] = useState('#000');
  const [validModelo, setValidModelo] = useState('#000');
  const [validAno, setValidAno] = useState('#000');
  const [validUf, setValidUf] = useState('#000');
  const [validLista, setValidLista] = useState([]);
  const [validCep, setValidCep] = useState('#000');

  const tabelaCarro = firestore.collection('carro'); //tabela do carro
  const tabelaUsuario = firestore.collection('usuario'); //tabela de usuario

  //verifica se o nome do usuário já existe
  const verifNome = async () => {
    const listaUsuario = [];

    const snapshot = await tabelaUsuario.get();
    snapshot.forEach(dados => {
      listaUsuario.push({id: dados.id, ...dados.data()});
    });

    for (const datas of listaUsuario) {
      if (datas.nomeUsuario == nome) {
        setValidNome(true);
        break;
      } else {
        setValidNome(false);
      }
    }
  };

  //Verifica se o CEP digitado existe
  const cepFunction = async () => {
    try {
      // Fazer uma solicitação para um serviço de geocodificação (por exemplo, Google Geocoding API)
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      if (!response.ok) {
        setCep('CEP INVÁLIDO!');
        setValidCep('#f00');
        const timer = setTimeout(() => {
          setCep('');
          setValidCep('#000');
        }, 3000);

        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  //Adiciona os dados para o banco de dados
  const add = async (ID, verif) => {
    if (verif) {
      const listaErros = [];
      const listValid = [];

      function isColorValid(color) {
        let ingColor = cores[color];
        // Verifique se a cor é um nome de cor CSS válido
        if (colorName[ingColor.toLowerCase()]) {
          return true;
        }
      }

      let regex = /^[A-Za-z]+/;
      if (isColorValid(cor)) {
        listaErros.push(true);
      } else {
        listaErros.push(false);
        setValidCor('#f00');
        setValidLista(['Cor']);
        setCor('');
      }

      // Se o tipo de placa for verdadeiro (placa nova)
      if (tipoPlaca) {
        const firstPart = placa.substr(0, 2);
        const firstPartTest = regex.test(firstPart);

        if (firstPartTest) {
          // Expressão regular inicial para verificar a primeira parte da placa
          regex = /^[0-9][A-Za-z]/;
          const secondPart = placa.substr(3, 6);
          const secondPartTest = regex.test(secondPart);
          listaErros.push(secondPartTest);
          // Se a primeira parte da placa passar na verificação
          if (!secondPartTest) {
            //caso a segunda parte não está de acordo
            // Adiciona 'Placa' à lista de itens inválidos
            listValid.push('Placa');
            // Define a cor da borda da caixa de texto para vermelho (#f00)
            setValidPlaca('#f00');
            // Limpa o campo da placa
            setPlaca('');
          }
        }
      } else {
        //veirfica a primeira parte da placa
        const firstPart = placa.substr(0, 2);
        const firstPartTest = regex.test(firstPart);
        if (firstPartTest) {
          regex = /^[0-9]/;
          const secondPart = placa.substr(4, 7);
          const secondPartTest = regex.test(secondPart);
          listaErros.push(secondPartTest);
          //caso a primeira parte da placa estja válida
          if (!secondPartTest) {
            //caso a segunda parte não está de acordo
            // Adiciona 'Placa' à lista de itens inválidos
            listValid.push('Placa');
            // Define a cor da borda da caixa de texto para vermelho (#f00)
            setValidPlaca('#f00');
            // Limpa o campo da placa
            setPlaca('');
          }
        }
      }

      //Faz a verificação do ano digitado com o ano atual
      const dataAtual = new Date();
      const anoAtual = dataAtual.getFullYear();

      if (ano < 2020 || ano > anoAtual) {
        listaErros.push(false);
        setAno('');
        setValidAno('#f00');
        listValid.push('Ano');
      }

      const verifyCountryExists = async countryName => {
        //Verifica se existe o país
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${countryName}&key=${apiKey}`,
        );
        const data = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
          // Um ou mais resultados foram encontrados para o país
          listaErros.push(true);
        } else {
          // Nenhum resultado foi encontrado para o país
          listaErros.push(false);
          setUf('');
          setValidUf('#f00');
          listValid.push('UF');
        }
      };

      const verifyLocationExists = async (stateName, cityName) => {
        //verifica se a localização digitada existe
        const address = `${cityName}, ${stateName}`;
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`,
        );
        const data = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
          // Um ou mais resultados foram encontrados para a localização
          listaErros.push(true);
          setUf(`${cityName} - ${stateName}`);
        } else {
          // Nenhum resultado foi encontrado para a localização
          listaErros.push(false);
          setUf('');
          setValidUf('#f00');
          listValid.push('UF');
        }
      };

      //Depende da placa que o usuário digitou, por causa do acordo do Mercosul
      if (tipoPlaca) {
        verifyCountryExists(uf);
      } else {
        verifyLocationExists(selectedUf, uf);
      }

      //Veifica se o modelo existe
      const verificarModelo = async modelo => {
        try {
          // Faz uma solicitação à API da NHTSA para obter informações sobre o modelo
          const response = await fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${modelo}?format=json`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          if (response.ok) {
            const data = await response.json();

            // Verifica se a resposta da API contém modelos de carros
            if (data.Results && data.Results.length > 0) {
              listaErros.push(true);
            } else {
              listaErros.push(false);
              setModelo('');
              setValidModelo('#f00');
              listValid.push('Modelo');
            }
          } else {
            console.error(
              'Erro na solicitação à API da NHTSA:',
              response.status,
            );
          }
        } catch (error) {
          console.error('Erro ao verificar o modelo do carro:', error);
        }
      };

      //Veifica se o modelo existe
      verificarModelo(modelo);

      //Veirifca se alguma das verificações retornou falsa.
      let teste = true;
      for (const dado of listaErros) {
        if (!dado) {
          teste = false;
          setValidLista(listValid);
        }
      }

      //Caso não tenha erro, ele adiciona na tabela
      if (teste) {
        //Os dados são colocados em uma lista para verifica qual é o novo id do dado que vai entrar no banco de dado. Isso que acontece no código abaixo, além de enviar para o banco de dados
        const getTabUser = await tabelaUsuario.get();

        const listaUser = [];

        getTabUser.forEach(doc => {
          listaUser.push({id: doc.id, ...doc.data()});
        });

        let dados = {
          nomeUsuario: nome,
          email: email,
          senha: password,
          imagemFundo: null,
          imagemPerfil: null,
          CEP: cep,
          numeroResidencia: numero,
        };

        tabelaUsuario
          .doc(`${ID}`)
          .set(dados)
          .catch(error => console.error(error));

        let countCarro = 0;

        const getTabCarro = await tabelaCarro.get();

        const listaCarro = [];

        getTabCarro.forEach(doc => {
          listaCarro.push({id: doc.id, ...doc.data()});
        });

        listaCarro.forEach(data => {
          if (countCarro < parseInt(data.id)) {
            countCarro = parseInt(data.id);
          }
        });

        countCarro++;

        dados = {
          desc: desc,
          ano: ano,
          uf: uf,
          cor: cor,
          placa: placa,
          IDTipoCarregador: carregador,
          IDUsuario: `${ID}`,
          modelo: modelo,
        };

        tabelaCarro
          .doc(`${countCarro}`)
          .set(dados)
          .catch(error => console.error(error));

        if (verif) {
          setModal(false);
          navigation.navigate('LoginScreen');
        } else {
          setModal(false);
        }
      }
    }
  };

  return (
    <ScrollView>
      <Modal visible={termos}>
        <Pressable
          style={styles.containerTermoDeUso}>
          <ScrollView>
          <TouchableOpacity style={{...styles.imgSaidaTermoDeUso,}}
              onPress={() => {
                setTermos(false);
              }}

              >
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fmais.png?alt=media&token=f29b19c6-efb8-4f11-b1b4-ed9c8a95fbd6',
                }}
                style={[
                  styles.imgSaidaTermoDeUso,
                  {
                    transform: [{rotate: '45deg'}],
                  },
                ]}
              />
              </TouchableOpacity>
            <View style={styles.termosContainerTexto}>
              <Text style={styles.termosTitle}>TERMOS DE USO E CONDIÇÃO</Text>
              <Text style={styles.textoTermo}>
                Produzimos este aplicativo com o objetivo de expandir nossos
                produtos e melhorar as qualidades de nossos serviços, assim,
                proporcionando aos nossos clientes facilidades em suas compras
              </Text>
              <Text style={styles.textoTermo}>
                A Stein não se responsabiliza por eventuais informações inexatas
                ou imprecisas sobre seus serviços, bem como omissões do conteúdo
                do seu site ou falha de equipamento
              </Text>
              <Text style={styles.textoTermo}>
                O usuário tem total conhecimento e nada a se opor de que alguns
                serviços inseridos no catalogo ou na própria página do site
                poderão estar disponíveis em qualquer uma de nossas sedes ou
                sediados. As cores apresentadas em nossos sites prezam pela
                integridade e semelhança com o serviço, todavia, poderão sofrer
                variações e não serem exatas, uma vez que dependem do monitor e
                tecnologia utilizada por cada usuário, não podendo então a Stein
                ser responsabilizada no caso de inexatidão de cores.
              </Text>
              <Text style={styles.textoTermo}>
                Em nenhum momento o aplicativo e seus colaboradores poderão ser
                responsabilizados por quaisquer danos, perdas, despesas, falhas
                de desempenho, interrupção, defeito, vírus ou falhas no sistema
                do aplicativo.
              </Text>
              <Text style={styles.textoTermo}>
                Ao acessar esse aplicativo ou fornecer seus dados pessoais, o
                usuário automaticamente declara conhecer e aceitar os Termos e
                Condições de uso de Política de privacidade. Será de total
                responsabilidade do usuário a garantir a exatidão dos seus dados
                pessoais fornecidos, ficando certo que o usuário isenta a Stein
                de quaisquer transtornos quanto a inexatidão de informações,
                podendo ainda a mesma, suspender ou cancelar a conta de
                cadastrado do usuário e recusar toda e qualquer utilização.
              </Text>
              <Text style={styles.textoTermo}>
                Somos obrigados a transmitir seus dados a terceiros caso isto
                seja necessário para cumprir regulamentações legais (por exemplo
                da lei federal de proteção de dados).
              </Text>
              <Text style={styles.textoTermo}>
                As informações sobre os preços e disponibilidades de serviços
                estão sujeitos a alterações.{' '}
              </Text>
            </View>
          </ScrollView>
        </Pressable>
      </Modal>

      <View
        style={styles.conteiner}
        //Container principal
      >
        <KeyboardAvoidingView>
          <Pressable // Deixa a página clicável para desativar o teclado do usuário
            onPress={Keyboard.dismiss}>
            <View
              style={styles.conteiner}
              //Container para retirar bugs do Pressable
            >
              <TextInput //campo para escrever seu apelido no aplicativo
                placeholder="Nome"
                placeholderTextColor={'#000000'}
                style={{...styles.textInputAll, marginTop: 0}}
                keyboardType="default"
                returnKeyLabel="default"
                autoCapitalize="sentences"
                onChangeText={text => setNome(text)}
                value={nome}
              />
              <TextInput // campo para colocar o email
                placeholder="Email"
                placeholderTextColor={'#000000'}
                style={styles.textInputAll}
                keyboardType="email-address"
                returnKeyLabel="email"
                autoCapitalize="none"
                onChangeText={text => setEmail(text)}
                value={email}
              />
              <TextInput // campo para colocar o senha
                style={styles.textInputAll}
                placeholder="Senha"
                placeholderTextColor={'#000000'}
                returnKeyLabel="Senha"
                autoCapitalize="none"
                secureTextEntry={!mostrarSenha}
                password={true}
                autoCorrect={false}
                textContentType={'password'}
                onChangeText={text => setPassword(text)}
                value={password}
              />

              <TextInput // campo para confirmar sua senha
                style={styles.textInputAll}
                placeholder="Confirmar senha"
                placeholderTextColor={'#000000'}
                returnKeyLabel="Senha"
                autoCapitalize="none"
                secureTextEntry={!mostrarSenha}
                password={true}
                autoCorrect={false}
                textContentType={'password'}
                onChangeText={text => setConfirmPassword(text)}
                value={confirmPassword}
              />

              <View
                style={{
                  ...styles.checkboxStyle,
                }}>
                <CheckBox
                  value={mostrarSenha}
                  onValueChange={newValue => setMostrarSenha(newValue)}
                  tintColors={{true: '#000000'}}
                />
                <Text style={styles.txtTermos}>Mostrar senha</Text>
              </View>

              <View>
                <Text style={{...styles.tipoLogradouroVerif}}>
                  *VERIFIQUE O TIPO DO LOGRADOURO ABAIXO*
                </Text>
              </View>
              <TabelaLogradouro
                onTipoLograChange={getTipoLogradouro}
                validar={tipoLogradouro}
                branco={true}
              />
              <View
                style={{
                  width: '100%',
                  height: 'auto',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  style={[styles.textInputAll, {color: validCep, width: '70%'}]}
                  placeholderTextColor={validCep}
                  placeholder="CEP da sua Moradia"
                  onChangeText={setCep}
                  value={cep}
                  keyboardType="numeric"
                  onBlur={() => {
                    cepFunction();
                  }}
                  maxLength={cep == 'CEP INVÁLIDO!' ? 13 : 8}
                />
                <TextInput
                  style={[styles.textInputAll, {color: validCep, width: '25%'}]}
                  placeholderTextColor={validNumero}
                  placeholder="Número"
                  onChangeText={setNumero}
                  keyboardType="numeric"
                  value={numero}
                />
              </View>
              <View
                style={{
                  ...styles.checkboxStyle,
                }}>
                <CheckBox
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                  tintColors={{true: '#000000'}}
                />
                <TouchableOpacity
                  onPress={() => {
                    setTermos(!termos);
                  }}>
                  <Text style={styles.txtTermos}>
                    Você concorda com os{' '}
                    <Text style={styles.termosDeUso}>
                      Termos de Uso e Condição
                    </Text>
                    .
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {email === '' ||
            password === '' ||
            confirmPassword === '' ||
            nome === '' ||
            email === undefined ||
            password === undefined ||
            confirmPassword === undefined ||
            nome === undefined ||
            cep == undefined ||
            cep == 'CEP INVÁLIDO!' ||
            cep == '' ||
            password.length < 8 ||
            verificarLetrasMaiusculas() == false ||
            verificarLetrasMinusculas() == false ||
            verificarNumeros() == false ||
            verificarCaracteresEspeciais() == false ||
            numero == '' ||
            !toggleCheckBox ? (
              <TouchableOpacity
                style={styles.buttons}
                disabled={true}
                //Botão para fativar a função de cadastrar e a função de navegação, caso os dados sejam preenchidos corretamente
              >
                <Text
                  style={styles.textButtons}
                  //Texto do botão
                >
                  Cadastrar
                </Text>
              </TouchableOpacity>
            ) : confirmPassword != password ? (
              <>
                <View style={styles.error}>
                  <Text style={styles.errorText}>
                    As senhas devem ser iguais
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.buttons}
                  disabled={true}
                  //Botão para fativar a função de cadastrar e a função de navegação, caso os dados sejam preenchidos corretamente
                >
                  <Text
                    style={styles.textButtons}
                    //Texto do botão
                  >
                    Cadastrar
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {validNome ? (
                  <View style={styles.error}>
                    <Text style={styles.errorText}>
                      Nome de usuário já usado
                    </Text>
                  </View>
                ) : null}
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={async () => {
                    await verifNome();
                    await cepFunction();
                    if (
                      !validNome &&
                      cep != '' &&
                      cep != undefined &&
                      cep != 'CEP INVÁLIDO' &&
                      cep.length == 8
                    ) {
                      setModal(true);
                    }
                  }}
                  //Botão para fativar a função de cadastrar e a função de navegação, caso os dados sejam preenchidos corretamente
                >
                  <Text
                    style={styles.textButtons}
                    //Texto do botão
                  >
                    Cadastrar
                  </Text>
                </TouchableOpacity>
              </>
            )}
            <View>
              {errorRegister === true ? (
                <View style={styles.error}>
                  <Text style={styles.errorText}>
                    Email ou/e senha inválido(s)
                  </Text>
                </View>
              ) : password.length < 8 && password.length > 0 ? (
                <View style={styles.error}>
                  <Text style={styles.errorText}>
                    A sua senha deve conter 8 caracteres ou mais
                  </Text>
                </View>
              ) : verificarLetrasMaiusculas() == false &&
                password.length >= 8 ? (
                <View style={styles.error}>
                  <Text style={styles.errorText}>
                    A sua senha deve conter uma letra maiúscula
                  </Text>
                </View>
              ) : verificarLetrasMinusculas() == false &&
                password.length >= 8 &&
                verificarLetrasMaiusculas() == true ? (
                <View style={styles.error}>
                  <Text style={styles.errorText}>
                    A sua senha deve conter uma letra minúscula
                  </Text>
                </View>
              ) : verificarNumeros() == false &&
                verificarLetrasMinusculas() == true &&
                password.length >= 8 &&
                verificarLetrasMaiusculas() == true ? (
                <View style={styles.error}>
                  <Text style={styles.errorText}>
                    A sua senha deve conter um número
                  </Text>
                </View>
              ) : verificarCaracteresEspeciais() == false &&
                verificarNumeros() == true &&
                verificarLetrasMinusculas() == true &&
                password.length >= 8 &&
                verificarLetrasMaiusculas() == true ? (
                <View style={styles.error}>
                  <Text style={styles.errorText}>
                    A sua senha deve conter um caractere especial
                  </Text>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View
              style={styles.loginLink}
              //Link para entrar na tela de login
            >
              <Text style={styles.textLogin}> Já possui cadastro? </Text>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('LoginScreen')}
                //Link para ir para tela de login
              >
                <Text
                  style={styles.textLoginButton}
                  //Text do link
                >
                  Entrar
                </Text>
              </TouchableOpacity>
            </View>

            {modal ? (
              <Modal style={styles.modal}>
                <ScrollView>
                  <View style={styles.titleView}>
                    <TouchableOpacity
                      style={styles.touchImg}
                      onPress={() => {
                        setModal(false);
                      }}>
                      <Image
                        source={{
                          uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=4ae62381-8bc8-450d-ad26-b1d525a3045c&_gl=1*36gn8l*_ga*MTMzMzEzMzc2OS4xNjg1MDI3MDY4*_ga_CW55HF8NVT*MTY5ODc1ODMwOC4xNDQuMC4xNjk4NzU4MzA4LjYwLjAuMA..',
                        }}
                        style={[styles.titleImg]}
                      />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Cadastrar Carros</Text>
                  </View>
                  <View style={styles.view}>
                    <TextInput
                      style={[styles.textCad1, {color: validDesc}]}
                      placeholder="Descrição do Veículo"
                      onChangeText={text => {
                        setDesc(text);
                        setValidDesc('#000');
                      }}
                      value={desc}
                      placeholderTextColor={validDesc}
                    />
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10,
                        flexDirection: 'row',
                      }}>
                      <Text style={styles.txtPlaca}>Antigo Padrão</Text>
                      <Switch
                        onValueChange={() => {
                          setTipoPlaca(!tipoPlaca);
                          setPlaca('');
                        }}
                        value={tipoPlaca}
                        style={styles.switch}
                      />
                      <Text style={styles.txtPlaca}>Novo Padrão</Text>
                    </View>
                    <View>
                      <View style={styles.row}>
                        <TextInput
                          style={[styles.textCad2, {color: validPlaca}]}
                          placeholder={`Placa. Ex: ${tipoPlaca? "AAA1A11":"AAA1111"}`}
                          onChangeText={text => {
                            //Será editado a placa enquanto o usuário digita
                            if (!tipoPlaca) {
                              if (text.length >= 3) {
                                const texto = text;
                                const regex = /([A-Za-z]+)([0-9]+)/;

                                const textoModificado = texto.replace(
                                  regex,
                                  '$1-$2',
                                );
                                setPlaca(
                                  textoModificado.toString().toUpperCase(),
                                );
                              } else {
                                setPlaca(text.toString().toUpperCase());
                                setValidPlaca('#000');
                              }
                            } else {
                              setPlaca(text.toString().toUpperCase());
                              setValidPlaca('#000');
                            }
                            if (!tipoPlaca) {
                              if (placa.length >= 2) {
                                setKeyboardTipo('numeric');
                              } else {
                                setKeyboardTipo('default');
                              }
                            } else {
                              setKeyboardTipo('default');
                            }
                          }}
                          value={
                            placa.toString().toUpperCase() != 'FALSE'
                              ? placa.toString().toUpperCase()
                              : ''
                          }
                          placeholderTextColor={validPlaca}
                          maxLength={tipoPlaca ? 7 : 8}
                          keyboardType={keyboardTipo}
                        />
                        <TextInput
                          style={[styles.textCad2, {color: validCor}]}
                          placeholder="Cor"
                          onChangeText={text => {
                            setCor(text);
                            setValidCor('#000');
                          }}
                          value={cor}
                          placeholderTextColor={validCor}
                        />
                      </View>
                      <View style={styles.row}>
                        <TextInput
                          style={[styles.textCad2, {color: validModelo}]}
                          placeholder="Modelo. EX: Honda"
                          onChangeText={text => {
                            setModelo(text);
                            setValidModelo('#000');
                          }}
                          value={modelo}
                          placeholderTextColor={validModelo}
                        />
                        <TextInput
                          style={[styles.textCad2, {color: validAno}]}
                          placeholder="Ano do Modelo. Min: 2020"
                          onChangeText={text => {
                            setAno(text);
                            setValidAno('#000');
                          }}
                          value={ano}
                          placeholderTextColor={validAno}
                          maxLength={4}
                          keyboardType="numeric"
                        />
                      </View>
                      <View style={styles.row}>
                        {tipoPlaca ? (
                          <>
                            <TextInput
                              style={[styles.textUf, {color: validUf}]}
                              placeholder="País"
                              onChangeText={text => {
                                setUf(text);
                                setValidUf('#000');
                              }}
                              value={uf}
                              placeholderTextColor={validUf}
                            />
                          </>
                        ) : (
                          <View style={styles.uf}>
                            <View style={{width: '30%', marginHorizontal: 10}}>
                              <SelectList
                                onUfChange={handleUfChange}
                                validar={selectedUf}
                              />
                            </View>
                            <TextInput
                              style={[styles.textUf, {color: validUf}]}
                              placeholder="Cidade"
                              onChangeText={text => {
                                setUf(text);
                                setValidUf('#000');
                              }}
                              value={uf}
                              placeholderTextColor={validUf}
                            />
                          </View>
                        )}
                      </View>
                    </View>
                    <View style={styles.tableCarr}>
                      <View style={styles.container}>
                        <Text
                          style={[styles.textTab, {color: validCarregador}]}>
                          Tipo de conector
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setRotation(rotation + 180);
                            setTable(!table);
                          }}>
                          <Image
                            source={{
                              uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=4ae62381-8bc8-450d-ad26-b1d525a3045c&_gl=1*36gn8l*_ga*MTMzMzEzMzc2OS4xNjg1MDI3MDY4*_ga_CW55HF8NVT*MTY5ODc1ODMwOC4xNDQuMC4xNjk4NzU4MzA4LjYwLjAuMA..',
                            }}
                            style={[
                              styles.imgSeta,
                              {transform: [{rotate: `${rotation}deg`}]},
                            ]}
                          />
                        </TouchableOpacity>
                      </View>
                      <View>
                        {table ? (
                          <Table
                            getInfo={select => {
                              setCarregador(select);
                            }}
                            info={carregador}
                          />
                        ) : null}
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.buttons}
                      onPress={() => {
                        //Verifica se algum campo está vazio
                        if (
                          desc &&
                          placa &&
                          uf &&
                          modelo &&
                          ano &&
                          cor &&
                          carregador &&
                          cep
                        ) {
                          const test = verificacaoDados();
                          if (test) {
                            register(test);
                          }
                        } else {
                          let lista = [];
                          setValidAno(ano ? '#000' : '#f00');
                          setValidCarregador(carregador ? '#000' : '#f00');
                          setValidCor(cor ? '#000' : '#f00');
                          setValidDesc(desc ? '#000' : '#f00');
                          setValidModelo(modelo ? '#000' : '#f00');
                          setValidPlaca(placa ? '#000' : '#f00');
                          setValidUf(uf ? '#000' : '#f00');
                          setValidCep(cep ? '#000' : '#f00');

                          if (!ano) {
                            lista.push('Ano do Modelo');
                          }
                          if (!carregador) {
                            lista.push('Carregador');
                          }
                          if (!cor) {
                            lista.push('Cor');
                          }
                          if (!desc) {
                            lista.push('Descrição');
                          }
                          if (!modelo) {
                            lista.push('Modelo');
                          }
                          if (!placa) {
                            lista.push('Placa');
                          }
                          if (!uf) {
                            lista.push('UF');
                          }
                          if (cep) {
                            lista.push('CEP');
                          }

                          setValidLista(lista);
                        }
                      }}>
                      <Text style={styles.textButtons}>Cadastrar Carro</Text>
                    </TouchableOpacity>
                  </View>
                  {validLista.length > 0 ? (
                    <Modal transparent>
                      <Pressable
                        style={{
                          width: '100%',
                          height: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          setValidLista([]);
                        }}>
                        <View style={styles.aviso}>
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: '900',
                              color: '#f00',
                            }}>
                            Campos não preenchidos!
                          </Text>
                          <FlatList
                            data={validLista}
                            keyExtractor={item => item.id}
                            renderItem={({item, index}) => {
                              if (index + 1 != validLista.length) {
                                return (
                                  <Text
                                    style={{
                                      fontSize: 20,
                                    }}>
                                    {item},
                                  </Text>
                                );
                              } else {
                                return (
                                  <Text
                                    style={{
                                      fontSize: 20,
                                    }}>
                                    {item}.
                                  </Text>
                                );
                              }
                            }}
                          />
                        </View>
                      </Pressable>
                    </Modal>
                  ) : null}
                </ScrollView>
              </Modal>
            ) : null}
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};
export default SinginScreen;
