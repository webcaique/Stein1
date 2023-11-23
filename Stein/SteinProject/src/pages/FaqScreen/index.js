import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import styles from './style';

const FaqScreen = () => {
  const [rotation1, setRotation1] = useState(90);
  const [rotation2, setRotation2] = useState(90);
  const [rotation3, setRotation3] = useState(90);
  const [rotation4, setRotation4] = useState(90);

  const [text1, setText1] = useState(false);
  const [text2, setText2] = useState(false);
  const [text3, setText3] = useState(false);
  const [text4, setText4] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.faqText}>
          <Text style={{fontSize: 100, color: '#000000'}}>FAQ</Text>
        </View>
        <View style={styles.spaceBetweenBoxes}>
          <View style={styles.boxes}>
            <Text style={styles.txt}>Quem somos?</Text>
            <TouchableOpacity
              style={styles}
              onPress={() => {
                setRotation1(rotation1 + 180);
                setText1(!text1);
              }}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={[
                  styles.imagem,
                  {transform: [{rotate: `${rotation1}deg`}]},
                ]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.lines} />
          {text1 ? (
            <View style={styles.textFaq}>
              <Text
              style={styles.faq}
              >
                A Stein foi fundada por um grupo de cinco estudantes durante o
                processo de realização de seus trabalhos de conclusão de curso
                (TCC). Eles compartilharam uma visão em comum e transformaram
                essa visão em realidade, dando início à Stein como uma
                iniciativa que cresceu a partir do empenho e dedicação dos
                fundadores.
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.spaceBetweenBoxes}>
          <View style={styles.boxes}>
            <View style={{width: '90%'}}>
              <Text style={styles.txt}>
                Como entrar em contato com o suporte ao cliente?
              </Text>
            </View>
            <TouchableOpacity
              style={styles}
              onPress={() => {
                setRotation2(rotation2 + 180);
                setText2(!text2);
              }}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={[
                  styles.imagem,
                  {transform: [{rotate: `${rotation2}deg`}]},
                ]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.lines} />

          {text2 ? (
            <View style={styles.textFaq}>
              <Text
              style={styles.txtFaq}
              ><Text style={styles.textDecoration}>Ligue para nós:</Text> 
              +55 (11) 2130-2615</Text>
              <Text
              style={styles.txtFaq}
              ><Text style={styles.textDecoration}>Nos envie um email:</Text> steinsuport@gmail.com</Text>
              <Text
              style={styles.txtFaq}
              ><Text style={styles.textDecoration}>Visite nossa sede:</Text> R. Sebastião Antonine Nº61 - 06622-180</Text>
            </View>
          ) : null}

        </View>

        <View style={styles.spaceBetweenBoxes}>
          <View style={styles.boxes}>
            <Text style={styles.txt}>Quais são os benéficios do Stein</Text>
            <TouchableOpacity
              style={styles}
              onPress={() => {
                setRotation3(rotation3 + 180);
                setText3(!text3);
              }}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={[
                  styles.imagem,
                  {transform: [{rotate: `${rotation3}deg`}]},
                ]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.lines} />
          {text3 ? (
            <View style={styles.textFaq}>
              <Text
              style={styles.faq}
              >
                Você se beneficiará de produtos e serviços que são projetados com uma mentalidade fresca e uma abordagem inovadora. Nossa equipe está sempre pensando fora da caixa para oferecer soluções que atendam às suas necessidades de maneira única.
              </Text>
              <Text
              style={styles.faq}
              >
                Acreditamos na constante melhoria e evolução, o que significa que nossos produtos e serviços são atualizados regularmente com base nas mais recentes descobertas e melhores práticas.
              </Text>
              <Text
              style={styles.faq}
              >
               Você pode ter confiança em nossa capacidade de adaptação às mudanças e de se manter na vanguarda de nosso setor, graças à nossa origem na academia e ao compromisso com a pesquisa e o desenvolvimento.
              </Text>
              <Text
              style={styles.faq}
              >
                Nossa história como uma empresa fundada por estudantes também nos torna profundamente comprometidos em apoiar a próxima geração de empreendedores e inovadores.
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.spaceBetweenBoxes}>
          <View style={styles.boxes}>
            <Text style={styles.txt}>Como mudar minha senha</Text>
            <TouchableOpacity
              style={styles}
              onPress={() => {
                setRotation4(rotation4 + 180);
                setText4(!text4);
              }}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={[
                  styles.imagem,
                  {transform: [{rotate: `${rotation4}deg`}]},
                ]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.lines} />


          {text4 ? (
            <View style={styles.textFaq}>
              <Text
              style={styles.faq}
              >
                <Text style={styles.textDecoration}>1°.</Text> Abra o <Text style={{color:"#563595"}}>Stein</Text>. Talvez você precise fazer login.
              </Text>
              <Text
              style={styles.faq}
              >
                <Text style={styles.textDecoration}>2°.</Text> Em "configurações", selecione "configurações de conta" e depois “conteúdo pessoal”.
              </Text>
              <Text
              style={styles.faq}
              >
                <Text style={styles.textDecoration}>3°.</Text> Selecione “senha” e “alterar senha”. Digite sua nova senha.
              </Text>
            </View>
          ) : null}

        </View>
      </ScrollView>
    </View>
  );
};

export default FaqScreen;
