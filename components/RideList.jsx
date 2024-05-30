import React from "react";
import { View, Image, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import profile from "../assets/images/profile.png";


const RideList = (props) => {
  const { driver } = props;

  return (
    <View className="flex flex-row items-center p-5">
      <Image className="w-20 h-16" style={{ resizeMode:"contain" }} source={profile} />

      <View className="flex flex-1 mx-2">
        <Text className="mb-1 text-lg font-bold">
          Syahrial Alzaidan ({driver.distance})
        </Text>
        <Text className="text-[#5d5d5d]">{driver.eta} • {driver.plat} • {driver.merk}</Text>
      </View>
      {/* <View className="flex flex-row justify-end w-24">
        <Ionicons name={"pricetag"} size={18} color={"#42d742"} />
        <Text className="ml-1 font-bold">{formatPrice(type.price)}</Text>
      </View> */}
    </View>
  );
};

export default RideList;
