import React from "react";
import {View, Text, TouchableOpacity, Image, FlatList} from "react-native";
import styles  from "./style";

const PersonalContentScreen = () => {
    const carregador = [1,3,5,6];
    
    return(
        <View style={styles.mainContainer}>
            <View style={styles.containerTextTop}>
                <Text style={styles.textTop}>Edite as informações de sua conta pessoal.</Text>
            </View>

            <View style={styles.box}>
                <View style={styles.containerMainText}>
                    <Text style={styles.mainText}>Suas informações pessoais</Text>
                </View>


                <View style={styles.line}>
                    <View style={styles.containerTextLine}>
                        <Text style={styles.textLine}>Data de Nascimento</Text>
                    </View>
                    <View style={styles.iconsLine}>
                        <View style={styles.imageSet}>
                            <Image source={
                                {uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fcalender.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                                } style={styles.imgs}/>
                        </View>
                        <View style={styles.lastImg}>
                            <Image source={
                                {uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                                } style={styles.imgs} />
                        </View>
                    </View>
                </View>

                <View style={styles.line}>
                    <View style={styles.containerTextLine}>
                        <Text style={styles.textLine}>Estado</Text>
                    </View>
                    <View style={styles.iconsLine}>
                        <View style={styles.imageSet}>
                            <Text style={styles.text}>São Paulo</Text>
                        </View>
                        <View style={styles.lastImg}>
                            <Image source={
                                {uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fpin-de-localizacao.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                                } style={styles.imgs} />
                        </View>
                    </View>
                </View>

                <View style={styles.line}>
                    <View style={styles.containerTextLine}>
                        <Text style={styles.textLine}>Tipo de Carregador</Text>
                    </View>
                    <View style={styles.iconsLine}>
                        <View style={styles.imageSet}>
                        <FlatList
                        
                        contentContainerStyle={{ justifyContent: 'flex-end', alignItems: 'flex-end',  }} // Alinhar à direita
                        horizontal={true}
            data={carregador}
                keyExtractor={item=>item.id}
                accessibilityElementsHidden={true}
                
                renderItem={(item)=>
                <Image source={{
                    uri:
                    `https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador${item.item}.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177`
                }} style={styles.imgs}/>
            }
                
            />
                        </View>
                        <View style={styles.lastImg}>
                            <Image source={
                                {uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                                } style={styles.imgs} />
                        </View>
                    </View>
                </View>

                <View style={styles.line}>
                    <View style={styles.containerTextLine}>
                        <Text style={styles.textLine}>Email</Text>
                    </View>
                    <View style={styles.iconsLine}>
                        <View style={styles.imageSet}>
                        <Text style={styles.text}>caique@sola.com</Text>
                        </View>
                        <View style={styles.lastImg}>
                            <Image source={
                                {uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}
                                } style={styles.imgs} />
                        </View>
                    </View>
                </View>

                <View style={styles.line}>
                    <View style={styles.containerTextLine}>
                        <Text style={styles.textLine}>Senha</Text>
                    </View>
                    <View style={styles.iconsLine}>
                        <View style={styles.imageSet}>
                        <Text style={styles.text}>********</Text>
                        </View>
                        <View style={styles.lastImg}>
                            <Image source={{uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}} style={styles.imgs} />
                        </View>
                    </View>
                </View>

                <View style={styles.line}>
                    <View style={styles.containerTextLine}>
                        <Text style={styles.textLine}>Nome usuário</Text>
                    </View>
                    <View style={styles.iconsLine}>
                        <View style={styles.imageSet}>
                        <Text style={styles.text}>Caique</Text>
                        </View>
                        <View style={styles.lastImg}>
                            <Image source={{uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48"}} style={styles.imgs} />
                        </View>
                    </View>
                </View>
            </View>

            



        </View>
    )
}

export default PersonalContentScreen;