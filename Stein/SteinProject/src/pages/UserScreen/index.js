import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import styles from './style';
import {auth, firestore} from '../../config/configFirebase';
import DocumentPicker from 'react-native-document-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

const UserScreen = ({navigation}) => {
  const userId = auth.currentUser.uid;
  const [nomeUser, setNomeUser] = useState('');
  const [prog, setProg] = useState();

  const tabelaUsuario = firestore.collection('usuario');

  const uploadFileToFirebaseStorage = async (file) => {
    // Verifique se a permissão já foi concedida
    const permissionStatus = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
  
    if (permissionStatus === RESULTS.GRANTED) {
      // A permissão já foi concedida, faça o upload do arquivo
      console.log(file[0].uri);
      const upload = storage().ref(`/UserDir/${nomeUser}`).putFile(file[0].uri);
      upload
      .on(
        "state_changed",
        (snaphot)=>{
          const prog = Math.round(
            ((snaphot.bytesTransferred / snaphot.totalBytes) * 100),
            
          )
          setProg(prog)
        }, (error)=>{
          console.error(error)
        },
        ()=>{
          console.log("AQUI");
          storage().ref("UserDir")
          .child(file[0].name)
          .getDownloadURL()
          .then((url)=>{
            console.log(url);
          })
        }
      )
      
      console.log('Arquivo enviado com sucesso para o Firebase Storage.');
    } else {
      // A permissão ainda não foi concedida, solicite-a ao usuário
      const permissionRequest = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (permissionRequest === RESULTS.GRANTED) {
        // Permissão concedida, faça o upload do arquivo
      const upload = storage().ref(`UserDir/${nomeUser}`).putFile(file[0].uri);
        console.log('Arquivo enviado com sucesso para o Firebase Storage.');
      } else {
        console.log('Permissão negada pelo usuário.');
      }
    }
  };

  const selectAndCopyFile = async () => {
    try {
      const permissionStatus = await check(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      if (permissionStatus === RESULTS.GRANTED) {
        const result = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });

        if (result) {
          uploadFileToFirebaseStorage(result);
        } else {
          console.log(result);
        }
      } else {
        const permissionRequest = await request(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        if (permissionRequest === RESULTS.GRANTED) {
          // Agora você pode chamar selectAndCopyFile() novamente.
        } else {
          console.log('Permissão negada pelo usuário.');
        }
      }
    } catch (err) {
      console.error('Erro ao selecionar ou copiar o arquivo:', err);
    }
  };

  const getUserData = () => {
    let usuario;
    tabelaUsuario.onSnapshot(datas => {
      datas._docs.forEach(dados => {
        if (userId == dados._ref._documentPath._parts[1]) {
          usuario = {id: dados._ref._documentPath._parts[1], ...dados._data};
        }
      });

      setNomeUser(usuario);

      if (usuario.imagemFundo) {
        console.log('IMAGEM FUNDO');
      }

      if (usuario.imagemPerfil) {
        console.log('IMAGEM PERFIL');
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
        onPress={() => selectAndCopyFile()}>
        <Image
          style={styles.userImageBg}
          source={require('../../../assets/UserAsset/TestUser/BgImage.png')}
        />
      </TouchableOpacity>
      <View style={styles.userImageBackGround}>
        <TouchableOpacity style={styles.circule}>
          <Image
            style={styles.useruserImage}
            source={require('../../../assets/UserAsset/TestUser/userImage.png')}
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
