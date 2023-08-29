import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles"
import SelectList from "./selectList"
import TipoLogradouro from "./tipoLogradouro.js";
import { firestore } from "../../config/configFirebase";
import TabelaCarregadores from "../componenteTabelaCarregadores.js"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddHome({navigation}){

    
    const tabelaLogra = firestore.collection("logradouro");
    const tabelaLocal = firestore.collection("local");

    const [ligarTabelaCarregadores, setligarTabelaCarregadores] = useState(true);
    const [name, setName] = useState();
    const [logra, setLogra] = useState();
    const [numero, setNumero] = useState();
    const [complemento, setComplemento] = useState();
    const [cepInput, setCep] = useState();
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
    console.log(cepInput);
    console.log(bairro);
    console.log(cidade);

    const addData = async () =>{
        if(selectedTipoLogra != undefined && selectedUf != undefined && name != undefined && logra != undefined && numero != undefined && cepInput != undefined && bairro != undefined && cidade != undefined ){
            let count = 0;
            const snapshotLogra = await tabelaLogra.get();
            const listaLogra = [];
            const testarExistente = [];
            snapshotLogra.forEach((doc)=>{
                listaLogra.push({id: doc.id, ...doc.data() });
            });
            listaLogra.forEach((doc)=>{
                if(count < doc.id){
                    count = doc.id;
                };
            });
            count++;
            let testeLogra = {
                CEP: `${cepInput}`,
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
            };
            console.log(listaLogra.length);
            listaLogra.forEach(
                (datas)=>{
                    if(datas.CEP == testeLogra.CEP && datas.numero == testeLogra.numero){
                        return;
                    };
                }
            )


            console.log("TESTE LOGRA");
            console.log(testeLogra);
            console.log("TESTE LOGRA");
            console.log("BD");
            console.log(testarExistente);
            console.log("BD");

            tabelaLogra.doc(`${count}`).set(testeLogra). 
            then(()=>{
                console.log("ADICIONADO!");
            });

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
                        <View>
                        <Text style={styles.textIsInput}>Número:</Text>
                        <TextInput style={styles.textInputNumber}
                        onChangeText={setNumero}
                        value={numero}
                        keyboardType="number-pad"
                        />
                        </View>
                        <TouchableOpacity style={styles.btnCarregadores}
                        onPress={()=>{
                            setligarTabelaCarregadores(!ligarTabelaCarregadores)
                        }}
                        >
                            <Text style={styles.textIsInput}>Carregadores</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:"100%", alignItems:"center"}}>
                        {ligarTabelaCarregadores?<TabelaCarregadores notFiltro={true}/>:<View/>}
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
                        value={cepInput}
                        keyboardType="number-pad"
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
