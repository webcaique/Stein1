import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, Image, ScrollView, FlatList} from "react-native";
import styles  from "./style";
import BoxData from "./boxData.js";
import {firestore} from "../../config/configFirebase";



/*
var exampleAppWork = [
    {
        id:"00",
        rua: "Rua Reinado do Cavalo Marinho, 111",
        carregador:[
            "carregador1.png",
            "carregador2.png",
        ],
        nomeUser: "Daniel",

    }
]
*/

const EditingHouse = ({navigation}) => {

    var [house,setHouse] = useState([]);
    const [work, setWork] = useState([]);
    const [local, setLocal] = useState([]);
    const [listLogra, setListLogra] = useState([]);

    useEffect(() => {
        
        const fetchLocalData = async () => {
          // Referência para a coleção 'local' no Firestore
          const tabelaLocal = firestore.collection('local');
    
          try {
            // Obtém os dados da coleção 'local'
            const querySnapshot = await tabelaLocal.get();
            const locais = [];
    
            // Mapeia os documentos retornados para um array
            querySnapshot.forEach((doc) => {
              locais.push({ id: doc.id, ...doc.data() });
            });
    
            // Define o estado 'local' com os dados obtidos do Firestore
            setLocal(locais);
    
            // Array para armazenar dados de casa e trabalho
            const casa = [];
            const trabalho = [];
    
            // Itera sobre cada documento em 'locais'
            await Promise.all(locais.map(async (data) => {
              // Obtém os dados do logradouro referenciado por IDLogradouro
              const tabelaEndereco = firestore.collection("logradouro").doc(data.IDLogradouro);
    
              try {
                const doc = await tabelaEndereco.get();
    
                if (doc.exists) {
                  const logradouroData = doc.data();
                  // Atualiza o estado 'listLogra' com dados do logradouro
                  setListLogra(prevListLogra => [...prevListLogra, logradouroData]);
                } else {
                  console.log("Documento não encontrado!");
                }
              } catch (error) {
                console.log('Erro ao buscar documentos: ', error);
              }
    
              // Classifica os dados em 'casa' ou 'trabalho' com base em nomeLocal
              if ("Residência" === data.nomeLocal) {
                casa.push({ id: data.id, ...data });
              } else if ("Trabalho" === data.nomeLocal) {
                trabalho.push({ id: data.id, ...data });
              }
            }));
    
            // Atualiza os estados 'house' e 'work'
            setHouse(casa);
            setWork(trabalho);
    
          } catch (error) {
            console.log('Erro ao buscar documentos: ', error);
          }
        };
    
        // Chama a função para buscar os dados
        fetchLocalData();

        console.log();
        console.log(listLogra)
        console.log();

        console.log();
        console.log(local)
        console.log();


      }, []);

    return(
        
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.titleContainerView}>
                    <Text style={styles.titleContainer}>Edite as informações da sua casa ou trabalho.</Text>    
                </View>

                <FlatList
                  data={house}
                  keyExtractor={(item) => item.id}
                  accessibilityElementsHidden={true}
                  renderItem={({ item }) => {
                    const houseElements = listLogra.map((logra, index) => (
                      <BoxData
                        key={`${item.id}_${index}`}
                        titulo={item.nomeLocal}
                        rua={`${logra.tipoLogradouro} ${logra.logradouro}, nº ${logra.numero}`}
                        carregador={item.IDTipoCarregador}
                        user={"Caique"}
                      />
                    ));

                    return houseElements;
                  }}
                />


                <View style={styles.buttonBox}>
                    <TouchableOpacity style={styles.editionButton}
                    onPressIn={()=> navigation.navigate("EditHome")}
                    >
                        <Text style={styles.textButton}>Editar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonBox}>
                    <TouchableOpacity style={styles.editionButton}
                    onPressIn={()=> navigation.navigate("AddHome")}
                    >
                        <Text style={styles.textButton}>Adicionar</Text>
                    </TouchableOpacity>
                </View>




                <FlatList
                data={work}
                keyExtractor={item=>item.id}
                accessibilityElementsHidden={true}
                
                renderItem={({item})=>{

                
                  for(var i = 0; i < listLogra.length; i++){
                    
                    return(
                      <BoxData titulo={item.nomeLocal} rua={`${listLogra[i].tipoLogradouro} ${listLogra[i].logradouro}, nº ${listLogra[i].numero}`} carregador={item.IDTipoCarregador} user={"Caique"}/>
                    )
                  }
                }
            }
                />

                

                <View style={styles.buttonBox}>
                    <TouchableOpacity style={styles.editionButton}
                    onPressIn={()=> navigation.navigate("EditWork")}
                    >
                        <Text style={styles.textButton}>Editar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonBox}>
                    <TouchableOpacity style={styles.editionButton}
                    onPressIn={()=> navigation.navigate("AddWork")}
                    >
                        <Text style={styles.textButton}>Adicionar</Text>
                    </TouchableOpacity>
                </View>




            </ScrollView>    
        </View>
    )
}

export default EditingHouse;