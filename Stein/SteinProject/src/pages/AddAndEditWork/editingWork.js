import React from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles"
import SelectList from "./selectList"





export default function AddHome({navigation}){
    return(
        <View>
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.row1}>
                    <Text style={styles.textTitle}>Insira os dados, para que possamos recomendar pontos mais próximos.</Text>
                </View>
                <View style={styles.row2}>
                    <Text style={styles.textIsInput}>Nome da empresa:</Text>
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
                    <TextInput style={styles.textInput}/>
                </View>

                <View style={styles.row5}>
                    <View style={styles.column3}>
                        <Text style={styles.textIsInput}>CEP:</Text>
                        <TextInput style={styles.textInputCep}/>
                    </View>
                    <View style={styles.column4}>
                        <Text style={styles.textIsInput}>Bairro:</Text>
                        <TextInput style={styles.textInputBairro}/>
                    </View>
                </View>

                <View style={styles.row6}>
                    <View style={styles.column6}>
                        <Text style={styles.textIsInput}>Município:</Text>
                        <TextInput style={styles.textInputMunicipio}/>
                    </View>
                    <View style={styles.column5}>
                        <Text style={styles.textIsInputEstado}>Estado:</Text>
                        <SelectList/>
                    </View>
                </View>
                <TouchableOpacity style={styles.editionButton}
                onPressIn={()=> navigation.navigate("HouseAndWork")}
                >
                    <Text style={styles.textButton}>Editar</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
