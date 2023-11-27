import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import Share from 'react-native-share';

// FUnção futura para compertilhar o link para baixar aplicativo
const ShareToAFriendScreen = () => {
  // const onShare = async () => {
  //   const result = await Share.share({
  //     title: 'Quer conhecer Stein, o melhor app de rotas para ponto de recargas de carros?',
  //     message:
  //       'https://drive.google.com/drive/folders/1d9q7HU5Mom5nKRSV4vfP6WNVq8gSLxGo?usp=drive_link',
  //   });
  // };

  const handleShare = async () => {
    try {
      const imageUri = 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2FlogoStein.png?alt=media&token=e84c9536-ff29-4e40-865c-56e3af072121'; // Substitua pelo caminho real da sua imagem
      const message = 'Abaixe nosso aplicativo para encontra um posto para recarregar seu carro! Sem nenhuma dificuldade e dor de cabeça!\nhttps://drive.google.com/drive/folders/1d9q7HU5Mom5nKRSV4vfP6WNVq8gSLxGo?usp=drive_link';

      const options = {
        title: 'Quer conhecer Stein, o melhor app de rotas para ponto de recargas de carros?',
        message: message,
        url: `${imageUri}`,
        subject: 'Com Stein você sai das situações de desespero quando seu carro está descarregando!', // Somente para Android
      };

      await Share.open(options);
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableOpacity style={styles.circule} onPress={handleShare}>
          <Image
            style={styles.icons}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fenviar.png?alt=media&token=ce712efb-d006-47bf-8228-d81d4944bfff',
            }}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.textContent}>Convide um amigo</Text>
        </View>
      </View>
      <Text style={styles.helpUs}>Nos ajude</Text>
      <View style={styles.box}>
        <TouchableOpacity style={styles.circule}>
          <Image
            style={styles.icons}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Ffavorito.png?alt=media&token=ce712efb-d006-47bf-8228-d81d4944bfff',
            }}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.textContent}>Nos avalie</Text>
        </View>
      </View>
      <View style={styles.box}>
        <TouchableOpacity style={styles.circule}>
          <Image
            style={styles.icons}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fapoie.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
            }}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.textContent}>Contribua</Text>
        </View>
      </View>
    </View>
  );
};
export default ShareToAFriendScreen;
