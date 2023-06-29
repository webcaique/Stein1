/*import React from "react";
import {View, Text, ScrollView, Image, TouchableOpacity} from "react-native";
import styles from "./style"

const ChangeAccount = ({navigation}) => {
    return(
        <View style={styles.mainContainer}>
            <ScrollView>
                <Text>Alterar entre as contas e gerencie o login</Text>
                <View style={styles.box1}>
                    <Text>Atualmente em:</Text>
                    <View style={styles.inBox1}>
                        <Image source={require("../../../assets/Icons/image.png")}/>
                        <View>
                            <Text>Daniel Santana</Text>
                            <Text>Usuário</Text>
                            <Text>danielsantana@gmail.com</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.lines}/>
                <View style={styles.box1}>
                    <Text>Suas contas:</Text>
                    <View style={styles.inBox2}>
                        <Image 
                        style={styles.image2}
                        source={require("../../../assets/Icons/image1.png")}/>
                        <View style={styles.textInBox}>
                            <Text style={styles.textsInBoxStyles}>Estação de Carregamento Porsche - Quinta do Marquês</Text>
                            <Text style={styles.textsInBoxStyles}>Administrador</Text>
                            <Text style={styles.textsInBoxStyles}>danielmartins@gmail.com</Text>
                        </View>
                        <TouchableOpacity>
                            <Image 
                            source={require("../../../assets/Icons/site.png")}
                            style={styles.linkImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                style={styles.plusButton}
                >
                    <TouchableOpacity style={styles.circuleButton}>
                        <Image source={require("../../../assets/Icons/mais.png")}
                        style={styles.plusImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circuleButton} 
                    onPress={()=>navigation.navigate("InitScreen")}
                    >
                        <Image source={require("../../../assets/Icons/sair.png")}
                        style={styles.leaveImage}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default ChangeAccount;*/


import React,{useState} from 'react';
import {Text, View, Image, TouchableOpacity } from 'react-native';
import estilos from './style';


export default function ChangeAccount(){
return (
  <View style={estilos.tela}>
       <View style={{height:3, width:'100%', backgroundColor:'#000', position:'absolute', top:'39%'}}>
      </View>
      <TouchableOpacity>
    <Image source={require('../../../assets/UserAsset/TestUser/AddConta.png')}
    style={{flex:1, justifyContent:'center',resizeMode:'contain',height:40,width:'40%',position:'absolute',right:'27%',top:410}}
    />
    </TouchableOpacity>
      <TouchableOpacity>
    <Image source={require('../../../assets/UserAsset/TestUser/user1.png')}
    style={{resizeMode:'contain',height:100,width:'100%',position:'absolute',right:'25%',top:300}}
    />
  </TouchableOpacity>

    <Text style={{fontSize:16,color:'#000',fontWeight:'400', position:'absolute', top:10, padding:10}}>Alterne entre as contas e gerencie o login</Text>
 <View style={estilos.usuario}>
      <Text  style={{fontSize:24,fontWeight:'600', color:'#000'}}>atualmente em:</Text>
      <View style={estilos.textos}>
      <Text  style={{fontSize:18,fontWeight:'400', color:'#000'}}>Daniel Santana</Text>
      <Text  style={{fontSize:16,fontWeight:'600', color:'#4E12C2'}}>usuario</Text>
      <Text  style={{fontSize:12,fontWeight:'600', color:'#000'}}>danielsantana@gmail.com</Text>
      </View>
      <TouchableOpacity>
        <Image source={require('../../../assets/UserAsset/TestUser/contaUser.png')}
        style={{resizeMode:'contain',height:100,width:'100%',position:'absolute',right:'20%'}}
        />
      </TouchableOpacity>

   </View>
  <View style={estilos.usuario1}>
     
<View style={estilos.usuario1}>
<Text  style={{fontSize:24,fontWeight:'600', color:'#000'}}>Suas contas:</Text>
  <View style={estilos.textos1}>
  
  <Text  style={{fontSize:18,fontWeight:'400', color:'#000', width:'47%'}}>Estação de Carregamento 
  Porsche Quinta do Marquês</Text>
  <Text  style={{fontSize:16,fontWeight:'600', color:'#4E12C2'}}>Administrador</Text>
  <Text  style={{fontSize:12,fontWeight:'600', color:'#000'}}>danielsantana@gmail.com</Text>
  </View>
  
</View>
    </View>
    </View>




)
}