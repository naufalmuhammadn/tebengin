import React, { useState, useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import styles from "../../../components/styles.js";
import PlaceRow from "../../../components/PlaceRow.jsx";
import { router } from "expo-router";

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
  
  return (
    <SafeAreaView>
      <View className="flex flex-1 h-full p-2">
        <GooglePlacesAutocomplete
          placeholder="Where from?"
          onPress={(data, details = null) => {
            setOriginPlace({ data, details });
          }}
          enablePoweredByContainer={false}
          currentLocation={true}
          currentLocationLabel="Current location"
          suppressDefaultStyles
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
