import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Image,ScrollView, Pressable, Keyboard} from "react-native";
import styles from "./style.js"
import CheckBox from '@react-native-community/checkbox';



export default function LoginScreen({navigation}){
    const [checked, setChecked] = useState(true);
    const toggleCheckbox = () => setChecked(!checked);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    return(
        <View style={{backgroundColor:"#fff", height:"100%"}}>
            <ScrollView>
            <Pressable style={{width:"100%", height:"100%"}}
            onPress={Keyboard.dismiss}>
            <View style={styles.conteiner}>
                
                <TextInput 
                placeholder="Email"
                placeholderTextColor={"#000000"}
                style={styles.textInput1} 
                keyboardType="email-address" 
                returnKeyLabel="email"
                autoCapitalize="none"
                />
                <TextInput style={styles.textInput2} 
                placeholder="Senha"
                placeholderTextColor={"#000000"}
                returnKeyLabel="Senha"
                autoCapitalize="none"
                secureTextEntry={true}
                password={true} 
                autoCorrect={false}
                textContentType={'password'}/>
                <View style={styles.checkBox}>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        tintColors={{true: "#000000"}}
                        style={{padding: 10}}
                    />
                    <Text style={styles.textCheckbox}> Salve a senha</Text>
                </View>
                <View style={styles.linhas}>
                    <View style={styles.linha1}></View>
                    <Text style={styles.textBetweenLines}>OU</Text>
                    <View style={styles.linha2}></View>
                </View>
                <View style={styles.logos}>
            <TouchableOpacity>
                <Image source={require("../../../assets/Icons/facebookIcon.png")} style={styles.img1}/>
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Image source={require("../../../assets/Icons/googleIcon.png")} style={styles.img2}/>
            </TouchableOpacity>
            
            </View>
            <TouchableOpacity style={styles.buttons} 
            onPress={()=> navigation.navigate("QuemSomos")}>
                <Text style={styles.textButtons}>Entrar</Text>
            </TouchableOpacity>
            <View style={styles.singinLink}>    
                <Text style={styles.textSigin}> Não possui conta? </Text>
                <TouchableOpacity style={styles.siginButton}
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
    )
}


