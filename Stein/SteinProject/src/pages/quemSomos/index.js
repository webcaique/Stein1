import React from "react";
import {Text,View,Button,TouchableOpacity,Image} from "react-native";
import styles from "./style";

const QuemSomos=({navigation})=>{
    return(
    <View style={styles.background}>
        <View>
            <Text style={styles.titulo}>Recarregue o seu carro!</Text>
            <Text style={styles.paragrafo}>O aplicativo de pontos de recarga mais completo do Brasil.</Text>
        </View>
        <View style={styles.centralizar}>
        <View style={styles.spot3}>
            <Image source={require("../../../assets/Icons/quemSomos.png")} style={styles.imagem}/>
        </View>
        </View>
        <View style={styles.alinhar1}>
            <View style={styles.spot1}/>
            <View style={styles.spot2}/>
            <View style={styles.spot2}/>
        </View>
        <View style={styles.alinhar2}>
        <TouchableOpacity onPress={()=>navigation.navigate("Stein")} title="teste">
            <Text style={styles.navigation}>
                Pular
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("OQueFazemos")} title="teste">
            <Text style={styles.navigation}>
                Próximo
            </Text>
        </TouchableOpacity>
        </View>
    </View>
    )
}
export default QuemSomos