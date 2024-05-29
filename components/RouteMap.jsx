import React, { useEffect, useState } from "react";
import MapView, {
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Marker,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import originPoint from "../assets/images/originPoint.png";
import destinationPoint from "../assets/images/destinationPoint.png";
import { Platform, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

  const centerMapOnUser = async () => {
    // let currentLocation = await Location.getCurrentPositionAsync({});
    // setLocation(currentLocation);
    mapRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0121,
    });
  };

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
    <View>
      <MapView
        style={{ width: "100%", height: "100%" }}
        provider={
          Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        showsUserLocation={true}
        showsMyLocationButton={false}
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
          <Marker
            coordinate={destinationLoc}
            title={"Destination"}
            icon={destinationPoint}
          >
            {/* <Image source={destinationPoint} className="w-5 h-5" /> */}
          </Marker>
        )}
      </MapView>
      <TouchableOpacity
        className="absolute items-center justify-center w-10 h-10 bg-blue-500 bottom-5 right-5 rounded-xl"
        onPress={centerMapOnUser}
      >
        <Ionicons name="locate" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default RouteMap;
