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
                    source={{
                        uri:
                        "https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fenviar.png?alt=media&token=ce712efb-d006-47bf-8228-d81d4944bfff"
                        }}/>
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
                    source={{
                        uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Ffavorito.png?alt=media&token=ce712efb-d006-47bf-8228-d81d4944bfff"
                        }}/>
                </TouchableOpacity>
                <View>
                    <Text style={styles.textContent}>Nos avalie</Text>
                </View>
            </View>
            <View style={styles.box}>
                <TouchableOpacity style={styles.circule}>
                    <Image 
                    style={styles.icons}
                    source={
                        {uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fapoie.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                    }/>
                </TouchableOpacity>
                <View>
                    <Text style={styles.textContent}>Contribua</Text>
                </View>
            </View>
        </View>
    )
}
export default ShareToAFriendScreen;