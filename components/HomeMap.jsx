import React, { useEffect, useRef, useState } from "react";
import { Platform, TouchableOpacity, View, ActivityIndicator } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Marker,
} from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

const HomeMap = (props) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLocationFetched, setIsLocationFetched] = useState(false);

  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setIsLocationFetched(true);
    })();
  }, []);

  const centerMapOnUser = async () => {
    mapRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0121,
    });
  };

  if (!isLocationFetched) {
    return (
      <View className="flex items-center justify-center flex-1 w-full h-full border">
        <ActivityIndicator size="large" color="#5B1F15" />
      </View>
    );
  }

  return (
    <View>
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        provider={
          Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsPointsOfInterest={true}
        showsBuildings={true}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}
      >
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

export default HomeMap;
