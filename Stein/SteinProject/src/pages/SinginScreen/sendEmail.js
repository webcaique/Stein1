
const enviarEmail = (email, num) => {

};




const [verifEmail, setVerifEmail] = useState(false);
const [numeroVerif, setNumeroVerif] = useState('');
const [num1, setNum1] = useState();
const [num2, setNum2] = useState();
const [num3, setNum3] = useState();
const [num4, setNum4] = useState();

<Modal
            visible={verifEmail}
            transparent
            /* Verificação do email do usuário */
          >
            <View style={styles.mainContainerVerifEmail}>
              <View style={styles.containerVerifEmail}>
                <TouchableOpacity
                  style={styles.imgSaidaVerifEmail}
                  onPress={() => setVerifEmail(!email)}>
                  <Image
                    source={{
                      uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fmais.png?alt=media&token=f29b19c6-efb8-4f11-b1b4-ed9c8a95fbd6',
                    }}
                    width={25}
                    height={25}
                    resizeMode="contain"
                    style={[
                      {
                        transform: [{rotate: '45deg'}],
                      },
                    ]}
                  />
                </TouchableOpacity>
                <View>
                  <Text style={styles.TitleVerifEmail}>
                    VERIFICAÇÃO DO EMAIL
                  </Text>
                </View>
                <View>
                  <Text style={styles.textInfo}>
                    Foi enviado um código no email{' '}
                    <Text style={{fontWeight: '900'}}>{email}</Text>
                  </Text>
                </View>
                <View style={styles.verifEmailTextInput}>
                  <TextInput
                    style={styles.verifEmail}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={texto => {
                      if (!isNaN(parseFloat(texto)) && isFinite(texto)) {
                        setNum1(texto);
                      } else {
                        setNum1();
                      }
                    }}
                    value={num1}
                  />

                  <TextInput
                    style={styles.verifEmail}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={texto => {
                      if (!isNaN(parseFloat(texto)) && isFinite(texto)) {
                        setNum2(texto);
                      } else {
                        setNum2();
                      }
                    }}
                    value={num1}
                  />

                  <TextInput
                    style={styles.verifEmail}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={texto => {
                      if (!isNaN(parseFloat(texto)) && isFinite(texto)) {
                        setNum3(texto);
                      } else {
                        setNum3();
                      }
                    }}
                    value={num1}
                  />

                  <TextInput
                    style={styles.verifEmail}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={texto => {
                      if (!isNaN(parseFloat(texto)) && isFinite(texto)) {
                        setNum5(texto);
                      } else {
                        setNum4();
                      }
                    }}
                    value={num1}
                  />
                </View>

                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>Não recebeu o código? </Text>
                  <TouchableOpacity
                    onPress={() => {
                      const numeroAleatorio =
                        Math.floor(Math.random() * 9000) + 1000;
                      setNumeroVerif(numeroAleatorio);
                      enviarEmail(email);
                    }}>
                    <Text
                      style={{
                        fontStyle: 'italic',
                        textDecorationLine: 'underline',
                        color: '#00a',
                      }}>
                      Reenviar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>