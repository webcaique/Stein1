import React from "react";
import {Text,View,Button,TouchableOpacity,Image} from "react-native";
import styles from "./style";

const OQueFazemos=({navigation})=>{
    //Virá uma sequência de telas
    return(
    <View style={styles.background}
    //Container principal
    >
        <View>
            <Text style={styles.titulo}
             //Texto de cima
            >Recarregue o seu carro!</Text>
            <Text style={styles.paragrafo}
             //Texto em baixo do título
            >A Stein é o aplicativo mais completo da América do Sul.</Text>
        </View>
        <View style={styles.centralizar}>
        <View style={styles.spot3}>
            <Image source={
                {
                    uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2FoQueFazemos.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
                }} style={styles.imagem}
            //Imagem do meio da tela
            />
        </View>
        </View>
        <View style={styles.alinhar1}
        //Simulação de Slider
        >
            <View style={styles.spot2}/>
            <View style={styles.spot1}/>
            <View style={styles.spot2}/>
        </View>
        <View style={styles.alinhar2}>
        <TouchableOpacity onPress={()=>navigation.navigate("Stein")} title="teste"
        // Vai pular a sequência de telas
        >
            <Text style={styles.navigation}
            >
                Pular
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Objetivo")} title="teste"
        // Vai passar para a próxima tela
        >
            <Text style={styles.navigation}>
                Próximo
            </Text>
        </TouchableOpacity>
        </View>
    </View>
    )
}
export default OQueFazemos