/* eslint-disable prettier/prettier */

import React from "react";
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
  Alert,
} from 'react-native';
import {firestore} from '../../config/configFirebase';
import styles from './style';
import {useState, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {auth} from '../../config/configFirebase';
export default function TradePassword({navigation}) {
  const [senha, setSenha] = useState([]);
  const [senhaAntiga, setSenhaAntiga] = useState([]);
  const [senhaAntigaConf, setSenhaAntigaConf] = useState([]);
  const [senhaConf, setSenhaConf] = useState([]);
  const tabelaUsuario = firestore.collection('usuario');
  useEffect(() => {
    tabelaUsuario.onSnapshot(datas => {
      datas._docs.forEach(data => {
        if (auth.currentUser.uid == data._ref._documentPath._parts[1]) {
          setSenhaAntiga(data._data.senha);
        }
      });
    });
  });

// }

  // ) 
  let listUsuario ;
useEffect(()=>{
console.log(listUsuario)
  firestore.collection("usuario").onSnapshot((query)=>{
  
    query._docs.forEach((usuario)=>{
   
      if(usuario._ref._documentPath._parts[1]==auth.currentUser.uid){
        listUsuario= usuario._data.senha;
        console.log(listUsuario)
      
      }
      
    
    
    })})
    setSenha(listUsuario)
    console.log(senha)
  
}

)


const verificarCaracteresEspeciais = () => {
  const regex = /[!@#$%^&*(),.?":{}|<>]/;
  return regex.test(senhaNova);
};

const handleVerificarCaracteresEspeciais = () => {
  const contemEspeciais = verificarCaracteresEspeciais();
  console.log(`Texto ${contemEspeciais ? 'contém' : 'não contém'} caracteres especiais.`);
};

const verificarNumeros = () => {
  const regex = /\d/;
  return regex.test(senhaNova);
};

const handleVerificarNumeros = () => {
  const contemNumeros = verificarNumeros();
  console.log(contemNumeros);
};

const verificarLetrasMaiusculas = () => {
  for (let i = 0; i < senhaNova.length; i++) {
    if (senhaNova[i] === senhaNova[i].toUpperCase() && senhaNova[i] !== senhaNova[i].toLowerCase()) {
      // Se o caractere atual for uma letra maiúscula
      return true;
    }
  }

  // Se nenhum caractere maiúsculo for encontrado
  return false
};

const verificarLetrasMinusculas = () => {
  for (let i = 0; i < senhaNova.length; i++) {
    if (senhaNova[i] === senhaNova[i].toLowerCase() && senhaNova[i] !== senhaNova[i].toUpperCase()) {
      // Se o caractere atual for uma letra minúscula
      return true;
    }
  }

  // Se nenhum caractere minúsculo for encontrado
  return false;
};

  // )
  if(senha.length>=8){
    console.log("AI ZÉ DA MANGA")
  }{
    console.log("miguellllll")
  }
  return (


    <View style={{height:"100%", minHeight:'100%'}}>
   <KeyboardAwareScrollView>
            {/* //Caso a página fique maior que a tela, objetivo de responsividade  */}

        <Pressable
          style={{ width: "100%", height: "100%" }}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.caixa}>
            <Text style={styles.texto1}>
              Crie uma senha mais forte e uma conta mais segura.
            </Text>

            <View style={styles.caixa2}>
              <TextInput
                style={styles.TextInput}
                placeholder="Senha antiga"
                placeholderTextColor={"#000000"}
                returnKeyLabel="senha antiga"
                autoCapitalize="none"
                secureTextEntry={true}
                password={true}
                autoCorrect={false}
                textContentType={'password'}
                onBlur={
                  ()=>{
                    if(senhaAntiga!=senhaAntigaConf){
                      console.log('daniel dá a bunda')
                    }
                  }
                }
                onChangeText={setSenhaAntigaConf}
                value={senhaAntigaConf}
              />

              <TextInput
                style={styles.TextInput}
                placeholder="Alterar Senha"
                placeholderTextColor={"#000000"}
                returnKeyLabel="Alterar Senha"
                autoCapitalize="none"
                secureTextEntry={true}
                password={true}
                autoCorrect={false}
                textContentType={'password'}
                onChangeText={setSenha}
                value={senha}
                
              />

              <TextInput
                style={styles.TextInput1}
                placeholder="Confirmar nova senha"
                placeholderTextColor={"#000000"}
                returnKeyLabel="Confirmar nova senha"
                autoCapitalize="none"
                secureTextEntry={true}
                password={true}
                autoCorrect={false}
                textContentType={'password'}
                onBlur={
                  ()=>{
                    if(senhaConf!=senha){
                      console.log('daniel dá a bunda?')
                    }
                  }
                }
                onChangeText={setSenhaConf}
                value={senhaConf}
              />
            </View>
            {senhaNova === '' ||
 senhaNova === undefined ||
 senhaNova.length < 8 ||
 verificarLetrasMaiusculas() === false ||
 verificarLetrasMinusculas() === false ||
 verificarNumeros() === false ||
 verificarCaracteresEspeciais() === false ||
 senhaNova.length < 8 && senhaNova.length > 0 ? (
    <TouchableOpacity
        style={styles.buttons}
        disabled={true}
    >
        <Text style={styles.textButtons}>Salvar</Text>
    </TouchableOpacity>
) : (
    <>
        {senhaNova.length >= 8 &&
         senhaNova === senhaNovaConf ? null : (
            <View style={styles.error}>
                <Text style={styles.errorText}>As senhas devem ser iguais</Text>
            </View>
        )}
        <TouchableOpacity
            style={styles.buttons}
            onPress={async () => {
               
                if (senhaNova.length >= 8 &&
                  senhaNova === senhaNovaConf )
                    {
                    firestore.collection('usuario').doc(auth.currentUser.uid).update({senha:senhaNovaConf })
                    console.log(senhaNovaConf)
                    auth.currentUser.updatePassword(senhaNovaConf).catch(error=>console.log(error))
                }
            }}
        >
            <Text style={styles.textButtons}>Salvar</Text>
        </TouchableOpacity>
        
        {verificarLetrasMaiusculas() === false && senhaNova.length >= 8 ? (
            <View style={styles.error}>
                <Text style={styles.errorText}>A sua senha deve conter uma letra maiúscula</Text>
            </View>
        ) : verificarLetrasMinusculas() === false && senhaNova.length >= 8 && verificarLetrasMaiusculas() === true ? (
            <View style={styles.error}>
                <Text style={styles.errorText}>A sua senha deve conter uma letra minúscula</Text>
            </View>
        ) : verificarNumeros() === false && verificarLetrasMinusculas() === true && senhaNova.length >= 8 && verificarLetrasMaiusculas() === true ? (
            <View style={styles.error}>
                <Text style={styles.errorText}>A sua senha deve conter um número</Text>
            </View>
        ) : verificarCaracteresEspeciais() === false && verificarNumeros() === true && verificarLetrasMinusculas() === true && senhaNova.length >= 8 && verificarLetrasMaiusculas() === true ? (
            <View style={styles.error}>
                <Text style={styles.errorText}>A sua senha deve conter um caractere especial</Text>
            </View>
        ) : null}
        
    </>
)}

            <TouchableOpacity
              style={styles.buttons}
              onPress={() => {
                auth.currentUser.updatePassword(senha) 
                tabelaUsuario.doc(auth.currentUser.uid).update({senha:senha})}}>
              <Text style={styles.textButtons}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
             </KeyboardAwareScrollView>
    </View>
  );
}
