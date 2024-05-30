import React from "react";
import { View } from "react-native";
import RouteMap from "../../../components/RouteMap";
import RideTypes from "../../../components/RideTypes";

import { useLocalSearchParams } from "expo-router";
import HomeSearch from "../../../components/HomeSearch";

const SearchResults = (props) => {
  const params = useLocalSearchParams();

  const { originPlace, destinationPlace } = params;

  return (
    <View style={{ display: "flex", justifyContent: "space-between" }}>
      <View className="h-3/4">
        <RouteMap origin={originPlace} destination={destinationPlace} />
      </View>

      <HomeSearch origin={originPlace} destination={destinationPlace}/>
      <View style={{ height: 200 }}>
        <RideTypes origin={originPlace} destination={destinationPlace} />
      </View>
    </View>
  );
};

export default SearchResults;
