import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles"

export default function (){
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnSwitch}>
                <Text> Casa </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSwitch}>
                <Text> Trabalho </Text>
            </TouchableOpacity>
        </View>
    )
}