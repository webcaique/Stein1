import React from "react";
import {View, Text, Image, TouchableOpacity, Share} from "react-native";
import styles from "./style"

const ShareToAFriendScreen = () => {
    const onShare = async () => {
        const result = await Share.share({
            message:"Oi",
        })
    }
    return(
        <View style={styles.container}>
            <View style={styles.box}>
                <TouchableOpacity style={styles.circule}
                onPress={onShare}
                >
                    <Image 
                    style={styles.icons}
                    source={require("../../../assets/Icons/enviar.png")}/>
                </TouchableOpacity>
                <View>
                    <Text style={styles.textContent}>Convide um amigo</Text>
                </View>
            </View>
            <Text style={styles.helpUs}>Nos ajude</Text>
            <View style={styles.box}>
                <TouchableOpacity style={styles.circule}>
                    <Image 
                    style={styles.icons}
                    source={require("../../../assets/Icons/favorito.png")}/>
                </TouchableOpacity>
                <View>
                    <Text style={styles.textContent}>Nos avalie</Text>
                </View>
            </View>
            <View style={styles.box}>
                <TouchableOpacity style={styles.circule}>
                    <Image 
                    style={styles.icons}
                    source={require("../../../assets/Icons/apoie.png")}/>
                </TouchableOpacity>
                <View>
                    <Text style={styles.textContent}>Contribua</Text>
                </View>
            </View>
        </View>
    )
}
export default ShareToAFriendScreen;