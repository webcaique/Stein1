import React, {Component} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Search from './search';
import Directions from './direction';
import {getPixelRatio} from './editDirection';

export default class Map extends Component {
  //Aqui sao criados os estados
  state = {
    destination: null,
    markers: null,
  };

  //Os dados da pesquisa são recolhidos
  handleLocationSelected = (data, {geometry}) => {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;
    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text,
      },
    });
  };

  //Quando o usuário utiliza o filtro, será separado quais pontos tem o carregador
  filtrar = (filtro) => {
    let newMarkers = [];
    //Será pega os dados da tabela de novo, só os que seguem o padrão selecionado no filtro
    this.props.tabelaCarregador.forEach(data => {
      this.props.tabelaLogradouro.forEach(datas => {
        if ((data.IDLogradouro == datas.id)) {
          if (filtro != []) {
            data.IDTipoCarregador.forEach(carr1 =>{
              filtro.forEach(carr2 =>{
                if (carr1 == carr2) {
                  let nome = datas.nome;
                  const novoPonto = {...datas.geolocalizacao, nome};
                  newMarkers.push(novoPonto);
                }
              })
            })
          } else{
            return(false)
          }
        }
      });
    });

    //Retonará os pontos com o tipo do carregador selecionado
    return(
      newMarkers.map((coordenada, index) => {
        return(
        <Marker
          key={index}
          coordinate={{
            latitude: coordenada.latitude,
            longitude: coordenada.longitude,
          }}
          title={coordenada.nome}
          icon={{uri:`https://firebasestorage.googleapis.com/v0/b/stein-182fa.appspot.com/o/Icons%2FpingCarregadores1.png?alt=media&token=769d4cfd-0682-4d23-99d5-4e51947f3196&_gl=1*1l5agxv*_ga*MTMzMzEzMzc2OS4xNjg1MDI3MDY4*_ga_CW55HF8NVT*MTY5ODQ0OTM1Ny4xNDIuMS4xNjk4NDUwMTM5LjU1LjAuMA..`}}
        />
      )})
    )
  };
  render() {
    //Será pego os dados enviados da página do index.js
    const {
      userMapRegion,
      chargerMarkes,
      inf,
      searchVer,
      resetSrc,
      dest,
      onFiltros,
    } = this.props;
    let {destination} = this.state;

    let destino;

    //Caso seja ativado o comando para procurar pontos pertos, ele coloca os dados no destino
    if(dest){
      destino = dest;
    } else { //Aqui quando o comando não foi ativado
      destino = destination;
    }    
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          region={userMapRegion}
          loadingEnabled
          ref={el => (this.mapView = el)}
          showsUserLocation>
          {destino ? (
            <>
              <Marker coordinate={userMapRegion} />

              <Directions
                origin={userMapRegion}
                destination={destination}
                desti={dest}
                menorDuracao={searchVer}
                onReady={result => {
                  inf(result.distance, result.duration);
                  resetSrc(true);
                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelRatio(10),
                      top: getPixelRatio(10),
                      left: getPixelRatio(10),
                      bottom: getPixelRatio(10),
                    },
                  });
                }}
              />
            </>
          ) : null}
          {onFiltros.length > 0? this.filtrar(onFiltros): chargerMarkes}
        </MapView>
        
        {searchVer && (
          <Search
            resetSearch={resetSrc}
            onLocationSelected={this.handleLocationSelected}
            searchVal={searchVer}
          />
        )}
      </View>
    );
  }
}
