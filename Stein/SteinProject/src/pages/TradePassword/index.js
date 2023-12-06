/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';
import { firestore } from '../../config/configFirebase';
import styles from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth } from '../../config/configFirebase';
import CheckBox from '@react-native-community/checkbox';
import { RFValue } from 'react-native-responsive-fontsize';

/**
 * Componente funcional para a página de edição de senha.
 * @param {object} navigation - O objeto de navegação utilizado para transição entre telas.
 */
export default function TradePassword({ navigation }) {
  // Estados para armazenar as senhas e configurações de visibilidade
  const [senha, setSenha] = useState('');
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [senhaAntigaConf, setSenhaAntigaConf] = useState('');
  const [senhaNovaConf, setSenhaNovaConf] = useState('');
  const [mostrar, setMostrar] = useState(false);
  const [senhaNova, setSenhaNova] = useState('');

  // Referência à tabela de usuários no Firestore
  const tabelaUsuario = firestore.collection('usuario');

  // Efeito para carregar a senha antiga do usuário ao iniciar a página
  useEffect(() => {
    tabelaUsuario.onSnapshot(datas => {
      datas._docs.forEach(data => {
        if (auth.currentUser.uid == data._ref._documentPath._parts[1]) {
          setSenhaAntiga(data._data.senha);
        }
      });
    });
  });

  // Efeito para carregar a senha atualizada do usuário ao alterar a senha
  useEffect(() => {
    firestore.collection('usuario').onSnapshot(query => {
      query._docs.forEach(usuario => {
        if (usuario._ref._documentPath._parts[1] == auth.currentUser.uid) {
          setSenha(usuario._data.senha);
        }
      });
    });
  });

  // Função para verificar se a senha contém caracteres especiais
  const verificarCaracteresEspeciais = () => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    return regex.test(senhaNova);
  };

  // Manipulador para verificar caracteres especiais ao alterar a senha
  const handleVerificarCaracteresEspeciais = () => {
    const contemEspeciais = verificarCaracteresEspeciais();
    // Lógica adicional, se necessário
  };

  // Função para verificar se a senha contém números
  const verificarNumeros = () => {
    const regex = /\d/;
    return regex.test(senhaNova);
  };

  // Manipulador para verificar números ao alterar a senha
  const handleVerificarNumeros = () => {
    const contemNumeros = verificarNumeros();
    // Lógica adicional, se necessário
  };

  // Função para verificar se a senha contém letras maiúsculas
  const verificarLetrasMaiusculas = () => {
    for (let i = 0; i < senhaNova.length; i++) {
      if (
        senhaNova[i] === senhaNova[i].toUpperCase() &&
        senhaNova[i] !== senhaNova[i].toLowerCase()
      ) {
        // Se o caractere atual for uma letra maiúscula
        return true;
      }
    }
    // Se nenhum caractere maiúsculo for encontrado
    return false;
  };

  // Função para verificar se a senha contém letras minúsculas
  const verificarLetrasMinusculas = () => {
    for (let i = 0; i < senhaNova.length; i++) {
      if (
        senhaNova[i] === senhaNova[i].toLowerCase() &&
        senhaNova[i] !== senhaNova[i].toUpperCase()
      ) {
        // Se o caractere atual for uma letra minúscula
        return true;
      }
    }
    // Se nenhum caractere minúsculo for encontrado
    return false;
  };

  return (
    <View style={{ height: '100%', minHeight: '100%' }}>
      <KeyboardAwareScrollView>
        {/* //Caso a página fique maior que a tela, objetivo de responsividade  */}

        <Pressable
          style={{ width: '100%', height: '100%' }}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.caixa}>
            <Text style={styles.texto1}>
              Crie uma senha mais forte e uma conta mais segura.
            </Text>

            <View style={styles.caixa2}>
              {/* Campo para a senha antiga */}
              <TextInput
                style={styles.TextInput}
                placeholder="Senha antiga"
                placeholderTextColor={'#000000'}
                returnKeyLabel="senha antiga"
                autoCapitalize="none"
                secureTextEntry={!mostrar}
                password={true}
                autoCorrect={false}
                textContentType={'password'}
                onBlur={() => {
                  if (senhaAntiga != senhaAntigaConf) {
                    console.log('');
                  }
                }}
                onChangeText={setSenhaAntigaConf}
                value={senhaAntigaConf}
              />

              {/* Campo para a nova senha */}
              <TextInput
                style={styles.TextInput}
                placeholder="Alterar Senha"
                placeholderTextColor={'#000000'}
                returnKeyLabel="Alterar Senha"
                autoCapitalize="none"
                secureTextEntry={!mostrar}
                password={true}
                autoCorrect={false}
                textContentType={'password'}
                onChangeText={setSenhaNova}
                value={senhaNova}
              />

              {/* Campo para confirmar a nova senha */}
              <TextInput
                style={styles.TextInput1}
                placeholder="Confirmar nova senha"
                placeholderTextColor={'#000000'}
                returnKeyLabel="Confirmar nova senha"
                autoCapitalize="none"
                secureTextEntry={!mostrar}
                password={true}
                autoCorrect={false}
                textContentType={'password'}
                onBlur={() => {
                  if (senhaNovaConf != senhaNova) {
                    console.log('');
                  }
                }}
                onChangeText={setSenhaNovaConf}
                value={senhaNovaConf}
              />
            </View>

            {/* CheckBox para mostrar/ocultar a senha */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                marginLeft: 35,
              }}
            >
              <CheckBox
                value={mostrar}
                onValueChange={newValue => setMostrar(newValue)}
                tintColors={{ true: '#000000' }}
              />
              <Text style={{ color: '#000', fontSize: RFValue(15) }}>
                Mostrar senha
              </Text>
            </View>

            {/* Condições para habilitar ou desabilitar o botão 'Salvar' */}
            {senha === '' ||
            senhaNova.length < 8 ||
            verificarLetrasMaiusculas() === false ||
            verificarLetrasMinusculas() === false ||
            verificarNumeros() === false ||
            verificarCaracteresEspeciais() === false ||
            senhaNova.length < 8 ? (
              <>
                {/* Botão desabilitado caso as condições não sejam atendidas */}
                <TouchableOpacity style={styles.buttons} disabled={true}>
                  <Text style={styles.textButtons}>Salvar</Text>
                </TouchableOpacity>

                {/* Exibição de mensagens de erro, se aplicável */}
                {verificarLetrasMaiusculas() === false &&
                senhaNova.length >= 8 ? (
                  <View style={styles.error}>
                    <Text style={styles.errorText}>
                      A sua senha deve conter uma letra maiúscula
                    </Text>
                  </View>
                ) : verificarLetrasMinusculas() === false &&
                  senhaNova.length >= 8 &&
                  verificarLetrasMaiusculas() === true ? (
                  <View style={styles.error}>
                    <Text style={styles.errorText}>
                      A sua senha deve conter uma letra minúscula
                    </Text>
                  </View>
                ) : verificarNumeros() === false &&
                  verificarLetrasMinusculas() === true &&
                  senhaNova.length >= 8 &&
                  verificarLetrasMaiusculas() === true ? (
                  <View style={styles.error}>
                    <Text style={styles.errorText}>
                      A sua senha deve conter um número
                    </Text>
                  </View>
                ) : verificarCaracteresEspeciais() === false &&
                  verificarNumeros() === true &&
                  verificarLetrasMinusculas() === true &&
                  senhaNova.length >= 8 &&
                  verificarLetrasMaiusculas() === true ? (
                  <View style={styles.error}>
                    <Text style={styles.errorText}>
                      A sua senha deve conter um caractere especial
                    </Text>
                  </View>
                ) : null}
                {senha != senhaAntigaConf && senhaAntigaConf.length > 0 ? (
                  <View style={styles.error}>
                    <Text style={styles.errorText}>
                      Senha antiga incorreta
                    </Text>
                  </View>
                ) : null}
                {senhaNova.length < 8 ? (
                  <View style={styles.error}>
                    <Text style={styles.errorText}>
                      Senha deve ter mais de 8 caracteres
                    </Text>
                  </View>
                ) : null}
              </>
            ) : (
              <>
                {/* Exibição de mensagens de erro, se aplicável */}
                {senhaNova.length >= 8 && senhaNova === senhaNovaConf ? null : (
                  <View style={styles.error}>
                    <Text style={styles.errorText}>
                      As senhas devem ser iguais
                    </Text>
                  </View>
                )}
                {/* Botão habilitado caso as condições sejam atendidas */}
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={async () => {
                    if (senhaNova.length >= 8 && senhaNova === senhaNovaConf) {
                      // Atualiza a senha no Firebase Authentication e Firestore
                      await auth.currentUser
                        .updatePassword(senhaNovaConf)
                        .then(async () => {
                          await firestore
                            .collection('usuario')
                            .doc(auth.currentUser.uid)
                            .update({ senha: senhaNovaConf });
                        })
                        .catch(error => {
                          // Exibe um alerta em caso de erro ao atualizar a senha
                          Alert.alert(
                            'NÃO É POSSÍVEL REALIZAR A TROCA DE SENHA',
                            'Você precisa relogar na sua conta para realizar a ação. Deseja desconectar da conta?',
                            [
                              {
                                text: 'Sim',
                                onPress: async () => {
                                  await auth.signOut();
                                },
                              },
                              {
                                text: 'Não',
                              },
                            ]
                          );
                        });
                      // Navega para a tela desejada após a atualização bem-sucedida
                      navigation.navigate('PersonalContentScreen');
                    }
                  }}
                >
                  <Text style={styles.textButtons}>Salvar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
}
