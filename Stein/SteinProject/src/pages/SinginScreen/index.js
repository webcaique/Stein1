import React from "react";
import {View, Text, Pressable, Keyboard, TextInput, TouchableOpacity} from "react-native"
import styles from "./style"

const SinginScreen = ({navigation}) => {
    return(
        <Pressable style={{width:"100%", height:"100%"}}
            onPress={Keyboard.dismiss}>
            <View style={styles.conteiner}>
                
                <TextInput
                placeholder="Nome"
                placeholderTextColor={"#000000"}
                style={styles.textInput1} 
                keyboardType="email-address" 
                returnKeyLabel="email"
                autoCapitalize='sentences'
                />
                <TextInput
                placeholder="Email"
                placeholderTextColor={"#000000"}
                style={styles.textInputAll} 
                keyboardType="email-address" 
                returnKeyLabel="email"
                autoCapitalize="none"
                />
                <TextInput style={styles.textInputAll} 
                placeholder="Senha"
                placeholderTextColor={"#000000"}
                returnKeyLabel="Senha"
                autoCapitalize="none"
                secureTextEntry={true}
                password={true} 
                autoCorrect={false}
                textContentType={'password'}/>

                <TextInput style={styles.textInputAll} 
                placeholder="Confirmar senha"
                placeholderTextColor={"#000000"}
                returnKeyLabel="Senha"
                autoCapitalize="none"
                secureTextEntry={true}
                password={true} 
                autoCorrect={false}
                textContentType={'password'}/>
                <View styles={styles.viewButton}>
                    <TouchableOpacity style={styles.buttons} 
                    onPress={()=> navigation.navigate("LoginScreen")}>
                        <Text style={styles.textButtons}>Cadastrar</Text>
                    </TouchableOpacity>
                    <View style={styles.singinLink}>    
                        <Text style={styles.textSigin}> Já possui cadastro? </Text>
                        <TouchableOpacity style={styles.siginButton}
                        onPress={()=> navigation.navigate("LoginScreen")}
                        >
                                <Text style={styles.textSiginButton}>
                                    Entrar
                                </Text>
                        </TouchableOpacity>
                </View>
            </View>
        </View>

        
        </Pressable>
    )

}
export default SinginScreen;