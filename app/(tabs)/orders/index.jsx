import React, { useState, useEffect } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from "expo-status-bar";
import { Image, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import cancel from "../../../assets/images/cancel.png";
import bike from "../../../assets/images/bike.png";
import car from "../../../assets/images/car.png";

import OrderDetail from "../../../components/OrderDetail";

import { getRides } from "../../api/rides";
import { auth } from "../../../firebase/config";

const tabs = ["Ongoing", "Completed", "Cancelled"];
const Stack = createStackNavigator();

const Orders = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [ridesData, setRidesData] = useState({ ongoing: [], completed: [], cancelled: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRides(auth.currentUser.uid);
        setRidesData(data);
      } catch (error) {
        console.error("Error fetching rides data:", error);
        setError("Failed to fetch rides data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const displayTabContent = () => {
    switch (activeTab) {
      case 'Ongoing':
        return ridesData.ongoing.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('OrderDetail', { id: item.id })}
          >
            <View className="py-2 px-6 flex flex-row items-center justify-between border-b border-[#BDBDBD] w-full">
              <View className="flex flex-row items-center gap-2">
                <Image source={bike} className="object-cover w-[60px] h-[60px]" />
                <View>
                  <Text className="text-sm">{item.destination}</Text>
                  <View className="flex flex-row gap-2 items-center">
                    <Text className="text-xs ">{item.driver}</Text>
                    <View className="w-1 h-1 bg-black rounded-full" />
                    <Text className="text-xs ">{item.plat}</Text>
                  </View>
                </View>
              </View>
              <Text className="text-xs ">{item.departureTime}</Text>
            </View>
          </TouchableOpacity>
        ));
      case 'Completed':
        return ridesData.completed.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('OrderDetail', { id: item.id })}
          >
            <View className="py-2 px-6 flex flex-row items-center justify-between border-b border-[#BDBDBD] w-full">
              <View className="flex flex-row items-center gap-2">
                <Image source={bike} className="object-cover w-[60px] h-[60px]" />
                <View>
                  <Text className="text-sm">{item.destination}</Text>
                  <View className="flex flex-row gap-2 items-center">
                    <Text className="text-xs ">{item.driver}</Text>
                    <View className="w-1 h-1 bg-black rounded-full" />
                    <Text className="text-xs ">{item.plat}</Text>
                  </View>
                </View>
              </View>
              <Text className="text-xs ">{item.price}</Text>
            </View>
          </TouchableOpacity>
        ));
      case 'Cancelled':
        return ridesData.cancelled.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('OrderDetail', { id: item.id })}
            className="flex w-full"
          >
            <View className="py-2 px-6 flex flex-row items-center gap-2 border-b border-[#BDBDBD] w-full">
              <Image source={car} className="object-cover w-[60px] h-[60px]" />
              <View>
                <Text className="text-sm">{item.destination}</Text>
                <View className="flex flex-row gap-2 items-center">
                  <Image source={cancel} className="object-cover w-[14px] h-[14px]" />
                  <Text className="text-xs">Tidak jadi nebeng</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ));
      default:
        return <Text>Ongoing</Text>;
    }
  };

  const Orders = () => {
    return (
      <View className="pt-20 flex-1 items-center bg-white w-full h-full">
      <Text className="text-lg font-semibold mb-8">Orders</Text>
      <View className="flex flex-col w-full">
        <View className="w-full flex flex-col justify-center">
          <View className="flex flex-row h-10 bg-[#F6D2CC] mx-6 mb-4 border border-black rounded-md">
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab}
                className={`flex-1 h-full rounded-md items-center justify-center ${activeTab === tab ? 'bg-primary' : 'bg-[#F6D2CC]'}`}
                onPress={() => setActiveTab(tab)}
              >
                <Text className={`text-xs ${activeTab === tab ? 'text-white' : 'text-black'}`}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="w-full flex justify-between">
            {displayTabContent()}
          </View>
        </View>
      </View>
    </View>
    )
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
    </Stack.Navigator>
  );
};

export default Orders;