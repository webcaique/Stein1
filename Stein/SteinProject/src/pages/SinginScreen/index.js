import React, { useState, useEffect } from "react";
import {View, Text, Pressable, Keyboard, TextInput, TouchableOpacity, KeyboardAvoidingView} from "react-native"
import styles from "./style"
import {auth} from "../../config/configFirebase.js"
import firebase from "../../config/configFirebase.js"

export default function SinginScreen({navigation}){

    const [nomeUsuario, setNomeUsuario] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorRegister, setErrorRegister] = useState("")

    const register = ()=>{
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
        
            let user = userCredential.user;
            console.log(user)
            navigation.navigate("QuemSomos")
            // navigation.navigate("teste", {idUser: user.uid})
        })
        .catch((error) => {
            setErrorRegister(true)
            let errorCode = error.code;
            let errorMessage = error.message;
        
        });
        }
    
        useEffect(()=>{
    
        }, []);

    return(

        <View style={styles.conteiner} 
        //Container principal
        >
        <KeyboardAvoidingView>
        <Pressable // Deixa a página clicável para desativar o teclado do usuário
            onPress={Keyboard.dismiss}>
                <View style={styles.conteiner} 
                //Container para retirar bugs do Pressable
                >
            
                
                <TextInput //campo para escrever seu apelido no aplicativo
                placeholder="Nome"
                placeholderTextColor={"#000000"}
                style={styles.textInput1} 
                keyboardType="email-address" 
                returnKeyLabel="email"
                autoCapitalize='sentences'
                onChangeText={(text)=>setNomeUsuario(text)}
                value={nomeUsuario}
                />
                <TextInput // campo para colocar o email
                placeholder="Email"
                placeholderTextColor={"#000000"}
                style={styles.textInputAll} 
                keyboardType="email-address" 
                returnKeyLabel="email"
                autoCapitalize="none"
                onChangeText={(text)=>setEmail(text)}
                value={email}
                />
                <TextInput // campo para colocar o senha
                style={styles.textInputAll} 
                placeholder="Senha"
                placeholderTextColor={"#000000"}
                returnKeyLabel="Senha"
                autoCapitalize="none"
                secureTextEntry={true}
                password={true} 
                autoCorrect={false}
                textContentType={'password'}
                onChangeText={(text)=>setPassword(text)}
                value={password}
                />

                <TextInput // campo para confirmar sua senha
                style={styles.textInputAll} 
                placeholder="Confirmar senha"
                placeholderTextColor={"#000000"}
                returnKeyLabel="Senha"
                autoCapitalize="none"
                secureTextEntry={true}
                password={true} 
                autoCorrect={false}
                textContentType={'password'}
                onChangeText={(text)=>setConfirmPassword(text)}
                value={confirmPassword}
                />
                <View styles={styles.viewButton}
                //Container do botão para cadastrar o usuário
                >
                    {email === "" || password === "" || confirmPassword === "" || nomeUsuario === ""
        ?
            <TouchableOpacity style={styles.buttons} 
            //Botão para fazer o login e fazer a verificação de dados
            disabled={true}>
                <Text style={styles.textButtons}>Entrar</Text>
            </TouchableOpacity>
        :
            <TouchableOpacity style={styles.buttons} 
            //Botão para fazer o login e fazer a verificação de dados
            onPress={register}>
                <Text style={styles.textButtons}>Entrar</Text>
            </TouchableOpacity>
        }
                    <View style={styles.loginLink}
                    //Link para entrar na tela de login
                    >    
                        <Text style={styles.textLogin}
                        //Texto de explicação caso já possio cadastro
                        > Já possui cadastro? </Text>
                        <TouchableOpacity style={styles.loginButton}
                        onPress={()=> navigation.navigate("LoginScreen")}
                        //Link para ir para tela de login
                        >
                                <Text style={styles.textLoginButton}
                                //Text do link
                                >
                                    Entrar
                                </Text>
                        </TouchableOpacity>
                </View>
            </View>
        

            </View>
        </Pressable>
        </KeyboardAvoidingView>
        </View>
    )

}