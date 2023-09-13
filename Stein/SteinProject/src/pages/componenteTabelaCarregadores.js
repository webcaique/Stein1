import React, { useState } from "react";
import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import estilos from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function({onSelectCarregadores, ...props} ) {
  const [selectedCarregadores, setSelectedCarregadores] = useState([]); // Use o estado para controlar os carregadores selecionados

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

  

  function toggleCarregadorSelection(carregadorIndex) {
    setSelectedCarregadores(prevSelected => {
      if (Array.isArray(prevSelected)) {
        if (prevSelected.includes(carregadorIndex)) {
          return prevSelected.filter(index => index !== carregadorIndex);
        } else {
          return [...prevSelected, carregadorIndex];
        }
      } else {
        return [carregadorIndex]; // Se prevSelected for undefined, crie um novo array com carregadorIndex
      }
    });
    onSelectCarregadores(prevSelected => {
      if (Array.isArray(prevSelected)) {
        if (prevSelected.includes(carregadorIndex)) {
          return prevSelected.filter(index => index !== carregadorIndex);
        } else {
          return [...prevSelected, carregadorIndex];
        }
      } else {
        return [carregadorIndex]; // Se prevSelected for undefined, crie um novo array com carregadorIndex
      }
    });
  }
  
  
  

  function renderCarregador(i) {
    const carregadorIndex = i + 1;
    const isSelected = selectedCarregadores.includes(carregadorIndex);
  
    return (
      
      <TouchableOpacity
        key={i}
        style={[
          estilos.carregadores,
          isSelected ? estilos.bgPreto : estilos.bgBranco
        ]}
        onPress={() => toggleCarregadorSelection(carregadorIndex)}
      >
        <View style={estilos.carregador}>
          <Image
            source={{
              uri: `https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador${carregadorIndex}.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177`
            }}
            style={estilos.imgs}
          />
          <Text style={estilos.nomesCarregadores}>
            {nomeCarregadores[i]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

    const content = <ScrollView>
    {props.notFiltro?<View/>:
    [<Text>Mostrando filtros para</Text>,
    <Text>conectores</Text>]
    }
    
    <View style={{ flexDirection: "row" }}>
    {Array.from({ length: 15 }, (_, i) => i).map(i => {
      const lista = [];
      if(i < 3){
      lista.push(
      <View>
          {renderCarregador(i)} 
      </View>);
      }
      return lista;
    }
      
      
    )}
    </View>
    <View style={{ flexDirection: "row" }}>
    {Array.from({ length: 15 }, (_, i) => i).map(i => {
      const lista = [];
      if(i > 2 && i < 6){
      lista.push(
      <View>
          {renderCarregador(i)} 
      </View>);
      }
      return lista;
    }
      
      
    )}
    </View>
    <View style={{ flexDirection: "row" }}>
    {Array.from({ length: 15 }, (_, i) => i).map(i => {
      const lista = [];
      if(i > 5 && i < 9){
      lista.push(
      <View>
          {renderCarregador(i)} 
      </View>);
      }
      return lista;
    }
      
      
    )}
    </View>
    <View style={{ flexDirection: "row" }}>
    {Array.from({ length: 15 }, (_, i) => i).map(i => {
      const lista = [];
      if(i > 8 && i < 12){
      lista.push(
      <View>
          {renderCarregador(i)} 
      </View>);
      }
      return lista;
    }
      
      
    )}
    </View>
    <View style={{ flexDirection: "row" }}>
    {Array.from({ length: 15 }, (_, i) => i).map(i => {
      const lista = [];
      if(i > 11 && i < 15){
      lista.push(
      <View>
          {renderCarregador(i)} 
      </View>);
      }
      return lista;
    }
      
      
    )}
    </View>
    
    
  </ScrollView>
  return (
    content
    
  );
}