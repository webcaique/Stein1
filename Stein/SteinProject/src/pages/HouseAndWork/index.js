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
              // Classifica os dados em 'casa' ou 'trabalho' com base em nomeLocal
              if ("Residência" === data.tipoLocal) {
                casa.push({ id: data.id, ...data });
              } else if ("Trabalho" === data.tipoLocal) {
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


        

      }, []);

      

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.titleContainerView}>
                    <Text style={styles.titleContainer}>Edite as informações da sua casa ou trabalho.</Text>    
                </View>


                <FlatList
                data={house}
                keyExtractor={item=>item.id}
                accessibilityElementsHidden={true}
                renderItem={({item})=>{
                  const enderecos = <BoxData logradouro={item.IDLogradouro} carregador={item.IDTipoCarregador} titulo={item.tipoLocal} nome={item.nomeLocal} user={"Caique"}/>

                  return enderecos;
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
                  const enderecos = <BoxData logradouro={item.IDLogradouro} carregador={item.IDTipoCarregador} titulo={item.tipoLocal} nome={item.nomeLocal} user={"Caique"}/>

                  return enderecos;
                }}
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

/*

<FlatList
                data={house}
                keyExtractor={item=>item.id}
                accessibilityElementsHidden={true}
                
                renderItem={({item})=>{
                  const end = [];
                
                  for(var i = 0; i < listLogra.length; i++){

                    end.push(
                      <BoxData titulo={item.nomeLocal} rua={`${listLogra[i].tipoLogradouro} ${listLogra[i].logradouro}, nº ${listLogra[i].numero}`} carregador={item.IDTipoCarregador} user={"Caique"}/>
                    )
                  }
                  if(house.length > item.id){
                    console.log();
                    console.log("");
                    console.log(item.IDTipoCarregador);
                    console.log("TIPO CARR");
                    console.log();
                    return end;
                  }
                  
                  
                  
                }
            }
                />









<FlatList
                data={work}
                keyExtractor={item=>item.id}
                accessibilityElementsHidden={true}
                
                renderItem={({item})=>{
                  const end = [];
                  
                  console.log();
                  console.log("TESTE");
                  console.log(item.id);
                  console.log("TESTE");
                  console.log();
                
                  for(var i = 0; i < listLogra.length; i++){
                    
                    end.push(
                      <BoxData titulo={item.nomeLocal} rua={`${listLogra[i].tipoLogradouro} ${listLogra[i].logradouro}, nº ${listLogra[i].numero}`} carregador={item.IDTipoCarregador} user={"Caique"}/>
                    )
                  }
                  if(work.length >= item.id){
                    return end;
                  }
                  
                  
                  
                }
            }
                />


*/