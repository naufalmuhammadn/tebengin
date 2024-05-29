import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import originPoint from "../assets/images/originPoint.png";
import destinationPoint from "../assets/images/destinationPoint.png";
import { Image } from "react-native";

const GOOGLE_MAPS_APIKEY = "AIzaSyBmW2jQNUVsWY6etVO-UTwh4kBUxMi-e2w";

const RouteMap = ({ origin, destination }) => {
  const originFinal = origin ? JSON.parse(origin) : null;
  const destinationFinal = destination ? JSON.parse(destination) : null;

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  if (!location && !originFinal) {
    return null;
  }

  const originLoc = originFinal
    ? {
        latitude: originFinal.details.geometry.location.lat,
        longitude: originFinal.details.geometry.location.lng,
      }
    : {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

  const destinationLoc = destinationFinal
    ? {
        latitude: destinationFinal.details.geometry.location.lat,
        longitude: destinationFinal.details.geometry.location.lng,
      }
    : null;

  return (
    <MapView
      style={{ width: "100%", height: "100%" }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: originLoc.latitude,
        longitude: originLoc.longitude,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}
    >
      {destinationLoc && originFinal && (
        <MapViewDirections
          origin={originLoc}
          destination={destinationLoc}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="blue"
        />
      )}
      {originFinal && (
        <Marker coordinate={originLoc} title={"Origin"} icon={originPoint}>
          {/* <Image source={originPoint} className="w-5 h-5" /> */}
        </Marker>
      )}
      {destinationLoc && (
        <Marker coordinate={destinationLoc} title={"Destination"} icon={destinationPoint}>
          {/* <Image source={destinationPoint} className="w-5 h-5" /> */}
        </Marker>
      )}
    </MapView>
  );
};

export default RouteMap;
