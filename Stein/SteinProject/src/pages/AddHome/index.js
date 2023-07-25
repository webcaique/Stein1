import React from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import styles from "./styles"

export default function AddHome({navigation}){
    return(
        <View>
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.row1}>
                    <Text>Insira os dados, para que possamos recomendar pontos mais próximos.</Text>
                </View>
                <View style={styles.row2}>
                    <Text style={styles.textIsInput}>Nome da residência:</Text>
                    <TextInput style={styles.textInput}/>
                </View>

                <View style={styles.row3}>
                    <View style={styles.column1}>
                        <Text style={styles.textIsInput}>Logradouro:</Text>
                        <TextInput style={styles.textInputLogradouro}/>
                    </View>
                    <View style={styles.column2}>
                        <Text style={styles.textIsInput}>Número:</Text>
                        <TextInput style={styles.textInputNumber}/>
                    </View>
                </View>

                <View style={styles.row4}>
                    <Text style={styles.textIsInput}>Complemento:</Text>
                    <TextInput style={styles.textInputCep}/>
                </View>

                <View style={styles.row5}>
                    <View style={styles.column3}>
                        <Text style={styles.textIsInput}>CEP:</Text>
                        <TextInput style={styles.textInput}/>
                    </View>
                    <View style={styles.column4}>
                        <Text style={styles.textIsInput}>Bairro:</Text>
                        <TextInput style={styles.textInput}/>
                    </View>
                </View>

                <View style={styles.row6}>
                    <View>
                        <Text style={styles.textIsInput}>Município:</Text>
                        <TextInput style={styles.textInput}/>
                    </View>
                    <Text style={styles.textIsInput}>Estado:</Text>
                    
                </View>
                </View>
            </ScrollView>
        </View>
    )
}