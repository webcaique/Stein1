import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import styles from './style';
import {firestore, auth} from '../../config/configFirebase';

const PersonalContentScreen = () => {
  const [carregador, setCarregador] = useState([]);
  const [nomeUser, setNomeUser] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [senha, setSenha] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [cep, setCep] = useState('');

  const tabelaUsuario = firestore.collection('usuario');
  const tabelaCarro = firestore.collection('carro');

  const handleGeocode = async cep => {
    try {
      // Fazer uma solicitação para um serviço de geocodificação (por exemplo, Google Geocoding API)
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      const data = await response.json();
      setLocalizacao(
        `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`,
      );
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  useEffect(() => {
    tabelaUsuario.onSnapshot(info => {
      info._docs.forEach(inf => {
        const userId = inf._ref._documentPath._parts[1];
        if (userId == auth.currentUser.uid) {
          tabelaCarro.onSnapshot(dados => {
            dados._docs.forEach(datas => {
              const carroIdUsuario = datas._data.IDUsuario;
              if (carroIdUsuario == userId) {
                setNomeUser(inf._data.nomeUsuario);
                setEmailUser(inf._data.email);
                setSenha(inf._data.senha);
                setCep(inf._data.CEP);
                setCarregador(
                  typeof datas._data.IDTipoCarregador == 'object'
                    ? datas._data.IDTipoCarregador
                    : [datas._data.IDTipoCarregador],
                );
                handleGeocode(inf._data.CEP);
              }
            });
          });
        }
      });
    });
  }, []);

  return (
    <View style={styles.mainContainer} /* VIEW PRINCIPAL */>
      <View /* VIEW PARA TÍTULO DE CIMA */>
        <Text style={styles.textTitlePage}>
          Edite as informações da sua conta pessoal.
        </Text>
      </View>
      <View style={styles.table} /* VIEW PARA TABELA  */>
        <View /* VIEW TÍTULO TABELA */>
          <Text style={styles.textTitleTable}>Suas informações pessoais</Text>
        </View>
        <View style={styles.row} /* View para exibir a localização */>
          <View /* Texto fixo */>
            <Text style={styles.textFix}>Estado</Text>
          </View>
          <TouchableOpacity
            style={styles.dinamicView} /* Texto dinâmico e imagem */
          >
            <Text style={styles.textDinamic}>{localizacao}</Text>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fpin-de-localizacao.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
              }}
              style={styles.imgs}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.row} /* View para exibir carregadores */>
          <View /* Texto Fixo*/>
            <Text style={styles.textFix}>Carregadores</Text>
          </View>
          <View style={styles.dinamicView} /* Texto dinâmico e imagem */>
            <FlatList
              data={carregador}
              key={item => item.id}
              horizontal
              inverted
              renderItem={dados => {
                return (
                  <Image
                    source={{
                      uri: `https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador${dados.item}.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177`,
                    }}
                    style={[styles.imgs]}
                  />
                );
              }}
            />
            <TouchableOpacity>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={styles.imgs}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row} /* View para exibir email */>
          <View /* Texto Fixo*/>
            <Text style={styles.textFix}>Email</Text>
          </View>
          <TouchableOpacity
            style={styles.dinamicView} /* Texto dinâmico e imagem */
          >
            <Text style={styles.textDinamic}>{emailUser}</Text>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
              }}
              style={styles.imgs}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.row} /* View para exibir senha */>
          <View /* Texto Fixo*/>
            <Text style={styles.textFix}>Senha</Text>
          </View>
          <TouchableOpacity
            style={styles.dinamicView} /* Texto dinâmico e imagem */
          >
            <Text style={styles.textDinamic}>{'*'.repeat(senha.length)}</Text>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
              }}
              style={styles.imgs}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.row} /* View para o nome do usuário */>
          <View /* Texto Fixo*/>
            <Text style={styles.textFix}>Nome do usuário</Text>
          </View>
          <TouchableOpacity
            style={styles.dinamicView} /* Texto dinâmico e imagem */
          >
            <Text style={styles.textDinamic}>{nomeUser}</Text>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
              }}
              style={styles.imgs}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PersonalContentScreen;
