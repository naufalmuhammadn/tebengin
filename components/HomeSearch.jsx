import React from "react";
import { View, Text, Pressable, TextInput, Image } from "react-native";

import { Link, router } from "expo-router";
import originPoint from "../assets/images/origin.png";
import destinationPoint from "../assets/images/destination.png";

const HomeSearch = ({ origin, destination}) => {
  const originFinal = origin ? JSON.parse(origin) : null;
  const destinationFinal = destination ? JSON.parse(destination) : null;
  
  const onPress = () => {
    router.push({
      pathname: "/destination",
      params: {
        originPlace: JSON.stringify(originFinal),
        destinationPlace: JSON.stringify(destinationFinal),
      },
    });
  };

  return (
    <Pressable onPress={onPress} className="absolute flex w-5/6 bg-white rounded-xl top-12 left-8 border-[0.5px]">
      <View className="flex flex-row items-center w-5/6 px-2 m-2 bg-white">
        <Image source={originPoint} className="w-5 h-5 mr-2" />
        <Text className="p-1 text-gray-500">{originFinal ? originFinal.data.description : "Where From?"}</Text>
      </View>
      <View className="h-[0.5px] bg-black" />
      <View className="flex flex-row items-center w-5/6 px-2 m-2 bg-white">
        <Image source={destinationPoint} className="w-5 h-5 mr-2" />
        <Text className="p-1 text-gray-500">{destinationFinal ? destinationFinal.data.description : "Where To?"}</Text>
      </View>
    </Pressable>
  );
};

export default HomeSearch;
