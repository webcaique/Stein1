import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import styles from './style';
import {auth, firestore, storage} from '../../config/configFirebase';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {utils} from '@react-native-firebase/app';
import {launchImageLibrary} from 'react-native-image-picker';

const UserScreen = ({navigation}) => {
  const path = require('path');
  const userId = auth.currentUser.uid;
  const [userData, setUserData] = useState();
  const [nomeUser, setNomeUser] = useState('');
  const [prog, setProg] = useState();
  const [imgFundo, setImgFundo] = useState();
  const [imgPerfil, setImgPerfil] = useState();

  const tabelaUsuario = firestore.collection('usuario');


  const selectImage = async (tipo) => {
    const status = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

    if (status === 'granted') {
      const imagem = await launchImageLibrary();
      console.log(imagem.assets[0].originalPath);
      const extencao = path.extname(imagem.assets[0].originalPath)
      console.log(extencao)


      await storage
      .ref(`UserDir/${nomeUser}/${tipo}${extencao}`)
        .putFile(imagem.assets[0].originalPath)
        .then(data => {
          console.log(data);
          if(tipo == "fundo"){
            tabelaUsuario.doc(userId).update({
              imagemFundo: data.metadata.fullPath,
            })
          } else {
            tabelaUsuario.doc(userId).update({
              imagemPerfil: data.metadata.fullPath,
            })
          }
        })
        .catch(error => console.log(error));
    } else {
      console.log('Permissão de escrita no armazenamento externo negada');
    }
  };

  const getUserData = async () => {
    let usuario;
    tabelaUsuario.onSnapshot( async datas => {
      datas._docs.forEach(dados => {
        if (userId == dados._ref._documentPath._parts[1]) {
          usuario = {id: dados._ref._documentPath._parts[1], ...dados._data};
        }
      });

      setUserData(usuario);
      setNomeUser(usuario.nomeUsuario);


      if (usuario.imagemFundo) {
        const imagemFundo = await storage.ref(`${usuario.imagemFundo}`).getDownloadURL();
        setImgFundo(imagemFundo);
      }

      if (usuario.imagemPerfil) {
        const imagemPerfil = await storage.ref(`${usuario.imagemPerfil}`).getDownloadURL();
        setImgPerfil(imagemPerfil);
      }
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.userImageBgBackgroudn}
        onPress={async () => {
          selectImage("fundo");
        }}>
        <Image
          style={styles.userImageBg}
          source={
            imgPerfil?
            require('../../../assets/UserAsset/TestUser/BgImage.png')
            :
            {
              uri: imgPerfil,
            }
          }
        />
      </TouchableOpacity>
      <View style={styles.userImageBackGround}>
        <TouchableOpacity 
        style={styles.circule}
        onPress={async () =>{
          selectImage("perfil");
        }}
        >
          <Image
            style={styles.useruserImage}
            source={
              imgPerfil?
              require('../../../assets/UserAsset/TestUser/userImage.png')
              :
              {
                uri: imgPerfil,
              }
            }
          />
        </TouchableOpacity>
        <Text style={styles.userName}>Nome do usuário</Text>
        <View style={styles.userPowerSupplyUnit}>
          <Image
            style={styles.powerSupplyUnit}
            source={require('../../../assets/VetoresPNG/carregador1.png')}
          />
          <Image
            style={styles.powerSupplyUnit}
            source={require('../../../assets/VetoresPNG/carregador2.png')}
          />
        </View>
      </View>
      <View style={styles.lineList}>
        <View style={styles.lineLisText}>
          <TouchableOpacity>
            <Text style={styles.recente}>Recente</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.locaisSalvos}>Locais salvos</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.listText}>
            <View style={styles.textFromList1}>
              <Text style={styles.texts}>Carregador Br2w</Text>
              <Text style={styles.texts}>
                Rua Lady Esteves da Conceição, 680 - Vale Encantado, Macaé - RJ,
                27933-420, Brasil.
              </Text>
            </View>
            <View style={styles.textFromList2}>
              <TouchableOpacity style={styles.button}>
                <Image
                  style={styles.iconArrowToRight}
                  source={require('../../../assets/Icons/seta-direita.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.lines} />

          <View style={styles.listText}>
            <View style={styles.textFromList1}>
              <Text style={styles.texts}>Botafogo Shopping</Text>
              <Text style={styles.texts}>
                Praia de Botafogo, 400 - Botafogo, Rio de Janeiro - RJ, CEP
                22250-040, Brasil.
              </Text>
            </View>
            <View style={styles.textFromList2}>
              <TouchableOpacity style={styles.button}>
                <Image
                  style={styles.iconArrowToRight}
                  source={require('../../../assets/Icons/seta-direita.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.lines} />

          <View style={styles.listText}>
            <View style={styles.textFromList1}>
              <Text style={styles.texts}>Barra Business Center</Text>
              <Text style={styles.texts}>
                Av. das Américas 3301,Barra da Tijuca, Rio de Janeiro - RJ, Cep
                22631-003
              </Text>
            </View>
            <View style={styles.textFromList2}>
              <TouchableOpacity style={styles.button}>
                <Image
                  style={styles.iconArrowToRight}
                  source={require('../../../assets/Icons/seta-direita.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.lines} />
        </ScrollView>
      </View>
    </View>
  );
};
export default UserScreen;
