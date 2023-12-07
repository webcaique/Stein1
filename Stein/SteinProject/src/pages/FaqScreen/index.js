import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import styles from './style';
import { RFValue } from 'react-native-responsive-fontsize';

const FaqScreen = () => {
  // Variáveis para ativação dos textos
  const [texto1, setTexto1] = useState(false);
  const [texto2, setTexto2] = useState(false);
  const [texto3, setTexto3] = useState(false);
  const [texto4, setTexto4] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.faqText}>
          <Text style={{fontSize: RFValue(100), color: '#000000'}}>FAQ</Text>
        </View>

        <View style={styles.spaceBetweenBoxes}>
          <View style={styles.boxes}>
            <Text style={styles.txt}>Quem Somos?</Text>
            <TouchableOpacity
              style={styles}
              onPress={() => {
                setTexto1(!texto1);
              }}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={{
                  ...styles.imagem,
                  transform: [{rotate: `${90 + (texto1 ? 180 : 0)}deg`}],
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.lines} />
          {texto1 ? (
            <View style={styles.boxTexto1}>
              <Text style={styles.texto1}>
                A Stein foi fundada por um grupo de cinco estudantes durante o
                processo de realização de seus trabalhos de conclusão de curso
                (TCC). Eles compartilharam uma visão em comum e transformaram
                essa visão em realidade, dando início à Stein como uma
                iniciativa que cresceu a partir do empenho e dedicação dos
                fundadores.
              </Text>
            </View>
          ) : (
            console.log('')
          )}
        </View>

        <View style={styles.spaceBetweenBoxes}>
          <View style={styles.boxes}>
            <Text style={styles.txt}>Quais são os benéficios do Stein?</Text>
            <TouchableOpacity
              style={styles}
              onPress={() => {
                setTexto2(!texto2);
              }}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={{
                  ...styles.imagem,
                  transform: [{rotate: `${90 + (texto2 ? 180 : 0)}deg`}],
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.lines} />
          {texto2 ? (
            <View style={styles.boxTexto1}>
              <View style={styles.boxTexto2}>
                <View style={styles.spot} />
                <Text style={styles.texto2}>
                  Você se beneficiará de produtos e serviços que são projetados
                  com uma mentalidade fresca e uma abordagem inovadora. Nossa
                  equipe está sempre pensando fora da caixa para oferecer
                  soluções que atendam às suas necessidades de maneira única.
                </Text>
              </View>
              <View style={styles.boxTexto2}>
                <View style={styles.spot} />
                <Text style={styles.texto2}>
                  Acreditamos na constante melhoria e evolução, o que significa
                  que nossos produtos e serviços são atualizados regularmente
                  com base nas mais recentes descobertas e melhores práticas.
                </Text>
              </View>
              <View style={{...styles.boxTexto2, paddingRight:10,}}>
                <View style={styles.spot} />
                <Text style={styles.texto2}>
                  Você pode ter confiança em nossa capacidade de adaptação às mudanças e de se manter na vanguarda de nosso setor, graças à nossa origem na academia e ao compromisso com a pesquisa e o desenvolvimento.
                </Text>
              </View>
              <View style={styles.boxTexto2}>
                <View style={styles.spot} />
                <Text style={styles.texto2}>
                  Nossa história como uma empresa fundada por estudantes também
                  nos torna profundamente comprometidos em apoiar a próxima
                  geração de empreendedores e inovadores.
                </Text>
              </View>
            </View>
          ) : (
            console.log('')
          )}
        </View>

        <View style={styles.spaceBetweenBoxes}>
          <View style={styles.boxes}>
            <Text style={styles.txt}>Contatos</Text>
            <TouchableOpacity style={styles}
            onPress={()=>{setTexto3(!texto3)}}
            >
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={{
                    ...styles.imagem,
                    transform: [{rotate: `${90 + (texto3 ? 180 : 0)}deg`}],
                  }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.lines} />

          {texto3 ? (
            <View style={styles.boxTexto1}>
              <View style={styles.boxTexto2}>
                <View style={styles.spot} />
                <Text style={styles.texto2}>
                <Text style={styles.fontBold}>Ligue para nós:</Text> +55 (11) 98709-9061
                </Text>
              </View>
              <View style={styles.boxTexto2}>
                <View style={styles.spot} />
                <Text style={styles.texto2}>
                <Text style={styles.fontBold}>Nos envie um email:</Text>{"\n"}steinsuport@gmail.com
                </Text>
              </View>
              <View style={{...styles.boxTexto2, paddingRight:10,}}>
                <View style={styles.spot} />
                <Text style={styles.texto2}>
                <Text style={styles.fontBold}>Visite nossa sede:</Text>{"\n"}R. Sebastião Antonine Nº61,{"\n"}CEP 06622-180
                </Text>
              </View>
            </View>
          ) : (
            console.log('')
          )}

        </View>

        <View style={styles.spaceBetweenBoxes}>
          <View style={styles.boxes}>
            <Text style={styles.txt}>Como mudar minha senha</Text>
            <TouchableOpacity style={styles}
            onPress={()=>{setTexto4(!texto4)}}
            >
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={{
                    ...styles.imagem,
                    transform: [{rotate: `${90 + (texto4 ? 180 : 0)}deg`}],
                  }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.lines} />
          {texto4 ? (
            <View style={styles.boxTexto1}>
              <View style={styles.boxTexto2}>
                <Text style={styles.texto2}>
                <Text style={styles.fontBold}>1°. </Text>Abra o <Text style={[styles.fontBold, {color:"#563595"}]}>Stein</Text>. Talvez você precise fazer login.
                </Text>
              </View>
              <View style={styles.boxTexto2}>
              <Text style={styles.texto2}>
                <Text style={styles.fontBold}>2°. </Text>Em "configurações", selecione "configurações de conta" e depois “conteúdo pessoal”.
                </Text>
              </View>
              <View style={{...styles.boxTexto2, paddingRight:10,}}>
              <Text style={styles.texto2}>
                <Text style={styles.fontBold}>3°. </Text>Selecione “senha” e “alterar senha”. Digite sua nova senha.
                </Text>
              </View>
            </View>
          ) : (
            console.log('')
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default FaqScreen;
