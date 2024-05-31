import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";

import cancel from "../../../assets/images/cancel.png";
import tebengride from "../../../assets/images/tebengride.png";
import tebengcar from "../../../assets/images/tebengcar.png";

import { getRides } from "../../api/rides";
import { auth } from "../../../firebase/config";
import { router } from "expo-router";

const tabs = ["Ongoing", "Completed", "Cancelled"];

const Orders = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [ridesData, setRidesData] = useState({
    ongoing: [],
    completed: [],
    cancelled: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const data = await getRides(auth.currentUser.uid);
      setRidesData(data);
    } catch (error) {
      console.error("Error fetching rides data:", error);
      setError("Failed to fetch rides data.");
    } finally {
      setRefreshing(false);
    }
  }, []);

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
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" color="#5B1F15" />
      </View>
    );
  }

  const displayTabContent = () => {
    switch (activeTab) {
      case "Ongoing":
        if (ridesData.ongoing.length === 0) {
          return (
            <View className="items-center justify-center flex-1">
              <Text className="text-gray-500 ">No ongoing orders</Text>
            </View>
          );
        }
        return ridesData.ongoing.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              router.push({
                pathname: "orderDetail",
                params: {
                  id: item.id
                },
              })
            }
            className="w-full"
          >
            <View className="py-2 px-6 flex flex-row items-center justify-between border-b border-[#BDBDBD] w-full">
              <View className="flex flex-row items-center flex-1 w-full gap-2">
                <Image
                  source={item.driverType === "car" ? tebengcar : tebengride}
                  className="object-cover w-[60px] h-[60px]"
                />
                <View className="flex-1">
                  <Text className="text-sm" numberOfLines={2}>
                    {item.destination}
                  </Text>
                  <View className="flex flex-row items-center gap-2">
                    <Text className="text-xs ">{item.driver}</Text>
                    <View className="w-1 h-1 bg-black rounded-full" />
                    <Text className="text-xs ">{item.plat}</Text>
                  </View>
                </View>
              </View>
              <Text className="text-xs">{item.departureTime}</Text>
            </View>
          </TouchableOpacity>
        ));
      case "Completed":
        if (ridesData.completed.length === 0) {
          return (
            <View className="items-center justify-center flex-1">
              <Text className="text-gray-500 ">No completed orders</Text>
            </View>
          );
        }
        return ridesData.completed.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              router.push({
                pathname: "orderDetail",
                params: {
                  id: item.id
                },
              })
            }
            className="w-full"
          >
            <View className="py-2 px-6 flex flex-row items-center justify-between border-b border-[#BDBDBD] w-full">
              <View className="flex flex-row items-center flex-1 w-full gap-2">
                <Image
                  source={item.driverType === "car" ? tebengcar : tebengride}
                  className="object-cover w-[60px] h-[60px]"
                />
                <View className="flex-1">
                  <Text className="text-sm" numberOfLines={2}>
                    {item.destination}
                  </Text>
                  <View className="flex flex-row items-center gap-2">
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
      case "Cancelled":
        if (ridesData.cancelled.length === 0) {
          return (
            <View className="items-center justify-center flex-1">
              <Text className="text-gray-500 ">No cancelled orders</Text>
            </View>
          );
        }
        return ridesData.cancelled.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              router.push({
                pathname: "orderDetail",
                params: {
                  id: item.id
                },
              })
            }
            className="flex w-full"
          >
            <View className="py-2 px-6 flex flex-row items-center gap-2 border-b border-[#BDBDBD] w-full">
              <Image
                source={item.driverType === "car" ? tebengcar : tebengride}
                className="object-cover w-[60px] h-[60px]"
              />
              <View className="flex-1">
                <Text className="text-sm" numberOfLines={2}>
                  {item.destination}
                </Text>
                <View className="flex flex-row items-center gap-2">
                  <Image
                    source={cancel}
                    className="object-cover w-[14px] h-[14px]"
                  />
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="items-center flex-1 w-full h-full pt-20 bg-white">
          <Text className="mb-8 text-lg font-semibold">Orders</Text>
          <View className="flex flex-col w-full">
            <View className="flex flex-col justify-center w-full">
              <View className="flex flex-row h-10 bg-[#F6D2CC] mx-6 mb-4 border border-black rounded-md">
                {tabs.map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    className={`flex-1 h-full rounded-md items-center justify-center ${
                      activeTab === tab ? "bg-primary" : "bg-[#F6D2CC]"
                    }`}
                    onPress={() => setActiveTab(tab)}
                  >
                    <Text
                      className={`text-xs ${
                        activeTab === tab ? "text-white" : "text-black"
                      }`}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View className="flex justify-between w-full">
                {displayTabContent()}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: "white",
  },
});

export default Orders;
