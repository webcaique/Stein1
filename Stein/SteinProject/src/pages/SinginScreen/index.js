import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
} from 'react-native';
import styles from './style';
import CadastrarCarro from './cadastrarCarro';
import {auth} from "../../config/configFirebase.js";
import CheckBox from '@react-native-community/checkbox';


const SinginScreen = ({navigation}) => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [errorRegister, setErrorRegister] = useState('');

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        let user = userCredential.user;
        console.log(user);
        navigation.navigate('LoginScreen');
      })
      .catch(error => {
        setErrorRegister(true);
        let errorCode = error.code;
        let errorMessage = error.message;
        console.error(error.message);
      });
  };

  return (
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

            {email === '' ||
            password === '' ||
            confirmPassword === '' ||
            nome === '' ? (
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
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => {
                  console.log("ERRADO");
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
            ) : (
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => {
                  setModal(true);
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
                //Texto de explicação caso já possio cadastro
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
        <CadastrarCarro
          onModal={turn => {
            setModal(turn);
          }}
          getInfo={{nome: nome, email: email, senha: password}}

          register={()=>{register()}}
        />
      ) : null}
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};
export default SinginScreen;
