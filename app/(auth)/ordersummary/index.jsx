import React from "react";
import { Image, Text, TextInput, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import options1 from "../../../assets/images/tebengride.png";
import profilePic from "../../../assets/images/profile.png";

export default function OrderSummary() {
  return (
    <View className="flex-1 flex mt-4 p-4 bg-white">
      <Link href="/" className="mb-2">
        <View className="flex-row items-center">
          <Ionicons name="close" size={20} color="black" />
          <Text className="text-xl font-bold pl-2">Order Summary</Text>
        </View>
      </Link>
      <View className="flex-row mb-2 items-center">
        <Image source={options1} className="w-12 h-12" />
        <View className="flex-1 ml-4">
          <Text className="text-lg text-black">TebengRide</Text>
          <Text className="text-xs text-gray-600">Trip Completed</Text>
        </View>
        <View className="items-end">
          <Text className="text-xs text-gray-500">04 April, 13:00</Text>
          <Text className="text-xs text-gray-500">Order TR-6231231923DA2</Text>
        </View>
      </View>

      <Text className="text-base font-bold text-center">
        Bagaimana Syahrial Alzaidan?
      </Text>
      <View className="flex-row mb-4 justify-center">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Ionicons
              key={index}
              name="star"
              size={24}
              color={index < 4 ? "#FFD700" : "#E0E0E0"}
            />
          ))}
      </View>

      <TextInput
        className="border border-gray-400 rounded-lg p-2 mb-4 text-top"
        placeholder="Berikan ulasan untuk Syahrial Alzaidan..."
        multiline
        numberOfLines={4}
      />
      <View className="flex-row items-center mb-4">
        <Image source={profilePic} className="w-12 h-12 rounded-full" />
        <View className="flex-1 ml-4">
          <Text className="text-base font-bold">Syahrial Alzaidan</Text>
          <Text className="text-xs text-gray-600">
            7 mins • B 1234 JKL • Honda Beat
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-base">
            <Ionicons name="star" size={16} color="#FFD700" />
            4.9/5.0
          </Text>
        </View>
      </View>

      <View className="mb-4">
        <Text className="text-base font-bold mb-2">Detail Perjalanan</Text>
        <View className="flex-col items-start mb-2">
          <Ionicons name="location" size={16} />
          <Text className="text-sm mb-1">Lokasi Jemput</Text>
          <Text className="text-sm mb-1">Kos Alzaidan</Text>
        </View>
        <Text className="text-sm mb-1">
          <Ionicons name="location" size={16} /> Lokasi Tujuan: Institut
          Teknologi Bandung
        </Text>
      </View>
      <View className="mb-4">
        <Text className="text-base font-bold mb-2">Detail Pembayaran</Text>
        <Text className="text-sm text-gray-600 mb-1">
          Biaya Perjalanan: Rp 5.000
        </Text>
        <Text className="text-sm text-gray-600 mb-1">
          Biaya Admin: Rp 2.000
        </Text>
        <Text className="text-sm text-gray-600 mb-1">
          Voucher Diskon: -Rp 3.000
        </Text>
        <Text className="text-sm text-gray-600 mb-1">Total: Rp 4.000</Text>
        <Text className="text-sm text-gray-600 mb-1">Cash: Rp 4.000</Text>
      </View>
      <TouchableOpacity className="bg-red-900 p-3 rounded-lg items-center">
        <Text className="text-white text-lg font-bold">Done</Text>
      </TouchableOpacity>
    </View>
  );
}
