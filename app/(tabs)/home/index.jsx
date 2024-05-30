import React from "react";
import { View, Dimensions } from "react-native";

import HomeMap from "../../../components/HomeMap";
import HomeSearch from "../../../components/HomeSearch.jsx";

const Home = (props) => {
  return (
    <View className="w-full h-screen">
      <HomeMap />

      <HomeSearch />
    </View>
  );
};

export default Home;
