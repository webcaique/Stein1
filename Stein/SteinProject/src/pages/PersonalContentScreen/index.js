import React from "react";
import {View, Text, TouchableOpacity, Image, ScrollView} from "react-native";
import styles  from "./style";

const PersonalContentScreen = () => {
    return(
        
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.textOutBox}>
                Edite as informações da sua conta pessoal.
            </Text>
            <View style={styles.box}>
                    <Text style={styles.titleBox}>Suas informações pessoais</Text>
                    <View>
                        <View style={styles.content}>
                            <Text style={styles.textContent}>Data de nascimento</Text>
                            <TouchableOpacity 
                            style={styles.boxImageWith2Image}
                            >
                                <Image 
                                source={require("../../../assets/Icons/calender.png")}
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
                            <Text style={styles.textContent}>Estado</Text>
                            <TouchableOpacity 
                            style={styles.boxImageWithText}
                            >
                                <Text>São Paulo</Text>
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
                            <Text style={styles.textContent}>E-mail</Text>
                            <TouchableOpacity 
                            style={styles.boxImageWithTextEmail}
                            >
                                <Text>danielsantana@gmail.com</Text>
                                <Image 
                                source={require("../../../assets/Icons/seta-direita.png")}
                                style={styles.image}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <View style={styles.content}>
                            <Text style={styles.textContent}>Senha</Text>
                            <TouchableOpacity 
                            style={styles.boxImageWithTextPassword}
                            >
                                <Text>********</Text>
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

export default PersonalContentScreen;