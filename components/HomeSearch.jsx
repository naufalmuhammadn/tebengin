import React from "react";
import { View, Text, Pressable } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { Link } from "expo-router";

const HomeSearch = (props) => {
  return (
    <View>
      <Link href="/destination">
        <View className="bg-[#e7e7e7] m-2 p-2 flex flex-row justify-between items-center">
          <Text className="text-xl font-semibold text-[#434343]">
            Where To?
          </Text>

          <View className="flex flex-row justify-between w-24 p-2 bg-white border rounded-lg">
            <AntDesign name={"clockcircle"} size={16} color={"#535353"} />
            <Text>Now</Text>
            <MaterialIcons name={"keyboard-arrow-down"} size={16} />
          </View>
        </View>
      </Link>

      <View className="flex flex-row items-center p-5 border-b border-[#dbdbdb]">
        <View className="bg-[#b3b3b3] p-2 border rounded-2xl">
          <AntDesign name={"clockcircle"} size={20} color={"#ffffff"} />
        </View>
        <Text className="ml-2 text-base font-medium">Home</Text>
      </View>

      <View className="flex flex-row items-center p-5 border-b border-[#dbdbdb]">
        <View className="bg-[#218cff] p-2 border rounded-2xl">
          <Entypo name={"home"} size={20} color={"#ffffff"} />
        </View>
        <Text className="ml-2 text-base font-medium">Home</Text>
      </View>
    </View>
  );
};

export default HomeSearch;
