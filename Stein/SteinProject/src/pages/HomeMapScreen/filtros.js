import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Table = () => {
  const [selectedCells, setSelectedCells] = useState([]);
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

  const handleCellPress = (position) => {
    if (selectedCells.includes(position)) {
      // Se a célula já estiver selecionada, remova-a do array
      setSelectedCells(selectedCells.filter((cell) => cell !== position));
    } else {
      // Se a célula não estiver selecionada, adicione-a ao array
      setSelectedCells([...selectedCells, position]);
    }
  };

  const isCellSelected = (position) => selectedCells.includes(position);

  const renderTable = () => {
    const numRows = 5;
    const numCols = 3;
    const table = [];

    for (let row = 0; row < numRows; row++) {
      const rowCells = [];
      for (let col = 0; col < numCols; col++) {
        const position = row * numCols + col;
        const cellSelected = isCellSelected(position);

        rowCells.push(
          <TouchableOpacity
            key={position}
            onPress={() => handleCellPress(position)}
            style={[
              styles.cell,
              cellSelected ? styles.selectedCell : null,
              {justifyContent:"center", alignItems:"center"}
            ]}
          >
            <Image
              source={{ uri: `https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador${position+1}.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177` }}
              style={styles.cellImage}
            />
            <Text style={styles.cellText}>{`${nomeCarregadores[position]}`}</Text>
          </TouchableOpacity>
        );
      }
      table.push(
        <View key={row} style={styles.row}>
          {rowCells}
        </View>
      );
    }

    return table;
  };

  return (
    <View style={styles.container}>
      {renderTable()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  selectedCell: {
    backgroundColor: 'lightblue', // Cor de fundo para células selecionadas
  },
  cellImage: {
    width: 50,
    height: 50,
    resizeMode:"contain",
  },
  cellText: {
    textAlign: 'center',
  },
});

export default Table;
