import React from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles"
import SelectList from "./selectList"
import TipoLogradouro from "./tipoLogradouro.js";





export default function AddHome({navigation}){
    return(
        <View>
            <ScrollView
            // Para deixar a tela rolavel
            >
            <View style={styles.container}
            // Container principal
            >
                <View style={styles.row1}
                // Linha para informar o que os usuários precisam saber
                >
                    <Text style={styles.textTitle}>Insira os dados, para que possamos recomendar pontos mais próximos.</Text>
                </View>
                <View style={styles.row2}
                // Campo para pegar o apelido
                >
                    <Text style={styles.textIsInput}
                    // Campo para pegar o apelido
                    >Nome da empresa:</Text>
                    <TextInput style={styles.textInput}/>
                </View>

                <View style={styles.row3}>
                <Text style={styles.textIsInput}>Logradouro:</Text>
                    <View style={styles.column1}
                    // Campo para pegar o logradouro
                    >
                        
                        <View style={styles.logradouro}>
                            <TipoLogradouro/>
                            <TextInput style={styles.textInputLogradouro}/>
                        </View>
                        
                        
                        

                    </View>
                </View>

                <View style={styles.row7}>
                <View style={styles.column2}
                    // Campo para pegar o número
                    >
                        <Text style={styles.textIsInput}>Número:</Text>
                        <TextInput style={styles.textInputNumber}
                        keyboardType="number-pad"
                        />
                    </View>
                </View>

                <View style={styles.row4}
                // Campo para pegar o complemento
                >
                    <Text style={styles.textIsInput}>Complemento:</Text>
                    <TextInput style={styles.textInput}/>
                </View>

                <View style={styles.row5}>
                    <View style={styles.column3
                    // Campo para pegar o CEP
                    }>
                        <Text style={styles.textIsInput}>CEP:</Text>
                        <TextInput style={styles.textInputCep}
                        keyboardType="number-pad"
                        />
                    </View>
                    <View style={styles.column4}
                    // Campo para pegar o bairro
                    >
                        <Text style={styles.textIsInput}>Bairro:</Text>
                        <TextInput style={styles.textInputBairro}/>
                    </View>
                </View>

                <View style={styles.row6}>
                    <View style={styles.column6}
                    // Campo para pegar o município
                    >
                        <Text style={styles.textIsInput}>Município:</Text>
                        <TextInput style={styles.textInputMunicipio}/>
                    </View>
                    <View style={styles.column5}
                    // Campo para pegar o estado
                    >
                        <Text style={styles.textIsInputEstado}>Estado:</Text>
                        <SelectList/>
                    </View>
                </View>
                <TouchableOpacity style={styles.editionButton}
                onPressIn={()=> navigation.navigate("HouseAndWork")}
                // Direcionar para página de Casa e Trabalho
                >
                    <Text style={styles.textButton}>Editar</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
