import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './style';
import {ScrollView} from 'react-native';
import Table from './table';
import { firestore } from '../../config/configFirebase';

export default function CadastrarCarro({onModal, navegacao, getInfo}) {
  const [rotation, setRotation] = useState(90);
  const [table, setTable] = useState(false);
  const [carregador, setCarregador] = useState(null)
  const [placa, setPlaca] = useState(false);
  const [desc, setDesc] = useState(false);
  const [cor, setCor] = useState(false);
  const [modelo, setModelo] = useState(false);
  const [uf, setUf] = useState(false);
  const [ano, setAno] = useState(false);
  const [info, setInfo] = useState(getInfo);

  const tabelaCarro = firestore.collection("carro");
  const tabelaUsuario = firestore.collection("usuario");
  
  const add = async ()=>{
    let contUser = 0;

    const getTabUser = await tabelaUsuario.get()

    const listaUser = [];

    getTabUser.forEach(doc =>{
      listaUser.push({id: doc.id, ...doc.data()})
    })

    listaUser.forEach(data =>{
      if(parseInt(data.id) > contUser){
        contUser = parseInt(data.id);
      }
    })

    contUser++;

    let dados = {
      nomeUsuario: info.nome,
      email: info.email,
      senha: info.senha,
      imagemFundo: null,
      imagemPerfil: null,
    }

    tabelaUsuario
    .doc(`${contUser}`)
    .set(dados)
    .catch(error => console.error(error));

    let countCarro = 0;

    const getTabCarro = await tabelaCarro.get();

    const listaCarro = [];

    getTabCarro.forEach(doc => {
      listaCarro.push({id: doc.id, ...doc.data()}) 
    })

    listaCarro.forEach(data => {
      if(countCarro < parseInt(data.id)){
        countCarro = parseInt(data.id);
      }
    })

    countCarro++;

    dados = {
      desc: desc,
      ano: ano,
      uf: uf,
      cor: cor,
      placa: placa,
      IDTipoCarregador: carregador,
      IDUsuario: contUser,
    } 

    tabelaCarro
    .doc(`${countCarro}`)
    .set()
    if(placa && desc && ano && modelo && uf && cor && info.length > 0){
      console.log("AQUI");
    }
  }

  return (
    <Modal style={styles.modal}>
        <ScrollView>
        <View style={styles.titleView}>
            <TouchableOpacity style={styles.touchImg} onPress={()=>{
                onModal(false)
            }}>
            <Image
            source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=4ae62381-8bc8-450d-ad26-b1d525a3045c&_gl=1*36gn8l*_ga*MTMzMzEzMzc2OS4xNjg1MDI3MDY4*_ga_CW55HF8NVT*MTY5ODc1ODMwOC4xNDQuMC4xNjk4NzU4MzA4LjYwLjAuMA..',
              }}
              style={[styles.titleImg]}
            />
            </TouchableOpacity>
          <Text style={styles.titleText}>Cadastrar Carros</Text>
        </View>
        <View style={styles.view}>
          <TextInput
            style={styles.textCad1}
            placeholder="Descrição do Veículo"
            onChangeText={setDesc}
          />
          <View>
            <View style={styles.row}>
              <TextInput style={styles.textCad2} placeholder="Placa" onChangeText={setPlaca} />
              <TextInput style={styles.textCad2} placeholder="UF" onChangeText={setUf} />
            </View>
            <View style={styles.row}>
              <TextInput style={styles.textCad2} placeholder="Modelo" onChangeText={setModelo} />
              <TextInput style={styles.textCad2} placeholder="Ano do Modelo"  onChangeText={setAno} />
            </View>
            <View style={styles.row}>
              <TextInput style={styles.textCor} placeholder="Cor" onChangeText={setCor} />
            </View>
          </View>
          <View style={styles.tableCarr}>
            <View style={styles.container}>
              <Text style={styles.textTab}>Tipo de conector</Text>
              <TouchableOpacity
                onPress={() => {
                  setRotation(rotation+180);
                  setTable(!table);
                }}>
                <Image
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=4ae62381-8bc8-450d-ad26-b1d525a3045c&_gl=1*36gn8l*_ga*MTMzMzEzMzc2OS4xNjg1MDI3MDY4*_ga_CW55HF8NVT*MTY5ODc1ODMwOC4xNDQuMC4xNjk4NzU4MzA4LjYwLjAuMA..',
                  }}
                  style={[
                    styles.imgSeta,
                    {transform: [{rotate: `${rotation}deg`}]},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View>
                {table?(
                    <Table getInfo={(select)=>{setCarregador(select)}} info={carregador}/>
                ):null}
            </View>
          </View>
          <TouchableOpacity style={styles.buttons} onPress={()=>{
            navegacao
          }}>
                <Text style={styles.textButtons}>Cadastrar Carro</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    </Modal>
  );
}
