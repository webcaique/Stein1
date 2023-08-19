import React from "react";
import {View, Text, TouchableOpacity, Image, ScrollView, FlatList} from "react-native";
import styles  from "./style";


/* 
https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/CARREGADOR?alt=media&token=3d2de5d3-bbec-48e2-84b8-20ebfef94f72` 

CAMINHO DOS ARQUIVOS, SOMENTE SUBSTITUIR O "CARREGADOR" PELO NOME DE ARQUIVO
*/

export default function(props){
    var link = "../../../assets/VetoresPNG/";
    var linksCarr = [];
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
    return(
        <View style={styles.box}> 

                    <View style={styles.titleBoxView}>
                        <Text style={styles.titleBox}>{props.titulo}</Text>
                    </View>

                    <View style={styles.content}>

                        <View style={styles.line}> 

                            <View style={styles.titleLineView}>
                                <Text style={styles.titleLine}>Endereço</Text>
                            </View>

                            <View style={styles.link}>

                                <View style={styles.textLinkView}> 
                                    <Text style={styles.textLink}>{props.rua} </Text>
                                </View>

                                <View style={styles.iconLinkView}> 
                                    <Image source={require("../../../assets/Icons/pin-de-localizacao.png")} style={styles.iconLink}/>
                                </View>
                            
                            </View>

                        </View>

                        
                        <View style={styles.line}> 

                            <View style={styles.titleLineView}>
                                <Text style={styles.titleLine}>Tipo de carregador</Text>
                            </View>

                            <View style={styles.link}>

                                <View style={styles.iconLinkView}>
                                    {
                                        imgCarr()
                                        
                                    }
                                    
                                </View>

                                <View style={styles.iconLinkView}> 
                                    <Image source={require("../../../assets/Icons/seta-direita.png")} style={styles.iconLink}/>
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
                                    <Image source={require("../../../assets/Icons/seta-direita.png")} style={styles.iconLink}/>
                                </View>
                            
                            </View>

                        </View>



                    </View>
                </View>
    )
}