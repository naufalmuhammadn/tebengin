import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import profile from "../assets/images/profile.png";

const RideList = ({ driver, selectedDriver, onSelectDriver }) => {
  const isSelected = selectedDriver && selectedDriver.plat === driver.plat;
  
  return (
    <TouchableOpacity onPress={onSelectDriver}>
      <View className={`flex flex-row items-center p-5 ${isSelected ? "bg-[#F6D2CC]" : "bg-white"}`}>
        <Image
          className="w-20 h-16"
          style={{ resizeMode: "contain" }}
          source={profile}
        />

        <View className="flex flex-1 mx-2">
          <Text className="mb-1 text-lg font-bold">
            {driver.name} ({driver.distance})
          </Text>
          <Text className="text-[#5d5d5d]">
            {driver.eta} • {driver.plat} • {driver.merk}
          </Text>
        </View>
        {/* <View className="flex flex-row justify-end w-24">
        <Ionicons name={"pricetag"} size={18} color={"#42d742"} />
        <Text className="ml-1 font-bold">{formatPrice(type.price)}</Text>
      </View> */}
      </View>
    </TouchableOpacity>
  );
};

export default RideList;
