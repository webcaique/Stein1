<View style={styles.mainContainer}>
      <View style={styles.containerTextTop}>
        <Text style={styles.textTop}>
          Edite as informações de sua conta pessoal.
        </Text>
      </View>

      <View style={styles.box}>
        <View style={styles.containerMainText}>
          <Text style={styles.mainText}>Suas informações pessoais</Text>
        </View>

        <View style={styles.line}>
          <View style={styles.containerTextLine}>
            <Text style={styles.textLine}>Estado</Text>
          </View>
          <View style={styles.iconsLine}>
            <View style={styles.imageSet}>
              <Text style={styles.text}>{localizacao}</Text>
            </View>
            <View style={styles.lastImg}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fpin-de-localizacao.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={styles.imgs}
              />
            </View>
          </View>
        </View>

        <View style={styles.line}>
          <View style={styles.containerTextLine}>
            <Text style={styles.textLine}>Tipo de Carregador</Text>
          </View>
          <View style={styles.iconsLine}>
            <View style={styles.imageSet}>
              <FlatList
                contentContainerStyle={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }} // Alinhar à direita
                horizontal={true}
                data={carregador}
                keyExtractor={item => item.id}
                accessibilityElementsHidden={true}
                renderItem={item => (
                  <Image
                    source={{
                      uri: `https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador${item.item}.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177`,
                    }}
                    style={styles.imgs}
                  />
                )}
              />
            </View>
            <View style={styles.lastImg}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={styles.imgs}
              />
            </View>
          </View>
        </View>

        <View style={styles.line}>
          <View style={styles.containerTextLine}>
            <Text style={styles.textLine}>Email</Text>
          </View>
          <View style={styles.iconsLine}>
            <View style={styles.imageSet}>
              <Text style={styles.text}>{emailUser}</Text>
            </View>
            <View style={styles.lastImg}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={styles.imgs}
              />
            </View>
          </View>
        </View>

        <View style={styles.line}>
          <View style={styles.containerTextLine}>
            <Text style={styles.textLine}>Senha</Text>
          </View>
          <View style={styles.iconsLine}>
            <View style={styles.imageSet}>
              <Text style={styles.text}>{"*".repeat(senha.length)}</Text>
            </View>
            <View style={styles.lastImg}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={styles.imgs}
              />
            </View>
          </View>
        </View>

        <View style={styles.line}>
          <View style={styles.containerTextLine}>
            <Text style={styles.textLine}>Nome usuário</Text>
          </View>
          <View style={styles.iconsLine}>
            <View style={styles.imageSet}>
              <Text style={styles.text}>{nomeUser}</Text>
            </View>
            <View style={styles.lastImg}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={styles.imgs}
              />
            </View>
          </View>
        </View>
      </View>
    </View>


import {
    ScaledSheet,
    scale,
    moderateScale,
    verticalScale,
    moderateVerticalScale,
    moderateHorizontalScale,
  } from 'react-native-size-matters';
  
  const styles = ScaledSheet.create({
    mainContainer: {
      padding: 10,
      width: '100%',
      height: '100%',
      flex: 1,
    },
    textTop: {
      fontSize: 16,
      marginBottom: 10,
    },
    containerTextTop: {
      width: '100%',
    },
    box: {
      width: '100%',
      height: 'auto',
      padding: 10,
      alignItems: 'center',
      borderWidth: 1,
    },
    containerMainText: {
      marginBottom: 10,
    },
    mainText: {
      fontSize: 20,
      fontWeight: '700',
    },
    line: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    iconsLine: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    imageSet: {
      alignItems: 'flex-end',
      width: 125,
      height: 25,
    },
    imgs: {
      marginLeft: 5,
      width: 25,
      resizeMode: 'contain',
      height: 25,
    },
    textLine: {
      fontSize: 18,
    },
    containerTextLine: {
      width: 'auto',
    },
    text:{
      width:"100%",
    }
  });
  
  export default styles;
  