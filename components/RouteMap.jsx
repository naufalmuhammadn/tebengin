import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_MAPS_APIKEY = "AIzaSyBmW2jQNUVsWY6etVO-UTwh4kBUxMi-e2w";

const RouteMap = ({ origin, destination }) => {
  const originFinal = JSON.parse(origin);
  const destinationFinal = JSON.parse(destination);

  const originLoc = {
    latitude: originFinal.details.geometry.location.lat,
    longitude: originFinal.details.geometry.location.lng,
  };

  const destinationLoc = {
    latitude: destinationFinal.details.geometry.location.lat,
    longitude: destinationFinal.details.geometry.location.lng,
  };

  return (
    <MapView
      style={{ width: "100%", height: "100%" }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: -6.2382699,
        longitude: 106.9755726,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}
    >
      <MapViewDirections
        origin={originLoc}
        destination={destinationLoc}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={5}
        strokeColor="blue"
      />
      <Marker
        coordinate={{
          latitude: originLoc.latitude,
          longitude: originLoc.longitude,
        }}
        title={"Origin"}
      />
      <Marker
        coordinate={{
          latitude: destinationLoc.latitude,
          longitude: destinationLoc.longitude,
        }}
        title={"Destination"}
      />
    </MapView>
  );
};

export default RouteMap;
