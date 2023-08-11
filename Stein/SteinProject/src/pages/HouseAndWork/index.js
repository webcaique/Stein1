import React from "react";
import {View, Text, TouchableOpacity, Image, ScrollView, FlatList} from "react-native";
import styles  from "./style";
import BoxData from "./boxData.js"

var house = [];
var work = [];
var exampleAppHouse = [
    {
        id:"00",
        rua: "Rua Reinado do Cavalo Marinho, 564",
        carregador:[
            "carregador1.png",
            "carregador2.png",
        ],
        nomeUser: "Daniel",

    },
    {
        id:"01",
        rua: "Rua Eduardo Alves, 117",
        carregador:[
            "carregador3.png",
            "carregador4.png",
        ],
        nomeUser: "Caique",

    },
    {
        id:"02",
        rua: "Rua Jupiter, 65",
        carregador:[
            
        ],
        nomeUser: "Caique",

    }
]
var exampleAppWork = [
    {
        id:"00",
        rua: "Rua Reinado do Cavalo Marinho, 111",
        carregador:[
            "carregador1.png",
            "carregador2.png",
        ],
        nomeUser: "Daniel",

    }
]

exampleAppHouse.forEach((desc,id) => {
    house.push(desc)
});

exampleAppWork.forEach((desc,id) => {
    work.push(desc)
});

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
                accessibilityElementsHidden={true}
                
                renderItem={({item})=>
                <BoxData titulo={"Residência"} rua={item.rua} carregador={item.carregador} user={item.nomeUser}/>
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






                <FlatList
                data={work}
                keyExtractor={item=>item.id}
                accessibilityElementsHidden={true}
                
                renderItem={({item})=>
                <BoxData titulo={"Trabalho"} rua={item.rua} carregador={item.carregador} user={item.nomeUser}/>
            }
                />

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