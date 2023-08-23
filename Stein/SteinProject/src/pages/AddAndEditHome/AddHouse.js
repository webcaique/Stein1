import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles"
import SelectList from "./selectList"
import TipoLogradouro from "./tipoLogradouro.js";
import { firestore } from "../../config/configFirebase";


export default function AddHome({navigation}){


    const tabelaLogra = firestore.collection("logradouro");
    const tabelaLocal = firestore.collection("local");

    const [name, setName] = useState();
    const [logra, setLogra] = useState();
    const [numero, setNumero] = useState();
    const [complemento, setComplemento] = useState();
    const [cep, setCep] = useState();
    const [bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [selectedUf, setSelectedUf] = useState("");
    const [selectedTipoLogra, setSelectedTipoLogra] = useState("");

    const handleUfChange = (uf) => {
        setSelectedUf(uf);
    };

    const handleTipoLograChange = (tipoLogra) => {
        setSelectedTipoLogra(tipoLogra);
    };

    console.log(selectedUf);
    console.log(selectedTipoLogra);
    console.log(name);
    console.log(logra);
    console.log(numero);
    console.log(complemento);
    console.log(cep);
    console.log(bairro);
    console.log(cidade);

    const addData = async () =>{
        if(selectedTipoLogra != undefined && selectedUf != undefined && name != undefined && logra != undefined && numero != undefined && cep != undefined && bairro != undefined && cidade != undefined ){
            let count = 0;
            const snapshot = await tabelaLogra.get();
            snapshot.forEach(()=>{
                count++;
            });
            count++
            tabelaLogra.doc(`${count}`).set({
                CEP: `${cep}`,
                UF: `${selectedUf}`,
                bairro: `${bairro}`,
                cidade: `${cidade}`,
                complemento: `${complemento}`,
                geolocalizacao: {
                    Latitude: "TESTE",
                    Longitude: "TESTE",
                },
                logradouro: `${logra}`,
                numero: `${numero}`,
                tipoLogradouro: `${selectedTipoLogra}`,
            }). 
            then(()=>{
                console.log("ADICIONADO!");
            })
        }
    }
    

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
                    >Nome da residência:</Text>
                    <TextInput style={styles.textInput}
                    onChangeText={setName}
                    value={name}
                    />
                </View>

                <View style={styles.row3}>
                <Text style={styles.textIsInput}>Logradouro:</Text>
                    <View style={styles.column1}
                    // Campo para pegar o logradouro
                    >
                        
                        <View style={styles.logradouro}>
                            <TipoLogradouro onTipoLograChange={handleTipoLograChange}/>
                            <TextInput style={styles.textInputLogradouro}
                            onChangeText={setLogra}
                            value={logra}
                            />
                        </View>
                        
                        
                        

                    </View>
                </View>

                <View style={styles.row7}>
                <View style={styles.column2}
                    // Campo para pegar o número
                    >
                        <Text style={styles.textIsInput}>Número:</Text>
                        <TextInput style={styles.textInputNumber}
                        onChangeText={setNumero}
                        value={numero}
                        />
                    </View>
                </View>

                <View style={styles.row4}
                // Campo para pegar o complemento
                >
                    <Text style={styles.textIsInput}>Complemento:</Text>
                    <TextInput style={styles.textInput}
                    onChangeText={setComplemento}
                    value={complemento}
                    />
                </View>

                <View style={styles.row5}>
                    <View style={styles.column3
                    // Campo para pegar o CEP
                    }>
                        <Text style={styles.textIsInput}>CEP:</Text>
                        <TextInput style={styles.textInputCep}
                        onChangeText={setCep}
                        value={cep}
                        />
                    </View>
                    <View style={styles.column4}
                    // Campo para pegar o bairro
                    >
                        <Text style={styles.textIsInput}>Bairro:</Text>
                        <TextInput style={styles.textInputBairro}
                        onChangeText={setBairro}
                        value={bairro}
                        />
                    </View>
                </View>

                <View style={styles.row6}>
                    <View style={styles.column6}
                    // Campo para pegar o município
                    >
                        <Text style={styles.textIsInput}>Município:</Text>
                        <TextInput style={styles.textInputMunicipio}
                        onChangeText={setCidade}
                        value={cidade}
                        />
                    </View>
                    <View style={styles.column5}
                    // Campo para pegar o estado
                    >
                        <Text style={styles.textIsInputEstado}>Estado:</Text>
                        <SelectList onUfChange={handleUfChange} />
                    </View>
                </View>
                <TouchableOpacity style={styles.editionButton}
                onPressIn={()=> {
                    navigation.navigate("HouseAndWork")
                    addData();
            
            }}
                // Direcionar para página de Casa e Trabalho
                >
                    <Text style={styles.textButton}>Adicionar</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
