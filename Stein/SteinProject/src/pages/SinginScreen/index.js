import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import CadastrarCarro from './cadastrarCarro';

const SinginScreen = ({navigation}) => {
  const [modal, setModal] = useState(false);
  const [nome, setNome] = useState(false);
  const [email, setEmail] = useState(false);
  const [senha, setSenha] = useState(false);

  return (
    <View
      style={styles.conteiner}
      //Container principal
    >
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
            onChangeText={setNome}
          />
          <TextInput // campo para colocar o email
            placeholder="Email"
            placeholderTextColor={'#000000'}
            style={styles.textInputAll}
            keyboardType="email-address"
            returnKeyLabel="email"
            autoCapitalize="none"
            onChangeText={setEmail}

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
            onChangeText={setSenha}

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
          />
          <View
            styles={styles.viewButton}
            //Container do botão para cadastrar o usuário
          >
            <TouchableOpacity
              style={styles.buttons}
              onPress={() =>{
                setModal(true);         
            }}
              //Botão para fativar a função de cadastrar e a função de navegação, caso os dados sejam preenchidos corretamente
            >
              <Text
                style={styles.textButtons}
                //Texto do botão
              >
                Avançar
              </Text>
            </TouchableOpacity>
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
                onPress={() => {
                  navigation.navigate('LoginScreen');
                }}
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
        </View>
        {modal?(
            <CadastrarCarro onModal={(turn)=>{setModal(turn)}} navegacao={()=>{navigation.navigate('LoginScreen')}} getInfo={{nome: nome, email: email, senha: senha}}/>
        ): null}
      </Pressable>
    </View>
  );
};
export default SinginScreen;
