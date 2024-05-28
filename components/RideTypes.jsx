import React from "react";
import { View, Text, Pressable } from "react-native";
// import styles from './styles.js';
import RideTypeRow from "./RideTypeRow";

import types from "../assets/data/types";

const RideTypes = (props) => {
  const confirm = () => {
    console.warn('confirm');
  };

  return (
    <View>
      {types.map((type, index) => (
        <RideTypeRow type={type} key={index} />
      ))}

      <Pressable onPress={confirm} className="flex items-center p-2 m-2 bg-black">
        <Text className="font-bold text-white">
          Confirm Ride
        </Text>
      </Pressable>
    </View>
  );
};

export default RideTypes;