import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Pressable,
  Keyboard,
  ScrollView,
} from 'react-native';
import {firestore} from '../../config/configFirebase';
import styles from './style';
import {useState, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {auth} from '../../config/configFirebase';
export default function TradePassword({navigation}) {
  const [senha, setSenha] = useState([]);

  // useEffect(( )=>{
  //     database.collection("usuarios").onSnapshot((query)=>{
  //         const list = []
  //             query.forEach((doc)=>{
  //                 list.push({...doc.data(), id: doc.id})
  //                 console.log({list})
  //             })

  // }

  // )
  return (
    <View style={{height: '100%', minHeight: '100%'}}>
      <KeyboardAwareScrollView>
        {/* //Caso a página fique maior que a tela, objetivo de responsividade  */}

        <Pressable
          style={{width: '100%', height: '100%'}}
          onPress={Keyboard.dismiss}>
          <View style={styles.caixa}>
            <Text style={styles.texto1}>
              Crie uma senha mais forte e uma conta mais segura.
            </Text>

            <View style={styles.caixa2}>
              <TextInput
                style={styles.TextInput}
                placeholder="Senha antiga"
                placeholderTextColor={'#000000'}
                returnKeyLabel="senha antiga"
                autoCapitalize="none"
                secureTextEntry={true}
                password={true}
                autoCorrect={false}
                textContentType={'password'}
              />

              <TextInput
                style={styles.TextInput}
                placeholder="Alterar Senha"
                placeholderTextColor={'#000000'}
                returnKeyLabel="Alterar Senha"
                autoCapitalize="none"
                secureTextEntry={true}
                password={true}
                autoCorrect={false}
                textContentType={'password'}
              />

              <TextInput
                style={styles.TextInput1}
                placeholder="Confirmar nova senha"
                placeholderTextColor={'#000000'}
                returnKeyLabel="Confirmar nova senha"
                autoCapitalize="none"
                secureTextEntry={true}
                password={true}
                autoCorrect={false}
                textContentType={'password'}
              />
            </View>

            <TouchableOpacity
              style={styles.buttons}
              onPress={() => auth.currentUser.updatePassword(setSenha)}>
              <Text style={styles.textButtons}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
}