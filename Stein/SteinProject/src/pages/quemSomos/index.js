import React from "react";
import {Text,View,Button,TouchableOpacity,Image} from "react-native";
import styles from "./style";

const QuemSomos=({navigation})=>{
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
            >O aplicativo de pontos de recarga mais completo do Brasil.</Text>
        </View>
        <View style={styles.centralizar}>
        <View style={styles.spot3}
        //Image no meio da tela
        >
            <Image source={
                {
                    uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2FquemSomos.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
                }
                } style={styles.imagem}/>
        </View>
        </View>
        <View style={styles.alinhar1}
        //Simulação de um slider
        >
            <View style={styles.spot1}/>
            <View style={styles.spot2}/>
            <View style={styles.spot2}/>
        </View>
        <View style={styles.alinhar2}>
        <TouchableOpacity onPress={()=>navigation.navigate("Stein")}
        // Vai pular a sequência de telas
        >
            <Text style={styles.navigation}>
                Pular
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("OQueFazemos")} 
        // Vai passar para a próxima tela
        style={styles.buttons}>
            <Text style={styles.navigation}>
                Próximo
            </Text>
        </TouchableOpacity>
        </View>
    </View>
    )
}
export default QuemSomos