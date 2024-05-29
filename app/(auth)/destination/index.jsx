import React, { useState, useEffect } from "react";
import { View, TextInput, SafeAreaView, PermissionsAndroid, Platform, Alert } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geolocation from "react-native-geolocation-service";

import styles from "./styles.js";
import PlaceRow from "../../../components/PlaceRow.jsx";
import { router, useLocalSearchParams } from "expo-router";

navigator.geolocation = require("react-native-geolocation-service");

const homePlace = {
  description: "Home",
  geometry: { location: { lat: -6.8962725, lng: 107.609652 } },
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: -6.8962725, lng: 107.609652 } },
};

const DestinationSearch = (props) => {
  const [originPlace, setOriginPlace] = useState(null);
  const [destinationPlace, setDestinationPlace] = useState(null);

  const checkNavigation = () => {
    if (originPlace && destinationPlace) {
      router.push({
        pathname: "/search",
        params: {
          originPlace: JSON.stringify(originPlace),
          destinationPlace: JSON.stringify(destinationPlace),
        },
      })
    }
  };

  useEffect(() => {
    checkNavigation();
  }, [originPlace, destinationPlace]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getCurrentLocation();
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Access Required",
          message: "This app needs to access your location",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        Alert.alert("Permission Denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        // You can use the position here to set an initial place or for other purposes
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  
  return (
    <SafeAreaView>
      <View className="flex flex-1 h-full p-2">
        <GooglePlacesAutocomplete
          placeholder="Where from?"
          onPress={(data, details = null) => {
            setOriginPlace({ data, details });
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          currentLocation={true}
          currentLocationLabel="Current location"
          styles={{
            textInput: styles.textInput,
            container: styles.autocompleteContainer,
            listView: styles.listView,
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: "AIzaSyBmW2jQNUVsWY6etVO-UTwh4kBUxMi-e2w",
            language: "en",
          }}
          renderRow={(data) => <PlaceRow data={data} />}
          renderDescription={(data) => data.description || data.vicinity}
          predefinedPlaces={[homePlace, workPlace]}
          onFail={(error) => console.error(error)}
        />

        <GooglePlacesAutocomplete
          placeholder="Where to?"
          onPress={(data, details = null) => {
            setDestinationPlace({ data, details });
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          styles={{
            textInput: styles.textInput,
            container: {
              ...styles.autocompleteContainer,
              top: 55,
            },
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyBmW2jQNUVsWY6etVO-UTwh4kBUxMi-e2w',
            language: "en",
          }}
          renderRow={(data) => <PlaceRow data={data} />}
          onFail={(error) => console.error(error)}
        />

        {/* Circle near Origin input */}
        <View style={styles.circle} />

        {/* Line between dots */}
        <View style={styles.line} />

        {/* Square near Destination input */}
        <View style={styles.square} />
      </View>
    </SafeAreaView>
  );
};

export default DestinationSearch;
