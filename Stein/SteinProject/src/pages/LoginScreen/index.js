import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Image,ScrollView, Pressable, Keyboard, KeyboardAvoidingView, Platform} from "react-native";
import styles from "./style.js"
import CheckBox from '@react-native-community/checkbox';
import {auth} from "../../config/configFirebase.js"
import firebase from "../../config/configFirebase.js"

export default function LoginScreen({navigation}){
    const [checked, setChecked] = useState(true);
    const toggleCheckbox = () => setChecked(!checked); // Deixar marcado ou não o checkBox
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorLogin, setErrorLogin] = useState("")

    const loginFirebase = ()=>{
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
    
        let user = userCredential.user;
        console.log(user)
        navigation.navigate("QuemSomos")
        // navigation.navigate("teste", {idUser: user.uid})
    })
    .catch((error) => {
        setErrorLogin(true)
        let errorCode = error.code;
        let errorMessage = error.message;
    
    });
    }

    useEffect(()=>{

    }, []);

    return(
        <KeyboardAvoidingView>
        <View style={{backgroundColor:"#fff", height:"100%"}} 
        //Container para fazer a página ocupar toda tela
        >
            <ScrollView 
            //Caso a página fique maior que a tela, objetivo de responsividade 
            >
            <Pressable style={{width:"100%", height:"100%"}}
            onPress={Keyboard.dismiss} 
            // Deixa a página clicável para desativar o teclado do usuário
            > 
            <View style={styles.conteiner}
            //Container principal
            >
                
                <TextInput //Campo para colocar o email
                placeholder="Email"
                placeholderTextColor={"#000000"}
                style={styles.textInput1} 
                keyboardType="email-address" 
                returnKeyLabel="email"
                autoCapitalize="none"
                onChangeText={(text)=>setEmail(text)}
                value={email}
                />
                <TextInput //Campo para colocar a senha
                style={styles.textInput2} 
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
                <View style={styles.checkBox}>
                    <CheckBox //Para salvar a senha na memério do dispositivo e colocá-la no campo sem que o usuário digite
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        tintColors={{true: "#000000"}}
                        style={{padding: 10}}
                        //Os textos abaixos compõem a CheckBox
                    />
                    <Text style={styles.textCheckbox}> Salve a senha</Text>
                </View>
                <View style={styles.linhas}>
                    <View style={styles.linha1}
                    //Linhas para centralizar o ou na tela
                    ></View>
                    <Text style={styles.textBetweenLines}
                    //Texto para mostrar outra forma de logar
                    >OU</Text>
                    <View style={styles.linha2}
                    //Linhas para centralizar o ou na tela
                    ></View>
                </View>
                <View style={styles.logos}>
            <TouchableOpacity
            // Botão para logar com o Facebook
            >
                <Image source={{
                    uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2FfacebookIcon.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
                    }} style={styles.img1}/>
            </TouchableOpacity>
            
            <TouchableOpacity
            // Botão para logar com o Google
            >
                <Image source={{
                    uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2FgoogleIcon.png?alt=media&token=ce712efb-d006-47bf-8228-d81d4944bfff"
                    }} style={styles.img2}/>
            </TouchableOpacity>
            
            </View>

        {email === "" || password === ""
        ?
            <TouchableOpacity style={styles.buttons} 
            //Botão para fazer o login e fazer a verificação de dados
            disabled={true}>
                <Text style={styles.textButtons}>Entrar</Text>
            </TouchableOpacity>
        :
            <TouchableOpacity style={styles.buttons} 
            //Botão para fazer o login e fazer a verificação de dados
            onPress={()=> {
                loginFirebase()
                }
                }>
                <Text style={styles.textButtons}>Entrar</Text>
            </TouchableOpacity>
        }
            <View>
                {errorLogin === true
                    ?
                    <View>
                        <Text>email ou/e senha inválidos</Text>
                    </View>
                    :
                    <View/>
                }
            </View>
            <View style={styles.singinLink}
            //Container do link
            >    
                <Text style={styles.textSigin}
                //Texto para "explicar" o link
                > Não possui conta? </Text>
                <TouchableOpacity style={styles.siginButton}
                // Link para direcionar para a tela de cadastro
                onPress={()=> navigation.navigate("SinginScreen")}
                >
                        <Text style={styles.textSiginButton}>
                            Cadastrar-se
                        </Text>
                    </TouchableOpacity>
            </View>
        </View>
        </Pressable>
            </ScrollView>
        </View>
        </KeyboardAvoidingView>
    )
}


