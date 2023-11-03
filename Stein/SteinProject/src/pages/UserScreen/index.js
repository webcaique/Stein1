import React, { useState } from "react";
import {View, Text, Image, TouchableOpacity, ScrollView} from "react-native";
import styles from "./style"
import { auth, firestore, storage } from "../../config/configFirebase";

const UserScreen = ({navigation})=>{
    
    const [userId, UserId] = useState(auth.currentUser.uid);

    const tabelaUsuario = firestore.collection("usuario");

    const getUserData = ()=>{
        let usuario;
        tabelaUsuario.onSnapshot(datas => {
            datas._docs.forEach(dados => {
                if(userId == dados._ref._documentPath._parts[1]){
                    usuario = {id: dados._ref._documentPath._parts[1], ...dados._data}
                }
            });
            

        });
    }

    return(
        <View style={styles.mainContainer}>
            <View style={styles.userImageBgBackgroudn}>
                <Image style={styles.userImageBg} source={require("../../../assets/UserAsset/TestUser/BgImage.png")}/>
            </View>
            <View style={styles.userImageBackGround}>
                <View style={styles.circule}>
                    <Image style={styles.useruserImage} source={require("../../../assets/UserAsset/TestUser/userImage.png")}/>
                </View>
                <Text style={styles.userName}>Nome do usuário</Text>
                <View style={styles.userPowerSupplyUnit}>
                    <Image style={styles.powerSupplyUnit} source={require("../../../assets/VetoresPNG/carregador1.png")}/>
                    <Image style={styles.powerSupplyUnit} source={require("../../../assets/VetoresPNG/carregador2.png")}/>
                </View>
            </View>
            <View style={styles.lineList}>
                <View style={styles.lineLisText}>
                        <TouchableOpacity><Text style={styles.recente}>Recente</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={styles.locaisSalvos}>Locais salvos</Text></TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.listText}>
                        <View style={styles.textFromList1}>
                            <Text style={styles.texts}>Carregador Br2w</Text>
                            <Text style={styles.texts}>Rua Lady Esteves da Conceição, 680 - Vale Encantado, Macaé - RJ, 27933-420, Brasil. </Text>
                        </View>
                        <View style={styles.textFromList2}>
                            <TouchableOpacity
                                
                                style={styles.button}
                            >
                                <Image style={styles.iconArrowToRight} source={require("../../../assets/Icons/seta-direita.png")}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.lines}/>

                    <View style={styles.listText}>
                        <View style={styles.textFromList1}>
                            <Text style={styles.texts}>Botafogo Shopping</Text>
                            <Text style={styles.texts}>Praia de Botafogo, 400 - Botafogo, Rio de Janeiro - RJ, CEP 22250-040, Brasil.</Text>
                        </View>
                        <View style={styles.textFromList2}>
                            <TouchableOpacity
                                
                                style={styles.button}
                            >
                                <Image style={styles.iconArrowToRight} source={require("../../../assets/Icons/seta-direita.png")}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.lines}/>

                    <View style={styles.listText}>
                        <View style={styles.textFromList1}>
                            <Text style={styles.texts}>Barra Business Center</Text>
                            <Text style={styles.texts}>Av. das Américas 3301,Barra da Tijuca, Rio de Janeiro - RJ, Cep 22631-003</Text>
                        </View>
                        <View style={styles.textFromList2}>
                            <TouchableOpacity
                                
                                style={styles.button}
                            >
                                <Image style={styles.iconArrowToRight} source={require("../../../assets/Icons/seta-direita.png")}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.lines}/>
                </ScrollView>
                
            </View>
        </View>
    )
}
export default UserScreen;