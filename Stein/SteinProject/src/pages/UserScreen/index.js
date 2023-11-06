import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView,Platform, PermissionsAndroid} from 'react-native';
import styles from './style';
import {auth, firestore, storage} from '../../config/configFirebase';
import DocumentPicker from 'react-native-document-picker';
import DocumentPickerConstants from 'react-native-document-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import RNFS from 'react-native-fs';



const UserScreen = ({navigation}) => {
  const [userId, UserId] = useState(auth.currentUser.uid);
  const [nomeUser, setNomeUser] = useState('');

  const tabelaUsuario = firestore.collection('usuario');


  const createDirectory = async (directoryName) => {
    let rootPath;
    if (Platform.OS === 'android') {
      rootPath = RNFS.ExternalStorageDirectoryPath; // Para Android
    } else {
      rootPath = RNFS.DocumentDirectoryPath; // Para iOS
    }
  
    const folderPath = `${rootPath}/${directoryName}`;
    const exists = await RNFS.exists(folderPath);
    if (!exists) {
      await RNFS.mkdir(folderPath);
    }
    return folderPath;
  };
  
  const copyFileToDirectory = async (fileUri, directoryPath) => {
    const fileName = fileUri.substring(fileUri.lastIndexOf('/') + 1);
    const destPath = `${directoryPath}/${fileName}`;
    await RNFS.copyFile(fileUri, destPath);
    return destPath;
  };
  
  
  const selectAndCopyFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
  
      if (result) {
        const directoryName = 'YourDirectoryName'; // Altere para o nome do diretório desejado
        const directoryPath = await createDirectory(directoryName);
        const copiedFilePath = await copyFileToDirectory(result.uri, directoryPath);
        console.log(`File copied to: ${copiedFilePath}`);
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
