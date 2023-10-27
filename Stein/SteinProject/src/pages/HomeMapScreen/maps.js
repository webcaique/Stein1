import React, {Component} from 'react';
import {Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Search from './search';
import Directions from './direction';
import {getPixelRatio} from './editDirection';

export default class Map extends Component {
  state = {
    destination: null,
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
    let destination = this.state.destination;

    

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
          {chargerMarkes}
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
