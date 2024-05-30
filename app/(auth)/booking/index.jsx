import React from "react";
import { View } from "react-native";

import { useLocalSearchParams } from "expo-router";
import BookMap from "../../../components/BookMap";

const Booking = (props) => {
  const params = useLocalSearchParams();

  const { originPlace, destinationPlace, type } = params;

  return (
    <View style={{ display: "flex", justifyContent: "space-between" }}>
      <View className="h-3/4">
        <BookMap origin={originPlace} destination={destinationPlace} type={type} />
      </View>
    </View>
  );
};

export default Booking;
