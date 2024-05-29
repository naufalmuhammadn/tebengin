import React, { useState } from "react";
import { View, Dimensions, Alert } from "react-native";
// import { API, graphqlOperation, Auth } from 'aws-amplify';
import RouteMap from "../../../components/RouteMap";
import RideTypes from "../../../components/RideTypes";
// import { createOrder } from '../../graphql/mutations';

import { useRoute, useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";

const SearchResults = (props) => {
  const typeState = useState(null);

  const navigation = useNavigation();

  const params = useLocalSearchParams();
  
  const { originPlace, destinationPlace } = params;

  const onSubmit = async () => {
    const [type] = typeState;
    if (!type) {
      return;
    }

    // submit to server
    try {
      // const userInfo = await Auth.currentAuthenticatedUser();

      // const date = new Date();
      // const input = {
      //   createdAt: date.toISOString(),
      //   type,
      //   originLatitude: originPlace.details.geometry.location.lat,
      //   oreiginLongitude: originPlace.details.geometry.location.lng,

      //   destLatitude: destinationPlace.details.geometry.location.lat,
      //   destLongitude: destinationPlace.details.geometry.location.lng,

      //   userId: userInfo.attributes.sub,
      //   carId: "1",
      // }

      // const response = await API.graphql(
      //   graphqlOperation(
      //     createOrder, {
      //       input: input
      //     },
      //   )
      // )

      console.log(response);
      Alert.alert("Hurraaay", "Your order has been submited", [
        {
          text: "Go home",
          onPress: () => navigation.navigate("Home"),
        },
      ]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{ display: "flex", justifyContent: "space-between" }}>
      <View className="h-3/4">
        <RouteMap origin={originPlace} destination={destinationPlace} />
      </View>

      <View style={{ height: 200 }}>
        <RideTypes typeState={typeState} onSubmit={onSubmit} />
      </View>
    </View>
  );
};

export default SearchResults;
