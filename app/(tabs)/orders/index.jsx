import { StatusBar } from "expo-status-bar";
import { Image, Text, View, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import { Link } from "expo-router";

import cancel from "../../../assets/images/cancel.png";
import bike from "../../../assets/images/bike.png";
import car from "../../../assets/images/car.png";

import { useState } from "react";

const tabs = ["Ongoing", "Completed", "Cancelled"];

const Orders = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const formatPrice = (price) => {
    return `Rp ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case 'Ongoing':
        return dummyOrders.ongoing.map(item => (
          <View key={item.id} className="py-2 px-6 flex flex-row items-center justify-between border-b border-[#BDBDBD] w-full">
            <View className="flex flex-row items-center gap-2">
              <Image
                source={bike}
                className="object-cover w-[60px] h-[60px]"
              />
              <View>
                <Text className="text-sm">{item.destination}</Text>
                <View className="flex flex-row gap-2 items-center">
                  <Text className="text-xs ">{item.driver}</Text>
                  <View className="w-1 h-1 bg-black rounded-full" />
                  <Text className="text-xs ">{item.plat}</Text>
                </View>
              </View>
            </View>
            <Text className="text-xs ">{item.time}</Text>
          </View>
        ));
      case 'Completed':
        return dummyOrders.completed.map(item => (
          <View key={item.id} className="py-2 px-6 flex flex-row items-center justify-between border-b border-[#BDBDBD] w-full">
            <View className="flex flex-row items-center gap-2">
              <Image
                source={bike}
                className="object-cover w-[60px] h-[60px]"
              />
              <View>
                <Text className="text-sm">{item.destination}</Text>
                <View className="flex flex-row gap-2 items-center">
                  <Text className="text-xs ">{item.driver}</Text>
                  <View className="w-1 h-1 bg-black rounded-full" />
                  <Text className="text-xs ">{item.plat}</Text>
                </View>
              </View>
            </View>
            <Text className="text-xs ">{formatPrice(item.price)}</Text>
          </View>
        ));
      case 'Cancelled':
        return dummyOrders.cancelled.map(item => (
          <View key={item.id} className="py-2 px-6 flex flex-row items-center gap-2 border-b border-[#BDBDBD] w-full">
            <Image
              source={car}
              className="object-cover w-[60px] h-[60px]"
            />
            <View>
              <Text className="text-sm">{item.destination}</Text>
              <View className="flex flex-row gap-2 items-center">
                <Image
                  source={cancel}
                  className="object-cover w-[14px] h-[14px]"
                />
                <Text className="text-xs">Tidak jadi nebeng</Text>
              </View>
            </View>
          </View>
        ));
      default:
        return <Text>Ongoing</Text>;
    }
  }

  return (
    <View className="pt-20 flex-1 items-center bg-white w-full h-full">
      <Text className="text-lg font-semibold mb-8">Orders</Text>
      <View className="flex flex-col w-full">
        <View className="w-full flex flex-col justify-center">
          <View className="flex flex-row h-10 bg-[#F6D2CC] mx-6 mb-4 border border-black rounded-md">
            <TouchableOpacity 
            className={`flex-1 h-full rounded-md items-center justify-center ${activeTab === 'Ongoing' ? 'bg-primary' : 'bg-[#F6D2CC]'}`} 
            onPress={() => setActiveTab('Ongoing')}>
              <Text 
              className={`text-xs ${activeTab === 'Ongoing' ? 'text-white' : 'text-black'}`}>
                Ongoing
              </Text>
            </TouchableOpacity >
            <TouchableOpacity 
            className={`flex-1 h-full rounded-md items-center justify-center ${activeTab === 'Completed' ? 'bg-primary' : 'bg-[#F6D2CC]'}`} 
            onPress={() => setActiveTab('Completed')}>
              <Text 
              className={`text-xs ${activeTab === 'Completed' ? 'text-white' : 'text-black'}`}>
                Completed
              </Text>
            </TouchableOpacity ><TouchableOpacity 
            className={`flex-1 h-full rounded-md items-center justify-center ${activeTab === 'Cancelled' ? 'bg-primary' : 'bg-[#F6D2CC]'}`} 
            onPress={() => setActiveTab('Cancelled')}>
              <Text 
              className={`text-xs ${activeTab === 'Cancelled' ? 'text-white' : 'text-black'}`}>
                Cancelled
              </Text>
            </TouchableOpacity >
          </View>
          <View className="w-full flex justify-between">
            {displayTabContent()}
          </View>
        </View>
      </View>
    </View>
  );
}

const dummyOrders = {
  ongoing: [
    { id: 1, destination: 'Institut Teknologi Bandung', driver: 'Syahrial Alzaidan', plat: 'B 1234 KME', time: '5 mins', status: 'Ongoing' },
    { id: 2, destination: 'Institut Teknologi Bandung', driver: 'Syahrial Alzaidan', plat: 'B 1234 KME', time: '5 mins', status: 'Ongoing' },
  ],
  completed: [
    { id: 3, destination: 'Institut Teknologi Bandung', driver: 'Syahrial Alzaidan', plat: 'B 1234 KME', price: '5000', status: 'Completed' },
    { id: 4, destination: 'Institut Teknologi Bandung', driver: 'Syahrial Alzaidan', plat: 'B 1234 KME', price: '5000', status: 'Completed' },
  ],
  cancelled: [
    { id: 5, destination: 'Institut Teknologi Bandung', status: 'Cancelled' },
    { id: 6, destination: 'Institut Teknologi Bandung', status: 'Cancelled' },
  ],
};

export default Orders;