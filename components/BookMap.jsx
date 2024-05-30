import React, { useEffect, useRef, useState } from "react";
import MapView, {
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Marker,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import originPoint from "../assets/images/originPoint.png";
import destinationPoint from "../assets/images/destinationPoint.png";
import { Platform, View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import types from "../assets/data/types";
import RideList from "./RideList";
import { getDriversByType } from "../app/api/drivers";
import axios from "axios";
import HomeSearch from "./HomeSearch";

const GOOGLE_MAPS_APIKEY = "AIzaSyBmW2jQNUVsWY6etVO-UTwh4kBUxMi-e2w";

const BookMap = ({ origin, destination, type }) => {
  const originFinal = origin ? JSON.parse(origin) : null;
  const destinationFinal = destination ? JSON.parse(destination) : null;

  const mapRef = useRef(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [drivers, setDrivers] = useState(null);
  const [loading, setLoading] = useState(true);

  const getImage = () => {
    if (type === "bike") return require("../assets/images/tebengride.png");
    return require("../assets/images/tebengcar.png");
  };

  useEffect(() => {
    const fetchLocationAndDrivers = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        console.log(type)

        const driversData = await getDriversByType("car");

        if (currentLocation && driversData.length > 0) {
          const originLocation = `${currentLocation.coords.latitude},${currentLocation.coords.longitude}`;
          const originDrivers = driversData
            .map(
              (driver) =>
                `${driver.location.latitude},${driver.location.longitude}`
            )
            .join("|");

          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originDrivers}&destinations=${originLocation}&key=${GOOGLE_MAPS_APIKEY}`
          );

          const etaData = response.data.rows.map((row) => row.elements).flat();

          const updatedDrivers = driversData.map((driver, index) => ({
            ...driver,
            eta: etaData[index].duration.text,
            distance: etaData[index].distance.text,
          }));

          setDrivers(updatedDrivers);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndDrivers();
  }, []);

  if (!location && !originFinal) {
    return null;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const centerMapOnUser = async () => {
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
      <View className="h-5/6">
        <MapView
          ref={mapRef}
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
            <Marker
              coordinate={originLoc}
              title={"Origin"}
              icon={originPoint}
            />
          )}
          {destinationLoc && (
            <Marker
              coordinate={destinationLoc}
              title={"Destination"}
              icon={destinationPoint}
            />
          )}
          {drivers.map((driver, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: driver.location.latitude,
                longitude: driver.location.longitude,
              }}
              icon={getImage()}
            />
          ))}
        </MapView>
        <TouchableOpacity
          className="absolute items-center justify-center w-10 h-10 bg-blue-500 bottom-5 right-5 rounded-xl"
          onPress={centerMapOnUser}
        >
          <Ionicons name="locate" size={28} color="white" />
        </TouchableOpacity>
      </View>
      <HomeSearch origin={origin} destination={destination}/>
      <View>
        {drivers.map((driver, index) => (
          <RideList driver={driver} key={index} />
        ))}
      </View>
    </View>
  );
};

export default BookMap;
