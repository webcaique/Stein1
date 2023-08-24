import React from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";

import styles from "./style"


export default function ForgotPassword({navigation}){
    return(
        <View style={styles.container}>
            <Text style={styles.texto}>Informe o e-mail associado à sua conta para alterar sua senha. </Text>
        <View style={styles.coop}> 
            <TextInput placeholder="E-mail" style={styles.senha}>
                </TextInput>
       
        </View>
        <View>
        <TouchableOpacity style={styles.buttons} 
            onPress={()=> navigation.navigate("ChangePassword")}>
                 <Text style={styles.textButtons}>Avançar</Text>
                </TouchableOpacity>
                </View>
        </View>
    )}

