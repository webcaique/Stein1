import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles"
import SelectList from "./selectList"
import TipoLogradouro from "./tipoLogradouro.js";
import { firestore } from "../../config/configFirebase";
import {useNavigation, useRoute } from '@react-navigation/native';
import TabelaCarregadores from "../componenteTabelaCarregadores";
    

export default function AddHome(){


    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const route = useRoute();
    const idFromOtherScreen = route.params.idLocal;

    const [ligarTabelaCarregadores, setligarTabelaCarregadores] = useState(true);

    const tabelaLogra = firestore.collection("logradouro");
    const tabelaLocal = firestore.collection("local");

    const [carregadores, setCarregadores] = useState("");
    const [name, setName] = useState("");
    const [logra, setLogra] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [cep, setCep] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [selectedUf, setSelectedUf] = useState("");
    const [selectedTipoLogra, setSelectedTipoLogra] = useState("");
    const [idLocal, setIdLocal] = useState("");
    const [lograEdit, setLograEdit] = useState("");

    const handleUfChange = (uf) => {
        setSelectedUf(uf);
    };

    const handleTipoLograChange = (tipoLogra) => {
        setSelectedTipoLogra(tipoLogra);
    };

    const toggleCarregadorSelection = (carr)=>{
        setCarregadores(carr);
    }

    useEffect(()=>{
        console.log(route.params.idLocal)
        const edit = async ()=>{
            try{
                const aparecer = tabelaLocal.onSnapshot(async (snapashotLocal)=>{
                    const listaLocal = [];
                snapashotLocal.forEach((datas)=>{
                    listaLocal.push({id: datas.id, ...datas.data()});
                });
    
                listaLocal.forEach((datas)=>{

                    if(datas.IDLogradouro == idFromOtherScreen){
                        setIdLocal(datas)
                    }
                });


    
                const snapshotLogra = await tabelaLogra.get();
                const listaLogra = [];
                snapshotLogra.forEach((doc)=>{
                    listaLogra.push({id: doc.id, ...doc.data() });
                });
                listaLogra.forEach((datas)=>{
                    
                    if(datas.id == idFromOtherScreen){
                        setLograEdit(datas)
                    }
                });

                setLoading(false);

                });
                return()=>aparecer();
                

            } catch (error){
                setLoading(false);
            }
            

            
            
        }
        edit();        
    },[]);


    const addData = async () =>{
        if(selectedTipoLogra != undefined && selectedUf != undefined && name != undefined && logra != undefined && numero != undefined && cep != undefined && bairro != undefined && cidade != undefined ){



            console.log("DADOS")
            console.log(selectedUf);
            console.log(selectedTipoLogra);
            console.log("NAME: "+name);
            console.log(logra);
            console.log(numero);
            console.log("COMPLEMENTO: "+complemento);
            console.log(cep);
            console.log(bairro);
            console.log(cidade);
            console.log(route.params.idLocal)
            console.log("DADOS")

            setBairro(bairro);
            setCep(cep);
            setName(name);
            setCidade(cidade);
            setLogra(logra);
            setComplemento(complemento);
            setNumero(numero);
            setSelectedTipoLogra(selectedTipoLogra);
            setSelectedUf(selectedUf);
            
            tabelaLogra.doc(idLocal.IDLogradouro).update({
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
            });
            carregadores.sort((a,b)=>a-b)
            tabelaLocal.doc(idLocal.id).update({
                nomeLocal: `${name}`,
                IDTipoCarregador: carregadores,
                IDLogradouro: `${idLocal.IDLogradouro}`,
                tipoLocal: `Trabalho`,

            })


        }
    }

    const res = 
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
                    >Nome da empresa: </Text>
                    <TextInput style={styles.textInput} 
                    onChangeText={(text)=>{setName(text)}}
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
                            <TextInput style={styles.textInputLogradouro}/>
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
                        onChangeText={(text)=>{setNumero(text)}}
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
                    onChangeText={(text)=>{setComplemento(text)}}
                    value={complemento}
                    />
                </View>

                <View style={styles.row5}>
                    <View style={styles.column3
                    // Campo para pegar o CEP
                    }>
                        <Text style={styles.textIsInput}>CEP:</Text>
                        <TextInput style={styles.textInputCep}
                        keyboardType="number-pad"
                        onChangeText={(text)=>{setCep(text)}}
                        />
                    </View>
                    <View style={styles.column4}
                    // Campo para pegar o bairro
                    >
                        <Text style={styles.textIsInput}>Bairro:</Text>
                        <TextInput style={styles.textInputBairro}
                        onChangeText={(text)=>{setBairro(text)}}
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
                        onChangeText={(text)=>{setCidade(text)}}
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
                onPressIn={()=>{
                    addData()
                     navigation.navigate("HouseAndWork");
                    
                    }}
                // Direcionar para página de Casa e Trabalho
                >
                    <Text style={styles.textButton}>Editar</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
        
    
    
if(loading){
    return(<Text>Carregando...</Text>)
}else {
    return(
        res
    )
}
    
}