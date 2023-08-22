import React from "react";
import { View, Text, Switch, ScrollView, Image, TouchableOpacity } from "react-native";
import styles from "./style"

const ConfigScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <ScrollView>


            <Text style={styles.textTitle}>Configurações</Text>
            <View style={styles.confing}>
                <View>
                    <View style={styles.rowText1}>
                        <Text style={styles.textContent}>Modo Escuro</Text>
                        <Switch style={styles.input}/>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.rowText}>
                        <View>
                            <Text style={styles.textContent}>Pesquisar por voz</Text>
                            <Text>Padrão - Português (Brasil)</Text>
                        </View>
                        <TouchableOpacity>
                            <Image
                            source={
                                {uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                                }
                            style={styles.icons}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.rowText}>
                        <Text style={styles.textContent}>Convide um amigo</Text>
                        <TouchableOpacity
                        onPress={()=> navigation.navigate("ShareToAFriendScreen")}
                        >
                            <Image
                            source={
                                {uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                                }
                            style={styles.icons}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}/>
                </View>
            </View>


            <Text style={styles.textTitle}>Configurações da conta</Text>
            <View style={styles.confing}>
                <View>
                    <View style={styles.rowText}>
                        <Text style={styles.textContent}>Notificações</Text>
                        <Switch style={styles.input}/>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.rowText}>
                        <Text style={styles.textContent}>Conteudo pessoal</Text>
                        <TouchableOpacity
                        onPress={()=> navigation.navigate("PersonalContentScreen")}
                        >
                            <Image
                            source={{uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}}
                            style={styles.icons}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.rowText}>
                        <Text style={styles.textContent}>Alterar de conta</Text>
                        <TouchableOpacity
                        onPress={()=> navigation.navigate("ChangeAccount")}>
                            <Image
                            source={{uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}}
                            style={styles.icons}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.rowText}>
                        <Text style={styles.textContent}>Editar casa/trabalho </Text>
                        <TouchableOpacity
                        onPress={()=> navigation.navigate("HouseAndWork")}
                        >
                            <Image
                            source={{uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}}
                            style={styles.icons}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}/>
                </View>
            </View>


            <Text style={styles.textTitle}>Suporte</Text>
            <View style={styles.confing}>
                <View>
                    <View style={styles.rowText}>
                        <Text style={styles.textContent}>Enviar feedback</Text>
                        <TouchableOpacity>
                            <Image
                            source={{uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}}
                            style={styles.icons}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.rowText}>
                        <Text style={styles.textContent}>Sobre, termos e privacidade</Text>
                        <TouchableOpacity
                        
                        >
                            <Image
                            source={{uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}}
                            style={styles.icons}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}/>
                </View>
            </View>
            </ScrollView>
        </View>
    )
}

export default ConfigScreen;