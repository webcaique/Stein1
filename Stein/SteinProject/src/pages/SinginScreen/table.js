import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const numRows = 5;
const numColumns = 3;

const Table = ({getInfo, info}) => {
    const nomeCarregadores = [
        "Wall",
            "Nema 14-50",
            "Tesla",
            "CCS/SAE",
            "J-1772",
            "Tesla (Roadster)",
            "Type 2",
            "Type 3",
            "Three Phase",
            "Caravan Mains Socket",
            "Commando",
            "GB/T",
            "GB/T 2",
            "CHAdeMO",
            "Tesla (Fast)",
      ];

  const [selectedCarr, setSelectedCarr] = useState(null);

  const createTable = () => {
    const table = [];

    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numColumns; j++) {
        const carregadorIndex = i * numColumns + j + 1;
        let isSelected = selectedCarr === carregadorIndex;
        if(info){
            isSelected = info == carregadorIndex;
        }

        row.push(
          <TouchableOpacity
            key={carregadorIndex}
            style={[styles.Carr, isSelected && styles.selectedCarr]}
            onPress={() => {
                handleCarrPress(carregadorIndex)
                getInfo(carregadorIndex)
            }}
          >
            <Image
            source={{uri:`https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador${carregadorIndex}.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177`}}
            style={styles.imgCarr}
            />
            <Text style={isSelected ? styles.selectedText : styles.text}>{nomeCarregadores[carregadorIndex-1]}</Text>
          </TouchableOpacity>
        );
      }
      table.push(<View key={i} style={styles.row}>{row}</View>);
    }

    return table;
  };

  const handleCarrPress = (carregadorIndex) => {
    setSelectedCarr(carregadorIndex);
  };

  return <View>{createTable()}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  Carr: {
    width: RFValue(100),
    height: RFValue(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderWidth:1,
  },
  selectedCarr: {
    backgroundColor: '#D9D9D9',
  },
  text: {
    fontSize: RFValue(10),
    textAlign:"center"
  },
  selectedText: {
    fontSize: RFValue(10),
  },
  imgCarr:{
    width:RFValue(50),
    height:RFValue(50),
    resizeMode:"contain",
  }
});

export default Table;
