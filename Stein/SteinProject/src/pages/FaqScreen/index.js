import React from "react";
import {View, Text, ScrollView, TouchableOpacity, Image} from "react-native";
import styles from "./style"

const FaqScreen = () => {
    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.faqText}>
                    <Text style={{fontSize:100, color:"#000000"}}>FAQ</Text>
                </View>
                <View style={styles.spaceBetweenBoxes}>
                    <View style={styles.boxes}>
                        <Text  style={styles.txt}>Quem somos?</Text>
                        <TouchableOpacity style={styles}>
                            <Image 
                            source={
                                {uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                                }
                            style={styles.imagem}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lines}/>
                </View>

                <View style={styles.spaceBetweenBoxes}>
                    <View style={styles.boxes}>
                        <Text style={styles.txt}>Como ganhar Pontos EV</Text>
                        <TouchableOpacity style={styles}>
                            <Image 
                            source={
                                {uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                                }
                            style={styles.imagem}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lines}/>
                </View>

                <View style={styles.spaceBetweenBoxes}>
                    <View style={styles.boxes}>
                        <Text style={styles.txt}>Contato</Text>
                        <TouchableOpacity style={styles}>
                            <Image 
                            source={
                                {uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                                }
                            style={styles.imagem}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lines}/>
                </View>

                <View style={styles.spaceBetweenBoxes}>
                    <View style={styles.boxes}>
                        <Text style={styles.txt}>Quais são os benéficios do Stein</Text>
                        <TouchableOpacity style={styles}>
                            <Image 
                            source={
                                {uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                                }
                            style={styles.imagem}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lines}/>
                </View>

                <View style={styles.spaceBetweenBoxes}>
                    <View style={styles.boxes}>
                        <Text style={styles.txt}>Como funcionam os pontos Ev</Text>
                        <TouchableOpacity style={styles}>
                            <Image 
                            source={
                                {uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                                }
                            style={styles.imagem}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lines}/>
                </View>

                <View style={styles.spaceBetweenBoxes}>
                    <View style={styles.boxes}>
                        <Text style={styles.txt}>Como mudar minha senha</Text>
                        <TouchableOpacity style={styles}>
                            <Image 
                            source={
                                {uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                                }
                            style={styles.imagem}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lines}/>
                </View>
                
            </ScrollView>
        </View>
    )
}

export default FaqScreen;