import React from "react";
import {Text,View,Button,TouchableOpacity,Image} from "react-native";
import styles from "./style";

const Objetivo=({navigation})=>{
    //Ultima tela do Slider
    return(
    <View style={styles.background}
    //Container principal
    >
        <View style={styles.texto}>
            <Text style={styles.titulo}
            //Texto de cima
            >Recarregue o seu carro!</Text>
            <Text style={styles.paragrafo}
            //Texto em baixo do título
            >Revolucionaremos as aplicativos de mapeamento de pontos de recarga para carros elétricos.</Text>
        </View>
        <View style={styles.centralizar}
        //Image no meio da tela
        >
        <View style={styles.spot3}>
            <Image source={
                {
                    uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fobjetivo.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
                }
                } style={styles.imagem}/>
        </View>
        </View>
        <View style={styles.alinhar1}
        //Simulação de um slider
        >
            <View style={styles.spot2}/>
            <View style={styles.spot2}/>
            <View style={styles.spot1}/>
        </View>
        <View style={styles.alinhar2}>
        <TouchableOpacity onPress={()=>navigation.navigate("Stein")}
        // Vai pular a sequência de telas
        >
            <Text style={styles.navigation}>
                Pular
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Stein")}
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
export default Objetivo