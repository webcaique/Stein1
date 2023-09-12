import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles"
import SelectList from "./selectList"
import TipoLogradouro from "./tipoLogradouro.js";
import { firestore } from "../../config/configFirebase";
import TabelaCarregadores from "../componenteTabelaCarregadores.js"



export default function AddHome({navigation}){

    
    const tabelaLogra = firestore.collection("logradouro");
    const tabelaLocal = firestore.collection("local");

    const [carregadores, setCarregadores] = useState();
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

    const toggleCarregadorSelection = (carr)=>{
        setCarregadores(carr);
    }


    console.log(selectedUf);
    console.log(selectedTipoLogra);
    console.log(name);
    console.log(logra);
    console.log(numero);
    console.log(complemento);
    console.log(cepInput);
    console.log(bairro);
    console.log(cidade);

    const addDataLogradouro = async () =>{
        if(selectedTipoLogra != undefined && selectedUf != undefined && name != undefined && logra != undefined && numero != undefined && cepInput != undefined && bairro != undefined && cidade != undefined ){
            let countLogra = 0;
            const snapshotLogra = await tabelaLogra.get();
            const listaLogra = [];
            snapshotLogra.forEach((doc)=>{
                listaLogra.push({id: doc.id, ...doc.data() });
            });
            listaLogra.forEach((doc)=>{
                if(countLogra < parseInt(doc.id)){
                    countLogra = parseInt(doc.id);
                };
            });
            countLogra++;
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

            tabelaLogra.doc(`${countLogra}`).set(testeLogra). 
            then(()=>{
                console.log("ADICIONADO!");
            });

            const snapshotLocal = await tabelaLocal.get();
            const listaLocal = [];
            snapshotLocal.forEach((data)=>{
                listaLocal.push({id: data.id, ...data.data()});
            });

            let countLocal = 0;
            listaLocal.forEach((doc)=>{
                if(countLocal < parseInt(doc.id)){
                    countLocal = parseInt(doc.id);
                };
            });
            countLocal++;
            carregadores.sort((a,b) => a-b);
            let testeLocal = {
                IDLogradouro: `${countLogra}`,
                IDTipoCarregador: carregadores,
                nomeLocal: `${name}`,
                tipoLocal: `Trabalho`,


            }
            console.log(testeLocal)
            tabelaLocal.doc(`${countLocal}`).set(testeLocal). 
            then(()=>{
                console.log("ADICIONADO!");
            }).
            catch((error)=>{
                console.log(error);
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
                    >Nome da empresa:</Text>
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
                        {ligarTabelaCarregadores?<TabelaCarregadores onSelectCarregadores={toggleCarregadorSelection} notFiltro={true}/>:<View/>}
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
                    navigation.navigate("HouseAndWork", {refresh: true})
                    addDataLogradouro()

            
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
