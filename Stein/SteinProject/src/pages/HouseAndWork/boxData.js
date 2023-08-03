import React from "react";
import {View, Text, TouchableOpacity, Image, ScrollView} from "react-native";
import styles  from "./style";
var house = [];
    var work = [];
    var exampleAppHouse = [
        {
            id:"00",
            rua: "Rua Reinado do Cavalo Marinho, 564",
            carregador:[
                "carregador1.png",
                "carregador2.png",
            ],
            nomeUser: "Daniel",

        }
    ]
    var exampleAppWork = [
        {
            id:"00",
            rua: "Rua Reinado do Cavalo Marinho, 564",
            carregador:[
                "carregador1.png",
                "carregador2.png",
            ],
            nomeUser: "Daniel",

        }
    ]

    exampleAppHouse.forEach((desc,id) => {
        house.push(desc)
    });

export default function(){
    return(
        <View style={styles.box}> 

                    <View style={styles.titleBoxView}>
                        <Text style={styles.titleBox}>Residência</Text>
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
                                <Image source={require("../../../assets/VetoresPNG/carregador1.png")} style={styles.iconLink}/>
                                <Image source={require("../../../assets/VetoresPNG/carregador2.png")} style={styles.iconLink}/>
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
                                    <Text style={styles.textLink}>Daniel</Text>
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