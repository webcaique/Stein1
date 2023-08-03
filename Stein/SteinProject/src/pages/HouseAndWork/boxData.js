import React from "react";
import {View, Text, TouchableOpacity, Image, ScrollView} from "react-native";
import styles  from "./style";

export default function(props){
    var link = "../../../assets/VetoresPNG/"
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
                                    {
                                        ()=>{
                                            props.carregador.forEach((carr, id) => {
                                                link = link+carr;
                                                return(
                                                        <Image source={require("../../../assets/VetoresPNG/carregador1.png")} style={styles.iconLink}/>
                                                );
                                            } );
                                        /* <Image source={require(`../../../assets/VetoresPNG/${props.carregador}`)} style={styles.iconLink}/>
                                    <Image source={require(`../../../assets/VetoresPNG/${props.carregador}`)} style={styles.iconLink}/>*/
                                    
                                        }
                                        
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