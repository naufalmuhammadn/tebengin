import React from "react";
import { View, Image, Text } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

const RideTypeRow = (props) => {
  const { type } = props;

  const getImage = () => {
    if (type.type === "bike") {
      return require("../assets/images/bike.png");
    }
    return require("../assets/images/car.png");
  };

  return (
    <View className="flex flex-row items-center p-5">
      {/*  Image */}
      <Image className="w-20 h-16" style={{ resizeMode:"contain" }} source={getImage()} />

      <View className="flex flex-1 mx-2">
        <Text className="mb-1 text-lg font-bold">
          {type.type} <Ionicons name={"person"} size={16} />3
        </Text>
        <Text className="text-[#5d5d5d]">8:03PM drop off</Text>
      </View>
      <View className="flex flex-row justify-end w-24">
        <Ionicons name={"pricetag"} size={18} color={"#42d742"} />
        <Text className="ml-1 text-lg font-bold">est. ${type.price}</Text>
      </View>
    </View>
  );
};

export default RideTypeRow;
