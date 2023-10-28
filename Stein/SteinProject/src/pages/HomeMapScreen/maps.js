import React, {Component} from 'react';
import {Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Search from './search';
import Directions from './direction';
import {getPixelRatio} from './editDirection';
import { counterEvent } from 'react-native/Libraries/Performance/Systrace';
import style from '../LoginScreen/style';

export default class Map extends Component {
  state = {
    destination: null,
    markers: null,
  };

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
  filtrar = (filtro) => {
    let newMarkers = [];
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
    const {
      userMapRegion,
      chargerMarkes,
      inf,
      searchVer,
      resetSrc,
      dest,
      onFiltros,
      tabelaLogradouro,
      tabelaCarregador,
    } = this.props;
    let {destination,markers} = this.state;

    
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          region={userMapRegion}
          loadingEnabled
          ref={el => (this.mapView = el)}
          showsUserLocation>
          {destination ? (
            <>
              <Marker coordinate={userMapRegion} />

              <Directions
                origin={userMapRegion}
                destination={destination}
                desti={dest}
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
              <Marker coordinate={destination} />
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
