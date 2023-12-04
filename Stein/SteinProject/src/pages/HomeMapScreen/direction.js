import React from "react";
import MapViewDirections from "react-native-maps-directions";

//Aqui que a pesquisa será realizada

const Directions = ({destination, origin, onReady, desti})=>{
    return(
        <MapViewDirections
        destination={desti?desti:destination}
        origin={origin}
        onReady={onReady}
        apikey={"AIzaSyAdVbhYEhx50Y8TS7tulpNCkj8yMZPYiSQ"}
        strokeWidth={3}
        strokeColor="hotpink"
    />
    )
}

export default Directions;