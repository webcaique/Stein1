import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import styles from './style';
import {firestore} from '../../config/configFirebase';

export default function (props) {

  const timer = setTimeout(() => {
    setValidDeletar(false);
  }, 5000);

  const [endereco, setEndereco] = useState([]);
  const [logra, setLogra] = useState([]);
  const [loading, setLoading] = useState(true);
  const [podeDeletar, setPodeDeletar] = useState(false);
  const [validDeletar, setValidDeletar] = useState(false);

  const Deletar = async idParaDeletar => {
    // função para deletar dado do campo de dados
    const deletar = firestore.collection('local'); // traz do firebase a tabela "Local"

    const snapshot = await deletar.get(); // pega os dados no formato do firebase
    const listDeletar = []; // lista que receberá os dados formatados

    //pegará os id para deletar os dados da tabela "Local"
    snapshot.forEach(dado => {
      listDeletar.push(dado.id);
    });
    console.log(listDeletar);

    // deletará os dados da tabela local
    deletar
      .doc(props.localID)
      .delete()
      .then(() => {
        const novoLocal = logra.filter(item => item.id !== idParaDeletar);
        setLogra(novoLocal);
        console.log('DELETADO'); // avisa que deletou
      });
  };

  useEffect(() => {
    const fetchEndereco = async () => {
      const ends = firestore.collection('logradouro'); // pega a tabela "Logradouro"

      try {
        // pega os dados da tabela "logradouro"
        const aparecer = ends.onSnapshot(async logras => {
          // será colocado os dados formatados na lista
          const listLogra = [];

          // coloca os dados na lista
          logras.forEach(itens => {
            listLogra.push({id: itens.id, ...itens.data()});
          });

          setEndereco(listLogra);

          // edita a lista para ter apenas os dados que o id é a mesmo id enviado da página principal
          const locais = listLogra.filter(
            locaisSalvos => locaisSalvos.id === props.logradouro,
          );

          setLogra(locais); // coloca os dados da lista na constante para ser usado na página
          setLoading(false);
        });
        // chama a função
        return () => aparecer();
      } catch (error) {
        console.log('Erro ao buscar documentos: ', error);
        setLoading(false);
      }
    };

    fetchEndereco();

    return ()=>clearTimeout(timer);
    
  }, []);
  const renderItem = ({item}) => (
    <View style={styles.box}>
      {validDeletar ? (
        <Modal transparent={true}>
          <Pressable style={{...styles.modal, backgroundColor:"rgba(90,90,90,0.4)"}}
          onPress={()=>{
            setValidDeletar(false)
          }}
          >
            <View style={{width:300, height:200, padding:20, backgroundColor:"#fff", borderRadius:10,}}>
              <Text style={{marginBottom:10, fontSize:26, fontWeight:"900",}}>Tem certeza que quer deletar {props.name}?</Text>
              <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <TouchableOpacity
                style={{
                  width:125,
                  backgroundColor:"red",
                  height:62.5,
                  borderRadius:20,
                  justifyContent:"center",
                  alignItems:"center",
                }}
                onPress={()=>{
                  setValidDeletar(false);
                  Deletar(props.logradouro);
                }}
                >
                  <Text style={{
                    fontSize:16,
                    fontWeight:"900",
                    color:"white",
                  }}>SIM</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{
                  width:125,
                  backgroundColor:"blue",
                  height:62.5,
                  borderRadius:20,
                  justifyContent:"center",
                  alignItems:"center",
                }}
                onPress={()=>{
                  setValidDeletar(false);
                }}
                >
                  <Text style={{
                    fontSize:16,
                    fontWeight:"900",
                    color:"white",
                  }}>NÃO</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Modal>
      ) : (
        ''
      )}
      <View style={styles.topBottom}>
        <TouchableOpacity
          style={styles.btnExcluir}
          onPressIn={ () => {
            clearTimeout(timer)
            setValidDeletar(true);
            
          }}>
          <Text style={styles.txtExcluir}>EXCLUIR</Text>
          <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fexcluir.png?alt=media&token=041b4db5-2277-4ee1-bb92-18a314359154',
            }}
            width={20}
            height={20}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnEditar}
          onPress={() => {
            props.navegacao(props.logradouro);
          }}>
          <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Feditar.png?alt=media&token=be2ed7a6-393d-4877-87bc-10e72190bf78',
            }}
            width={20}
            height={20}
            resizeMode="contain"
          />
          <Text style={styles.txtEditar}>EDITAR</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleBoxView}>
        <Text style={styles.titleBox}>
          {props.titulo} - {props.nome}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.line}>
          <View>
            <Text style={styles.titleLine}>Endereço</Text>
          </View>

          <View style={styles.link}>
            <View style={styles.textLinkView}>
              <Text style={styles.textLink}>{`${item.tipoLogradouro}`}</Text>
              <Text style={styles.textLink}>{`${item.logradouro},`}</Text>
              <Text style={styles.textLink}>{`Nº ${item.numero}`}</Text>
            </View>
            <View style={styles.iconLinkView}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fpin-de-localizacao.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={styles.iconLink}
              />
            </View>
          </View>
        </View>

        <View style={styles.line}>
          <View style={styles.titleLineView}>
            <Text style={styles.titleLine}>Tipo de carregador</Text>
          </View>
          <View style={[styles.link, {width: 85}]}>
            <FlatList
            inverted
              style={{flexDirection: 'row', width: 50}}
              data={props.carregador}
              keyExtractor={item => item.id}
              accessibilityElementsHidden={true}
              horizontal={true}
              renderItem={({item}) => (
                <Image
                  source={{
                    uri: `https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/carregadores%2Fcarregador${item}.png?alt=media&token=b4d7a185-b60b-45fb-87a4-f2742efbb177`,
                  }}
                  style={styles.iconLink}
                />
              )}
            />
            <View style={styles.iconLinkView}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={styles.iconLink}
              />
            </View>
          </View>
        </View>
        <View style={styles.line}>
          <View style={styles.titleLineView}>
            <Text style={styles.titleLine}>Nome de usuário</Text>
          </View>

          <View style={styles.link}>
            <View style={styles.textLinkView}>
              <Text style={styles.textLink}>{props.user}</Text>
            </View>

            <View style={styles.iconLinkView}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2Fseta-direita.png?alt=media&token=c10be2a4-3f24-46f6-8368-7d40016bbe48',
                }}
                style={styles.iconLink}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return <Text>Carregando..</Text>;
  } else {
    return (
      <FlatList
        data={logra}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    );
  }
}

/**/
