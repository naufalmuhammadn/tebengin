import React, { useEffect, useRef, useState } from "react";
import { Image, Platform, TouchableOpacity, View } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Marker,
} from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

import cars from "../assets/data/cars";

const HomeMap = (props) => {
  const getImage = (type) => {
    if (type === "bike") {
      return require("../assets/images/bike.png");
    }
    return require("../assets/images/car.png");
  };

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
    })();
  }, []);

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
          latitude: location ? location.coords.latitude : -6.8962725,
          longitude: location ? location.coords.longitude : 107.609652,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}
      >
        {cars.map((car) => (
          <Marker
            key={car.id}
            coordinate={{ latitude: car.latitude, longitude: car.longitude }}
          >
            <Image
              style={{ width: 70, height: 70, resizeMode: "contain" }}
              source={getImage(car.type)}
            />
          </Marker>
        ))}
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
