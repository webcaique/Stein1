import React from "react";
import {View, Text, TouchableOpacity, Image, ScrollView} from "react-native";
import styles  from "./style";
import { FlatList } from "react-native-gesture-handler";
import BoxData from "./boxData.js"

const EditingHouse = ({navigation}) => {


    return(
        
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.titleContainerView}>
                    <Text style={styles.titleContainer}>Edite as informações da sua casa ou trabalho.</Text>    
                </View>

                <FlatList
                data={house}
                keyExtractor={item=>item.id}
                renderItem={({item})=>
                <View style={styles.box}> 

                    <View style={styles.titleBoxView}>
                        <Text style={styles.titleBox}>Residência</Text>
                    </View>

                    <View style={styles.content}>

                        <View style={styles.line}> 

                            <View style={styles.titleLineView}>
                                <Text style={styles.titleLine}>Endereço</Text>
                            </View>

                            <View style={styles.link}>

                                <View style={styles.textLinkView}> 
                                    <Text style={styles.textLink}>Rua Reinado do Cavalo Marinho, 564 </Text>
                                </View>

                                <View style={styles.iconLinkView}> 
                                    <Image source={require("../../../assets/Icons/pin-de-localizacao.png")} style={styles.iconLink}/>
                                </View>
                            
                            </View>

                        </View>

                        
                        <View style={styles.line}> 

                            <View style={styles.titleLineView}>
                                <Text style={styles.titleLine}>Tipo de carregador</Text>
                            </View>

                            <View style={styles.link}>

                                <View style={styles.iconLinkView}> 
                                <Image source={require("../../../assets/VetoresPNG/carregador1.png")} style={styles.iconLink}/>
                                <Image source={require("../../../assets/VetoresPNG/carregador2.png")} style={styles.iconLink}/>
                                </View>

                                <View style={styles.iconLinkView}> 
                                    <Image source={require("../../../assets/Icons/seta-direita.png")} style={styles.iconLink}/>
                                </View>
                            
                            </View>

                        </View>


                        <View style={styles.line}> 

                            <View style={styles.titleLineView}>
                                <Text style={styles.titleLine}>Nome de usuário</Text>
                            </View>

                            <View style={styles.link}>

                                <View style={styles.textLinkView}> 
                                    <Text style={styles.textLink}>Daniel</Text>
                                </View>

                                <View style={styles.iconLinkView}> 
                                    <Image source={require("../../../assets/Icons/seta-direita.png")} style={styles.iconLink}/>
                                </View>
                            
                            </View>

                        </View>



                    </View>
                </View>
            }
                />

                <View style={styles.buttonBox}>
                    <TouchableOpacity style={styles.editionButton}
                    onPressIn={()=> navigation.navigate("EditHome")}
                    >
                        <Text style={styles.textButton}>Editar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonBox}>
                    <TouchableOpacity style={styles.editionButton}
                    onPressIn={()=> navigation.navigate("AddHome")}
                    >
                        <Text style={styles.textButton}>Adicionar</Text>
                    </TouchableOpacity>
                </View>






                <View style={styles.box}> 

                    <View style={styles.titleBoxView}>
                        <Text style={styles.titleBox}>Trabalho</Text>
                    </View>

                    <View style={styles.content}>

                        <View style={styles.line}> 

                            <View style={styles.titleLineView}>
                                <Text style={styles.titleLine}>Endereço</Text>
                            </View>

                            <View style={styles.link}>

                                <View style={styles.textLinkView}> 
                                    <Text style={styles.textLink}>Rua Reinado do Cavalo Marinho, 564 </Text>
                                </View>

                                <View style={styles.iconLinkView}> 
                                    <Image source={require("../../../assets/Icons/pin-de-localizacao.png")} style={styles.iconLink}/>
                                </View>
                            
                            </View>

                        </View>

                        
                        <View style={styles.line}> 

                            <View style={styles.titleLineView}>
                                <Text style={styles.titleLine}>Tipo de carregador</Text>
                            </View>

                            <View style={styles.link}>

                                <View style={styles.iconLinkView}> 
                                <Image source={require("../../../assets/VetoresPNG/carregador1.png")} style={styles.iconLink}/>
                                <Image source={require("../../../assets/VetoresPNG/carregador2.png")} style={styles.iconLink}/>
                                </View>

                                <View style={styles.iconLinkView}> 
                                    <Image source={require("../../../assets/Icons/seta-direita.png")} style={styles.iconLink}/>
                                </View>
                            
                            </View>

                        </View>


                        <View style={styles.line}> 

                            <View style={styles.titleLineView}>
                                <Text style={styles.titleLine}>Nome de usuário</Text>
                            </View>

                            <View style={styles.link}>

                                <View style={styles.textLinkView}> 
                                    <Text style={styles.textLink}>Daniel</Text>
                                </View>

                                <View style={styles.iconLinkView}> 
                                    <Image source={require("../../../assets/Icons/seta-direita.png")} style={styles.iconLink}/>
                                </View>
                            
                            </View>

                        </View>



                    </View>
                </View>

                <View style={styles.buttonBox}>
                    <TouchableOpacity style={styles.editionButton}
                    onPressIn={()=> navigation.navigate("EditWork")}
                    >
                        <Text style={styles.textButton}>Editar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonBox}>
                    <TouchableOpacity style={styles.editionButton}
                    onPressIn={()=> navigation.navigate("AddWork")}
                    >
                        <Text style={styles.textButton}>Adicionar</Text>
                    </TouchableOpacity>
                </View>




            </ScrollView>    
        </View>
    )
}

export default EditingHouse;