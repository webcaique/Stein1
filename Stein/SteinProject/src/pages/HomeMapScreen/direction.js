import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions = ({destination, origin, onReady})=>{
    return(
        <MapViewDirections
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey={"AIzaSyAdVbhYEhx50Y8TS7tulpNCkj8yMZPYiSQ"}
        strokeWidth={3}
        strokeColor="hotpink"
    />
    )
}

export default Directions;