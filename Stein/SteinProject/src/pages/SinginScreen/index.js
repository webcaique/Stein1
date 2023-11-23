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
} from 'react-native';
import styles from './style';
import {utils} from '@react-native-firebase/app';
import SelectList from '../selectList';
import {auth} from '../../config/configFirebase.js';
import {firestore} from '../../config/configFirebase.js';
import Table from './table';
import colorName from 'color-name';

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
const [modal, setModal] = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [nome, setNome] = useState('');
const [errorRegister, setErrorRegister] = useState('');
const [validNome, setValidNome] = useState();
const [selectedUf, setSelectedUf] = useState();
const [tipoPlaca, setTipoPlaca] = useState(true);
const [cep, setCep] = useState('');
const [keyboardTipo, setKeyboardTipo] = useState('default');
const [errorEmail, setErrorEmail] = useState("");
const [errorPassaword, setErrorPassword] = useState("");

const handleUfChange = uf => {
    setSelectedUf(uf);
};

const register = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
        console.log("AQUI");
        let user = userCredential.user;
        setErrorEmail("");
        add(user.uid, true);
    })
    .catch(error => {
        add(0,false)
        setModal(false);
        setErrorRegister(true);
        let errorCode = error.code;
        let errorMessage = error.message;
        setErrorEmail(errorCode == "auth/email-already-in-use" || errorCode == "auth/invalid-email"? true: false);
        
        console.error(errorMessage);
        console.log(errorCode);
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

const tabelaCarro = firestore.collection('carro');
const tabelaUsuario = firestore.collection('usuario');

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

    const add = async (ID, verif) => {
    if(verif){
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
    if (tipoPlaca) {
        const firstPart = placa.substr(0, 2);
        const firstPartTest = regex.test(firstPart);

    if (firstPartTest) {
        regex = /^[0-9][A-Za-z]/;
        const secondPart = placa.substr(3, 6);
        const secondPartTest = regex.test(secondPart);
        listaErros.push(secondPartTest);
        if (!secondPartTest) {
            listValid.push('Placa');
            setValidPlaca('#f00');
            setPlaca('');
        }
    }
    } else {
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

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();

    if (ano < 2020 || ano > anoAtual) {
        listaErros.push(false);
        setAno('');
        setValidAno('#f00');
        listValid.push('Ano');
    }

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
            console.error('Erro na solicitação à API da NHTSA:', response.status);
        }
    } catch (error) {
        console.error('Erro ao verificar o modelo do carro:', error);
    }
    };

    verificarModelo(modelo);

    let teste = true;
    for (const dado of listaErros) {
    if (!dado) {
        teste = false;
        setValidLista(listValid);
        }
    }

    if (teste) {
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


    if(verif){
        navigation.navigate('LoginScreen');
    } else {
        setModal(false);
    }

    }
    }
};

    return (
    <ScrollView>
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
                style={styles.textInput1}
                keyboardType="email-address"
                returnKeyLabel="email"
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
                secureTextEntry={true}
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
                secureTextEntry={true}
                password={true}
                autoCorrect={false}
                textContentType={'password'}
                onChangeText={text => setConfirmPassword(text)}
                value={confirmPassword}
            />
            <TextInput
                style={[styles.textInputAll, {color: validCep}]}
                placeholderTextColor={validCep}
                placeholder="CEP da sua Moradia"
                onChangeText={setCep}
                value={cep}
                keyboardType="numeric"
                onBlur={() => {
                    cepFunction();
                }}
            />
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
            cep == '' ? (
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
                    <Text style={styles.errorText}>Verificar senha</Text>
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
                        if(!validNome){
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
                ) : (
                    <View />
                )}
            </View>
            <View
                style={styles.loginLink}
                //Link para entrar na tela de login
            >
                <Text
                    style={styles.textLogin}
                >
                    {' '}
                    Já possui cadastro?{' '}
                </Text>
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
                    <Text>Antigo Padrão</Text>
                    <Switch
                        onValueChange={() => {
                            setTipoPlaca(!tipoPlaca);
                            setPlaca('');
                        }}
                        value={tipoPlaca}
                    />
                    <Text>Novo Padrão</Text>
                    </View>
                    <View>
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.textCad2, {color: validPlaca}]}
                            placeholder="Placa"
                            onChangeText={text => {
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
                            placeholder="Modelo"
                            onChangeText={text => {
                            setModelo(text);
                            setValidModelo('#000');
                        }}
                        value={modelo}
                        placeholderTextColor={validModelo}
                        />
                        <TextInput
                            style={[styles.textCad2, {color: validAno}]}
                            placeholder="Ano do Modelo"
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
                        <>
                            <View style={{width: '30%'}}>
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
                        </>
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
                            register();
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