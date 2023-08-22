import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity,} from 'react-native';
import styles from "./style";



export default function InitScreen({navigation}) {
  return (
    <View style={{width:"100%",height:"100%",flex:1}}>

      <View style={styles.conteiner} /* Container principal da página */>
        <View style={styles.backgroundLogo} /* A logo que ficará no meio, junto com seu fundo */>
        <Image source={
          {
            uri: "https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fcircle.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
          }
          } style={styles.circle} /* O circulo */ />
          <Image source={
            {
              uri:"https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2FlogoStein.png?alt=media&token=4e747581-497c-46c6-bde2-67def3834eb6"
            }
            } style={styles.logoStein} /* A logo *//>
        </View>
        <Text style={styles.textAbove}
         numberOfLines={1}
         adjustsFontSizeToFit
         /* O primeiro texto abaixo da logo */
        > It's alive! </Text>
        <TouchableOpacity style={styles.buttons} 
          onPress={()=> navigation.navigate("LoginScreen")}
          /* Botão que ativa a função para realizar a navegação entre as páginas - Botão para tela de login */
          
        >
            <Text style={styles.textButtons} /* Texto dentro do botão */>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=> navigation.navigate("SinginScreen")}
        /* Link para realizar a navegação entre as páginas - Botão para tela de cadastro */
        >
          <Text style={styles.textSingle1} /* Texto desse link */>Ainda não possui conta?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}
        onPress={()=> navigation.navigate("SinginScreen")}
        /* Botão para realizar a navegação entre as páginas - Botão para tela de cadastro */
        >
          <Text style={styles.textButtons} /* Texto do botão */>Inscreva-se</Text>
        </TouchableOpacity>
      </View>
            
    </View>
  );
};


