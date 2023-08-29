import React, { useEffect,useState } from "react";
import {View, Text, TouchableOpacity, Image, ScrollView, FlatList} from "react-native";
import styles  from "./style";
import {firestore} from "../../config/configFirebase";

/* 
https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/CARREGADOR?alt=media&token=3d2de5d3-bbec-48e2-84b8-20ebfef94f72` 

CAMINHO DOS ARQUIVOS, SOMENTE SUBSTITUIR O "CARREGADOR" PELO NOME DE ARQUIVO
*/


export default function(props){
    const [endereco, setEndereco] = useState([]);
    const [logra, setLogra] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchEndereco = async () => {
            const ends = firestore.collection("logradouro");
      
            try {
              const logras = await ends.get();
              const listLogra = [];
      
              logras.forEach(itens => {
                listLogra.push({ id: itens.id, ...itens.data() });
              });
      
              setEndereco(listLogra);
      
              const locais = listLogra.filter(locaisSalvos => locaisSalvos.id === props.logradouro);
              setLogra(locais);
              setLoading(false); // Indica que os dados foram carregados
            } catch (error) {
              console.log('Erro ao buscar documentos: ', error);
              setLoading(false); // Em caso de erro, também indicamos que o carregamento foi concluído
            }
          }
      
          fetchEndereco();
    }, []);

    
    function imgCarr(){

        
        return(
            <FlatList
            style={{flexDirection:"row"}}
            data={props.carregador}
                keyExtractor={item=>item.id}
                accessibilityElementsHidden={true}
                
                renderItem={({item})=>
                <Image source={{
                    uri:
                    `https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador${item}.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177`
                }} style={styles.iconLink}/>
            }
                
            />
        )
    /* <Image source={require(`../../../assets/VetoresPNG/${props.carregador}`)} style={styles.iconLink}/>
    <Image source={require(`../../../assets/VetoresPNG/${props.carregador}`)} style={styles.iconLink}/>*/
    
    }
    if(loading){
        return <Text>Carregando..</Text>
    } else{
        //ELEMENTOS PARA SER REDENRIZADOS PELO FLATLIST NA PÁGINA


        const renderItem = ({ item }) => (

            <View style={styles.box}>
              
              <View style={styles.titleBoxView}>
                <Text style={styles.titleBox}>{props.titulo} - {props.nome}</Text>
              </View>
          
              <View style={styles.content}>
                <View style={styles.line}>
                  <View style={styles.textLinkView}>
                    <Text style={styles.titleLine}>Endereço</Text>
                  </View>
          
                  <View style={styles.link}>
                    <View style={styles.textLinkView}>
                      <Text style={styles.textLink}>
                        {`${item.tipoLogradouro} ${item.logradouro}, nº ${item.numero}`}
                      </Text>
                    </View>
          
                    <View style={styles.iconLinkView}>
                      <Image
                        source={
                          <Image source={{uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fpin-de-localizacao.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}}/>
                          }
                        style={styles.iconLink}
                      />
                    </View>
                  </View>
                </View>
          
                <View style={styles.line}>
                  <View style={styles.titleLineView}>
                    <Text style={styles.titleLine}>Tipo de carregador</Text>
                  </View>
          
                  <View style={styles.link}>
                  <FlatList
                            style={{ flexDirection: "row" }}
                            data={props.carregador}
                            keyExtractor={item => item.id}
                            accessibilityElementsHidden={true}
                            renderItem={({ item }) => (
                                <Image
                                    source={{
                                        uri: `https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador${item}.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177`
                                    }}
                                    style={styles.iconLink}
                                />
                            )}
                        />
          
                    <View style={styles.iconLinkView}>
                      <Image
                        source={{uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                        }
                        style={styles.iconLink}
                      />
                    </View>
                  </View>
                </View>
          
                <View style={styles.line}>
                  <View style={styles.titleLineView}>
                    <Text style={styles.titleLine}>Nome de usuário</Text>
                  </View>
          
                  <View style={styles.link}>
                    <View style={styles.textLinkView}>
                      <Text style={styles.textLink}>{props.user}</Text>
                    </View>
          
                    <View style={styles.iconLinkView}>
                      <Image
                        source={{uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                      }
                        style={styles.iconLink}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
    
    
        //
    return (
            <FlatList
            data={logra}
            keyExtractor={item=>item.id}
            renderItem={renderItem}
            />
    )
    }

}

