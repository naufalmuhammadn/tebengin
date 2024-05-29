import React, { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";

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

  return (
    <MapView
      style={{ width: "100%", height: "100%" }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
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
  );
};

export default HomeMap;
