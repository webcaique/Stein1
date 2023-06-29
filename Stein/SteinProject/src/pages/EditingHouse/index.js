import React from "react";
import {View, Text, TouchableOpacity, Image, ScrollView} from "react-native";
import styles  from "./style";

const EditingHouse = () => {
    return(
        
        <View style={styles.container}>
            <ScrollView style={{flex:1, height:"100%"}}>
            <Text style={styles.textOutBox}>
                Edite as informações da sua conta pessoal.
            </Text>
            <View style={styles.box1}>
                    <Text style={styles.titleBox}>Residência</Text>
                    <View>
                        <View style={styles.content}>
                            <Text style={styles.textContent}>Enderço</Text>
                            <TouchableOpacity 
                            style={styles.boxImageWithTextAndress1}
                            >
                                <Text
                                style={{fontSize:12}}
                                >Rua Reinado do Cavalo Marinho, 564 </Text>
                                <Image 
                                source={require("../../../assets/Icons/pin-de-localizacao.png")}
                                style={styles.image}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View>
                        <View style={styles.content}>
                            <Text style={styles.textContent}>Tipo de carregador</Text>
                            <TouchableOpacity 
                            style={styles.boxImageWith3Image}
                            >
                                <Image 
                                source={require("../../../assets/VetoresPNG/carregador6.png")}
                                style={styles.image}
                                />
                                <Image 
                                source={require("../../../assets/VetoresPNG/carregador7.png")}
                                style={styles.image}
                                />
                                <Image 
                                source={require("../../../assets/Icons/seta-direita.png")}
                                style={styles.image}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View>
                        <View style={styles.content}>
                            <Text style={styles.textContent}>Nome de usuário</Text>
                            <TouchableOpacity 
                            style={styles.boxImageWithTextUsername}
                            >
                                <Text>Daniel Martins</Text>
                                <Image 
                                source={require("../../../assets/Icons/seta-direita.png")}
                                style={styles.image}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

            </View>

            <View style={styles.box1}>
                    <Text style={styles.titleBox}>Trabalho</Text>
                    <View>
                        <View style={styles.content}>
                            <Text style={styles.textContent}>Enderço</Text>
                            <TouchableOpacity 
                            style={styles.boxImageWithTextAndress2}
                            >
                                <Text
                                style={{fontSize:12}}
                                >Travessa Maravilha Tristeza  </Text>
                                <Image 
                                source={require("../../../assets/Icons/pin-de-localizacao.png")}
                                style={styles.image}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View>
                        <View style={styles.content}>
                            <Text style={styles.textContent}>Tipo de carregador</Text>
                            <TouchableOpacity 
                            style={styles.boxImageWith3Image}
                            >
                                <Image 
                                source={require("../../../assets/VetoresPNG/carregador6.png")}
                                style={styles.image}
                                />
                                <Image 
                                source={require("../../../assets/VetoresPNG/carregador7.png")}
                                style={styles.image}
                                />
                                <Image 
                                source={require("../../../assets/Icons/seta-direita.png")}
                                style={styles.image}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View>
                        <View style={styles.content}>
                            <Text style={styles.textContent}>Nome de usuário</Text>
                            <TouchableOpacity 
                            style={styles.boxImageWithTextUsername}
                            >
                                <Text>Daniel Martins</Text>
                                <Image 
                                source={require("../../../assets/Icons/seta-direita.png")}
                                style={styles.image}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                
            </View>
            <View style={styles.editionButtonContainer}>
                <TouchableOpacity style={styles.editionButton}>
                    <Text style={styles.textButton}>Editar</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    )
}

export default EditingHouse;