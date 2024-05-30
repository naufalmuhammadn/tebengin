import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { formatPrice } from "../utils/utils";
import { router } from "expo-router";

import Ionicons from "react-native-vector-icons/Ionicons";

const RideTypeRow = (props) => {
  const { type } = props;

  const getImage = () => {
    if (type.type === "Bike") {
      return require("../assets/images/bike.png");
    }
    return require("../assets/images/car.png");
  };

  const onPress = () => {
    router.push({
      pathname: "/booking",
      params: {
        type: type.type === "Bike" ? "bike" : "car",
      },
    });
  };

  return (
    <Pressable onPress={onPress} className="flex flex-row items-center p-5">
      <Image
        className="w-20 h-16"
        style={{ resizeMode: "contain" }}
        source={getImage()}
      />

      <View className="flex flex-1 mx-2">
        <Text className="mb-1 text-lg font-bold">
          {type.type} <Ionicons name={"person"} size={16} /> {type.space}
        </Text>
      </View>
      <View className="flex flex-row justify-end w-24">
        <Ionicons name={"pricetag"} size={18} color={"#42d742"} />
        <Text className="ml-1 font-bold">{formatPrice(type.price)}</Text>
      </View>
    </Pressable>
  );
};

export default RideTypeRow;
