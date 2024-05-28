import React from "react";
import { View, Dimensions } from "react-native";

import HomeMap from "../../../components/HomeMap";
import HomeSearch from "../../../components/HomeSearch.jsx";

const Home = (props) => {
  return (
    <View>
      <View style={{height: Dimensions.get('window').height - 400}}>
        <HomeMap />
      </View>

      <HomeSearch />
    </View>
  );
};

export default Home;