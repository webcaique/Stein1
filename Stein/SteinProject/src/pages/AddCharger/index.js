import React, {useState} from "react";
import {View, Text, ScrollView, TextInput, Image, Pressable, TouchableOpacity, Switch, Keyboard} from "react-native";
import styles from "./style"



const AddCharger = ({navigation}) => {
    const [carregadores, setCarregadores] = useState(false)
    let test = false;
    return(
        <Pressable style={styles.container} onPress={()=>Keyboard.dismiss()}>
            <View>
                <ScrollView>
                    <TextInput placeholder="Nome do local*" style={styles.textInput}
                    />
                    <TextInput placeholder="Endereço completo*" style={styles.textInput}
                    />
                    <TextInput placeholder="Descriçao*" style={styles.textInput}/>
                    <TextInput placeholder="Horário*" style={styles.textInput}/>
                    <View style={styles.acceptPay}>
                        <Switch/>
                        <Text>Aberto 24/7</Text>
                    </View>
                    <TouchableOpacity
                    onPress={()=> setCarregadores(!carregadores)}
                    style={styles.charger}
                    >
                        <Text style={styles.placeholder}>Carregador</Text>
                    </TouchableOpacity>
                    {carregadores?
                        <Image
                        source={require("../../../assets/ImagensTeste/carregadores.png")}
                        resizeMode="contain"
                        style={{width:"100%"}}
                        />:
                        <Text></Text>
                        }
                    <View style={styles.acceptPay}>
                        <Switch/>
                        <Text>Pagamento Necessário</Text>
                    </View>
                    <TextInput placeholder="Preço(Opcional)" style={styles.textInput}/>
                <View style={{width:'100%', flex:1, alignItems:'center'}}>
                    <TouchableOpacity style={styles.button}
                    onPress={()=> navigation.navigate("Stein")}
                    >
                        <Text style={styles.textButtons}>
                            Enviar
                        </Text>
                
                    </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Pressable>
    )
}

export default AddCharger; 