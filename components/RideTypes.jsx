import React from "react";
import { View, Text, Pressable } from "react-native";
import RideTypeRow from "./RideTypeRow";

import types from "../assets/data/types";

const RideTypes = (props) => {
  const confirm = () => {
    console.warn("confirm");
  };

  return (
    <View>
      {types.map((type, index) => (
        <RideTypeRow type={type} key={index} />
      ))}
    </View>
  );
};

export default RideTypes;
