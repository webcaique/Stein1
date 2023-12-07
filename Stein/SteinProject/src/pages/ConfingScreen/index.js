import React, {useState} from 'react';
import {
  View,
  Text,
  Switch,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Pressable
} from 'react-native';
import styles from './style';
import { auth } from '../../config/configFirebase';
import Mailer from 'react-native-mail';
import Share from 'react-native-share';

//navigation.navigate('ShareToAFriendScreen')

const ConfigScreen = ({navigation}) => {
  const [modal, setModal] = useState(false);

  //Função para mandar o email de feedback
    const sendEmail = () => {
      Mailer.mail(
        {
          subject: '',
          recipients: ['steinsuport@gmail.com'],
          ccRecipients: ['steinsuport@gmail.com'],
          bccRecipients: ['steinsuport@gmail.com'],
          body: '',
          isHTML: true,
          attachment: {
            path: '',
            type: '',
            name: '',
          },
        },
        (error, event) => {
          if (error) {
            console.error('');
          } else {
            console.log('');
          }
        }
      );
    };

    const handleShare = async () => {
      try {
        const message = 'Abaixe nosso aplicativo para encontra um posto para recarregar seu carro! Sem nenhuma dificuldade e dor de cabeça!\nhttps://drive.google.com/drive/folders/1d9q7HU5Mom5nKRSV4vfP6WNVq8gSLxGo?usp=drive_link';
  
        const options = {
          title: 'Quer conhecer Stein, o melhor app de rotas para ponto de recargas de carros?',
          message: message,
          subject: 'Com Stein você sai das situações de desespero quando seu carro está descarregando!', // Somente para Android
        };
  
        await Share.open(options);
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    };

  return (
    <View style={styles.container}>
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
        <Modal visible={modal}>
          <Pressable
            style={styles.containerTermoDeUso}
            >
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
              <TouchableOpacity style={{...styles.imgSaidaTermoDeUso,}}
              onPress={() => {
                setModal(!modal);
              }}

              >
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fmais.png?alt=media&token=f29b19c6-efb8-4f11-b1b4-ed9c8a95fbd6',
                }}
                style={[
                  styles.imgSaidaTermoDeUso,
                  {
                    transform: [{rotate: '45deg'}],
                  },
                ]}
              />
              </TouchableOpacity>
              <View style={styles.termosContainerTexto}>
                <Text style={styles.termosTitle}>TERMOS DE USO E CONDIÇÃO</Text>
                <Text style={styles.textoTermo}>
                  Produzimos este aplicativo com o objetivo de expandir nossos
                  produtos e melhorar as qualidades de nossos serviços, assim,
                  proporcionando aos nossos clientes facilidades em suas compras
                </Text>
                <Text style={styles.textoTermo}>
                  A Stein não se responsabiliza por eventuais informações
                  inexatas ou imprecisas sobre seus serviços, bem como omissões
                  do conteúdo do seu site ou falha de equipamento
                </Text>
                <Text style={styles.textoTermo}>
                  O usuário tem total conhecimento e nada a se opor de que
                  alguns serviços inseridos no catalogo ou na própria página do
                  site poderão estar disponíveis em qualquer uma de nossas sedes
                  ou sediados. As cores apresentadas em nossos sites prezam pela
                  integridade e semelhança com o serviço, todavia, poderão
                  sofrer variações e não serem exatas, uma vez que dependem do
                  monitor e tecnologia utilizada por cada usuário, não podendo
                  então a Stein ser responsabilizada no caso de inexatidão de
                  cores.
                </Text>
                <Text style={styles.textoTermo}>
                  Em nenhum momento o aplicativo e seus colaboradores poderão
                  ser responsabilizados por quaisquer danos, perdas, despesas,
                  falhas de desempenho, interrupção, defeito, vírus ou falhas no
                  sistema do aplicativo.
                </Text>
                <Text style={styles.textoTermo}>
                  Ao acessar esse aplicativo ou fornecer seus dados pessoais, o
                  usuário automaticamente declara conhecer e aceitar os Termos e
                  Condições de uso de Política de privacidade. Será de total
                  responsabilidade do usuário a garantir a exatidão dos seus
                  dados pessoais fornecidos, ficando certo que o usuário isenta
                  a Stein de quaisquer transtornos quanto a inexatidão de
                  informações, podendo ainda a mesma, suspender ou cancelar a
                  conta de cadastrado do usuário e recusar toda e qualquer
                  utilização.
                </Text>
                <Text style={styles.textoTermo}>
                  Somos obrigados a transmitir seus dados a terceiros caso isto
                  seja necessário para cumprir regulamentações legais (por
                  exemplo da lei federal de proteção de dados).
                </Text>
                <Text style={styles.textoTermo}>
                  As informações sobre os preços e disponibilidades de serviços
                  estão sujeitos a alterações.{' '}
                </Text>
              </View>
            </ScrollView>
          </Pressable>
        </Modal>

        <Text style={styles.textTitle}>Configurações</Text>
        <View style={styles.confing}>
          <View>
            {/* <View style={styles.rowText1}>
              <Text style={styles.textContent}>Modo Escuro</Text>
              <Switch style={styles.input} />
            </View>
            <View style={styles.line} />
            <View style={styles.rowText}>
              <View>
                <Text style={styles.textContent}>Pesquisar por voz</Text>
                <Text style={styles.subtitle}>Padrão - Português (Brasil)</Text>
              </View>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                  }}
                  style={styles.icons}
                />
              </TouchableOpacity>
            </View> */}
            {/* <View style={styles.line} /> */}
            <View style={styles.rowText}>
              <Text style={styles.textContent}>Convide um amigo</Text>
              <TouchableOpacity
                onPress={() => handleShare()}>
                <Image
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                  }}
                  style={styles.icons}
                />
              </TouchableOpacity>
            </View>
            {/* <View style={styles.line} /> */}
          </View>
        </View>

        <Text style={styles.textTitle}>Configurações da conta</Text>
        <View style={styles.confing}>
          <View>
            {/* <View style={styles.rowText}>
              <Text style={styles.textContent}>Notificações</Text>
              <Switch style={styles.input} />
            </View> */}
            {/* <View style={styles.line} /> */}
            <View style={styles.rowText}>
              <Text style={styles.textContent}>Conteúdo pessoal</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('PersonalContentScreen')}>
                <Image
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                  }}
                  style={styles.icons}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View style={styles.rowText}>
              <Text style={styles.textContent}>Editar casa/trabalho </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('HouseAndWork')}>
                <Image
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                  }}
                  style={styles.icons}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
          </View>
        </View>

        <Text style={styles.textTitle}>Suporte</Text>
        <View style={styles.confing}>
          <View>
            <View style={styles.rowText}>
              <Text style={styles.textContent}>Enviar feedback</Text>
              <TouchableOpacity
              onPress={()=>{sendEmail()}}
              >
                <Image
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                  }}
                  style={styles.icons}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View style={styles.rowText}>
              <Text style={styles.textContent}>
                Sobre nós, termos e privacidade
              </Text>
              <TouchableOpacity
              onPress={()=>{setModal(true)}}
              >
                <Image
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                  }}
                  style={styles.icons}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ConfigScreen;
