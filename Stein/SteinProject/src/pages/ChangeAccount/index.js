import React from "react";
import {View, Text, ScrollView, Image, TouchableOpacity} from "react-native";
import styles from "./style"
import { auth } from "../../config/configFirebase";

const ChangeAccount = ({navigation}) => {
    return(
        <View style={styles.mainContainer}>
            <ScrollView>
                <Text style={styles.titleText}
                // Texto para informar
                >Alterar entre as contas e gerencie o login</Text>
                <View style={styles.box1}
                // Container para colocar em uma caixa
                >
                    <Text style={styles.account}>Atualmente em:</Text>
                    <View style={styles.inBox1}>
                        <Image
                        style={styles.image2}
                        source={require("../../../assets/Icons/image.png")}/>
                        <View>
                            <Text style={styles.texts}>Daniel Santana</Text>
                            <Text style={styles.texts}>Usuário</Text>
                            <Text style={styles.texts}>danielsantana@gmail.com</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.lines}/>
                <View style={styles.box1}>
                    <Text style={styles.texts}>Suas contas:</Text>
                    <View style={styles.inBox2}>
                        <Image 
                        style={styles.image2}
                        source={require("../../../assets/Icons/image1.png")}/>
                        <View style={styles.textInBox}>
                            <Text style={styles.texts}>Estação de Carregamento Porsche - Quinta do Marquês</Text>
                            <Text style={styles.texts}>Administrador</Text>
                            <Text style={styles.texts}>danielmartins@gmail.com</Text>
                        </View>
                        <TouchableOpacity style={styles.site}>
                            <Image 
                            source={
                                {uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fsite.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                                }
                            style={styles.linkImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                style={styles.plusButton}
                >
                    <TouchableOpacity style={styles.circuleButton}>
                        <Image source={
                            {uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fmais.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                            }
                        style={styles.plusImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circuleButton} 
                    onPress={()=>{
                        auth.signOut().then(()=>{console.log("BONITO!")})
                        navigation.navigate("InitScreen")
                    
                    }}
                    >
                        <Image source={
                            {uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fsair.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                            }
                        style={styles.leaveImage}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default ChangeAccount;