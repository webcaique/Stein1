import React from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";

import styles from "./styles"


export default function ChangePassword({navigation}){
    return(
        <View style={styles.container}>
            <Text style={styles.texto}>Crie uma senha mais forte e uma conta mais segura.</Text>
        <View style={styles.coop}> 
            <TextInput placeholder="Nova senha" style={styles.senha}>
                </TextInput>
            <TextInput placeholder="confirmar senha" style={styles.senha}>
            </TextInput>
        </View>
        <View>
        <TouchableOpacity style={styles.buttons} 
            onPress={()=> navigation.navigate("QuemSomos")}>
                 <Text style={styles.textButtons}>salvar</Text>
                </TouchableOpacity>
                </View>
        </View>
    )}

