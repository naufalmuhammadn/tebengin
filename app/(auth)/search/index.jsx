import React, { useState } from "react";
import { View, Dimensions, Alert } from "react-native";
import RouteMap from "../../../components/RouteMap";
import RideTypes from "../../../components/RideTypes";

import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import HomeSearch from "../../../components/HomeSearch";

const SearchResults = (props) => {
  const typeState = useState(null);

  const navigation = useNavigation();

  const params = useLocalSearchParams();
  
  const { originPlace, destinationPlace } = params;

  const onSubmit = async () => {
    const [type] = typeState;
    if (!type) {
      return;
    }

    try {
      Alert.alert("Hurraaay", "Your order has been submited", [
        {
          text: "Go home",
          onPress: () => navigation.navigate("Home"),
        },
      ]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{ display: "flex", justifyContent: "space-between" }}>
      <View className="h-3/4">
        <RouteMap origin={originPlace} destination={destinationPlace} />
      </View>

      <HomeSearch origin={originPlace} destination={destinationPlace}/>
      <View style={{ height: 200 }}>
        <RideTypes typeState={typeState} onSubmit={onSubmit} />
      </View>
    </View>
  );
};

export default SearchResults;
