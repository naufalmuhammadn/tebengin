import React from "react";
import { View, Text, Pressable, TextInput, Image } from "react-native";

import { Link, router } from "expo-router";
import origin from "../assets/images/origin.png";
import destination from "../assets/images/destination.png";

const HomeSearch = (props) => {
  const onPress = () => {
    router.push("/destination");
  };

  return (
    <Pressable onPress={onPress} className="absolute flex w-5/6 bg-white rounded-xl top-12 left-8 border-[0.5px]">
      <View className="flex flex-row items-center w-5/6 px-2 m-2 bg-white">
        <Image source={origin} className="w-5 h-5 mr-2" />
        <Text className="p-1 text-gray-500">Where From?</Text>
      </View>
      <View className="h-[0.5px] bg-black" />
      <View className="flex flex-row items-center w-5/6 px-2 m-2 bg-white">
        <Image source={destination} className="w-5 h-5 mr-2" />
        <Text className="p-1 text-gray-500">Where To?</Text>
      </View>
    </Pressable>
  );
};

export default HomeSearch;
